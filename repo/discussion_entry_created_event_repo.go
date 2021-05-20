package repo

import (
	"encoding/json"
	"github.com/atomicjolt/atomic_insight/model"
)

type DiscussionEntryCreatedEventRepo struct {
	*BaseRepo
}

func (r *DiscussionEntryCreatedEventRepo) All() ([]model.DiscussionEntryCreatedEvent, error) {
	var events []model.DiscussionEntryCreatedEvent
	err := r.DB.Model(&events).Relation("Metadata").Relation("Body").Select()

	return events, err
}

func (r *DiscussionEntryCreatedEventRepo) Find(id int64) (*model.DiscussionEntryCreatedEvent, error) {
	event := &model.DiscussionEntryCreatedEvent{ID: id}
	err := r.DB.Model(event).WherePK().Relation("Metadata").Relation("Body").Select()

	return event, err
}

func (r *DiscussionEntryCreatedEventRepo) CreateFromPayload(payload []byte) (*model.DiscussionEntryCreatedEvent, error) {
	var event *model.DiscussionEntryCreatedEvent
	err := json.Unmarshal(payload, &event)
	if err != nil {
		return nil, err
	}

	err = r.Insert(event.Metadata)
	if err != nil {
		return nil, err
	}

	err = r.Insert(event.Body)
	if err != nil {
		return nil, err
	}

	err = r.Insert(event)
	if err != nil {
		return nil, err
	}

	return event, err
}
