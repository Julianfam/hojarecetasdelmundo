import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  dailyRecipe,
  filterRecipes,
  MOODS,
  RECIPES,
  REGIONS,
  FAMILIES,
} from "@/lib/recipes";
import {
  countryKitchens,
  flavorLabel,
  getCountry,
  groupRecipesByCountry,
} from "@/lib/countries";
import { useExplorer } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/layout/app-shell";
import { FlavorCompass } from "@/components/explorer/flavor-compass";
import { RecipeCard } from "@/components/explorer/recipe-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const PAGE_SIZE = 12;
const COUNTRY_PAGE = 5;

function Home() {
  const query = useExplorer((s) => s.query);
  const flavors = useExplorer((s) => s.flavors);
  const regionId = useExplorer((s) => s.regionId);
  const country = useExplorer((s) => s.country);
  const mood = useExplorer((s) => s.mood);
  const pantry = useExplorer((s) => s.pantry);
  const favorites = useExplorer((s) => s.favorites);
  const favoritesOnly = useExplorer((s) => s.favoritesOnly);
  const setQuery = useExplorer((s) => s.setQuery);
  const toggleFlavor = useExplorer((s) => s.toggleFlavor);
  const setMood = useExplorer((s) => s.setMood);
  const toggleFavorite = useExplorer((s) => s.toggleFavorite);
  const clearFilters = useExplorer((s) => s.clearFilters);

  const featured = useMemo(() => dailyRecipe(), []);
  const results = useMemo(
    () =>
      filterRecipes({
        query,
        flavors,
        regionId,
        country,
        mood,
        pantry,
        favoritesOnly,
        favoriteSlugs: favorites,
      }),
    [query, flavors, regionId, country, mood, pantry, favoritesOnly, favorites],
  );

  const kitchens = useMemo(() => countryKitchens(), []);
  const kitchen = country ? getCountry(country) : undefined;
  const countryRail = regionId ? kitchens.filter((k) => k.regionId === regionId) : kitchens;

  const chapters = useMemo(
    () => groupRecipesByCountry(results.map((r) => r.recipe)),
    [results],
  );

  const active =
    query.length > 0 ||
    flavors.length > 0 ||
    regionId !== null ||
    country !== null ||
    mood !== null ||
    favoritesOnly ||
    pantry.length > 0;

  const showFeatured = !active;
  const [shown, setShown] = useState(PAGE_SIZE);
  const [shownCountries, setShownCountries] = useState(COUNTRY_PAGE);
  const groupWorld = !country && !favoritesOnly && query.length === 0;

  useEffect(() => {
    setShown(PAGE_SIZE);
    setShownCountries(COUNTRY_PAGE);
  }, [query, flavors, regionId, country, mood, pantry, favoritesOnly]);

  const visible = results.slice(0, shown);
  const visibleChapters = chapters.slice(0, shownCountries);

  return (
    <AppShell overlay>
      <main>
        <section className="relative min-h-[92svh]">
          <img
            src="/dishes/hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/45 to-background/40" />
          <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-4 pt-24 pb-10 sm:px-6">
            <p className="text-xs font-medium tracking-[0.28em] text-foreground/80 uppercase">
              {kitchens.length} cocinas · {RECIPES.length} platos
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              El mundo cabe en un plato.
            </h1>
            <form
              className="relative mt-6 max-w-xl"
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-faint" />
              <Input
                id="atlas-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="cilantro, umami, Tokio…"
                aria-label="Buscar recetas por sabor, ingrediente o región"
                className="border-transparent bg-card/95 pr-12 pl-11"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </form>
            <div className="mt-5">
              <FlavorCompass selected={flavors} onToggle={toggleFlavor} onPhoto />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  aria-pressed={mood === m.id}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-150",
                    mood === m.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/35 bg-background/25 text-foreground hover:bg-background/40",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <div className="mb-3 flex items-end justify-between gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Destinos
              </p>
              <Button variant="ghost" asChild className="h-9 px-2 text-xs">
                <Link to="/viaje">Vuelta al mundo</Link>
              </Button>
            </div>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {REGIONS.map((r) => {
                const count = RECIPES.filter((x) => x.regionId === r.id).length;
                return (
                  <Link
                    key={r.id}
                    to="/destino/$id"
                    params={{ id: r.id }}
                    className="relative h-40 w-44 shrink-0 overflow-hidden rounded-xl text-left"
                  >
                    <img src={r.cover} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/10" />
                    <span className="absolute inset-x-0 bottom-0 p-3 text-foreground">
                      <span className="block font-display text-base leading-tight">{r.label}</span>
                      <span className="text-xs opacity-80">
                        {r.hint} · {count}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Por tipo de plato
            </p>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {FAMILIES.map((f) => {
                const count = RECIPES.filter((x) => x.familyId === f.id).length;
                return (
                  <Link
                    key={f.id}
                    to="/tipo/$id"
                    params={{ id: f.id }}
                    className="relative h-40 w-48 shrink-0 overflow-hidden rounded-xl text-left"
                  >
                    <img src={f.cover} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-background/85 to-background/10" />
                    <span className="absolute inset-x-0 bottom-0 p-3 text-foreground">
                      <span className="block font-display text-base leading-tight">{f.label}</span>
                      <span className="text-xs opacity-80">
                        {f.hint} · {count}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Por país · {countryRail.length}
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              {countryRail.map((k) => {
                return (
                  <Link
                    key={k.slug}
                    to="/pais/$slug"
                    params={{ slug: k.slug }}
                    className="relative h-32 w-40 shrink-0 overflow-hidden rounded-xl text-left"
                  >
                    <img src={k.cover} alt="" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-background/85 to-background/15" />
                    <span className="absolute inset-x-0 bottom-0 p-2.5 text-foreground">
                      <span className="block font-display text-sm leading-tight">{k.name}</span>
                      <span className="line-clamp-1 text-[0.7rem] opacity-80">
                        {k.signatures.slice(0, 2).join(" · ")}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {showFeatured ? (
          <section className="px-0">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
              <p className="mb-3 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Mesa del día
              </p>
              <RecipeCard
                recipe={featured}
                featured
                favorite={favorites.includes(featured.slug)}
                onFavorite={toggleFavorite}
              />
            </div>
          </section>
        ) : null}

        <section>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl">
                  {favoritesOnly ? "Tu mesa" : kitchen ? kitchen.name : "El mundo"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {kitchen ? kitchen.blurb : `${results.length} ${results.length === 1 ? "plato" : "platos"}`}
                  {pantry.length > 0 && !kitchen ? " que encajan con tu despensa" : ""}
                </p>
              </div>
              {active ? (
                <Button variant="ghost" onClick={clearFilters}>
                  Limpiar
                </Button>
              ) : null}
            </div>

            {kitchen ? (
              <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
                <div className="grid sm:grid-cols-[12rem_1fr]">
                  <img src={kitchen.cover} alt="" className="h-40 w-full object-cover sm:h-full" />
                  <div className="p-5">
                    <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                      {kitchen.regionLabel} · {kitchen.count} platos
                    </p>
                    <p className="mt-2 font-display text-xl leading-snug">{kitchen.blurb}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {kitchen.flavors.map((id) => (
                        <span
                          key={id}
                          className="rounded-sm border border-border px-2 py-0.5 text-[0.6875rem] tracking-wide uppercase"
                        >
                          {flavorLabel(id)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
                <p className="font-display text-2xl">Nada en esta mesa.</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Prueba otro país o limpia los filtros.
                </p>
                <Button className="mt-6" onClick={clearFilters}>
                  Ver todo
                </Button>
              </div>
            ) : groupWorld ? (
              <>
                <div className="grid gap-10">
                  {visibleChapters.map((chapter) => (
                    <section key={chapter.name}>
                      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl">{chapter.name}</h3>
                          <p className="max-w-2xl text-sm text-muted-foreground">
                            {chapter.kitchen?.contrast ?? chapter.kitchen?.blurb}
                          </p>
                        </div>
                        {chapter.kitchen && chapter.recipes.length > 0 ? (
                          <Button variant="ghost" className="h-9 px-2" asChild>
                            <Link to="/pais/$slug" params={{ slug: chapter.kitchen.slug }}>
                              Ver {chapter.name} · {chapter.recipes.length}
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {chapter.recipes.slice(0, 3).map((recipe) => {
                          const overlap = results.find((r) => r.recipe.slug === recipe.slug)?.overlap;
                          return (
                            <RecipeCard
                              key={recipe.slug}
                              recipe={recipe}
                              favorite={favorites.includes(recipe.slug)}
                              onFavorite={toggleFavorite}
                              overlap={overlap}
                            />
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
                {shownCountries < chapters.length ? (
                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setShownCountries((n) => n + COUNTRY_PAGE)}
                    >
                      Más países · {chapters.length - shownCountries}
                    </Button>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visible.map(({ recipe, overlap }, i) => (
                    <div
                      key={recipe.slug}
                      className="rise-in"
                      style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                    >
                      <RecipeCard
                        recipe={recipe}
                        favorite={favorites.includes(recipe.slug)}
                        onFavorite={toggleFavorite}
                        overlap={overlap}
                      />
                    </div>
                  ))}
                </div>
                {shown < results.length ? (
                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setShown((n) => n + PAGE_SIZE)}
                    >
                      Más del viaje · {results.length - shown} platos
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
