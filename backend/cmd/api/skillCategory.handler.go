package main

import (
	"net/http"

	"github.com/Mateusz2734/wdai-project/backend/internal/request"
	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/Mateusz2734/wdai-project/backend/internal/validator"
	"github.com/alexedwards/flow"
	"github.com/jackc/pgx/v5"
)

func (app *application) getCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := app.db.GetCategories(r.Context())

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"categories": categories,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) addCategory(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Category  string              `json:"category"`
		Validator validator.Validator `json:"-"`
	}

	err := request.DecodeJSON(w, r, &input)
	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	input.Validator.CheckField(validator.MaxRunes(input.Category, 100), "category", "Category name is too long")

	if input.Validator.HasErrors() {
		app.failedValidation(w, r, input.Validator)
		return
	}

	category, err := app.db.AddCategory(r.Context(), input.Category)

	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	data := map[string]interface{}{
		"category": category,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) getSkills(w http.ResponseWriter, r *http.Request) {
	skills, err := app.db.GetSkills(r.Context())

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"skills": skills,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) addSkill(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Skill     string              `json:"skill"`
		Validator validator.Validator `json:"-"`
	}

	err := request.DecodeJSON(w, r, &input)

	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	input.Validator.CheckField(validator.MaxRunes(input.Skill, 100), "skill", "Skill name is too long")

	if input.Validator.HasErrors() {
		app.failedValidation(w, r, input.Validator)
		return
	}

	skill, err := app.db.AddSkill(r.Context(), input.Skill)

	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	data := map[string]interface{}{
		"skill": skill,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) getCategoriesBySkill(w http.ResponseWriter, r *http.Request) {
	val := validator.Validator{}

	skill := flow.Param(r.Context(), "skill")

	val.CheckField(validator.MaxRunes(skill, 100), "skill", "Skill name is too long")

	if val.HasErrors() {
		app.failedValidation(w, r, val)
		return
	}

	categories, err := app.db.GetCategoriesBySkill(r.Context(), skill)

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"categories": categories,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}

}
