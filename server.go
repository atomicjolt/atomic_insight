package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/controllers"
	"github.com/atomicjolt/atomic_insight/model"
	"github.com/atomicjolt/atomic_insight/repo"
	"github.com/gorilla/handlers"
)

func main() {
	localConfig := config.GetConfig()
	port := localConfig.ServerPort
	assetsPath := filepath.Join("client", localConfig.AssetsDir)

	db := model.GetConnection()
	insightRepo := repo.NewRepo(db)

	router := controllers.NewRouter(insightRepo, assetsPath)

	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handlers.LoggingHandler(os.Stdout, router)))
}
