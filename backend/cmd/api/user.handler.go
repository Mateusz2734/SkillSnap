package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Mateusz2734/wdai-project/backend/internal/db"
	"github.com/Mateusz2734/wdai-project/backend/internal/password"
	"github.com/Mateusz2734/wdai-project/backend/internal/request"
	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/Mateusz2734/wdai-project/backend/internal/validator"
	"github.com/alexedwards/flow"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

func (app *application) createUser(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Username        string              `json:"username"`
		DiscordUsername string              `json:"discordUsername"`
		Password        string              `json:"password"`
		Validator       validator.Validator `json:"-"`
	}

	err := request.DecodeJSON(w, r, &input)
	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	existingDiscordUsername, err := app.db.GetUserByDiscordUsername(r.Context(), pgtype.Text{String: input.DiscordUsername, Valid: true})

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	existingUser, err := app.db.GetUserByUsername(r.Context(), input.Username)

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	input.Validator.CheckField(input.Username != "", "username", "Username is required")
	input.Validator.CheckField(!existingUser.CreatedAt.Valid, "username", "Username is already in use")
	input.Validator.CheckField(len(input.Username) <= 30, "username", "Username is too long")

	input.Validator.CheckField(input.Password != "", "password", "Password is required")
	input.Validator.CheckField(len(input.Password) >= 8, "password", "Password is too short")
	input.Validator.CheckField(len(input.Password) <= 72, "password", "Password is too long")
	input.Validator.CheckField(validator.NotIn(input.Password, password.CommonPasswords...), "password", "Password is too common")

	input.Validator.CheckField(input.DiscordUsername != "", "discordUsername", "Discord username is required")
	input.Validator.CheckField(!existingDiscordUsername.CreatedAt.Valid, "discordUsername", "Discord username is already in use")
	input.Validator.CheckField(len(input.DiscordUsername) <= 72, "discordUsername", "Discord username is too long")

	if input.Validator.HasErrors() {
		app.failedValidation(w, r, input.Validator)
		return
	}

	hashedPassword, err := password.Hash(input.Password)
	if err != nil {
		app.serverError(w, r, err)
		return
	}

	newUser := db.AddUserParams{
		Username:        input.Username,
		DiscordUsername: pgtype.Text{String: input.DiscordUsername, Valid: true},
		PasswordHash:    hashedPassword,
	}

	user, err := app.db.AddUser(r.Context(), newUser)

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"user": user,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) getUsers(w http.ResponseWriter, r *http.Request) {
	users, err := app.db.GetUsers(r.Context())

	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"users": users,
	}

	err = response.JSONSuccess(w, data)

	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) deleteUser(w http.ResponseWriter, r *http.Request) {
	userID, err := strconv.ParseInt(flow.Param(r.Context(), "userId"), 10, 32)

	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	authenticatedUser := contextGetAuthenticatedUser(r)

	fmt.Printf("%+v\n", authenticatedUser)

	if !(authenticatedUser.UserID == int32(userID) || authenticatedUser.Role == "admin") {
		app.notPermitted(w, r)
		return
	}

	err = app.db.DeleteUser(r.Context(), int32(userID))

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	err = response.JSONSuccess(w, map[string]interface{}{})

	if err != nil {
		app.serverError(w, r, err)
	}
}
