package model

type LtiDeployment struct {
	ID           int64
	DeploymentID string `pg:",notnull"`

	Timestamps
}
