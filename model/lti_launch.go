package model

type LtiLaunch struct {
	ID                       int64
	DeploymentID             string             `pg:",notnull"`
	Config                   *ApplicationConfig `pg:"type:jsonb,notnull"`
	ContextID                string             `pg:",notnull"`
	ResourceLinkID           string             `pg:",notnull"`
	Token                    string             `pg:",notnull"`
	ToolConsumerInstanceGuid string             `pg:",notnull"`

	ApplicationInstanceID int64

	Timestamps
}
