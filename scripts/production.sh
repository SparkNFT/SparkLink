#!/bin/bash
set -e
BASEDIR=$(dirname "$0")/..
cd $BASEDIR
cd ./packages/business
yarn build:production
cd ../site
yarn build:production
./scripts/github-pages/production.sh $1