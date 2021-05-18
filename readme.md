# Atomic Insight

Atomic Insight is a tool that ingests events from Canvas and provides a custom dashboard experience via a LTI tool. Data is produced via a plugin for Canvas, then ingested using Go. The LTI is backed by Go as well, with a React front-end that interacts with the back-end API via GraphQL.

## Setup
* Clone this repo down
* Create the development and test database with `createdb atomic_insight_dev` and `createdb atomic_insight_test`
* Copy `server_config.example.json` to `server_config.json` and update values inside appropriately
* Run the `nginx` setup script in `./bin/setup` (you will need `nginx` configured with SSL certificates for `atomicjolt.xyz`)
* Run any migrations with `./bin/migrate migrate`
* Install client dependencies first with `cd client` to be in the right directory, then `yarn` to install dependencies
* Create a client build with `yarn build` in the client directory
* Run the server with `go run server.go` in the project root
* View the project at https://atomicinsight.atomicjolt.xyz

## Graphql
* The graphql playground can be found at https://atomicinsight.atomicjolt.xyz/graphql/playground
* This project uses [gqlgen](https://github.com/99designs/gqlgen) to generate the server code from the schema
    * After changing the schema, run `go generate ./...` to update the generated code.