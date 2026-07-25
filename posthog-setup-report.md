# PostHog post-wizard report

The wizard has completed the PostHog integration for the Picmal marketing site. The existing snippet in `src/components/Posthog.astro` was updated to read credentials from environment variables instead of hardcoding them, a dev-time guard was added so missing config fails loudly during development, and two new `newsletter_subscribed` capture events were added — one in the footer newsletter form and one in the post-purchase opt-in on the thank-you page.

| Event | Description | File |
|---|---|---|
| `newsletter_subscribed` | User successfully subscribed to the Picmal newsletter via the footer signup form. | `src/components/NewsletterSignup.astro` |
| `newsletter_subscribed` (source: post_purchase) | Buyer opted into the Picmal newsletter on the thank-you page after a purchase. | `src/pages/thank-you.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://eu.posthog.com/project/109790/dashboard/849031)
- **Insight**: [Newsletter subscriptions by source (wizard)](https://eu.posthog.com/project/109790/insights/JPy6u5dh)
- **Insight**: [Buy CTA clicks over time (wizard)](https://eu.posthog.com/project/109790/insights/hvqwIoXo)
- **Insight**: [Download funnel (wizard)](https://eu.posthog.com/project/109790/insights/4ukILpB2)
- **Insight**: [Post-purchase newsletter opt-in (wizard)](https://eu.posthog.com/project/109790/insights/suv8lBxQ)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
