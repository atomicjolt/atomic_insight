package controllers

import "net/http"

func (c *ControllerContext) NewClientFilesHandler(assetsPath string) http.Handler {
	return http.FileServer(http.Dir(assetsPath))
}
