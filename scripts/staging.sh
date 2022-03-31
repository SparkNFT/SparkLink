#!/bin/bash
set -e
BASEDIR=$(dirname "$0")/..
cd $BASEDIR
cd ./packages/business
yarn build:production
cd ../site
yarn build:staging
./scripts/github-pages/staging.sh $1