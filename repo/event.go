package repo

import (
	"github.com/atomicjolt/atomic_insight/model"
	"github.com/go-pg/pg/v10"
)

type EventRepo struct {
	*BaseRepo
}

func (r *EventRepo) InsertEvent(event model.Event) error {
	return NewTransaction(r.DB.(*pg.DB), func(txRepo *Repo) error {
		err := txRepo.Event.Insert(event)
		if err != nil {
			return err
		}

		event.SetChildFks()

		err = txRepo.Event.Insert(event.GetMetadata())
		if err != nil {
			return err
		}

		err = txRepo.Event.Insert(event.GetBody())
		if err != nil {
			return err
		}

		return nil
	})
}
