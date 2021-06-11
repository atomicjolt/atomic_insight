package controllers

import (
	"fmt"
	"github.com/atomicjolt/atomic_insight/middleware"
	"net/http"
)

func NewEventsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		controllerResources := middleware.GetResources(r.Context())

		switch r.Method {
		case "POST":
			jwtData := middleware.GetEventsPayload(r)
			events := jwtData["events"].([]interface{})

			for _, event := range events {
				eventMap, ok := event.(map[string]interface{})
				if !ok {
					panic(fmt.Errorf("unexpected payload shape: %v", eventMap))
				}

				eventName, ok := eventMap["name"]
				if !ok {
					panic(fmt.Errorf("missing event name in payload"))
				}

				switch eventName {
				case "discussion_entry_created":
					payload, ok := eventMap["payload"]
					if !ok {
						panic(fmt.Errorf("missing event data in payload"))
					}

					payloadStr := payload.(string)
					err := controllerResources.Repo.
						DiscussionEntryCreatedEvent.
						CreateFrom([]byte(payloadStr))
					if err != nil {
						panic(err)
					}
				default:
					panic(fmt.Errorf("Invalid event type: %q", eventName))
				}
			}
		default:
			panic(fmt.Errorf("Invalid request method: %q", r.Method))
		}
	}
}
