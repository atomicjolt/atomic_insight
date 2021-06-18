package main

import (
	"fmt"
	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/controllers"
	"github.com/atomicjolt/atomic_insight/resources"
	"log"
	"net/http"
)

func main() {
	localConfig := config.GetServerConfig()
	port := localConfig.ServerPort
	controllerResources, cancelResourcesContext := resources.NewResources()

	defer cancelResourcesContext()

	fmt.Printf("Running in %s mode...\n", config.DetermineEnv())
	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, controllers.NewRouter(controllerResources)))
}
