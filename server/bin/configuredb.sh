#!/bin/bash

export PGPASSWORD="node_password";

database="portfoliodb";

echo "Configuring database: $portfoliodb";

dropdb -U node_user portfoliodb;
createdb -U node_user portfoliodb;

psql -U node_user portfoliodb < ./bin/sql/resume.sql;

echo "$portfoliodb configured";