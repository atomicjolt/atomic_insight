package controllers

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/middleware"
	"github.com/atomicjolt/atomic_insight/resources"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"net/http"
)

func NewRouter(controllerResources resources.Resources) http.Handler {
	router := mux.NewRouter()

	eventsRouter := router.Methods("POST").Subrouter()
	eventsRouter.Handle("/events", NewEventsHandler())
	eventsRouter.Use(middleware.EventsJwtValidator)

	graphqlRouter := router.Methods("GET", "POST").Subrouter()
	graphqlRouter.Handle("/graphql", NewGraphqlHandler())
	graphqlRouter.Handle("/graphql/playground", playground.Handler("Playground", "/graphql"))
	graphqlRouter.Use(middleware.LaunchTokenFromAuth)

	router.Handle("/oidc_init", NewOpenIDInitHandler()).Methods("GET", "POST")

	ltiRouter := router.Methods("GET", "POST").Subrouter()
	ltiRouter.Handle("/lti_launches", NewLtiLaunchHandler())
	ltiRouter.Use(middleware.LaunchTokenFromIdToken, middleware.OidcStateValidator)

	router.Handle("/jwks", NewJwksController())

	if config.DetermineEnv() == "development" {
		router.Handle("/{path:.*}", NewHotReloadProxy("http://127.0.0.1:3000"))
	} else {
		router.Handle("/{path:.*}", NewClientFilesHandler())
	}

	router.Use(
		handlers.RecoveryHandler(),
		middleware.Logger,
		middleware.WithResources(controllerResources),
	)
	return router
}
