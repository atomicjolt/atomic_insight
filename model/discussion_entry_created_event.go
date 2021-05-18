package model

import "time"

type DiscussionEntryCreatedEvent struct {
	ID       int64
	Metadata *EventMetadata `pg:"type:jsonb,notnull"`
	Body     struct {
		CreatedAt               time.Time `pg:",notnull"`
		DiscussionEntryId       string    `pg:",notnull"`
		DiscussionTopicId       string    `pg:",notnull"`
		ParentDiscussionEntryId string    `pg:",notnull"`
		Text                    string    `pg:",notnull"`
		UserId                  string    `pg:",notnull"`
	} `pg:"type:jsonb,notnull"`

	Timestamps
}
