package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	"regexp"
	"strconv"
)

func writeAndPanic(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusBadRequest)
	panic(err)
}

func (c *ControllerContext) NewEventsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		eventName := vars["name"]
		eventIdString := vars["id"]
		var eventId int64

		invalidRequestErr := fmt.Errorf("Invalid request method: %q", r.Method)
		invalidEventTypeErr := fmt.Errorf("Invalid event type: %q", eventName)
		invalidEventIdErr := fmt.Errorf("Invalid event id: %d", eventId)

		switch r.Method {
		case "GET":
			if eventName == "" {
				writeAndPanic(w, invalidRequestErr)
			}

			if eventIdString != "" {
				n, err := strconv.ParseInt(eventIdString, 10, 64)
				if err != nil {
					panic(err)
				}
				eventId = n
			}

			var dataJson []byte

			switch eventName {
			case "discussion_entry_created":
				if eventIdString == "" {
					events, err := c.Repo.DiscussionEntryCreatedEvent.All()
					if err != nil {
						panic(err)
					}
					dataJson, _ = json.MarshalIndent(events, "", "  ")
				} else {
					event, err := c.Repo.DiscussionEntryCreatedEvent.Find(eventId)
					if err != nil {
						writeAndPanic(w, invalidEventIdErr)
					}
					dataJson, _ = json.MarshalIndent(event, "", "  ")
				}

			default:
				writeAndPanic(w, invalidEventTypeErr)
			}

			fmt.Fprintln(w, string(dataJson))

		case "POST":
			body, err := ioutil.ReadAll(r.Body)
			if err != nil {
				panic(err)
			}
			eventName := string(regexp.MustCompile(`"event_name": ?"([^"]*)"`).FindSubmatch(body)[1])

			switch eventName {
			case "discussion_entry_created":
				_, err = c.Repo.DiscussionEntryCreatedEvent.CreateFromPayload(body)
			default:
				writeAndPanic(w, invalidEventTypeErr)
			}

			if err != nil {
				panic(err)
			}

		default:
			writeAndPanic(w, invalidRequestErr)
		}
	}
}
