package main

import (
	"net/http"
	"strconv"

	"github.com/Mateusz2734/wdai-project/backend/internal/db"
	"github.com/Mateusz2734/wdai-project/backend/internal/request"
	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/Mateusz2734/wdai-project/backend/internal/validator"
	"github.com/alexedwards/flow"
	"github.com/jackc/pgx/v5"
)

func (app *application) getReviews(w http.ResponseWriter, r *http.Request) {
	var reviews []*db.Review
	var err error
	var data map[string]interface{}

	reviewedUserIDString := r.URL.Query().Get("reviewedUserId")
	reviewingUserIDString := r.URL.Query().Get("reviewingUserId")

	if reviewedUserIDString != "" {
		reviewedUserID, err := strconv.ParseInt(reviewedUserIDString, 10, 32)

		if err != nil {
			app.badRequest(w, r, err)
			return
		}

		reviews, err = app.db.GetReviewsByReviewedUser(r.Context(), int32(reviewedUserID))

		if err != nil && err != pgx.ErrNoRows {
			app.serverError(w, r, err)
			return
		}

		if err == pgx.ErrNoRows || reviews == nil {
			reviews = []*db.Review{}
		}

		data = map[string]interface{}{
			"reviewedUserId": reviewedUserID,
			"reviews":        reviews,
		}

	} else if reviewingUserIDString != "" {
		reviewingUserID, err := strconv.ParseInt(reviewingUserIDString, 10, 32)

		if err != nil {
			app.badRequest(w, r, err)
			return
		}

		reviews, err = app.db.GetReviewsByReviewingUser(r.Context(), int32(reviewingUserID))

		if err != nil && err != pgx.ErrNoRows {
			app.serverError(w, r, err)
			return
		}

		if err == pgx.ErrNoRows || reviews == nil {
			reviews = []*db.Review{}
		}

		data = map[string]interface{}{
			"reviewingUserId": reviewingUserID,
			"reviews":         reviews,
		}

	} else {
		reviews, err = app.db.GetReviews(r.Context())

		if err != nil && err != pgx.ErrNoRows {
			app.serverError(w, r, err)
			return
		}

		if err == pgx.ErrNoRows || reviews == nil {
			reviews = []*db.Review{}
		}

		data = map[string]interface{}{
			"reviews": reviews,
		}
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) addReview(w http.ResponseWriter, r *http.Request) {
	var input struct {
		ReviewedUserID int32               `json:"reviewedUserId"`
		StarCount      int32               `json:"starCount"`
		Review         string              `json:"review"`
		Validator      validator.Validator `json:"-"`
	}

	err := request.DecodeJSON(w, r, &input)

	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	user := contextGetAuthenticatedUser(r)

	if user == nil {
		app.authenticationRequired(w, r)
		return
	}

	input.Validator.CheckField(input.ReviewedUserID != 0, "reviewedUserId", "Reviewed user is required")
	input.Validator.CheckField(input.StarCount != 0, "starCount", "Star count is required")
	input.Validator.CheckField(input.Review != "", "review", "Review is required")

	if input.Validator.HasErrors() {
		app.failedValidation(w, r, input.Validator)
		return
	}

	reviewedUser, err := app.db.GetUserById(r.Context(), input.ReviewedUserID)

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	if err == pgx.ErrNoRows || reviewedUser == nil {
		app.errorMessage(w, r, http.StatusUnprocessableEntity, "Reviewed user does not exist", nil)
		return
	}

	params := db.AddReviewParams{
		ReviewingUserID: user.UserID,
		ReviewedUserID:  input.ReviewedUserID,
		StarCount:       input.StarCount,
		Review:          input.Review,
	}

	review, err := app.db.AddReview(r.Context(), params)

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	err = response.JSONSuccess(w, map[string]interface{}{"review": review})

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) deleteReview(w http.ResponseWriter, r *http.Request) {
	reviewID, err := strconv.ParseInt(flow.Param(r.Context(), "reviewId"), 10, 32)

	if err != nil || reviewID == 0 {
		app.badRequest(w, r, err)
		return
	}

	user := contextGetAuthenticatedUser(r)

	if user == nil {
		app.authenticationRequired(w, r)
		return
	}

	review, err := app.db.GetReviewById(r.Context(), int32(reviewID))

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	if err == pgx.ErrNoRows || review == nil {
		app.errorMessage(w, r, http.StatusUnprocessableEntity, "Review does not exist", nil)
		return
	}

	if review.ReviewingUserID != user.UserID && user.Role != "admin" {
		app.errorMessage(w, r, http.StatusUnauthorized, "You are not the owner of this review", nil)
		return
	}

	err = app.db.DeleteReview(r.Context(), int32(reviewID))

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	err = response.JSONSuccess(w, nil)

	if err != nil {
		app.serverError(w, r, err)
	}
}
