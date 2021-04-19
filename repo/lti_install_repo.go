package repo

import "github.com/atomicjolt/atomic_insight/model"

type LtiInstallRepo struct {
	*BaseRepo
}

func (r *LtiInstallRepo) All() ([]model.LtiInstall, error) {
	var ltiInstalls []model.LtiInstall
	err := r.DB.Model(&ltiInstalls).Select()

	return ltiInstalls, err
}

func (r *LtiInstallRepo) Find(id int64) (*model.LtiInstall, error) {
	client := &model.LtiInstall{ID: id}
	err := r.DB.Model(client).WherePK().Select()

	return client, err
}
