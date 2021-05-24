package repo

import (
	"encoding/json"
	"github.com/atomicjolt/atomic_insight/model"
	"github.com/go-pg/pg/v10"
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

func (r *DiscussionEntryCreatedEventRepo) CreateFrom(payload []byte) error {
	return NewTransaction(r.DB.(*pg.DB), func(txRepo *Repo) error {
		var event *model.DiscussionEntryCreatedEvent
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return err
		}

		err = txRepo.DiscussionEntryCreatedEvent.Insert(event.Metadata)
		if err != nil {
			return err
		}

		err = txRepo.DiscussionEntryCreatedEvent.Insert(event.Body)
		if err != nil {
			return err
		}

		err = txRepo.DiscussionEntryCreatedEvent.Insert(event)
		if err != nil {
			return err
		}

		return nil
	})
}
