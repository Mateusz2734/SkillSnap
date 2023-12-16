package main

import (
	"net/http"

	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/jackc/pgx/v5"
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
