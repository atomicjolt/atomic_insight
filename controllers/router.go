package controllers

import (
	"github.com/atomicjolt/atomic_insight/repo"
	"github.com/gorilla/mux"
)

func NewRouter(repo *repo.Repo, assetsPath string) *mux.Router {
	router := mux.NewRouter()
	controllerContext := newControllerContext(repo)

	router.Handle("/", controllerContext.NewClientFilesHandler(assetsPath))

	return router
}
