package main

/**
 * This file should be idempotent, meaning all seeds that
 * you run add to this should be resilient to being run
 * multiple times (and should be no-op after the first run).
 */

import (
	"log"

	"github.com/atomicjolt/atomic_insight/config"
	"github.com/atomicjolt/atomic_insight/model"
	"github.com/atomicjolt/atomic_insight/repo"
)

func main() {
	insightRepo := repo.NewRepo()
	ltiAdvantageConfig := config.GetLtiAdvantageConfig()
	serverConfig := config.GetServerConfig()

	application := &model.Application{
		Name:                  "Atomic Insight",
		ClientApplicationName: "atomic_insight",
		DefaultConfig:         &config.ApplicationConfig{},
		Description:           "Dynamic analytics for your course",
		Key:                   "atomicinsight",
		LtiAdvantageConfig:    &ltiAdvantageConfig,
	}

	ltiInstall := &model.LtiInstall{
		ClientID: serverConfig.ClientId,
		Iss:      "https://canvas.instructure.com",
		JwksUrl:  "https://canvas.instructure.com/api/lti/security/jwks",
		OidcUrl:  "https://canvas.instructure.com/api/lti/authorize_redirect",
		TokenUrl: "https://canvas.instructure.com/login/oauth2/token",
	}

	applicationInstance := &model.ApplicationInstance{
		ClientApplicationName: "atomic_insight",
		Config:                &config.ApplicationConfig{},
		Description:           "Dynamic analytics for your course",
		Key:                   "atomicinsight",
	}

	ltiDeployment := &model.LtiDeployment{
		DeploymentID: "TODO",
	}

	jwk := model.NewJwk()

	err := insightRepo.Application.Insert(application)

	if err != nil {
		log.Fatal(err)
	}

	applicationInstance.ApplicationID = application.ID
	err = insightRepo.ApplicationInstance.Insert(applicationInstance)

	if err != nil {
		panic(err)
	}

	ltiInstall.ApplicationID = application.ID
	err = insightRepo.LtiInstall.Insert(ltiInstall)

	if err != nil {
		panic(err)
	}

	jwk.ApplicationID = application.ID
	err = insightRepo.Jwk.Insert(jwk)

	if err != nil {
		panic(err)
	}

	ltiDeployment.ApplicationInstanceID = applicationInstance.ID
	ltiDeployment.LtiInstallID = ltiInstall.ID
	err = insightRepo.LtiDeployment.Insert(ltiDeployment)

	if err != nil {
		panic(err)
	}
}
