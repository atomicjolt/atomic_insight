package model

import (
	"github.com/go-pg/pg/v10"
	"gitlab.com/atomicjolt/flp/config"
)

// GetConnection returns a database connection object
func GetConnection() *pg.DB {
	config := config.GetConfig()
	return pg.Connect(&pg.Options{
		Database: config.Database,
		User:     config.DbUser,
		Addr:     config.DbHost,
	})
}
