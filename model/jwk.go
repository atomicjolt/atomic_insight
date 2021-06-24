package model

import (
	"github.com/lestrrat-go/jwx/jwk"
	"github.com/spacemonkeygo/openssl"
	"strconv"
	"time"
)

type Jwk struct {
	ID  int64
	Kid string `pg:",notnull"`
	Pem string `pg:",notnull"`

	ApplicationID int64 `pg:"on_delete:CASCADE"`

	Timestamps
}

func NewJwk() *Jwk {
	privateKey, err := openssl.GenerateRSAKey(4096)

	if err != nil {
		panic(err)
	}

	pem, err := privateKey.MarshalPKCS1PrivateKeyPEM()

	if err != nil {
		panic(err)
	}

	return &Jwk{
		Kid: strconv.FormatInt(time.Now().UTC().Unix(), 10),
		Pem: string(pem),
	}
}

func (j *Jwk) ToKey() (jwk.Key, error) {
	key, err := jwk.ParseKey([]byte(j.Pem), jwk.WithPEM(true))

	if err != nil {
		return nil, err
	}

	key.Set("kid", j.Kid)
	key.Set("use", "sig")
	key.Set("alg", "RS256")

	return key, nil
}
