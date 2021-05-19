package model

import "time"

type DiscussionEntryCreatedBody struct {
	ID                            int64
	DiscussionEntryCreatedEventID int64 `pg:"on_delete:CASCADE"`

	CanvasCreatedAt         time.Time `pg:",notnull" json:"created_at"`
	DiscussionEntryId       string    `pg:",notnull" json:"discussion_entry_id"`
	DiscussionTopicId       string    `pg:",notnull" json:"discussion_topic_id"`
	ParentDiscussionEntryId string    `pg:",notnull" json:"parent_discussion_entry_id"`
	Text                    string    `pg:",notnull" json:"text"`
	UserId                  string    `pg:",notnull" json:"user_id"`

	Timestamps
}
