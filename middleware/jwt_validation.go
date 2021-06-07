package middleware

import (
	"context"
	"net/http"

	"github.com/lestrrat-go/jwx/jwt"
)

//See docs for context.WithValue
type JwtContextKey int

const (
	EventsContextKey JwtContextKey = iota
	LtiLaunchParamsKey
)

func NewJwtValidator(next http.Handler, key JwtContextKey, options ...jwt.ParseOption) http.Handler {
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
			panic(err)
		}

		newCtx := context.WithValue(r.Context(), key, claims)
		newReq := r.WithContext(newCtx)
		next.ServeHTTP(w, newReq)
	})
}

func GetEventsPayload(r *http.Request) map[string]interface{} {
	return r.Context().Value(EventsContextKey).(map[string]interface{})
}

func GetLtiLaunchParams(r *http.Request) map[string]interface{} {
	return r.Context().Value(LtiLaunchParamsKey).(map[string]interface{})
}
