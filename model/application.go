package model

type ApplicationConfig struct{}
type LtiAdvantageConfig struct{}

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
