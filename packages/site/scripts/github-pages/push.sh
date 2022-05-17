#!/usr/bin/env bash

set -e

BASEDIR=$(dirname "$0")
SITE_BASEDIR=$BASEDIR/../..
rm -rf $BASEDIR/dist
cp -r $SITE_BASEDIR/dist $BASEDIR
cd $BASEDIR/dist
echo $2 > CNAME
git init
git config user.email "no-reply@sparklink.io"
git config user.name "deploy-robot"
git checkout -b main
git add -A
git commit -m "deploy"
GIT_CONNECTION_STRING="git push -f git@$3:$1 main"
echo 
echo ---Git push Url---
echo
echo $GIT_CONNECTION_STRING
echo
echo --------------------
echo  
$GIT_CONNECTION_STRING