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

type ViewState struct {
	Manifest *webpack.Manifest
}

func index(w http.ResponseWriter) error {
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

	state := &ViewState{
		Manifest: manifest,
	}

	return view.Execute(w, state)
}

func (c *ControllerContext) NewLtiLaunchHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		payload := middleware.GetLtiLaunchParams(r)
		nonce, ok := payload["nonce"]

		if !ok {
			panic(fmt.Errorf("expected nonce in OIDC claims"))
		}

		valid, err := c.Repo.OpenIdState.ValidateStateOf(nonce.(string))

		if err != nil {
			panic(err)
		} else if !valid {
			panic(fmt.Errorf("OIDC token could not be validated"))
		}

		if err := index(w); err != nil {
			panic(err)
		}
	}
}
