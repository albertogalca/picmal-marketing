#!/usr/bin/env bash
# Pull Google Search Console data for picmal.app via the Search Analytics API.
#
# Auth: uses gcloud Application Default Credentials with the webmasters.readonly scope.
#   One-time setup (re-run if the token expires / "invalid_grant"):
#     gcloud auth application-default login \
#       --scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly
#     gcloud auth application-default set-quota-project albertogalca
#
# Usage:
#   scripts/gsc-pull.sh <dimensions> [startDate] [endDate] [rowLimit]
# Examples:
#   scripts/gsc-pull.sh query                       # last 90 days, top queries
#   scripts/gsc-pull.sh page                        # top pages
#   scripts/gsc-pull.sh query,page 2026-02-23 2026-05-23 1000
set -euo pipefail

SITE="sc-domain%3Apicmal.app"          # URL-encoded sc-domain:picmal.app
QUOTA_PROJECT="albertogalca"
DIMS="${1:-query}"
START="${2:-$(date -v-90d +%Y-%m-%d 2>/dev/null || date -d '90 days ago' +%Y-%m-%d)}"
END="${3:-$(date -v-3d +%Y-%m-%d 2>/dev/null || date -d '3 days ago' +%Y-%m-%d)}"
ROWLIMIT="${4:-500}"

TOKEN="$(gcloud auth application-default print-access-token 2>/dev/null)"
[ -z "$TOKEN" ] && { echo "No ADC token. Run the gcloud login in this file's header." >&2; exit 1; }

# Build JSON dimensions array from comma-separated arg
DIMS_JSON="$(printf '%s' "$DIMS" | awk -F, '{for(i=1;i<=NF;i++){printf "%s\"%s\"",(i>1?",":""),$i}}')"

curl -s -X POST \
  "https://searchconsole.googleapis.com/webmasters/v3/sites/${SITE}/searchAnalytics/query" \
  -H "Authorization: Bearer $TOKEN" \
  -H "x-goog-user-project: ${QUOTA_PROJECT}" \
  -H "Content-Type: application/json" \
  -d "{\"startDate\":\"${START}\",\"endDate\":\"${END}\",\"dimensions\":[${DIMS_JSON}],\"rowLimit\":${ROWLIMIT},\"dataState\":\"final\"}"
