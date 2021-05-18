package model

type DiscussionEntryCreatedEvent struct {
	ID int64

	Metadata *DiscussionEntryCreatedMetadata `pg:"rel:has-one" json:"metadata"`
	Body     *DiscussionEntryCreatedBody     `pg:"rel:has-one" json:"body"`

	Timestamps
}
