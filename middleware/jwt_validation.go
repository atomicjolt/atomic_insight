package middleware

import (
	"context"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/lestrrat-go/jwx/jwa"
	"github.com/lestrrat-go/jwx/jwt"
	"log"
	"net/http"
)

//See docs for context.WithValue
type jwtContextKey int

const (
	eventsContextKey jwtContextKey = iota
	oidcStateKey
	idTokenKey
	idTokenRawKey
)

func newJwtValidator(next http.Handler, key jwtContextKey, options ...jwt.ParseOption) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := jwt.ParseRequest(r,
			options...,
		)

		if err != nil {
			panic(err)
		}

		//Totally undocumented why a context is needed here
		claims, err := token.AsMap(context.Background())

		if err != nil {
			log.Fatal(err)
		}

		newCtx := context.WithValue(r.Context(), key, claims)
		newReq := r.WithContext(newCtx)
		next.ServeHTTP(w, newReq)
	})
}

func EventsJwtValidator(next http.Handler) http.Handler {
	return newJwtValidator(next,
		eventsContextKey,
		jwt.WithFormKey("events"),
		jwt.WithValidate(true),
		jwt.WithVerify(jwa.HS256, []byte("shared_secret")),
	)
}

func GetEventsPayload(ctx context.Context) map[string]interface{} {
	return ctx.Value(eventsContextKey).(map[string]interface{})
}

func OidcStateValidator(next http.Handler) http.Handler {
	return newJwtValidator(next,
		oidcStateKey,
		jwt.WithFormKey("state"),
		jwt.WithValidate(true),
		jwt.WithKeySet(config.LtiKeySet()),
	)
}

func GetOidcState(ctx context.Context) map[string]interface{} {
	return ctx.Value(oidcStateKey).(map[string]interface{})
}

func IdTokenDecoder(next http.Handler) http.Handler {
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

			claims, err := token.AsMap(context.Background())

			if err != nil {
				panic(err)
			}

			iss = claims["iss"].(string)
			clientId = claims["aud"].([]string)[0]
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

func GetIdToken(ctx context.Context) map[string]interface{} {
	idToken := ctx.Value(idTokenKey).(map[string]interface{})

	return idToken
}

func GetIdTokenRaw(ctx context.Context) string {
	idTokenRaw := ctx.Value(idTokenRawKey).(string)

	return idTokenRaw
}
