package config

import (
	"flag"
	"os"
)

func determineEnv() string {
	if flag.Lookup("test.v") != nil {
		return "test"
	}

	env := os.Getenv("ATOMIC_INSIGHT_ENV")

	if env == "" {
		return "development"
	}

	return env
}
