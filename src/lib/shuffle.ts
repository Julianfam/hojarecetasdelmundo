export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleCopy<T>(items: T[], seed: number): T[] {
  const rng = mulberry32(seed || 1);
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const current = next[i]!;
    next[i] = next[j]!;
    next[j] = current;
  }
  return next;
}

export function pickAt<T>(items: T[], seed: number): T | undefined {
  if (items.length === 0) return undefined;
  const rng = mulberry32(seed || 1);
  return items[Math.floor(rng() * items.length)];
}

export function hashString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function dayOfYear(date = new Date()) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((now - start) / 86_400_000);
}

export function dailySeed(date = new Date()) {
  return hashString(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

export function freshSeed() {
  const now = Date.now() >>> 0;
  const mix = Math.floor(Math.random() * 0xffffffff) >>> 0;
  return (now ^ mix ^ dailySeed()) >>> 0 || 1;
}

export function takeShuffled<T>(items: T[], seed: number, count: number, salt = "") {
  return shuffleCopy(items, seed ^ (salt ? hashString(salt) : 0)).slice(0, Math.max(0, count));
}

export function withoutSlugs<T extends { slug: string }>(items: T[], used: Iterable<string>) {
  const skip = new Set(used);
  return items.filter((item) => !skip.has(item.slug));
}
