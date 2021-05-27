#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

cp post_events.rb "$1/config/initializers/"
