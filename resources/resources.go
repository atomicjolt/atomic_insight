package resources

import (
	"github.com/atomicjolt/atomic_insight/repo"
)

type Resources struct {
	Repo *repo.Repo
}

func NewResources() Resources {
	return Resources{
		Repo: repo.NewRepo(),
	}
}
