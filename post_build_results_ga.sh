#!/bin/bash

echo "Will post result: {\"project\":\"enroll-ui_dc\",\"branch\":\"$BRANCH\",\"sha\":\"$SHA\",\"status\":\"success\"}"

# curl -H "Content-Type: application/json" -H "X-API-Key: ${BUILD_REPORT_API_KEY}" -X POST ${BUILD_REPORT_URL} -d "{\"project\":\"enroll-ui_dc\",\"branch\":\"${TRAVIS_BRANCH}\",\"sha\":\"${TRAVIS_COMMIT}\",\"status\":\"success\"}"


