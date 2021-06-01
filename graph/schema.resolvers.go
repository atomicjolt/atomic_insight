package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"github.com/atomicjolt/atomic_insight/graph/generated"
	"github.com/atomicjolt/atomic_insight/lib"
	model1 "github.com/atomicjolt/atomic_insight/model"
)

func (r *queryResolver) DiscussionEntryCreatedEvents(_ context.Context) ([]model1.DiscussionEntryCreatedEvent, error) {
	return r.Repo.DiscussionEntryCreatedEvent.AllSince(lib.LastSunday())
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
