package middleware

import (
	"context"
	"github.com/lestrrat-go/jwx/jwa"
	"net/http"

	"github.com/lestrrat-go/jwx/jwt"
)

//See docs for context.WithValue
type contextKey int

const DecodedJwtKey contextKey = 0

func NewJwtValidator(jwtKey string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := jwt.ParseRequest(r,
			jwt.WithFormKey(jwtKey),
			jwt.WithValidate(true),
			jwt.WithVerify(jwa.HS256, []byte("shared_secret")),
		)

		if err != nil {
			panic(err)
		}

		//Totally undocumented why a context is needed here
		claims, err := token.AsMap(context.Background())

		if err != nil {
			panic(err)
		}

		newCtx := context.WithValue(r.Context(), DecodedJwtKey, claims)
		newReq := r.WithContext(newCtx)
		next.ServeHTTP(w, newReq)
	})
}
