package lib

import (
	"encoding/json"
	"errors"
)

// Returns event name of payload
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

// Returns array of event payloads from events string (json)
func EventPayloadsFrom(eventsString []byte) ([][]byte, error) {
	var eventMaps []map[string]map[string]string
	err := json.Unmarshal(eventsString, &eventMaps)
	if err != nil {
		return nil, err
	}

	var eventPayloads [][]byte
	for _, eventMap := range eventMaps {
		payload, err := json.Marshal(eventMap)
		if err != nil {
			return nil, err
		}
		eventPayloads = append(eventPayloads, payload)
	}

	return eventPayloads, nil
}
