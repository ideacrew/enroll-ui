#!/bin/bash

# https://riptutorial.com/bash/example/19471/get-captured-groups-from-a-regex-match-against-a-string

regex='refs/heads/(.*)'

[[ "$BRANCH" =~ $regex ]]

SIMPLE_BRANCH=${BASH_REMATCH[1]}

echo "Will post result: {\"project\":\"enroll-ui_dc\",\"branch\":\"$SIMPLE_BRANCH\",\"sha\":\"$SHA\",\"status\":\"$STATUS\"}"

curl -H "Content-Type: application/json" -H "X-API-Key: $YELLR_KEY" -X POST $YELLR_URL -d "{\"project\":\"enroll-ui_dc\",\"branch\":\"$SIMPLE_BRANCH\",\"sha\":\"$SHA\",\"status\":\"passing\"}"


