package controllers

import (
	"net/http"
)

func (c *ControllerContext) NewLtiLaunchHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//query := r.URL.Query()
		//payload := query.Get("state")
		//fmt.Println("Method:")
		//fmt.Println(r.Method)
		//fmt.Println("Request:")
		//fmt.Println(r)
		//fmt.Println("Query:")
		//fmt.Println(query)

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
			panic("Open ID Connect Controller cannot handle this type of request.")
		}

		isValid, err := c.Repo.OpenIdState.ValidateStateOf(state)

		if err != nil {
			panic(err)
		}

		if isValid {
			http.Redirect(w, r, "/", http.StatusSeeOther)
		} else {
			panic("OIDC token could not be validated.")
		}
	}
}
