package repo

import (
	"github.com/atomicjolt/atomic_insight/model"
	"github.com/go-pg/pg/v10/orm"
	"time"
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

func (r *DiscussionEntryCreatedEventRepo) allSinceQuery(model interface{}, time time.Time) *orm.Query {
	return r.DB.Model(model).Relation("Metadata", func(q *orm.Query) (*orm.Query, error) {
		return q.Where("canvas_created_at >= ?", time), nil
	}).Relation("Body")
}

func (r *DiscussionEntryCreatedEventRepo) AllSince(time time.Time, contextId string) ([]model.DiscussionEntryCreatedEvent, error) {
	var events []model.DiscussionEntryCreatedEvent
	err := r.
		allSinceQuery(&events, time).
		Where("context_id = ?", contextId).
		Select()

	//An empty query returns null instead of an empty array
	if err == nil && events == nil {
		return []model.DiscussionEntryCreatedEvent{}, nil
	}

	return events, err
}

func (r *DiscussionEntryCreatedEventRepo) CountAllSince(time time.Time, contextId string) (int, error) {
	return r.
		allSinceQuery((*model.DiscussionEntryCreatedEvent)(nil), time).
		Where("context_id = ?", contextId).
		Count()
}
