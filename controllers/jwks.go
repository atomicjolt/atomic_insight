package controllers

import (
	"encoding/json"
	"net/http"
)

func (c *ControllerContext) NewJwksController() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		publicKeys, err := c.Repo.Jwk.PublicJwkSet()

		if err != nil {
			panic(err)
		}

		enc := json.NewEncoder(w)
		enc.Encode(publicKeys)
	}
}
