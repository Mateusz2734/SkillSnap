package main

import (
	"net/http"

	"github.com/Mateusz2734/wdai-project/backend/internal/db"
	"github.com/Mateusz2734/wdai-project/backend/internal/request"
	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/Mateusz2734/wdai-project/backend/internal/validator"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

func (app *application) getReports(w http.ResponseWriter, r *http.Request) {
	reports, err := app.db.GetReports(r.Context())

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"reports": reports,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) addReport(w http.ResponseWriter, r *http.Request) {
	var input struct {
		ReportedUserID  int32               `json:"reportedUserId"`
		ReportedOfferID int32               `json:"reportedOfferId"`
		Reason          string              `json:"reason"`
		Description     string              `json:"description"`
		Status          string              `json:"status"`
		Validator       validator.Validator `json:"-"`
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

	input.Validator.Check(input.ReportedUserID != 0 || input.ReportedOfferID != 0, "Report must contain either reported user or reported offer")
	input.Validator.CheckField(input.Reason != "", "reason", "Reason is required")
	input.Validator.CheckField(input.Description != "", "description", "Description is required")
	input.Validator.CheckField(input.Status != "", "status", "Status is required")

	if input.Validator.HasErrors() {
		app.failedValidation(w, r, input.Validator)
		return
	}

	reason, err := app.db.GetReason(r.Context(), input.Reason)

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	if err == pgx.ErrNoRows || reason == "" {
		app.errorMessage(w, r, http.StatusUnprocessableEntity, "Report reason does not exist", nil)
	}

	reportedUser := pgtype.Int4{Int32: input.ReportedUserID, Valid: false}
	reportedOffer := pgtype.Int4{Int32: input.ReportedOfferID, Valid: false}

	if input.ReportedUserID != 0 {
		reportedUser.Valid = true
	}

	if input.ReportedOfferID != 0 {
		reportedOffer.Valid = true
	}

	params := db.AddReportParams{
		ReportingUserID: user.UserID,
		Description:     input.Description,
		Reason:          input.Reason,
		Status:          input.Status,
		ReportedUserID:  reportedUser,
		ReportedOfferID: reportedOffer,
	}

	report, err := app.db.AddReport(r.Context(), params)

	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	data := map[string]interface{}{
		"report": report,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}
