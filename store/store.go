package store

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/antonlindstrom/pgstore"
	"github.com/atomicjolt/atomic_insight/config"
)

func NewStore() *pgstore.PGStore {
	conf := config.GetServerConfig()

	// Setup session store
	store, err := pgstore.NewPGStore(
		fmt.Sprintf(
			"postgres://%s:%s@%s/%s?sslmode=%s",
			conf.DbUser,
			conf.DbPassword,
			conf.DbHost,
			conf.Database,
			conf.SessionSslMode,
		),
		conf.SessionSecret,
	)
	if err != nil {
		log.Fatal(err)
	}
	store.Options.HttpOnly = true
	store.Options.Secure = true
	store.Options.SameSite = http.SameSiteStrictMode

	// Run a background goroutine to clean up expired sessions from the database.
	defer store.StopCleanup(store.Cleanup(time.Minute * 5))

	return store
}
