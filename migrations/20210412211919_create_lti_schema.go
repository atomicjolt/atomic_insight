package main

import (
	"time"

	"github.com/go-pg/pg/v10/orm"
	migrations "github.com/robinjoseph08/go-pg-migrations/v3"
)

type ApplicationConfig struct{}
type LtiAdvantageConfig struct{}

type Timestamps struct {
	CreatedAt time.Time `pg:",notnull,default:now()"`
	UpdatedAt time.Time `pg:",notnull,default:now()"`
}

type LtiDeployment struct {
	ID           int64
	DeploymentID string `pg:",notnull"`

	Timestamps
}

type User struct {
	ID          int64
	Name        string `pg:",notnull"`
	Email       string `pg:",notnull"`
	LmsUserId   string `pg:",notnull"`
	LtiUserId   string `pg:",notnull"`
	LtiProvider string `pg:",notnull"`

	Timestamps
}

type ApplicationInstance struct {
	ID                    int64
	ClientApplicationName string             `pg:",notnull"`
	Config                *ApplicationConfig `pg:"type:jsonb,notnull"`
	Description           string             `pg:",notnull"`
	Key                   string             `pg:",notnull"`
	LtiDeployments        []*LtiDeployment   `pg:"rel:has-many"`
	Users                 []*User            `pg:"rel:has-many"`

	Timestamps
}

type Jwk struct {
	ID  int64
	kid string `pg:",notnull"`
	pem string `pg:",notnull"`

	Timestamps
}

type LtiInstall struct {
	ID             int64
	LtiDeployments []*LtiDeployment `pg:"rel:has-many"`

	Timestamps
}

type Application struct {
	ID                    int64
	Name                  string                 `pg:",notnull"`
	ClientApplicationName string                 `pg:",notnull"`
	DefaultConfig         *ApplicationConfig     `pg:"type:jsonb,notnull"`
	Description           string                 `pg:",notnull"`
	Key                   string                 `pg:",notnull"`
	LtiAdvantageConfig    *LtiAdvantageConfig    `pg:",notnull"`
	ApplicationInstances  []*ApplicationInstance `pg:"rel:has-many"`
	Jwks                  []*Jwk                 `pg:"rel:has-many"`
	LtiInstalls           []*LtiInstall          `pg:"rel:has-many"`

	Timestamps
}

var models []interface{} = []interface{}{
	(*LtiDeployment)(nil),
	(*User)(nil),
	(*ApplicationInstance)(nil),
	(*Jwk)(nil),
	(*LtiInstall)(nil),
	(*Application)(nil),
}

func init() {
	up := func(db orm.DB) error {
		for _, model := range models {
			err := db.Model(model).CreateTable(&orm.CreateTableOptions{FKConstraints: true})
			if err != nil {
				return err
			}
		}
		return nil
	}

	down := func(db orm.DB) error {
		for _, model := range models {
			err := db.Model(model).DropTable(&orm.DropTableOptions{})
			if err != nil {
				return err
			}
		}

		return nil
	}

	opts := migrations.MigrationOptions{}

	migrations.Register("20210412211919_create_lti_schema", up, down, opts)
}
