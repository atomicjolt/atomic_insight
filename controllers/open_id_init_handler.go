package controllers

import (
	"github.com/atomicjolt/atomic_insight/lib"
	"net/http"
	"net/url"
)

func (c *ControllerContext) NewOpenIDInitHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		query := r.URL.Query()

		iss := query.Get("iss")
		clientId := query.Get("client_id")

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
		oidcQuery.Add("redirect_uri", query.Get("target_link_uri"))
		oidcQuery.Add("response_mode", "form_post")
		oidcQuery.Add("client_id", clientId)
		oidcQuery.Add("scope", "openid")
		oidcQuery.Add("state", openIdState.IssueToken())
		oidcQuery.Set("login_hint", query.Get("login_hint"))
		oidcQuery.Set("prompt", "none")
		oidcQuery.Set("lti_message_hint", query.Get("lti_message_hint"))
		oidcQuery.Set("nonce", nonce)

		http.Redirect(w, r, oidcUrl+"?"+oidcQuery.Encode(), http.StatusSeeOther)
	}
}
