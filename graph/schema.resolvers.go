package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/atomicjolt/atomic_insight/graph/generated"
	"github.com/atomicjolt/atomic_insight/graph/model"
)

func (r *queryResolver) DiscussionEntryCreatedEvents(ctx context.Context) ([]*model.DiscussionEntryCreatedEvent, error) {
	return []*model.DiscussionEntryCreatedEvent{}, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
