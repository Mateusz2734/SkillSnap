package main

import (
	"context"
	"net/http"

	"github.com/Mateusz2734/wdai-project/backend/internal/db"
)

type contextKey string

const (
	authenticatedUserContextKey = contextKey("authenticatedUser")
)

func contextSetAuthenticatedUser(r *http.Request, user *db.User) *http.Request {
	ctx := context.WithValue(r.Context(), authenticatedUserContextKey, user)
	return r.WithContext(ctx)
}

func contextGetAuthenticatedUser(r *http.Request) *db.User {
	user, ok := r.Context().Value(authenticatedUserContextKey).(*db.User)
	if !ok {
		return nil
	}

	return user
}
