package controllers

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/atomicjolt/atomic_insight/graph"
	"github.com/atomicjolt/atomic_insight/graph/generated"
	"net/http"
)

func (c *ControllerContext) NewGraphqlHandler() http.Handler {
	return handler.NewDefaultServer(
		generated.NewExecutableSchema(generated.Config{
			Resolvers: &graph.Resolver{Repo: c.Repo},
		}),
	)
}
