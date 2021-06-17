package controllers

import (
	"fmt"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/middleware"
	"github.com/atomicjolt/atomic_insight/webpack"
	"net/http"
	"path"
	"text/template"
)

type LtiState struct {
	IdTokenRaw string
}

type ViewState struct {
	Manifest *webpack.Manifest
	LtiState LtiState
}

func index(w http.ResponseWriter, r *http.Request) error {
	view, err := template.ParseFiles(path.Join("views", "index.html"))

	if err != nil {
		return err
	}

	var manifest *webpack.Manifest

	if config.DetermineEnv() == "development" {
		manifest, err = webpack.NewFromDevServer("http://127.0.0.1:3000/asset-manifest.json")
	} else {
		manifest, err = webpack.NewFromBuildPath("client/build")
	}

	if err != nil {
		return err
	}

	idTokenRaw := middleware.GetIdTokenRaw(r.Context())

	state := &ViewState{
		Manifest: manifest,
		LtiState: LtiState{
			IdTokenRaw: idTokenRaw,
		},
	}

	return view.Execute(w, state)
}

func NewLtiLaunchHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		controllerResources := middleware.GetResources(r.Context())
		payload := middleware.GetOidcState(r.Context())
		nonce, ok := payload["nonce"]

		if !ok {
			panic(fmt.Errorf("expected nonce in OIDC claims"))
		}

		valid, err := controllerResources.Repo.OpenIdState.ValidateStateOf(nonce.(string))

		if err != nil {
			panic(err)
		} else if !valid {
			panic(fmt.Errorf("OIDC token could not be validated"))
		}

		if err := index(w, r); err != nil {
			panic(err)
		}
	})
}
