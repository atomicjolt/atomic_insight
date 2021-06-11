package middleware

import (
	"context"
	"github.com/atomicjolt/atomic_insight/model"
	"net/http"
)

type ltiInstallContextKeyType int

const ltiInstallContextKey ltiInstallContextKeyType = iota

func WithLtiInstall(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		controllerResources := GetResources(r.Context())
		var iss, clientId string

		switch r.Method {
		case "GET":
			query := r.URL.Query()

			iss = query.Get("iss")
			clientId = query.Get("client_id")
		case "POST":
			if err := r.ParseForm(); err != nil {
				panic(err)
			}

			iss = r.FormValue("iss")
			clientId = r.FormValue("client_id")
		default:
			panic("Cannot find enough information to infer LTI install from this request.")
		}

		ltiInstall, err := controllerResources.Repo.LtiInstall.From(iss, clientId)

		if err != nil {
			panic(err)
		}

		newCtx := context.WithValue(r.Context(), ltiInstallContextKey, ltiInstall)
		next.ServeHTTP(w, r.WithContext(newCtx))
	})
}

func GetLtiInstall(ctx context.Context) *model.LtiInstall {
	return ctx.Value(ltiInstallContextKey).(*model.LtiInstall)
}
