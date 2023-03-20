#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo "  Creating user and database '$database'"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $database WITH PASSWORD 'Welkom123';
	    CREATE DATABASE $database WITH OWNER $database;
	    GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

if [ -n "$POSTGRES_DB_NAMES" ]; then
	echo "Multiple database creation requested: $POSTGRES_DB_NAMES"
	for db in $(echo $POSTGRES_DB_NAMES | tr ',' ' '); do
		create_user_and_database $db
	done
	echo "Multiple databases created"
fi
