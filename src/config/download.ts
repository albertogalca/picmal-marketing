// The DMG is served from picmal.app itself (R2, see /downloads/* in
// worker/index.js), not from the releases repo: the URL a buyer clicks, the one
// Sparkle updates from and the one Homebrew fetches are all this one.
// The version is in the key, so release.sh rewrites this line on every release.
export const DMG_URL = "https://picmal.app/downloads/Picmal-1.9.0.dmg";
