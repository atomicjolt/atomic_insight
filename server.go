package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/controllers"
	"github.com/gorilla/handlers"
)

func main() {
	localConfig := config.GetServerConfig()
	port := localConfig.ServerPort

	router := controllers.NewRouter()

	middleware := handlers.LoggingHandler(os.Stdout, router)
	middleware = handlers.RecoveryHandler()(middleware)

	fmt.Printf("Running in %s mode...\n", config.DetermineEnv())
	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, middleware))
}
