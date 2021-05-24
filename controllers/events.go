package controllers

import (
	"fmt"
	"github.com/atomicjolt/atomic_insight/lib"
	"github.com/atomicjolt/atomic_insight/middleware"
	"net/http"
)

func (c *ControllerContext) NewEventsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "POST":
			jwtData := r.Context().Value(middleware.DecodedJwtKey).(map[string]interface{})
			eventsString := jwtData["events"].(string)
			eventPayloads, err := lib.EventPayloadsFrom([]byte(eventsString))
			if err != nil {
				panic(err)
			}

			for _, payload := range eventPayloads {
				eventName, err := lib.EventNameOf(payload)
				if err != nil {
					panic(err)
				}

				switch eventName {
				case "discussion_entry_created":
					err = c.Repo.DiscussionEntryCreatedEvent.CreateFrom(payload)
				default:
					panic(fmt.Errorf("Invalid event type: %q", eventName))
				}

				if err != nil {
					panic(err)
				}
			}
		default:
			panic(fmt.Errorf("Invalid request method: %q", r.Method))
		}
	}
}
