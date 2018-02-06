#!/usr/bin/env bash

celery -A configuration.settings.celeryapp flower --port=5555

celery -A configuration.celeryapp worker -E -n basecode-worker -Q \
        longtime_add \
        --concurrency=3 \
        --loglevel=info