// Pixel textures for the redesign preview. Same seed, same picture, on every
// build: FNV-1a into mulberry32, exactly as scripts/generate-blog-covers.js.
// Everything renders at build time as SVG rects, so no JavaScript ships.

export type Cell = [x: number, y: number, w: number, h: number, tier: number];
type Opts = { rise: number; density: number };
type Texture = (cols: number, rows: number, r: () => number, o: Opts) => Cell[];

export function seeded(str: string | number): () => number {
  let h = 2166136261;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The dune from scripts/generate-blog-covers.js (pixelField), so live art and
// the existing card.png covers are the same landscape. `rise` scales maxH.
const dune: Texture = (cols, rows, rand, o) => {
  const maxH = rows * 0.4 * (o.rise / 0.6);
  const hills = Array.from({ length: 3 + Math.floor(rand() * 2) }, () => ({
    at: 0.08 + rand() * 0.84,
    width: 0.12 + rand() * 0.2,
    height: 0.35 + rand() * 0.65,
  }));
  const shelf = 0.12 + rand() * 0.08;
  const profile = (x: number) => {
    let v = shelf * Math.sin(Math.PI * x) ** 0.5;
    for (const h of hills) v += h.height * Math.exp(-(((x - h.at) / h.width) ** 2));
    return Math.min(1, v);
  };
  const cells: Cell[] = [];
  for (let c = 0; c < cols; c++) {
    const reach = 0.75 + rand() * 0.5;
    const density = (0.65 + rand() * 0.35) * o.density;
    const h = Math.max(1, profile((c + 0.5) / cols) * maxH * reach);
    for (let r = 0; r < rows; r++) {
      const t = (r + 0.5) / h;
      let p: number;
      if (t < 0.12) p = 0.96;
      else if (t < 1) p = density * (1 - t) ** 0.65;
      else p = t < 1.35 ? 0.035 : 0;
      if (rand() < p) cells.push([c, rows - 1 - r, 1, 1, 1]);
    }
  }
  return cells;
};

const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const TEXTURES: Record<string, Texture> = {
  skyline: dune,
    // A calm pixel landscape: dithered sky, two ridges on a horizon, still water. Backdrop for the app window.
    horizon: (cols: number, rows: number, r: () => number, o: Opts): Cell[] => {
      let cells: Cell[] = [], hz = Math.round(rows * 0.64), prof = (seedOff: number, amp: number, freq: number) => {
        let out: number[] = [], ph = r() * 6;
        for (let x = 0; x < cols; x++) {
          let u = x / cols;
          out.push(Math.max(0, Math.round(amp * rows * (0.55 + 0.3 * Math.sin(u * freq + ph) + 0.15 * Math.sin(u * freq * 2.7 + ph * 1.7)) * (0.3 + 0.7 * Math.pow(Math.abs(u - 0.5) * 2, 1.4)))));
        }
        return out;
      };
      let far = prof(1, 0.2, 5), near = prof(2, 0.12, 8);
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let b = (BAYER[y % 4][x % 4] + 0.5) / 16;
          if (y < hz) {
            let up = hz - y;
            if (up <= near[x]) { cells.push([x, y, 1, 1, 3]); continue; }
            if (up <= far[x]) { cells.push([x, y, 1, 1, 2]); continue; }
            let v = y / hz;
            if (b < 1 - v * 1.9) cells.push([x, y, 1, 1, 1]);
            else if (b < (v - 0.6) * 2.2) cells.push([x, y, 1, 1, 2]);
          } else {
            let dn = y - hz, t = 2;
            if (dn < near[x] * 0.9 && b < 0.5) t = 3;
            else if (dn > 1 && b < Math.max(0, 0.25 - dn / rows)) t = 1;
            cells.push([x, y, 1, 1, t]);
            if (t === 2 && r() < 0.012) cells.push([x, y, 3 + Math.floor(r() * 5), 1, 1]);
          }
        }
      }
      return cells;
    },
    // Ordered dither fading up from the bottom. Compression.
    dither: (cols: number, rows: number, r: () => number, o: Opts): Cell[] => {
      let cells: Cell[] = [], top = rows * o.rise;
      for (let y = 0; y < rows; y++) {
        let level = Math.pow(Math.max(0, 1 - y / top), 1.15) * o.density;
        for (let x = 0; x < cols; x++) if ((BAYER[y % 4][x % 4] + 0.5) / 16 < level) cells.push([x, rows - 1 - y, 1, 1, 1]);
      }
      return cells;
    },
    // Solid on the left, breaking apart to the right. Conversion.
    dissolve: (cols: number, rows: number, r: () => number, o: Opts): Cell[] => {
      let cells: Cell[] = [], edge = cols * (0.35 + (1 - o.rise) * 0.3);
      for (let y = 0; y < rows; y++) {
        let wob = Math.sin(y * 0.5) * cols * 0.03;
        for (let x = 0; x < cols; x++) {
          let d = (x - edge - wob) / Math.max(1, cols - edge), pr;
          pr = d < 0 ? 0.98 : Math.max(0, 0.9 * Math.pow(1 - Math.min(1, d), 2.4));
          if (r() < pr * o.density) cells.push([x, y, 1, 1, d < 0.35 ? 1 : 2]);
        }
      }
      return cells;
    },
    // Mirrored bars around the middle line. Audio.
    wave: (cols: number, rows: number, r: () => number, o: Opts): Cell[] => {
      let cells: Cell[] = [], mid = Math.floor(rows / 2), ph = r() * 6;
      for (let x = 0; x < cols; x += 2) {
        let u = x / cols;
        let a = Math.abs(Math.sin(u * 7 + ph) * 0.6 + Math.sin(u * 19 + ph * 2) * 0.3) + r() * 0.25;
        let half = Math.max(1, Math.round(a * mid * o.rise * 1.4));
        for (let y = -half; y <= half; y++) {
          let yy = mid + y;
          if (yy < 0 || yy >= rows) continue;
          if (Math.abs(y) === half && r() < 0.4) continue;
          cells.push([x, yy, 1, 1, Math.abs(y) > half * 0.7 ? 2 : 1]);
        }
      }
      return cells;
    },
    // Blocks of mixed sizes in three strengths, heavier at the bottom. An image being pixelated.
    mosaic: (cols: number, rows: number, r: () => number, o: Opts): Cell[] => {
      let cells: Cell[] = [], taken = {};
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        if (taken[x + ',' + y]) continue;
        let s = r() < 0.15 ? 3 : r() < 0.3 ? 2 : 1;
        for (let q = 0; q < s * s; q++) if (taken[(x + q % s) + ',' + (y + Math.floor(q / s))]) s = 1;
        if (x + s > cols || y + s > rows) s = 1;
        for (let yy = 0; yy < s; yy++) for (let xx = 0; xx < s; xx++) taken[(x + xx) + ',' + (y + yy)] = 1;
        let pr = (0.08 + 0.85 * Math.pow(y / rows, 1.4) * Math.min(1, o.rise * 1.6)) * o.density;
        if (r() < pr) cells.push([x, y, s, s, 1 + Math.floor(r() * 3)]);
      }
      return cells;
    },
    // Horizontal runs on alternate rows, denser toward the bottom. Video.
    scan: (cols: number, rows: number, r: () => number, o: Opts): Cell[] => {
      let cells: Cell[] = [];
      for (let y = 0; y < rows; y += 2) {
        let t = y / rows, x = Math.floor(r() * 4);
        while (x < cols) {
          let len = 2 + Math.floor(r() * 10 * (0.4 + t));
          if (r() < (0.1 + t * t * 0.9 * Math.min(1, o.rise * 1.5)) * o.density) cells.push([x, y, Math.min(len, cols - x), 1, t > 0.6 ? 1 : 2]);
          x += len + 1 + Math.floor(r() * 3);
        }
      }
      return cells;
    },
    // The app icon's flowing bands, rebuilt in pixels. Use with tone "icon" on brand.
    flow: (cols: number, rows: number, r: () => number, o: Opts): Cell[] => {
      let cells: Cell[] = [], ph = r() * 2;
      for (let y = 0; y < rows; y++) {
        let v = y / rows;
        let c = 0.5 + 0.17 * Math.sin(v * Math.PI * 2 + ph) - (v - 0.5) * 0.3;
        for (let x = 0; x < cols; x++) {
          let d = (x / cols - c) * 6.5 + (r() - 0.5) * 0.3, band = Math.floor(d + 3);
          let tier = band === 3 ? 1 : (band === 1 || band === 4) ? 2 : (band === 0 || band === 5) ? 3 : 0;
          if (tier && r() < o.density) cells.push([x, y, 1, 1, tier]);
        }
      }
      return cells;
    }
  };

