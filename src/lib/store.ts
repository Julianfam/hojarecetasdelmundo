import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FlavorId, MoodId, RegionId } from "@/lib/recipe-types";

export interface BasketItem {
  slug: string;
  qty: number;
}

export interface BasketToast {
  message: string;
  at: number;
}

interface ExplorerState {
  query: string;
  flavors: FlavorId[];
  regionId: RegionId | null;
  country: string | null;
  mood: MoodId | null;
  pantry: string[];
  favorites: string[];
  basket: BasketItem[];
  toast: BasketToast | null;
  favoritesOnly: boolean;
  hydrated: boolean;
  setQuery: (query: string) => void;
  toggleFlavor: (id: FlavorId) => void;
  setRegion: (id: RegionId | null) => void;
  setCountry: (name: string | null) => void;
  openCountry: (name: string) => void;
  setMood: (id: MoodId | null) => void;
  togglePantry: (key: string) => void;
  clearPantry: () => void;
  toggleFavorite: (slug: string) => void;
  addToBasket: (slug: string, name?: string) => void;
  toggleBasket: (slug: string, name?: string) => void;
  setBasketQty: (slug: string, qty: number) => void;
  removeFromBasket: (slug: string) => void;
  clearBasket: () => void;
  clearToast: () => void;
  setFavoritesOnly: (on: boolean) => void;
  clearFilters: () => void;
  setHydrated: () => void;
}

export function normalizeBasket(raw: unknown): BasketItem[] {
  if (!Array.isArray(raw)) return [];
  const map = new Map<string, number>();
  for (const item of raw) {
    if (typeof item === "string" && item) {
      map.set(item, (map.get(item) ?? 0) + 1);
      continue;
    }
    if (item && typeof item === "object" && "slug" in item) {
      const slug = String((item as BasketItem).slug || "");
      if (!slug) continue;
      const qty = Math.max(1, Math.min(9, Number((item as BasketItem).qty) || 1));
      map.set(slug, Math.min(9, (map.get(slug) ?? 0) + qty));
    }
  }
  return [...map.entries()].map(([slug, qty]) => ({ slug, qty }));
}

export const useExplorer = create<ExplorerState>()(
  persist(
    (set, get) => ({
      query: "",
      flavors: [],
      regionId: null,
      country: null,
      mood: null,
      pantry: [],
      favorites: [],
      basket: [],
      toast: null,
      favoritesOnly: false,
      hydrated: false,
      setQuery: (query) => set({ query }),
      toggleFlavor: (id) =>
        set({
          flavors: get().flavors.includes(id)
            ? get().flavors.filter((f) => f !== id)
            : [...get().flavors, id],
        }),
      setRegion: (id) =>
        set({
          regionId: get().regionId === id ? null : id,
          country: null,
        }),
      setCountry: (name) =>
        set({
          country: get().country === name ? null : name,
          regionId: null,
        }),
      openCountry: (name) => set({ country: name, regionId: null, favoritesOnly: false }),
      setMood: (id) => set({ mood: get().mood === id ? null : id }),
      togglePantry: (key) =>
        set({
          pantry: get().pantry.includes(key)
            ? get().pantry.filter((k) => k !== key)
            : [...get().pantry, key],
        }),
      clearPantry: () => set({ pantry: [] }),
      toggleFavorite: (slug) =>
        set({
          favorites: get().favorites.includes(slug)
            ? get().favorites.filter((s) => s !== slug)
            : [...get().favorites, slug],
        }),
      addToBasket: (slug, name) => {
        const current = get().basket;
        const found = current.find((i) => i.slug === slug);
        if (found) {
          const qty = Math.min(9, found.qty + 1);
          set({
            basket: current.map((i) => (i.slug === slug ? { ...i, qty } : i)),
            toast: { message: name ? `${name} ×${qty}` : `Plato ×${qty}`, at: Date.now() },
          });
          return;
        }
        set({
          basket: [...current, { slug, qty: 1 }],
          toast: { message: name ? `${name} a la lista` : "Sumado a la lista", at: Date.now() },
        });
      },
      toggleBasket: (slug, name) => {
        if (get().basket.some((i) => i.slug === slug)) {
          set({ basket: get().basket.filter((i) => i.slug !== slug) });
          return;
        }
        get().addToBasket(slug, name);
      },
      setBasketQty: (slug, qty) => {
        const next = Math.round(qty);
        if (next < 1) {
          set({ basket: get().basket.filter((i) => i.slug !== slug) });
          return;
        }
        set({
          basket: get().basket.map((i) => (i.slug === slug ? { ...i, qty: Math.min(9, next) } : i)),
        });
      },
      removeFromBasket: (slug) => set({ basket: get().basket.filter((i) => i.slug !== slug) }),
      clearBasket: () => set({ basket: [] }),
      clearToast: () => set({ toast: null }),
      setFavoritesOnly: (on) => set({ favoritesOnly: on }),
      clearFilters: () =>
        set({
          query: "",
          flavors: [],
          regionId: null,
          country: null,
          mood: null,
          favoritesOnly: false,
        }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "atlas-de-sabor",
      version: 2,
      partialize: (s) => ({ favorites: s.favorites, pantry: s.pantry, basket: s.basket }),
      migrate: (persisted) => {
        const p = persisted as { favorites?: string[]; pantry?: string[]; basket?: unknown };
        return {
          favorites: Array.isArray(p.favorites) ? p.favorites : [],
          pantry: Array.isArray(p.pantry) ? p.pantry : [],
          basket: normalizeBasket(p.basket),
        };
      },
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ExplorerState>;
        return {
          ...current,
          ...p,
          basket: normalizeBasket(p.basket ?? current.basket),
          toast: null,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
