package middleware

import (
	"context"
	"github.com/lestrrat-go/jwx/jwt"
	"net/http"
)

func IdTokenFromLaunch(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		controllerResources := GetResources(r.Context())
		var idTokenRaw, iss, clientId string

		if err := r.ParseForm(); err != nil {
			panic(err)
		}

		idTokenRaw = r.FormValue("id_token")

		/**
		 * Inside this scope, we peek into the id_token before it is validated in order
		 * to get the Client ID and ISS of the tool consumer in order to find their JWKs
		 * URL. If possible, use the token and its claims after it has been verified.
		 */
		{
			token, err := jwt.ParseRequest(r, jwt.WithFormKey("id_token"))

			if err != nil {
				panic(err)
			}

			iss = token.Issuer()
			clientId = token.Audience()[0]
		}

		ltiInstall, err := controllerResources.Repo.LtiInstall.From(iss, clientId)

		if err != nil {
			panic(err)
		}

		keySet, err := controllerResources.ToolConsumerJwks.ForInstall(r.Context(), ltiInstall)

		if err != nil {
			panic("Unable to get public JWK set for tool consumer.")
		}

		validator := newJwtValidator(next,
			idTokenKey,
			jwt.WithFormKey("id_token"),
			jwt.WithValidate(true),
			jwt.WithKeySet(keySet),
		)

		newCtx := context.WithValue(r.Context(), idTokenRawKey, idTokenRaw)

		validator.ServeHTTP(w, r.WithContext(newCtx))
	})
}

func IdTokenFromAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		controllerResources := GetResources(r.Context())
		var iss, clientId string

		/**
		 * Inside this scope, we peek into the id_token before it is validated in order
		 * to get the Client ID and ISS of the tool consumer in order to find their JWKs
		 * URL. If possible, use the token and its claims after it has been verified.
		 */
		{
			token, err := jwt.ParseRequest(r)

			if err != nil {
				panic(err)
			}

			iss = token.Issuer()
			clientId = token.Audience()[0]
		}

		ltiInstall, err := controllerResources.Repo.LtiInstall.From(iss, clientId)

		if err != nil {
			panic(err)
		}

		keySet, err := controllerResources.ToolConsumerJwks.ForInstall(r.Context(), ltiInstall)

		if err != nil {
			panic("Unable to get public JWK set for tool consumer.")
		}

		token, err := jwt.ParseRequest(r, jwt.WithKeySet(keySet))

		if err != nil {
			panic(err)
		}

		claims, err := token.AsMap(context.Background())

		if err != nil {
			panic(err)
		}

		newCtx := context.WithValue(r.Context(), idTokenKey, claims)
		next.ServeHTTP(w, r.WithContext(newCtx))
	})
}

func GetIdToken(ctx context.Context) map[string]interface{} {
	idToken := ctx.Value(idTokenKey).(map[string]interface{})

	return idToken
}

func GetIdTokenRaw(ctx context.Context) string {
	idTokenRaw := ctx.Value(idTokenRawKey).(string)

	return idTokenRaw
}