package middleware

import (
	"context"
	"github.com/lestrrat-go/jwx/jwa"
	"github.com/lestrrat-go/jwx/jwt"
	"net/http"
)

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
