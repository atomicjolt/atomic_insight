package controllers

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/atomicjolt/atomic_insight/repo"
	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()
	controllerContext := &ControllerContext{
		Repo: repo.NewRepo(),
	}

	router.Handle("/graphql", controllerContext.NewGraphqlHandler())
	router.HandleFunc("/graphql/playground", playground.Handler("Playground", "/graphql"))

	router.HandleFunc("/lti_launches", controllerContext.NewLtiLaunchHandler())
	router.HandleFunc("/oidc_init", controllerContext.NewOpenIDInitHandler())
	router.HandleFunc("/jwks", controllerContext.NewJwksController())
	router.Handle("/{path:.*}", controllerContext.NewClientFilesHandler())

	return router
}
