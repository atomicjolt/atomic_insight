package model

import (
	"time"

	"github.com/atomicjolt/atomic_insight/config"
	"github.com/lestrrat-go/jwx/jwa"
	"github.com/lestrrat-go/jwx/jwt"
)

type OpenIdState struct {
	ID int64

	Nonce string

	Timestamps
}

func (o *OpenIdState) IssueToken() string {
	serverConfig := config.GetServerConfig()
	authClientId := serverConfig.AuthClientId
	authClientSecret := serverConfig.AuthClientSecret

	token := jwt.New()
	token.Set(jwt.AudienceKey, authClientId)
	token.Set(jwt.IssuedAtKey, time.Now().UTC().Unix())
	token.Set(jwt.ExpirationKey, time.Now().Add(time.Hour*24).UTC().Unix())
	token.Set("nonce", o.Nonce)

	signed, err := jwt.Sign(token, jwa.HS512, authClientSecret)

	if err != nil {
		panic(err)
	}

	return string(signed)
}
