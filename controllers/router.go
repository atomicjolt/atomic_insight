package controllers

import (
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/middleware"
	"github.com/atomicjolt/atomic_insight/repo"
	"github.com/atomicjolt/atomic_insight/store"
	"github.com/gorilla/mux"
	"github.com/lestrrat-go/jwx/jwa"
	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
	"log"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()
	controllerContext := &ControllerContext{
		Repo:  repo.NewRepo(),
		Store: store.NewStore(),
	}

	eventsHandler := controllerContext.NewEventsHandler()
	handler := middleware.NewJwtValidator(eventsHandler,
		middleware.EventsContextKey,
		jwt.WithFormKey("events"),
		jwt.WithValidate(true),
		jwt.WithVerify(jwa.HS256, []byte("shared_secret")),
	)
	router.Handle("/events", handler)

	router.Handle("/graphql", controllerContext.NewGraphqlHandler())
	router.HandleFunc("/graphql/playground", playground.Handler("Playground", "/graphql"))

	router.HandleFunc("/oidc_init", controllerContext.NewOpenIDInitHandler())

	ltiHandler := middleware.NewJwtValidator(controllerContext.NewLtiLaunchHandler(),
		middleware.LtiLaunchParamsKey,
		jwt.WithFormKey("state"),
		jwt.WithValidate(true),
		jwt.WithKeySet(getKeySet()),
	)
	router.Handle("/lti_launches", ltiHandler).Methods("GET", "POST")

	router.HandleFunc("/jwks", controllerContext.NewJwksController())

	if config.DetermineEnv() == "development" {
		router.Handle("/{path:.*}", NewHotReloadProxy("http://127.0.0.1:3000"))
	} else {
		router.Handle("/{path:.*}", controllerContext.NewClientFilesHandler())
	}

	return router
}

func getKeySet() jwk.Set {
	authClientSecret := config.GetServerConfig().AuthClientSecret

	authKey := jwk.NewSymmetricKey()

	err := authKey.FromRaw(authClientSecret)

	if err != nil {
		log.Fatal(err)
	}

	authKey.Set(jwk.AlgorithmKey, jwa.HS512)
	authKey.Set(jwk.KeyIDKey, "atomic_insight_auth0")

	keyset := jwk.NewSet()
	keyset.Add(authKey)

	return keyset
}
