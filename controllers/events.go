package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/atomicjolt/atomic_insight/middleware"
	"github.com/atomicjolt/atomic_insight/model"
	"net/http"
)

func (c *ControllerContext) NewEventsHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jwtData := middleware.GetJwtClaims(r)
		events := jwtData["events"].([]interface{})

		for _, event := range events {
			eventMap := event.(map[string]interface{})

			eventName, ok := eventMap["name"]
			if !ok {
				panic(fmt.Errorf("missing event name in payload"))
			}

			eventModel, err := model.EventInstanceFromName(eventName.(string))
			if err != nil {
				panic(err)
			}

			payload, ok := eventMap["payload"]
			if !ok {
				panic(fmt.Errorf("missing event data in payload"))
			}

			if err = json.Unmarshal([]byte(payload.(string)), eventModel); err != nil {
				panic(err)
			}

			if err = c.Repo.InsertEvent(eventModel); err != nil {
				panic(err)
			}
		}
	}
}
