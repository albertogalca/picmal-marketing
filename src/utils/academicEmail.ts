/**
 * Gate for the STUDENT promotion code.
 *
 * ponytail: one regex instead of a domain allowlist. Every academic domain in
 * practice puts `edu` or `ac` as a label right before the country code
 * (mit.edu, ox.ac.uk, unimelb.edu.au, u-tokyo.ac.jp), so the list would only be
 * a longer way of writing this. Ceiling: schools on a plain national domain
 * (uni-koeln.de, ucm.es) fall through — the form points those people at email,
 * which is also the only thing that ever caught them under an allowlist.
 *
 * This is a client-side gate, so it is friction, not proof. The Stripe
 * promotion code is what actually applies the discount, and it is public the
 * moment one student pastes it somewhere. Cap redemptions on the Stripe side.
 */
export function isAcademicEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at < 1 || at === trimmed.length - 1) return false;

  const domain = trimmed.slice(at + 1);
  if (!/^[a-z0-9.-]+$/.test(domain) || domain.includes("..")) return false;

  // `.edu` / `.ac`, optionally followed by a two-letter country code. The
  // country code is capped at two letters on purpose: three would also swallow
  // edu.com and ac.net.
  return /\.(edu|ac)(\.[a-z]{2})?$/.test(domain);
}
