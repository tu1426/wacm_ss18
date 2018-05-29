#!/usr/bin/env bash

yarn run dev-test-server &
sleep 30
yarn run backend-test

if [ $? -eq 0 ]
then
    exit 0
else
    exit 1
fi