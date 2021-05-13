package model

import (
	"strconv"
	"time"

	"github.com/spacemonkeygo/openssl"
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
