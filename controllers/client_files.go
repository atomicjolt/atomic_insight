package controllers

import "net/http"

func (c *ControllerContext) NewClientFilesHandler() http.Handler {
	return http.FileServer(http.Dir(c.AssetsPath))
}
