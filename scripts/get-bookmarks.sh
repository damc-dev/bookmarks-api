#!/bin/sh

source getBaseUrl

DEST="$BASE_URL/api/bookmark"
echo "Request to $DEST"
curl --header "x-authorized-user-id: 1" $DEST
