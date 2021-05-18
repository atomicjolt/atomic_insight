package repo

import (
	"github.com/atomicjolt/atomic_insight/model"
)

type DiscussionEntryCreatedEventRepo struct {
	*BaseRepo
}

func (r *DiscussionEntryCreatedEventRepo) All() ([]model.DiscussionEntryCreatedEvent, error) {
	var events []model.DiscussionEntryCreatedEvent
	err := r.DB.Model(&events).Select()

	return events, err
}

func (r *DiscussionEntryCreatedEventRepo) Find(id int64) (*model.DiscussionEntryCreatedEvent, error) {
	event := &model.DiscussionEntryCreatedEvent{ID: id}
	err := r.DB.Model(event).WherePK().Select()

	return event, err
}
