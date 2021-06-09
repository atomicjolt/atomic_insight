package controllers

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/middleware"
	"github.com/atomicjolt/atomic_insight/repo"
	"github.com/atomicjolt/atomic_insight/store"
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()
	controllerContext := &ControllerContext{
		Repo:  repo.NewRepo(),
		Store: store.NewStore(),
	}

	eventsHandler := middleware.EventsJwtValidator(controllerContext.NewEventsHandler())
	router.Handle("/events", eventsHandler).Methods("POST")

	router.Handle("/graphql", controllerContext.NewGraphqlHandler())
	router.HandleFunc("/graphql/playground", playground.Handler("Playground", "/graphql"))

	router.HandleFunc("/oidc_init", controllerContext.NewOpenIDInitHandler())

	ltiHandler := middleware.LtiJwtValidator(controllerContext.NewLtiLaunchHandler())
	router.Handle("/lti_launches", ltiHandler).Methods("GET", "POST")

	router.HandleFunc("/jwks", controllerContext.NewJwksController())

	if config.DetermineEnv() == "development" {
		router.Handle("/{path:.*}", NewHotReloadProxy("http://127.0.0.1:3000"))
	} else {
		router.Handle("/{path:.*}", controllerContext.NewClientFilesHandler())
	}

	return router
}
