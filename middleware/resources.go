package middleware

import (
	"context"
	"github.com/atomicjolt/atomic_insight/resources"
	"net/http"
)

func GetResources(ctx context.Context) resources.Resources {
	return ctx.Value(resourcesKey).(resources.Resources)
}

func WithResources(controllerResources resources.Resources, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		newCtx := context.WithValue(r.Context(), resourcesKey, controllerResources)
		next.ServeHTTP(w, r.WithContext(newCtx))
	})
}
