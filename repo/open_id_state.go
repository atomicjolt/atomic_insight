package repo

import (
	"github.com/atomicjolt/atomic_insight/lib"
	"github.com/atomicjolt/atomic_insight/model"
)

type OpenIdStateRepo struct {
	*BaseRepo
}

func (r *OpenIdStateRepo) All() ([]model.OpenIdState, error) {
	var jwks []model.OpenIdState
	err := r.DB.Model(&jwks).Select()

	return jwks, err
}

func (r *OpenIdStateRepo) Find(id int64) (*model.OpenIdState, error) {
	jwk := &model.OpenIdState{ID: id}
	err := r.DB.Model(jwk).WherePK().Select()

	return jwk, err
}

func (r *OpenIdStateRepo) NewState() (*model.OpenIdState, error) {
	nonce, err := lib.RandomHex(64)

	if err != nil {
		return nil, err
	}

	openIdState := &model.OpenIdState{
		Nonce: nonce,
	}

	err = r.Insert(openIdState)

	if err != nil {
		return nil, err
	}

	return openIdState, nil
}
