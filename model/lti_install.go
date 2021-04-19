package model

type LtiInstall struct {
	ID             int64
	LtiDeployments []*LtiDeployment `pg:"rel:has-many"`

	Timestamps
}
