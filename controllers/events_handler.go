package controllers

import (
	"fmt"
	"github.com/atomicjolt/atomic_insight/lib"
	"io/ioutil"
	"net/http"
)

func (c *ControllerContext) NewEventsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "POST":
			payload, err := ioutil.ReadAll(r.Body)
			if err != nil {
				panic(err)
			}
			eventName, err := lib.EventNameOf(payload)
			if err != nil {
				panic(err)
			}

			switch eventName {
			case "discussion_entry_created":
				err = c.Repo.DiscussionEntryCreatedEvent.CreateFromPayload(payload)
			default:
				panic(fmt.Errorf("Invalid event type: %q", eventName))
			}

			if err != nil {
				panic(err)
			}

		default:
			panic(fmt.Errorf("Invalid request method: %q", r.Method))
		}
	}
}
