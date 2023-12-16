package main

import (
	"net/http"
	"strconv"

	"github.com/Mateusz2734/wdai-project/backend/internal/db"
	"github.com/Mateusz2734/wdai-project/backend/internal/request"
	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/Mateusz2734/wdai-project/backend/internal/validator"
	"github.com/jackc/pgx/v5"
)

func (app *application) getOffers(w http.ResponseWriter, r *http.Request) {
	var offers []*db.Offer

	category := r.URL.Query().Get("category")
	limitQuery := r.URL.Query().Get("limit")
	offsetQuery := r.URL.Query().Get("offset")

	limit, err := strconv.ParseInt(limitQuery, 10, 32)

	if err != nil {
		limit = 10
	}

	offset, err := strconv.ParseInt(offsetQuery, 10, 32)

	if err != nil {
		offset = 0
	}

	if category != "" {
		params := db.GetOffersByCategoryParams{Category: category, Limit: int32(limit), Offset: int32(offset)}
		offers, err = app.db.GetOffersByCategory(r.Context(), params)

		if err != nil && err != pgx.ErrNoRows {
			app.serverError(w, r, err)
			return
		}
	} else {
		params := db.GetOffersParams{Limit: int32(limit), Offset: int32(offset)}
		offers, err = app.db.GetOffers(r.Context(), params)

		if err != nil && err != pgx.ErrNoRows {
			app.serverError(w, r, err)
			return
		}
	}

	data := map[string]interface{}{
		"meta": map[string]interface{}{
			"limit":  limit,
			"offset": offset,
		},
		"offers": offers,
	}

	if offers == nil {
		data["offers"] = []string{}
	}

	err = response.JSONSuccess(w, data)
	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) addOffer(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Skill       string              `json:"skill"`
		Description string              `json:"description"`
		Validator   validator.Validator `json:"-"`
	}

	err := request.DecodeJSON(w, r, &input)
	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	skill, err := app.db.GetSkill(r.Context(), input.Skill)

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	if err == pgx.ErrNoRows || skill == "" {
		input.Validator.CheckField(false, "skill", "Skill does not exist")
	}
	input.Validator.CheckField(input.Skill != "", "skill", "Skill is required")
	input.Validator.CheckField(input.Description != "", "description", "Description is required")

	if input.Validator.HasErrors() {
		app.failedValidation(w, r, input.Validator)
		return
	}

	user := contextGetAuthenticatedUser(r)

	if user == nil {
		app.authenticationRequired(w, r)
		return
	}

	params := db.AddOfferParams{UserID: user.UserID, Skill: input.Skill, Description: input.Description}
	offer, err := app.db.AddOffer(r.Context(), params)

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"offer": offer,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) deleteOffer(w http.ResponseWriter, r *http.Request) {
	offerID, err := strconv.ParseInt(r.URL.Query().Get("offerID"), 10, 32)
	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	user := contextGetAuthenticatedUser(r)

	if user == nil {
		app.authenticationRequired(w, r)
		return
	}

	offer, err := app.db.GetOfferById(r.Context(), int32(offerID))

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	if offer.UserID != user.UserID && user.Role != "admin" {
		app.errorMessage(w, r, http.StatusUnauthorized, "You are not the owner of this offer", nil)
		return
	}

	err = app.db.DeleteOffer(r.Context(), int32(offerID))
	if err != nil {
		app.serverError(w, r, err)
		return
	}

	err = response.JSONSuccess(w, nil)
	if err != nil {
		app.serverError(w, r, err)
	}
}
