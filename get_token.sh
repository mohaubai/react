#!/bin/bash

DOMAIN="dev-5kqt11x6g24kur7s.us.auth0.com"
CLIENT_ID="GZM7MwrJ1WQcYsaBZ6DFsTKni2fyhhQd"
CLIENT_SECRET="n4g1xUcb1KaOExBexNbNhq1jxLE2dbLJ_dQUlk6Z7eTe8V6Upf55puWz3sQLLsUd"
AUDIENCE="https://dev-5kqt11x6g24kur7s.us.auth0.com/api/v2/"

ACCESS_TOKEN=$(curl --request POST \
  --url https://$DOMAIN/oauth/token \
  --header 'content-type: application/json' \
  --data "{\"grant_type\":\"client_credentials\",\"client_id\":\"$CLIENT_ID\",\"client_secret\":\"$CLIENT_SECRET\",\"audience\":\"$AUDIENCE\"}" | jq -r '.access_token')

echo "Access Token: $ACCESS_TOKEN"