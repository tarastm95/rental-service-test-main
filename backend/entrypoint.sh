#!/bin/sh

set -o errexit
set -o nounset

if [ -n "${POSTGRES_HOST:-}" ] && [ -n "${POSTGRES_PORT:-}" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
        sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py migrate

exec "$@"