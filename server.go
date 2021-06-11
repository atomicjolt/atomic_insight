package main

import (
	"fmt"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/controllers"
	"log"
	"net/http"
)

func main() {
	localConfig := config.GetServerConfig()
	port := localConfig.ServerPort

	fmt.Printf("Running in %s mode...\n", config.DetermineEnv())
	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, controllers.NewRouter()))
}
