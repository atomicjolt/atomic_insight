package model

type Jwk struct {
	ID  int64
	Kid string `pg:",notnull"`
	Pem string `pg:",notnull"`

	ApplicationID int64 `pg:"on_delete:CASCADE"`

	Timestamps
}
