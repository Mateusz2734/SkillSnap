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

	mux.HandleFunc("/health", app.status, "GET")
	mux.HandleFunc("/users", app.createUser, "POST")
	mux.HandleFunc("/auth/login", app.createAuthenticationToken, "POST")

	mux.Group(func(mux *flow.Mux) {
		mux.Use(app.requireAuthenticatedUser)

		mux.HandleFunc("/reports", app.addReport, "GET")
		mux.HandleFunc("/offers", app.getOffers, "GET")
		mux.HandleFunc("/offers", app.addOffer, "POST")
		mux.HandleFunc("/offers/:offerID", app.deleteOffer, "DELETE")
		mux.HandleFunc("/offers/:offerID", app.getOffer, "GET")
		mux.HandleFunc("/users/:userID", app.deleteUser, "DELETE")
		mux.HandleFunc("/categories", app.getCategories, "GET")
		mux.HandleFunc("/skills", app.getSkills, "GET")
		mux.HandleFunc("/categories/:skill", app.getCategoriesBySkill, "GET")
	})

	mux.Group(func(mux *flow.Mux) {
		mux.Use(app.requireAdminPrivileges)

		mux.HandleFunc("/skills", app.addSkill, "POST")
		mux.HandleFunc("/categories", app.addCategory, "POST")
		mux.HandleFunc("/admin/reports", app.getReports, "GET")
		mux.HandleFunc("/admin/users", app.getUsers, "GET")
		mux.HandleFunc("/admin/stats/general", app.getGeneralStats, "GET")
		mux.HandleFunc("/admin/stats/users/:userID", app.getUserStats, "GET")
	})

	return mux
}
