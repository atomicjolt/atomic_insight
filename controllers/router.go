package controllers

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/middleware"
	"github.com/atomicjolt/atomic_insight/resources"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"net/http"
	"os"
)

func NewRouter(controllerResources resources.Resources) http.Handler {
	router := mux.NewRouter()

	eventsHandler := middleware.EventsJwtValidator(NewEventsHandler())
	router.Handle("/events", eventsHandler)

	router.Handle("/graphql", NewGraphqlHandler())
	router.HandleFunc("/graphql/playground", playground.Handler("Playground", "/graphql"))

	router.Handle("/oidc_init", NewOpenIDInitHandler()).Methods("GET", "POST")

	ltiHandler := middleware.OidcStateValidator(NewLtiLaunchHandler())
	ltiHandler = middleware.IdTokenDecoder(ltiHandler)
	router.Handle("/lti_launches", ltiHandler).Methods("GET", "POST")

	router.Handle("/jwks", NewJwksController())

	if config.DetermineEnv() == "development" {
		router.Handle("/{path:.*}", NewHotReloadProxy("http://127.0.0.1:3000"))
	} else {
		router.Handle("/{path:.*}", NewClientFilesHandler())
	}

	pipeline := middleware.WithResources(controllerResources, router)
	pipeline = handlers.LoggingHandler(os.Stdout, pipeline)
	pipeline = handlers.RecoveryHandler()(pipeline)

	return pipeline
}
