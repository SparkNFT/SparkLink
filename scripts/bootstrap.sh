#!/bin/bash

set -e
BASEDIR=$(dirname "$0")/..
cd $BASEDIR
cd ./packages/business
yarn build:production
echo "Bootstaped."