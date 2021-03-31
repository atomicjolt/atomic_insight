package config

import (
	"encoding/json"
	"flag"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"sync"
)

// Config is the struct that the config json will be parsed into
type Config struct {
	ServerPort string `json:"server_port"`
	DbUser     string `json:"db_user"`
	DbHost     string `json:"db_host"`
	Database   string `json:"database"`
}

var once sync.Once
var cachedConfig *Config

// GetConfig returns the config options for the current environment
func GetConfig() *Config {
	once.Do(func() {
		var configs map[string]Config
		err := json.Unmarshal(loadJSON(), &configs)
		if err != nil {
			log.Fatal("Config file is not valid json: " + err.Error())
		}

		env := determineEnv()
		selectedConfig, isPresent := configs[env]
		if !isPresent {
			log.Fatal("Config not found for env: " + env)
		}
		cachedConfig = &selectedConfig
	})

	return cachedConfig
}

// depending on how deployment works, this may load the config based on a cli
// argument or something else
func loadJSON() []byte {
	projectRoot := os.Getenv("FLP_PATH")
	if projectRoot == "" {
		log.Fatal("FLP_PATH env var not set")
	}

	configFile, err := os.Open(filepath.Join(projectRoot, "config.json"))
	defer configFile.Close()

	if err != nil {
		log.Fatal("Error reading config file:" + err.Error())
	}

	configString, _ := ioutil.ReadAll(configFile)
	return configString
}

func determineEnv() string {
	if flag.Lookup("test.v") != nil {
		return "test"
	}

	env := os.Getenv("FLP_ENV")

	if env == "" {
		return "development"
	}

	return env
}
