package repo

import (
	"github.com/atomicjolt/atomic_insight/model"
	"github.com/lestrrat-go/jwx/jwk"
)

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

func (r *JwkRepo) PublicJwkSet() (jwk.Set, error) {
	jwks, err := r.All()

	if err != nil {
		return nil, err
	}

	set := jwk.NewSet()

	for _, j := range jwks {
		key, err := jwk.ParseKey([]byte(j.Pem), jwk.WithPEM(true))

		if err != nil {
			return nil, err
		}

		key.Set("kid", j.Kid)
		key.Set("use", "sig")

		set.Add(key)
	}

	return jwk.PublicSetOf(set)
}
