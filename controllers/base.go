package controllers

import (
	"github.com/antonlindstrom/pgstore"
	"github.com/atomicjolt/atomic_insight/repo"
)

type ControllerContext struct {
	Repo  *repo.Repo
	Store *pgstore.PGStore
}
