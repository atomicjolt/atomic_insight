package repo

import "github.com/atomicjolt/atomic_insight/model"

type UserRepo struct {
	*BaseRepo
}

func (r *UserRepo) All() ([]model.User, error) {
	var users []model.User
	err := r.DB.Model(&users).Select()

	return users, err
}

func (r *UserRepo) Find(id int64) (*model.User, error) {
	user := &model.User{ID: id}
	err := r.DB.Model(user).WherePK().Select()

	return user, err
}
