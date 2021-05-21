package repo

import (
	"context"
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

func (r *DiscussionEntryCreatedEventRepo) CreateFromPayload(payload []byte) error {
	var event *model.DiscussionEntryCreatedEvent
	err := json.Unmarshal(payload, &event)
	if err != nil {
		return err
	}

	db := GetConnection()
	ctx := context.Background()

	err = db.RunInTransaction(ctx, func(tx *pg.Tx) error {
		_, err = tx.Model(event.Metadata).Insert()
		if err != nil {
			return err
		}

		_, err = tx.Model(event.Body).Insert()
		if err != nil {
			return err
		}

		_, err = tx.Model(event).Insert()
		if err != nil {
			return err
		}

		return nil
	})

	return err
}
