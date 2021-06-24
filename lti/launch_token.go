package lti

import (
	"context"
	"github.com/lestrrat-go/jwx/jwt"
	"net/http"
	"time"
)

type LaunchToken struct {
	jwt.Token
}

func NewLaunchToken(idToken IdToken) *LaunchToken {
	token := jwt.New()

	token.Set(jwt.SubjectKey, idToken.Subject())
	token.Set(jwt.AudienceKey, idToken.Audience())
	token.Set(jwt.IssuerKey, "https://atomicinsight.atomicjolt.xyz")
	token.Set(jwt.IssuedAtKey, time.Now().UTC().Unix())

	/**
	 * This is where state should be forwarded from the ID token
	 * to the client. This token will be returned on API calls
	 * to give context to requests.
	 */
	token.Set("contextId", idToken.ContextId())

	return &LaunchToken{
		Token: token,
	}
}

func ParseLaunchToken(r *http.Request, options ...jwt.ParseOption) (*LaunchToken, error) {
	rawToken, err := jwt.ParseRequest(r, options...)

	if err != nil {
		return nil, err
	}

	rawClaims, err := rawToken.AsMap(context.Background())

	if err != nil {
		return nil, err
	}

	innerClaims := rawClaims["Token"].(map[string]interface{})

	token := jwt.New()

	token.Set(jwt.SubjectKey, innerClaims[jwt.SubjectKey])
	token.Set(jwt.AudienceKey, innerClaims[jwt.AudienceKey])
	token.Set(jwt.IssuerKey, innerClaims[jwt.IssuerKey])
	token.Set(jwt.IssuedAtKey, innerClaims[jwt.IssuedAtKey])

	token.Set("contextId", innerClaims["contextId"])

	return &LaunchToken{
		Token: token,
	}, nil
}

func (t *LaunchToken) ContextId() string {
	contextId, ok := t.Get("contextId")

	if !ok {
		panic("Unable to infer context ID from launch token.")
	}

	return contextId.(string)
}
