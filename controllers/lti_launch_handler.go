package controllers

import (
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

	manifest, err := webpack.NewFromBuildPath("client/build")

	state := &ViewState{
		Manifest: manifest,
	}

	if err != nil {
		return err
	}

	return view.Execute(w, state)
}

func (c *ControllerContext) NewLtiLaunchHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var state string

		switch r.Method {
		case "GET":
			query := r.URL.Query()

			state = query.Get("state")
		case "POST":
			if err := r.ParseForm(); err != nil {
				panic(err)
			}

			state = r.FormValue("state")
		default:
			panic("LTI Launch Controller cannot handle this type of request.")
		}

		isValid, err := c.Repo.OpenIdState.ValidateStateOf(state)

		if err != nil {
			panic(err)
		}

		if isValid {
			if err = index(w); err != nil {
				panic(err)
			}
		} else {
			panic("OIDC token could not be validated.")
		}
	}
}
