package repo

import (
	"context"
	"github.com/atomicjolt/atomic_insight/model"

	"github.com/go-pg/pg/v10"
)

// Repo is a wrapper for all the different repos.
type Repo struct {
	LtiDeployment               *LtiDeploymentRepo
	User                        *UserRepo
	ApplicationInstance         *ApplicationInstanceRepo
	Jwk                         *JwkRepo
	OpenIdState                 *OpenIdStateRepo
	LtiInstall                  *LtiInstallRepo
	LtiLaunch                   *LtiLaunchRepo
	Application                 *ApplicationRepo
	DiscussionEntryCreatedEvent *DiscussionEntryCreatedEventRepo
}

// NewRepo is a convenience function for easily creating a Repo
func NewRepo() *Repo {
	return populateRepos(&BaseRepo{DB: GetConnection()})
}

// NewTransaction returns a Repo that will run any queries in a single
// transaction
func NewTransaction(db *pg.DB, fn func(*Repo) error) error {
	ctx := context.Background()
	err := db.RunInTransaction(ctx, func(tx *pg.Tx) error {
		repo := populateRepos(&BaseRepo{DB: tx})

		return fn(repo)
	})
	return err
}

func populateRepos(base *BaseRepo) *Repo {
	return &Repo{
		LtiDeployment:               &LtiDeploymentRepo{BaseRepo: base},
		User:                        &UserRepo{BaseRepo: base},
		ApplicationInstance:         &ApplicationInstanceRepo{BaseRepo: base},
		Jwk:                         &JwkRepo{BaseRepo: base},
		OpenIdState:                 &OpenIdStateRepo{BaseRepo: base},
		LtiInstall:                  &LtiInstallRepo{BaseRepo: base},
		LtiLaunch:                   &LtiLaunchRepo{BaseRepo: base},
		Application:                 &ApplicationRepo{BaseRepo: base},
		DiscussionEntryCreatedEvent: &DiscussionEntryCreatedEventRepo{BaseRepo: base},
	}
}

func (r *Repo) InsertEvent(event model.Event) error {
	return NewTransaction(r.ApplicationInstance.DB.(*pg.DB), func(txRepo *Repo) error {
		err := txRepo.DiscussionEntryCreatedEvent.Insert(event)
		if err != nil {
			return err
		}

		event.SetChildFks()

		err = txRepo.DiscussionEntryCreatedEvent.Insert(event.GetMetadata())
		if err != nil {
			return err
		}

		err = txRepo.DiscussionEntryCreatedEvent.Insert(event.GetBody())
		if err != nil {
			return err
		}

		return nil
	})
}
