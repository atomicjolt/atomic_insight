package controllers

import (
	"github.com/atomicjolt/atomic_insight/repo"
	"github.com/gorilla/mux"
)

func NewRouter(repo *repo.Repo, assetsPath string) *mux.Router {
	router := mux.NewRouter()
	controllerContext := &ControllerContext{
		Repo:       repo,
		AssetsPath: assetsPath,
	}

	router.HandleFunc("/oidc_init", controllerContext.NewOpenIDInitHandler())
	router.HandleFunc("/jwks", controllerContext.NewJwksController())
	router.Handle("/{path:.*}", controllerContext.NewClientFilesHandler())

	return router
}
