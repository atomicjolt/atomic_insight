package main

import (
	rice "github.com/GeertJohan/go.rice"
	"net/http"
)

func main() {
	appBox, err := rice.FindBox("./client/build")

	if err != nil {
		panic("Could not find build folder")
	}

	http.Handle("/", http.FileServer(appBox.HTTPBox()))
	http.ListenAndServe(":3000", nil)
}
