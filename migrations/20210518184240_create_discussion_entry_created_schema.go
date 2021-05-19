package main

import (
	"time"

	"github.com/go-pg/pg/v10/orm"
	migrations "github.com/robinjoseph08/go-pg-migrations/v3"
)

type DiscussionEntryCreatedMetadata struct {
	ID                            int64
	DiscussionEntryCreatedEventID int64 `pg:"on_delete:CASCADE"`

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

type DiscussionEntryCreatedBody struct {
	ID                            int64
	DiscussionEntryCreatedEventID int64 `pg:"on_delete:CASCADE"`

	CanvasCreatedAt         time.Time `pg:",notnull" json:"created_at"`
	DiscussionEntryId       string    `pg:",notnull" json:"discussion_entry_id"`
	DiscussionTopicId       string    `pg:",notnull" json:"discussion_topic_id"`
	ParentDiscussionEntryId string    `pg:",notnull" json:"parent_discussion_entry_id"`
	Text                    string    `pg:",notnull" json:"text"`
	UserId                  string    `pg:",notnull" json:"user_id"`

	Timestamps
}

type DiscussionEntryCreatedEvent struct {
	ID int64

	Metadata *DiscussionEntryCreatedMetadata `pg:"rel:has-one" json:"metadata"`
	Body     *DiscussionEntryCreatedBody     `pg:"rel:has-one" json:"body"`

	Timestamps
}

func init() {
	modelsUp := []interface{}{
		(*DiscussionEntryCreatedMetadata)(nil),
		(*DiscussionEntryCreatedBody)(nil),
		(*DiscussionEntryCreatedEvent)(nil),
	}

	modelsDown := []interface{}{
		(*DiscussionEntryCreatedEvent)(nil),
		(*DiscussionEntryCreatedBody)(nil),
		(*DiscussionEntryCreatedMetadata)(nil),
	}

	up := func(db orm.DB) error {
		for _, model := range modelsUp {
			err := db.Model(model).CreateTable(&orm.CreateTableOptions{FKConstraints: true})
			if err != nil {
				return err
			}
		}
		return nil
	}

	down := func(db orm.DB) error {
		for _, model := range modelsDown {
			err := db.Model(model).DropTable(&orm.DropTableOptions{})
			if err != nil {
				return err
			}
		}

		return nil
	}

	opts := migrations.MigrationOptions{}

	migrations.Register("20210518184240_create_discussion_entry_created_schema", up, down, opts)
}
