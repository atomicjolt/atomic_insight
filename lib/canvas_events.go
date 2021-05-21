package lib

import (
	"encoding/json"
	"errors"
)

func EventNameOf(payload []byte) (string, error) {
	var event map[string]map[string]string
	err := json.Unmarshal(payload, &event)
	if err != nil {
		return "", err
	}

	eventName, ok := event["metadata"]["event_name"]
	if !ok {
		err := errors.New("Invalid event payload, missing event name")
		return "", err
	}
	return eventName, nil
}
