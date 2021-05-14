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

func (r *LtiInstallRepo) From(iss, clientId string) (*model.LtiInstall, error) {
	ltiInstall := new(model.LtiInstall)

	err := r.DB.Model(ltiInstall).
		Where("lti_install.iss = ?", iss).
		Where("lti_install.client_id = ?", clientId).
		Select()

	if err != nil {
		return nil, err
	}

	return ltiInstall, nil
}
