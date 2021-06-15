package controllers

import (
	"encoding/json"
	"github.com/atomicjolt/atomic_insight/middleware"
	"github.com/atomicjolt/atomic_insight/model"
	"github.com/mitchellh/mapstructure"
	"net/http"
)

type eventsPayload struct {
	Events []struct {
		Name    string
		Payload string
	}
}

func NewEventsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		controllerResources := middleware.GetResources(r.Context())
		var payload eventsPayload

		err := mapstructure.Decode(middleware.GetEventsPayload(r.Context()), &payload)
		if err != nil {
			panic(err)
		}

		for _, event := range payload.Events {
			eventModel, err := model.EventInstanceFromName(event.Name)
			if err != nil {
				panic(err)
			}

			if err = json.Unmarshal([]byte(event.Payload), eventModel); err != nil {
				panic(err)
			}

			if err = controllerResources.Repo.Event.InsertEvent(eventModel); err != nil {
				panic(err)
			}
		}
	}
}
