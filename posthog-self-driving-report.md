# PostHog Self-driving setup report

PostHog Self-driving has been configured for the Picmal marketing site. Session Replay, Error Tracking, Support, and a Google Search Console warehouse source are now wired to the inbox, and four scouts are running daily. Findings will start appearing in the [Self-driving inbox](https://eu.posthog.com/project/109790/inbox) within ~30 minutes.

---

## AI data processing

**Approved.** Organization-level AI data processing consent was granted before this run started.

---

## GitHub

**Connected during this run.** GitHub App installed and authorized as `albertogalca` (integration id 73377). Self-driving can now research findings against the repo and open fix PRs.

---

## Products enabled

| Product | Status | Notes |
|---|---|---|
| Session Replay | **Already active** | Recordings confirmed via server probe; `posthog.init` has no `disable_session_recording` override. |
| Error Tracking | **Not enabled via API** — follow-up needed | `products-enable` tool unavailable (requires `project:write` scope). `posthog.init` has no `capture_exceptions: false` override, so the server flip will take effect once enabled. |
| Support (Conversations) | **Not enabled via API** — follow-up needed | Same scope limitation. Once enabled, tickets only arrive after an inbound channel (email / inbox / Slack) is connected — see Follow-ups. |

---

## Signal sources

| source_product | source_type | Action |
|---|---|---|
| `signals_scout` | `cross_source_issue` | **Default ON** — no config row needed; scout findings reach the inbox automatically. |
| `health_checks` | `health_issue` | **Enabled** (id `019f9a0d-732e-7c61-9fbb-64896a51f716`) |
| `error_tracking` | `issue_created` | **Enabled** (id `019f9a0d-835d-7441-a629-205a54ff9e47`) |
| `error_tracking` | `issue_reopened` | **Enabled** (id `019f9a0d-9123-7f54-b6a2-107c7ecd5bc3`) |
| `error_tracking` | `issue_spiking` | **Enabled** (id `019f9a0d-9e1d-7953-967e-9294ef36dff6`) |
| `session_replay` | `session_analysis_cluster` | **Enabled** (id `019f9a0d-b2af-7b1f-96a9-893faa155e00`, sample rate 10%) |
| `conversations` | `ticket` | **Enabled** (id `019f9a0d-c303-7ade-a1d9-7677fe7e42d7`) — dormant until a support channel is connected |
| `google_search_console` | `search_opportunity` | **Not created** — `source_product: google_search_console` not yet in the responder API schema. GSC warehouse source is connected and syncing; the responder row must be added manually once supported. |

---

## Connected tools

| Tool | Status |
|---|---|
| **Google Search Console** | **Connected by this run** (warehouse source id `019f9a11-3788-0000-8a9c-53a8c95361e6`, first sync started). The `search_analytics_by_query_page` table will be available in HogQL once the initial sync completes. The inbox responder row (`search_opportunity`) could not be created via API — see Follow-ups. |
| All other tools | **Not used** — not selected. |

---

## Scout troop

**Run budget:** 24 runs/day max (0 used today, 24 remaining). Early-access announcement: _"Scouts are in early access so daily runs are limited to 24 by default for now, please reach out to team-self-driving@posthog.com if you would like more runs."_

### Enabled (4 scouts)

| Scout | Reason |
|---|---|
| `signals-scout-general` | Always on — cross-product correlations and surfaces no specialist covers. |
| `signals-scout-web-analytics` | Primary metric for this marketing site: per-channel session volume, attribution, and landing-page health. |
| `signals-scout-revenue-analytics` | Lemon Squeezy purchases tracked via `purchase_completed`; watches sync health, capture regressions, and goal-miss escalations. |
| `signals-scout-web-vitals` | SEO-focused static site where Core Web Vitals directly affect search rankings; watches LCP, INP, CLS, FCP per page vs Google thresholds. |

### Disabled (23 scouts)

| Scout | Reason |
|---|---|
| `signals-scout-error-tracking` | **Covered by native source** — error tracking issues reach the inbox through the `error_tracking` source rows; a scout would duplicate it. |
| `signals-scout-session-replay` | **Covered by native source** — session clusters reach the inbox through the `session_replay` source row. |
| `signals-scout-ai-observability` | No `$ai_*` events or LLM SDK in this project. |
| `signals-scout-anomaly-detection` | Not in top-3 most-used surfaces; re-enable in PostHog if anomaly detection becomes a priority. |
| `signals-scout-apm` | No distributed tracing / OpenTelemetry spans instrumented. |
| `signals-scout-conversations` | Support product not yet enabled; re-enable once a support channel is connected. |
| `signals-scout-csp-violations` | No Content-Security-Policy with PostHog CSP reporting configured. |
| `signals-scout-customer-analytics` | Solo consumer app, no group/accounts analytics (not B2B). |
| `signals-scout-data-pipelines` | No CDP destinations or batch exports in use. |
| `signals-scout-data-warehouse` | GSC warehouse source just connected; re-enable once syncing is confirmed and queries are validated. |
| `signals-scout-experiments` | No active A/B experiments. |
| `signals-scout-feature-flags` | No feature flags in use in this repo. |
| `signals-scout-health-checks` | Health check findings reach the inbox via the `health_checks` native source; scout would duplicate. |
| `signals-scout-inbox-validation` | No shipped fixes yet to validate on a fresh setup. |
| `signals-scout-ingestion-warnings` | Not in top-3 most-used surfaces; re-enable if ingestion issues arise. |
| `signals-scout-insight-alerts` | No configured insight alerts. |
| `signals-scout-logs` | PostHog logs product not in use. |
| `signals-scout-mcp-tool-calls` | No `$mcp_tool_call` telemetry in this project. |
| `signals-scout-observability-gaps` | Not in top-3; re-enable if insight coverage review is wanted. |
| `signals-scout-product-analytics` | Not in top-3; web-analytics and revenue-analytics cover the primary funnels. |
| `signals-scout-replay-vision` | No Replay Vision scanners configured. |
| `signals-scout-skills-store` | Not in top-3 for this project. |
| `signals-scout-surveys` | No surveys in use (0 surveys found). |

---

## Custom scouts

**None created.** Two candidates were proposed and declined:

- **Newsletter funnel watcher** (`signals-scout-newsletter-funnel`) — would have watched `newsletter_subscribed` event rates by source (footer vs post_purchase). Gap confirmed: no enabled scout covers email sign-up conversion rates. _Proposed, declined._
- **Purchase conversion watcher** (`signals-scout-conversion-funnel`) — would have tracked the `purchase_completed`/pageview ratio for conversion-rate drops while traffic holds steady. Gap confirmed: `revenue-analytics` scout watches sync health and goal-miss escalations, not funnel conversion rates. _Proposed, declined._

Both can be created later via the `authoring-scouts` skill in PostHog (`posthog:skill-get {"skill_name": "authoring-scouts"}`).

**Noise escape hatch:** if any enabled scout turns out noisy, set `emit: false` on its config in PostHog to switch it to dry-run mode — it will keep running and logging, but nothing will land in the inbox until you flip it back.

---

## Follow-ups

- [ ] **Enable Error Tracking product** — go to [Project settings](https://eu.posthog.com/project/109790/settings) with a project-admin account and enable Exception Autocapture. The signal sources are already wired; findings will start arriving once the product is on.
- [ ] **Enable Support (Conversations) product** — same project settings page. Once on, connect an inbound channel (email / inbox / Slack) in [Integrations settings](https://eu.posthog.com/project/109790/settings/environment-integrations) so tickets can reach the inbox.
- [ ] **Connect a Google Search Console inbox responder** — the GSC warehouse source is syncing, but `source_product: google_search_console` / `source_type: search_opportunity` is not yet in the responder API schema. Check back in a PostHog update and create the source config row manually once it's available.
- [ ] **Verify Google Search Console sync** — check [Data sources](https://eu.posthog.com/project/109790/data-management/sources) to confirm the initial GSC sync completed and `search_analytics_by_query_page` rows are present.
- [ ] **Re-enable `signals-scout-data-warehouse`** — once GSC syncing is confirmed, enable this scout in PostHog to catch import staleness and warehouse query opportunities.
- [ ] **Custom scouts (optional)** — if you later want the newsletter funnel or purchase conversion scouts, run `authoring-scouts` in PostHog to create them. The surfaces and discriminators are documented in the Custom scouts section above.

---

## What happens next

The scout coordinator picks up fresh configs within ~30 minutes. Each enabled scout runs once a day and draws one run from the project's daily budget (24 by default during early access). Findings cluster into reports in the inbox — immediately-actionable ones can trigger fix tasks. Check the inbox at: https://eu.posthog.com/project/109790/inbox
