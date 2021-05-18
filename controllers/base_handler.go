package controllers

import (
	"net/http"

	"github.com/atomicjolt/atomic_insight/repo"
)

type ControllerContext struct {
	Repo       *repo.Repo
	AssetsPath string
}

type ControllerFactory interface {
	NewClientFilesHandler() http.Handler
	NewOpenIDInitHandler() http.HandlerFunc
	NewLtiLaunchHandler() http.HandlerFunc
	NewJwksController() http.HandlerFunc
	NewGraphqlHandler() http.Handler
}

/**
 * This ensures that the ControllerFactory methods are
 * implemented on the ControllerContext at compile time.
 * Go does not ensure this normally.
 */
var _ ControllerFactory = (*ControllerContext)(nil)

func newControllerContext(repo *repo.Repo) *ControllerContext {
	return &ControllerContext{
		Repo: repo,
	}
}
