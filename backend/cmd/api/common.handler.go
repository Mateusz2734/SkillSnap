package main

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/Mateusz2734/wdai-project/backend/internal/password"
	"github.com/Mateusz2734/wdai-project/backend/internal/request"
	"github.com/Mateusz2734/wdai-project/backend/internal/response"
	"github.com/Mateusz2734/wdai-project/backend/internal/validator"
	"github.com/jackc/pgx/v5"

	"github.com/pascaldekloe/jwt"
)

func (app *application) status(w http.ResponseWriter, r *http.Request) {
	err := app.db.Ping(r.Context())

	data := map[string]string{
		"status": "success",
	}
	status := http.StatusOK

	if err != nil {
		data["status"] = "failed"
		status = http.StatusServiceUnavailable
	}

	err = response.JSON(w, status, data)

	if err != nil {
		app.serverError(w, r, err)
	}
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
	if err != nil && err != pgx.ErrNoRows {
		app.serverError(w, r, err)
		return
	}

	if err == pgx.ErrNoRows {
		app.errorMessage(w, r, http.StatusUnauthorized, "Username could not be found", nil)
		return
	}

	input.Validator.CheckField(input.Username != "", "username", "Username is required")

	if user != nil {
		passwordMatches, err := password.Matches(input.Password, user.PasswordHash)
		if err != nil {
			app.serverError(w, r, err)
			return
		}

		input.Validator.CheckField(input.Password != "", "password", "Password is required")
		input.Validator.CheckField(passwordMatches, "password", "Password is incorrect")
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

	data := map[string]interface{}{
		"authenticationToken":       string(jwtBytes),
		"authenticationTokenExpiry": expiry.Format(time.RFC3339),
	}

	err = response.JSONSuccess(w, data)
	if err != nil {
		app.serverError(w, r, err)
	}
}

func (app *application) invalidateAuthenticationToken(w http.ResponseWriter, r *http.Request) {
	authorizationHeader := r.Header.Get("Authorization")

	if authorizationHeader != "" {
		headerParts := strings.Split(authorizationHeader, " ")

		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			app.invalidAuthenticationToken(w, r)
			return
		}
		token := headerParts[1]

		if app.blacklist.CheckToken(token) {
			app.invalidAuthenticationToken(w, r)
			return
		}

		claims, err := jwt.HMACCheck([]byte(token), []byte(app.config.jwt.secretKey))
		if err != nil {
			app.invalidAuthenticationToken(w, r)
			return
		}

		if !claims.Valid(time.Now()) {
			app.invalidAuthenticationToken(w, r)
			return
		}

		if claims.Issuer != app.config.baseURL {
			app.invalidAuthenticationToken(w, r)
			return
		}

		if !claims.AcceptAudience(app.config.baseURL) {
			app.invalidAuthenticationToken(w, r)
			return
		}

		app.blacklist.AddToken(token)
	}

	err := response.JSONSuccess(w, nil)
	if err != nil {
		app.serverError(w, r, err)
	}
}
