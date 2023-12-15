package main

import (
	"net/http"

	"github.com/alexedwards/flow"
)

func (app *application) routes() http.Handler {
	mux := flow.New()

	mux.NotFound = http.HandlerFunc(app.notFound)
	mux.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowed)

	mux.Use(app.logAccess)
	mux.Use(app.recoverPanic)
	mux.Use(app.authenticate)

	mux.HandleFunc("/status", app.status, "GET")
	mux.HandleFunc("/users", app.createUser, "POST")
	mux.HandleFunc("/auth/login", app.createAuthenticationToken, "POST")

	mux.Group(func(mux *flow.Mux) {
		mux.Use(app.requireAuthenticatedUser)

		mux.HandleFunc("/users/:userID", app.deleteUser, "DELETE")
		mux.HandleFunc("/protected", app.protected, "GET")
		mux.HandleFunc("/categories", app.getCategories, "GET")
		mux.HandleFunc("/skills", app.getSkills, "GET")
		mux.HandleFunc("/categories/:skill", app.getCategoriesBySkill, "GET")
	})

	mux.Group(func(mux *flow.Mux) {
		mux.Use(app.requireAdminPrivileges)

		mux.HandleFunc("/skills", app.addSkill, "POST")
		mux.HandleFunc("/categories", app.addCategory, "POST")
		mux.HandleFunc("/admin/users", app.getUsers, "GET")
		mux.HandleFunc("/admin/stats/general", app.getGeneralStats, "GET")
		mux.HandleFunc("/admin/stats/users/:userID", app.getUserStats, "GET")
		mux.HandleFunc("/admin-protected", app.protected, "GET")
	})

	return mux
}
