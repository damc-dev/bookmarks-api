#!/bin/sh

curl -H "x-authorized-user-id: 1" -H "Content-Type: application/json" --data '{"name": "dmcelligott.com", "type": "url", "url": "http://dmcelligott.com", "tags": ["awesome", "developer"]}' localhost:8080/api/bookmark
