package main

import (
	"time"

	"github.com/go-pg/pg/v10/orm"
	migrations "github.com/robinjoseph08/go-pg-migrations/v3"
)

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

type DiscussionEntryCreatedEvent struct {
	ID       int64
	Metadata *EventMetadata `pg:"type:jsonb,notnull"`
	Body     struct {
		CreatedAt               time.Time `pg:",notnull"`
		DiscussionEntryId       string    `pg:",notnull"`
		DiscussionTopicId       string    `pg:",notnull"`
		ParentDiscussionEntryId string    `pg:",notnull"`
		Text                    string    `pg:",notnull"`
		UserId                  string    `pg:",notnull"`
	} `pg:"type:jsonb,notnull"`

	Timestamps
}

func init() {
	models := []interface{}{
		(*DiscussionEntryCreatedEvent)(nil),
	}

	up := func(db orm.DB) error {
		for _, model := range models {
			err := db.Model(model).CreateTable(&orm.CreateTableOptions{})
			if err != nil {
				return err
			}
		}
		return nil
	}

	down := func(db orm.DB) error {
		for _, model := range models {
			err := db.Model(model).DropTable(&orm.DropTableOptions{})
			if err != nil {
				return err
			}
		}

		return nil
	}

	opts := migrations.MigrationOptions{}

	migrations.Register("20210518184240_create_discussion_entry_created_event", up, down, opts)
}
