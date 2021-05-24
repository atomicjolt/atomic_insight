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

type ServerConfig struct {
	ServerPort       string `json:"server_port"`
	DbUser           string `json:"db_user"`
	DbHost           string `json:"db_host"`
	Database         string `json:"database"`
	ClientId         string `json:"client_id"`
	AuthClientSecret string `json:"auth0_client_secret"`
	AuthClientId     string `json:"auth0_client_id"`
}

type ApplicationConfig struct{}

type LtiPlacement struct {
	Placement       string `json:"placement"`
	TargetLinkUri   string `json:"target_link_uri"`
	Text            string `json:"text"`
	Enabled         bool   `json:"enabled"`
	IconUrl         string `json:"icon_url"`
	MessageType     string `json:"message_type"`
	CanvasIconClass string `json:"canvas_icon_class"`
}

type LtiAdvantageExtensionSetting struct {
	Text            string         `json:"text"`
	IconUrl         string         `json:"icon_url"`
	SelectionWidth  int            `json:"selection_width"`
	SelectionHeight int            `json:"selection_height"`
	Placements      []LtiPlacement `json:"placements"`
}

type LtiAdvantageExtension struct {
	Platform     string                       `json:"platform"`
	Domain       string                       `json:"domain"`
	ToolId       string                       `json:"tool_id"`
	PrivacyLevel string                       `json:"privacy_level"`
	Settings     LtiAdvantageExtensionSetting `json:"settings"`
}

type LtiAdvantageConfig struct {
	Title             string                  `json:"title"`
	Scopes            []string                `json:"scopes"`
	Extensions        []LtiAdvantageExtension `json:"extensions"`
	TargetLinkUri     string                  `json:"target_link_uri"`
	OidcInitiationUrl string                  `json:"oidc_initiation_url"`
	PublicJwk         string                  `json:"public_jwk"`
	Description       string                  `json:"description"`
	CustomFields      []map[string]string
}

var once sync.Once
var cachedConfig *ServerConfig

// GetConfig returns the config options for the current environment
func GetServerConfig() *ServerConfig {
	once.Do(func() {
		var configs map[string]ServerConfig
		err := json.Unmarshal(loadJsonFrom("./server_config.json"), &configs)
		if err != nil {
			log.Fatal("Server config file is not valid json: " + err.Error())
		}

		env := determineEnv()
		selectedConfig, isPresent := configs[env]
		if !isPresent {
			log.Fatal("Server config not found for env: " + env)
		}
		cachedConfig = &selectedConfig
	})

	return cachedConfig
}

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

func GetLtiAdvantageConfig() LtiAdvantageConfig {
	var ltiAdvantageConfig LtiAdvantageConfig

	err := json.Unmarshal(loadJsonFrom("./lti_advantage_config.json"), &ltiAdvantageConfig)

	if err != nil {
		log.Fatal("Config file is not valid json: " + err.Error())
	}

	return ltiAdvantageConfig
}

func loadJsonFrom(location string) []byte {
	configFile, err := os.Open(filepath.Join(location))
	defer configFile.Close()

	if err != nil {
		log.Fatal("Error reading config file:" + err.Error())
	}

	configString, _ := ioutil.ReadAll(configFile)
	return configString
}
