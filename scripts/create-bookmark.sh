#!/bin/sh
DEST="$BASE_URL/api/bookmark"
echo "POST Request to $DEST"
curl -H "x-authorized-user-id: 1" -H "Content-Type: application/json" --data '{"name": "dmcelligott.com", "type": "url", "url": "http://dmcelligott.com", "tags": ["awesome", "developer"]}' $DEST
