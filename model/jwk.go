package model

type Jwk struct {
	ID  int64
	kid string `pg:",notnull"`
	pem string `pg:",notnull"`

	Timestamps
}