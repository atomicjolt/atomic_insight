package main

import (
	"log"
	"os"

	migrations "github.com/robinjoseph08/go-pg-migrations/v3"
	"gitlab.com/atomicjolt/canvas_analytics/model"
)

const directory = "migrations"

func main() {
	db := model.GetConnection()

	err := migrations.Run(db, directory, os.Args)
	if err != nil {
		log.Fatalln(err)
	}
}