export const TEXTURE_NAMES = Object.keys(TEXTURES);

export function cells(texture: string, cols: number, rows: number, seed: string | number, o: Partial<Opts> = {}): Cell[] {
  const fn = TEXTURES[texture] ?? TEXTURES.skyline;
  return fn(cols, rows, seeded(seed), { rise: o.rise ?? 0.6, density: o.density ?? 1 });
}

// 7x7 pixel glyphs, one-pixel strokes. Feature icons and small markers.
export const GLYPHS: Record<string, string[]> = {

  convert: ['.......', '....#..', '.....#.', '#######', '.....#.', '....#..', '.......'],
  compress: ['#.....#', '.#...#.', '..#.#..', '.......', '..#.#..', '.#...#.', '#.....#'],
  pdf: ['#####..', '#...##.', '#....#.', '#.##.#.', '#....#.', '#.##.#.', '######.'],
  video: ['.......', '.#.....', '.###...', '.#####.', '.###...', '.#.....', '.......'],
  audio: ['...#...', '.#.#...', '.#.#.#.', '##.#.##', '.#.#.#.', '.#.#...', '...#...'],
  image: ['#######', '#.....#', '#..#..#', '#.###.#', '######.', '#######', '.......'],
  folder: ['###....', '#######', '#.....#', '#.....#', '#.....#', '#######', '.......'],
  shield: ['.#####.', '#######', '###.###', '##...##', '###.###', '.#####.', '..###..'],
  bolt: ['....##.', '...##..', '..##...', '.#####.', '...##..', '..##...', '.##....'],
  check: ['.......', '......#', '.....#.', '#...#..', '.#.#...', '..#....', '.......'],
  crop: ['.#.....', '######.', '.#...#.', '.#...#.', '.#...#.', '.######', '.....#.'],
  pin: ['..###..', '.#...#.', '.#.#.#.', '.#...#.', '..#.#..', '...#...', '.......'],
  film: ['#######', '#.#.#.#', '#######', '#.....#', '#######', '#.#.#.#', '#######'],
  trend: ['#......', '.#.....', '..#....', '...#..#', '....#.#', '.....##', '..#####'],
  menu: ['#######', '#.....#', '#.###.#', '#.....#', '#.###.#', '#.....#', '#######'],
  doc: ['#####..', '#...##.', '#....#.', '#.###.#', '#.....#', '#.###.#', '#######'],
  plus: ['.......', '...#...', '...#...', '.#####.', '...#...', '...#...', '.......']
};
