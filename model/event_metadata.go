package model

import "time"

type EventMetadata struct {
	RootAccountUuid    string
	RootAccountId      string
	RootAccountLtiGuid string
	UserLogin          string
	UserAccountId      string
	UserSisId          string
	UserId             string
	TimeZone           string
	ContextType        string
	ContextId          string
	ContextSisSourceId string
	ContextAccountId   string
	ContextRole        string
	RequestId          string
	SessionId          string
	Hostname           string
	HttpMethod         string
	UserAgent          string
	ClientIp           string
	Url                string
	Referrer           string
	Producer           string
	EventName          string
	EventTime          time.Time
}
