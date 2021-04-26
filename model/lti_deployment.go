package model

type LtiDeployment struct {
	ID           int64
	DeploymentID string `pg:",notnull"`

	LtiInstallID          int64
	ApplicationInstanceID int64

	Timestamps
}
