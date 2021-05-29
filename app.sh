#!/usr/bin/env bash

function build()
{
    cp .env.dist .env
    docker-compose build
}

function createDB()
{
    docker-compose up -d
    docker exec mysql mysql -u root -ptop_secret -e "CREATE DATABASE IF NOT EXISTS exchange_app;"
}

function up()
{
   docker-compose up -d
}

function down()
{
    if [[ " ${parameters[*]} " == *" --rm "* ]]; then
        docker-compose down --remove-orphans
    else
        docker-compose down
    fi
}

cd "$(dirname "${BASH_SOURCE[0]}")"

eval $1
