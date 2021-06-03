package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	"github.com/atomicjolt/atomic_insight/graph/generated"
	"github.com/atomicjolt/atomic_insight/graph/model"
	"github.com/atomicjolt/atomic_insight/lib"
)

func (r *queryResolver) DiscussionEntryCreatedEvents(ctx context.Context) (*model.DiscussionEntryCreated, error) {
	result := model.DiscussionEntryCreated{}
	fields := graphql.CollectAllFields(ctx)

	if lib.StringContains(fields, "count") {
		count, err := r.Repo.DiscussionEntryCreatedEvent.CountAllSince(lib.LastSunday())
		if err != nil {
			return nil, err
		}
		result.Count = count
	}

	if lib.StringContains(fields, "events") {
		events, err := r.Repo.DiscussionEntryCreatedEvent.AllSince(lib.LastSunday())
		if err != nil {
			return nil, err
		}
		result.Events = events
	}

	return &result, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
