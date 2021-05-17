package controllers

import (
	"github.com/atomicjolt/atomic_insight/lib"
	"net/http"
	"net/url"
)

func (c *ControllerContext) NewOpenIDInitHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var iss, clientId, targetLinkUri, loginHint, ltiMessageHint string

		switch r.Method {
		case "GET":
			query := r.URL.Query()

			iss = query.Get("iss")
			clientId = query.Get("client_id")
			targetLinkUri = query.Get("target_link_uri")
			loginHint = query.Get("login_hint")
			ltiMessageHint = query.Get("lti_message_hint")
		case "POST":
			if err := r.ParseForm(); err != nil {
				panic(err)
			}

			iss = r.FormValue("iss")
			clientId = r.FormValue("client_id")
			targetLinkUri = r.FormValue("target_link_uri")
			loginHint = r.FormValue("login_hint")
			ltiMessageHint = r.FormValue("lti_message_hint")
		default:
			panic("Open ID Connect Controller cannot handle this type of request.")
		}

		nonce, err := lib.RandomHex(64)

		if err != nil {
			panic(err)
		}

		openIdState, err := c.Repo.OpenIdState.NewState()

		if err != nil {
			panic(err)
		}

		ltiInstall, err := c.Repo.LtiInstall.From(iss, clientId)

		if err != nil {
			panic(err)
		}

		oidcUrl := ltiInstall.OidcUrl
		oidcQuery := url.Values{}

		oidcQuery.Add("response_type", "id_token")
		oidcQuery.Add("redirect_uri", targetLinkUri)
		oidcQuery.Add("response_mode", "form_post")
		oidcQuery.Add("client_id", clientId)
		oidcQuery.Add("scope", "openid")
		oidcQuery.Add("state", openIdState.IssueToken())
		oidcQuery.Set("login_hint", loginHint)
		oidcQuery.Set("prompt", "none")
		oidcQuery.Set("lti_message_hint", ltiMessageHint)
		oidcQuery.Set("nonce", nonce)

		http.Redirect(w, r, oidcUrl+"?"+oidcQuery.Encode(), http.StatusSeeOther)
	}
}
