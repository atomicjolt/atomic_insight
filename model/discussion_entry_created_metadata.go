package model

import "time"

type DiscussionEntryCreatedMetadata struct {
	ID      int64
	EventID int64 `pg:"on_delete:CASCADE"`

	EventName          string    `pg:",notnull" json:"event_name"`
	EventTime          time.Time `pg:",notnull" json:"event_time"`
	RootAccountUuid    string    `pg:",notnull" json:"root_account_uuid"`
	RootAccountId      string    `pg:",notnull" json:"root_account_id"`
	RootAccountLtiGuid string    `pg:",notnull" json:"root_account_lti_guid"`
	UserLogin          string    `pg:",notnull" json:"user_login"`
	UserAccountId      string    `pg:",notnull" json:"user_account_id"`
	UserSisId          string    `pg:",notnull" json:"user_sis_id"`
	UserId             string    `pg:",notnull" json:"user_id"`
	TimeZone           string    `pg:",notnull" json:"time_zone"`
	ContextType        string    `pg:",notnull" json:"context_type"`
	ContextId          string    `pg:",notnull" json:"context_id"`
	ContextSisSourceId string    `pg:",notnull" json:"context_sis_source_id"`
	ContextAccountId   string    `pg:",notnull" json:"context_account_id"`
	ContextRole        string    `pg:",notnull" json:"context_role"`
	RequestId          string    `pg:",notnull" json:"request_id"`
	SessionId          string    `pg:",notnull" json:"session_id"`
	Hostname           string    `pg:",notnull" json:"hostname"`
	HttpMethod         string    `pg:",notnull" json:"http_method"`
	UserAgent          string    `pg:",notnull" json:"user_agent"`
	ClientIp           string    `pg:",notnull" json:"client_ip"`
	Url                string    `pg:",notnull" json:"url"`
	Referrer           string    `pg:",notnull" json:"referrer"`
	Producer           string    `pg:",notnull" json:"producer"`

	Timestamps
}
