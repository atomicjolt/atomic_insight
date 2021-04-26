package model

type LtiInstall struct {
	ID             int64
	LtiDeployments []*LtiDeployment `pg:"rel:has-many"`

	ApplicationID int64

	Timestamps
}
