package model

type DiscussionEntryCreatedEvent struct {
	ID int64

	Metadata *DiscussionEntryCreatedMetadata `pg:"rel:has-one" json:"metadata"`
	Body     *DiscussionEntryCreatedBody     `pg:"rel:has-one" json:"body"`

	Timestamps
}

func (e DiscussionEntryCreatedEvent) GetMetadata() interface{} {
	return e.Metadata
}

func (e DiscussionEntryCreatedEvent) GetBody() interface{} {
	return e.Body
}

func (e DiscussionEntryCreatedEvent) SetChildFks() {
	e.Metadata.DiscussionEntryCreatedEventID = e.ID
	e.Body.DiscussionEntryCreatedEventID = e.ID
}
