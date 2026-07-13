# SEO Feature-Gap Playbook (reusable prompt)

Fill the three placeholders, paste into a Claude Code session running inside the target marketing repo. Requires the DataForSEO MCP (or Ahrefs) connected.

---

**INPUTS**
- `{{DOMAIN}}` = the live marketing domain, correct TLD (verify it in the repo config first, e.g. astro/next config `site:` — do NOT assume `.com`).
- `{{PRODUCT_ONE_LINER}}` = what the product is + platform (e.g. "a macOS app for converting/compressing images, video, audio, PDFs").
- `{{MARKET}}` = target country/language (default US / en).

---

**TASK**

Find low-difficulty keyword opportunities on features the product already ships but has no page for, then build and optimize the pages. Work in phases and report at each phase before spending more API credits.

**Phase 0 — Feature + page inventory (repo, no API).**
Delegate to a search agent: produce (1) a COMPLETE feature inventory from `src/content` (docs + changelog — the changelog reveals newly shipped features), config allowlists, and the landing/pages tree; (2) an inventory of existing marketing pages grouped by type (convert/compress/alternative/blog/feature landing), with exact slugs and which are indexed vs noindexed. Be exhaustive; list newer/less-obvious features explicitly.

**Phase 1 — Baseline + competitors (DataForSEO).**
- `dataforseo_labs_google_competitors_domain` and `..._domain_rank_overview` for `{{DOMAIN}}`. Note ranked-keyword count, ETV, and whether it has any top-3.
- `dataforseo_labs_google_ranked_keywords` filtered to `rank_group 8..30`, sorted by volume — these are the near-page-1 keywords the site already ranks for.
- `dataforseo_labs_google_serp_competitors` over ~12 seed keywords spanning every feature area, to find the real organic rivals.
- Interpret: separate brand noise (apple/adobe/microsoft/reddit/youtube/wikipedia) from real product competitors. Note WHO owns the top 3 — if it's Reddit/forums/vendor-support/YouTube, the winning page format is a **"How to [X] on [platform]" guide**, not a thin product landing page.

**Phase 2 — Keyword research per feature (DataForSEO).**
- For each feature WITHOUT a page, run `dataforseo_labs_google_keyword_suggestions` on a canonical seed, filtered `search_volume >= 40` AND `keyword_properties.keyword_difficulty <= 25-30`, ordered by volume desc.
- Outputs are huge and blow the token limit → they auto-save to a file. Extract with jq, don't read raw:
  `jq -r '.items[] | [.keyword_info.search_volume, .keyword_properties.keyword_difficulty, .keyword] | @tsv' FILE | sort -t$'\t' -k1,1 -nr | head`
  (For the alternate `persisted-output` JSON wrapper: `jq -r '.[0].text | fromjson | .items[] | ...'`.)
- Dedupe near-identical phrasings mentally; report the CLUSTER core volume, not the sum of variants.

**Phase 3 — Prioritize.**
Rank clusters by: (volume) x (low KD) x (product actually has the feature) x (no page yet). Build a tiered table: cluster / core vol / KD / page status (none, exists-optimize, ranking-push) / feature fit. Verify every "has the feature" claim against the docs before committing — do NOT trust the inventory blindly on ambiguous features (e.g. scope like "video only vs images too"); grep the docs.

**Phase 4 — Build the new pages.**
- Learn the repo's OWN landing-page pattern: read one existing feature landing page and mirror its imports, skeleton, components, and props EXACTLY. Do not hand-roll markup or invent components.
- Fan out one background agent per new page (independent files, no conflict). Give each: the reference file to read, the exact feature facts, the SEO target (put the keyword in title + H1 + one FAQ), the brand voice rules, filename, and hard constraints: create only that one file, do NOT edit shared files (footer/config), match the reference voice, follow the repo's punctuation rules.
- Each page: keyword in `<title>`, H1, and a "How do I [X]?" FAQ (snippet bait); FAQPage JSON-LD; 6-7 concrete FAQs; a related-page cross-link.
- Then, centrally (yourself, to avoid agent conflicts): add every new page to the site-wide **footer/nav** for internal links, and confirm each new URL is in the sitemap (not caught by any noindex rule).

**Phase 5 — Optimize existing pages.**
For clusters where a page exists but doesn't rank: retitle/re-H1 around the exact high-volume variant, add a "How do I [X]?" FAQ, and surface a real differentiator (a guarantee, a unique mode). Light touch — don't rewrite pages that are already on-target.

**Phase 6 — Humanize.**
Read the generated copy. Fix the real AI tell, which is usually cross-page: identical templated section headings ("Made for X" / "Built for X"), rule-of-three padding, promotional adjectives (seamless/powerful/robust), copula avoidance (serves as/boasts). Give each page a specific, human heading. KEEP intentional brand repetition (the core throughline, canonical taglines). Don't churn copy that's already concrete and on-voice.

**GUARDRAILS**
- DataForSEO charges per call — batch, use tight filters, don't re-fetch, warn before expensive/filtered queries.
- Respect the repo's verification convention (e.g. if it says "review on dev server, never run build/astro check", don't run the build).
- Voice: match the product's existing landing pages, lead with the category then the benefit, be specific, honest about limits (don't claim it does things it doesn't).
- Deliverable per phase is a decision table, not a data dump.
