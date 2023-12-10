package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/Mateusz2734/wdai-project/backend/internal/db"
	"github.com/Mateusz2734/wdai-project/backend/internal/password"
	"github.com/Mateusz2734/wdai-project/backend/internal/request"
	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/Mateusz2734/wdai-project/backend/internal/validator"
	"github.com/jackc/pgx/v5/pgtype"

	"github.com/pascaldekloe/jwt"
)

func (app *application) status(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"Status": "OK",
	}

	err := response.JSON(w, http.StatusOK, data)
	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) createUser(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Username        string              `json:"Username"`
		DiscordUsername string              `json:"DiscordUsername"`
		Password        string              `json:"Password"`
		Validator       validator.Validator `json:"-"`
	}

	err := request.DecodeJSON(w, r, &input)
	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	existingUser, err := app.db.GetUserByUsername(r.Context(), input.Username)
	if err != nil {
		app.serverError(w, r, err)
		return
	}

	input.Validator.CheckField(input.Username != "", "Username", "Username is required")
	input.Validator.CheckField(existingUser == nil, "Username", "Username is already in use")
	input.Validator.CheckField(len(input.Username) <= 30, "Username", "Username is too long")

	input.Validator.CheckField(input.Password != "", "Password", "Password is required")
	input.Validator.CheckField(len(input.Password) >= 8, "Password", "Password is too short")
	input.Validator.CheckField(len(input.Password) <= 72, "Password", "Password is too long")
	input.Validator.CheckField(validator.NotIn(input.Password, password.CommonPasswords...), "Password", "Password is too common")

	input.Validator.CheckField(input.DiscordUsername != "", "DiscordUsername", "Discord Username is required")
	input.Validator.CheckField(len(input.DiscordUsername) <= 72, "DiscordUsername", "Discord Username is too long")

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

	_, err = app.db.AddUser(r.Context(), newUser)
	if err != nil {
		app.serverError(w, r, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (app *application) createAuthenticationToken(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Username  string              `json:"Username"`
		Password  string              `json:"Password"`
		Validator validator.Validator `json:"-"`
	}

	err := request.DecodeJSON(w, r, &input)
	if err != nil {
		app.badRequest(w, r, err)
		return
	}

	user, err := app.db.GetUserByUsername(r.Context(), input.Username)
	if err != nil {
		app.serverError(w, r, err)
		return
	}

	input.Validator.CheckField(input.Username != "", "Username", "Username is required")
	input.Validator.CheckField(user != nil, "Username", "Username could not be found")

	if user != nil {
		passwordMatches, err := password.Matches(input.Password, user.PasswordHash)
		if err != nil {
			app.serverError(w, r, err)
			return
		}

		input.Validator.CheckField(input.Password != "", "Password", "Password is required")
		input.Validator.CheckField(passwordMatches, "Password", "Password is incorrect")
	}

	if input.Validator.HasErrors() {
		app.failedValidation(w, r, input.Validator)
		return
	}

	var claims jwt.Claims
	claims.Subject = strconv.Itoa(int(user.UserID))

	expiry := time.Now().Add(24 * time.Hour)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(expiry)

	claims.Issuer = app.config.baseURL
	claims.Audiences = []string{app.config.baseURL}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secretKey))
	if err != nil {
		app.serverError(w, r, err)
		return
	}

	data := map[string]string{
		"AuthenticationToken":       string(jwtBytes),
		"AuthenticationTokenExpiry": expiry.Format(time.RFC3339),
	}

	err = response.JSON(w, http.StatusOK, data)
	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) protected(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is a protected handler"))
}

func (app *application) getStats(w http.ResponseWriter, r *http.Request) {
	reviewCountByStars, err := app.db.GetReviewCountByStars(r.Context())

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	userCount, err := app.db.GetUserCount(r.Context())

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	offerCountByCategory, err := app.db.GetOfferCountByCategory(r.Context())

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	offerCountBySkill, err := app.db.GetOfferCountBySkill(r.Context())

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	offerCount, err := app.db.GetOfferCount(r.Context())

	if err != nil {
		app.serverError(w, r, err)
		return
	}

	data := map[string]interface{}{
		"userCount":            userCount,
		"offerCount":           offerCount,
		"reviewCountByStars":   reviewCountByStars,
		"offerCountBySkill":    offerCountBySkill,
		"offerCountByCategory": offerCountByCategory,
	}

	err = response.JSON(w, http.StatusOK, data)
	if err != nil {
		app.serverError(w, r, err)
	}
}
