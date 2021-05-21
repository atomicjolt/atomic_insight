package controllers

import (
	"github.com/atomicjolt/atomic_insight/config"
	"net/http"
)

func (c *ControllerContext) NewClientFilesHandler() http.Handler {
	assetsDir := config.GetServerConfig().AssetsDir

	return http.FileServer(http.Dir(assetsDir))
}
