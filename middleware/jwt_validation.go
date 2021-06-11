package middleware

import (
	"context"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/lestrrat-go/jwx/jwa"
	"log"
	"net/http"

	"github.com/lestrrat-go/jwx/jwt"
)

//See docs for context.WithValue
type jwtContextKey int

const (
	eventsContextKey jwtContextKey = iota
	ltiLaunchParamsKey
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

func GetEventsPayload(r *http.Request) map[string]interface{} {
	return r.Context().Value(eventsContextKey).(map[string]interface{})
}

func LtiJwtValidator(next http.Handler) http.Handler {
	return newJwtValidator(next,
		ltiLaunchParamsKey,
		jwt.WithFormKey("state"),
		jwt.WithValidate(true),
		jwt.WithKeySet(config.LtiKeySet()),
	)
}

func GetLtiLaunchParams(r *http.Request) map[string]interface{} {
	return r.Context().Value(ltiLaunchParamsKey).(map[string]interface{})
}
