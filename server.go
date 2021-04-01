package main

import (
	rice "github.com/GeertJohan/go.rice"
	"github.com/atomicjolt/atomic_insight/config"
	"net/http"
)

func main() {
	appBox, err := rice.FindBox("./client/build")

	if err != nil {
		panic("Could not find build folder")
	}

	http.Handle("/", http.FileServer(appBox.HTTPBox()))

	port := config.GetConfig().ServerPort
	http.ListenAndServe(":"+port, nil)
}
