package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/lestrrat-go/jwx/jwk"
)

func (c *ControllerContext) NewJwksController() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jwks, err := c.Repo.Jwk.All()
		if err != nil {
			panic(err)
		}

		publicKeys := make([]jwk.Key, len(jwks))

		for i, jwk := range jwks {
			pubKey, err := jwk.PublicKey()
			if err != nil {
				panic(err)
			}

			publicKeys[i] = pubKey
		}

		enc := json.NewEncoder(w)
		enc.Encode(publicKeys)
	}
}
