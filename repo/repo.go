package repo

import (
	"context"

	"github.com/go-pg/pg/v10"
)

// Repo is a wrapper for all the different repos.
type Repo struct {
	LtiDeployment       *LtiDeploymentRepo
	User                *UserRepo
	ApplicationInstance *ApplicationInstanceRepo
	Jwk                 *JwkRepo
	OpenIdState         *OpenIdStateRepo
	LtiInstall          *LtiInstallRepo
	LtiLaunch           *LtiLaunchRepo
	Application         *ApplicationRepo
}

// NewRepo is a convenience function for easily creating a Repo
// db is a database connection, or a transaction, which is useful for testing
func NewRepo(db *pg.DB) *Repo {
	return populateRepos(&BaseRepo{DB: db})
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
		LtiDeployment:       &LtiDeploymentRepo{BaseRepo: base},
		User:                &UserRepo{BaseRepo: base},
		ApplicationInstance: &ApplicationInstanceRepo{BaseRepo: base},
		Jwk:                 &JwkRepo{BaseRepo: base},
		LtiInstall:          &LtiInstallRepo{BaseRepo: base},
		Application:         &ApplicationRepo{BaseRepo: base},
	}
}
