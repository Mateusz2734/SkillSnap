FROM postgres:15.1-alpine

COPY ./backend/sql/01-schema.sql /docker-entrypoint-initdb.d/
COPY ./backend/sql/02-data.sql /docker-entrypoint-initdb.d/
