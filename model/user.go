package model

type User struct {
	ID          int64
	Name        string `pg:",notnull"`
	Email       string `pg:",notnull"`
	LmsUserId   string `pg:",notnull"`
	LtiUserId   string `pg:",notnull"`
	LtiProvider string `pg:",notnull"`

	Timestamps
}
