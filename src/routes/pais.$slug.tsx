import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCountryBySlug, countryTour, flavorLabel, neighborsOf } from "@/lib/countries";
import { dailySeed, hashString, shuffleCopy } from "@/lib/shuffle";
import { useExplorer } from "@/lib/store";
import { AppShell } from "@/components/layout/app-shell";
import { RecipeCard } from "@/components/explorer/recipe-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pais/$slug")({
  component: CountryPage,
  notFoundComponent: CountryMissing,
});

function CountryMissing() {
  return (
    <AppShell actions={false}>
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Esa cocina se extravió</h1>
        <p className="mt-2 text-muted-foreground">El atlas sigue abierto por país.</p>
        <Button asChild className="mt-6">
          <Link to="/">Volver</Link>
        </Button>
      </main>
    </AppShell>
  );
}

function CountryPage() {
  const { slug } = Route.useParams();
  const kitchen = getCountryBySlug(slug);
  if (!kitchen) return <CountryMissing />;

  const favorites = useExplorer((s) => s.favorites);
  const toggleFavorite = useExplorer((s) => s.toggleFavorite);
  const stop = countryTour(kitchen.slug);
  const neighbors = neighborsOf(kitchen.name);
  const plates = shuffleCopy(kitchen.recipes, dailySeed() ^ hashString(`pais:${kitchen.slug}`));
  const first = plates[0];

  return (
    <AppShell overlay>
      <main>
        <section className="relative min-h-[78svh]">
          <img
            src={kitchen.cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 photo-scrim" />
          <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pt-24 pb-10 sm:px-6">
            <Button variant="secondary" asChild className="mb-6 w-fit">
              <Link to="/">
                <ArrowLeft />
                Hoja
              </Link>
            </Button>
            <p className="text-xs tracking-[0.18em] text-cream/80 uppercase">
              {kitchen.regionLabel} · cocina {stop.index + 1} de {stop.total}
            </p>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight text-cream sm:text-7xl">
              {kitchen.name}
            </h1>
            <p className="mt-4 max-w-2xl font-display text-xl leading-snug text-cream/90">
              {kitchen.blurb}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-cream/75">{kitchen.contrast}</p>
            {first ? (
              <Button asChild className="mt-6 w-fit">
                <Link to="/recipe/$slug" params={{ slug: first.slug }}>
                  Empezar {kitchen.name}
                </Link>
              </Button>
            ) : null}
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-[1fr_12rem] sm:px-6">
            <div>
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Despensa de la casa</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {kitchen.signatures.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {kitchen.flavors.map((id) => (
                  <Badge key={id} variant="outline">
                    {flavorLabel(id)}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="self-end text-right font-display text-4xl tabular-nums text-primary">
              {kitchen.count}
              <span className="mt-1 block font-sans text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {kitchen.count === 1 ? "plato" : "platos"}
              </span>
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <h2 className="font-display text-2xl">La mesa de {kitchen.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {kitchen.count} {kitchen.count === 1 ? "parada" : "paradas"} en este país
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plates.map((recipe) => (
                <RecipeCard
                  key={recipe.slug}
                  recipe={recipe}
                  favorite={favorites.includes(recipe.slug)}
                  onFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </section>

        {neighbors.length > 0 ? (
          <section className="border-t border-border">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
              <h2 className="font-display text-2xl">Otras mesas de {kitchen.regionLabel}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Para oír la diferencia de vecino a vecino.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {neighbors.map((n) => (
                  <Link
                    key={n.slug}
                    to="/pais/$slug"
                    params={{ slug: n.slug }}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <img src={n.cover} alt="" className="h-40 w-full object-cover" />
                    <span className="absolute inset-0 photo-scrim-tile" />
                    <span className="absolute inset-x-0 bottom-0 p-3 text-cream">
                      <span className="block font-display text-lg">{n.name}</span>
                      <span className="line-clamp-2 text-xs opacity-80">{n.contrast}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <nav className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6">
            {stop.prev ? (
              <Link
                to="/pais/$slug"
                params={{ slug: stop.prev.slug }}
                className="group flex min-h-16 items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary"
              >
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    País anterior
                  </span>
                  <span className="block truncate font-display text-lg">{stop.prev.name}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}
            {stop.next ? (
              <Link
                to="/pais/$slug"
                params={{ slug: stop.next.slug }}
                className="group flex min-h-16 items-center justify-end gap-3 rounded-lg border border-border px-4 py-3 text-right transition-colors hover:border-primary"
              >
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    Siguiente país
                  </span>
                  <span className="block truncate font-display text-lg">{stop.next.name}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </Link>
            ) : null}
          </div>
        </nav>
      </main>
    </AppShell>
  );
}