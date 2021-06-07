package model

import (
	"fmt"
)

type Event interface {
	GetMetadata() interface{}
	GetBody() interface{}
	SetChildFks()
}

func EventInstanceFromName(name string) (Event, error) {
	switch name {
	case "discussion_entry_created":
		return new(DiscussionEntryCreatedEvent), nil
	default:
		return nil, fmt.Errorf("invalid event type %s", name)
	}
}
