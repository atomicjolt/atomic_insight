#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 /path/to/canvas/" >&2
  exit 1
fi

if [ ! -f .env ]; then
    echo ".env file not found!"
    exit 1
fi

set -a
source .env
set +a

ln -s "$ATOMIC_INSIGHT_PATH/post_events.rb" "$1/config/initializers/post_events.rb"
