package repo

import "github.com/atomicjolt/atomic_insight/model"

type JwkRepo struct {
	*BaseRepo
}

func (r *JwkRepo) All() ([]model.Jwk, error) {
	var jwks []model.Jwk
	err := r.DB.Model(&jwks).Select()

	return jwks, err
}

func (r *JwkRepo) Find(id int64) (*model.Jwk, error) {
	jwk := &model.Jwk{ID: id}
	err := r.DB.Model(jwk).WherePK().Select()

	return jwk, err
}
