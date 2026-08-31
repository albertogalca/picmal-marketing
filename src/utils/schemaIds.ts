// Stable @id values for the site's structured-data graph.
//
// Without these, every page emitted a fresh anonymous node: the founder on
// Organization, the author on ProductSchema and the author on each BlogPosting
// were three unlinked Person duplicates, and nothing referenced the
// SoftwareApplication node at all. Search engines and LLMs then see three
// people who happen to share a name instead of one entity.
//
// Anything that names Picmal, Alberto or the app must reference these rather
// than inlining another copy.

export const orgId = (url: string) => new URL("/#organization", url).href;
export const personId = (url: string) => new URL("/#alberto", url).href;
export const softwareId = (url: string) => new URL("/#software", url).href;

/** The full Person node. Emit once (Organization owns it); everywhere else
 *  reference it with `personRef` so there is one definition, not four. */
export const personNode = (url: string) => ({
  "@type": "Person",
  "@id": personId(url),
  name: "Alberto Gallego",
  url: "https://albertogalca.com/",
  // sameAs belongs on the person, not the company: these are Alberto's own
  // profiles, and hanging them off the Organization left the Person with
  // nothing to resolve to.
  sameAs: ["https://albertogalca.com/", "https://github.com/albertogalca"],
});

export const personRef = (url: string) => ({ "@id": personId(url) });
export const orgRef = (url: string) => ({ "@id": orgId(url) });
