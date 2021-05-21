package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/controllers"
	"github.com/atomicjolt/atomic_insight/repo"
	"github.com/gorilla/handlers"
)

func main() {
	localConfig := config.GetServerConfig()
	port := localConfig.ServerPort

	db := repo.GetConnection()
	insightRepo := repo.NewRepo(db)

	router := controllers.NewRouter(insightRepo)

	middleware := handlers.LoggingHandler(os.Stdout, router)
	middleware = handlers.RecoveryHandler()(middleware)

	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, middleware))
}
