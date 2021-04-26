package model

type ApplicationInstance struct {
	ID                    int64
	ClientApplicationName string             `pg:",notnull"`
	Config                *ApplicationConfig `pg:"type:jsonb,notnull"`
	Description           string             `pg:",notnull"`
	Key                   string             `pg:",notnull"`
	LtiDeployments        []*LtiDeployment   `pg:"rel:has-many"`
	LtiLaunches           []*LtiLaunch       `pg:"rel:has-many"`
	Users                 []*User            `pg:"rel:has-many"`

	Timestamps
}
