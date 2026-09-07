import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getRegion, REGIONS, tourInRegion } from "@/lib/recipes";
import { flavorLabel, kitchensInRegion } from "@/lib/countries";
import { dailySeed, hashString, shuffleCopy } from "@/lib/shuffle";
import { useExplorer } from "@/lib/store";
import { AppShell } from "@/components/layout/app-shell";
import { RecipeCard } from "@/components/explorer/recipe-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/destino/$id")({
  component: DestinoPage,
  notFoundComponent: DestinoMissing,
});

function DestinoMissing() {
  return (
    <AppShell actions={false}>
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Ese destino se extravió</h1>
        <p className="mt-2 text-muted-foreground">La vuelta al mundo sigue abierta.</p>
        <Button asChild className="mt-6">
          <Link to="/viaje">Vuelta al mundo</Link>
        </Button>
      </main>
    </AppShell>
  );
}

function DestinoPage() {
  const { id } = Route.useParams();
  const region = getRegion(id);
  if (!region) return <DestinoMissing />;

  const kitchens = kitchensInRegion(region.id);
  const plates = shuffleCopy(tourInRegion(region.id), dailySeed() ^ hashString(`destino:${region.id}`));
  const first = plates[0];
  const favorites = useExplorer((s) => s.favorites);
  const toggleFavorite = useExplorer((s) => s.toggleFavorite);
  const index = REGIONS.findIndex((r) => r.id === region.id);
  const prev = index > 0 ? REGIONS[index - 1] : undefined;
  const next = index >= 0 && index < REGIONS.length - 1 ? REGIONS[index + 1] : undefined;
  const flavors = [...new Set(kitchens.flatMap((k) => k.flavors))].slice(0, 4);

  return (
    <AppShell overlay>
      <main>
        <section className="relative min-h-[78svh]">
          <img src={region.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 photo-scrim" />
          <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pt-24 pb-10 sm:px-6">
            <Button variant="secondary" asChild className="mb-6 w-fit">
              <Link to="/">
                <ArrowLeft />
                Hoja
              </Link>
            </Button>
            <p className="text-xs tracking-[0.18em] text-cream/80 uppercase">
              Destino {index + 1} de {REGIONS.length} · {kitchens.length} cocinas
            </p>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight text-cream sm:text-7xl">
              {region.label}
            </h1>
            <p className="mt-4 max-w-2xl font-display text-xl leading-snug text-cream/90">
              {region.hint}. {plates.length} platos en esta mesa.
            </p>
            {first ? (
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/recipe/$slug" params={{ slug: first.slug }}>
                    Recorrer {region.label}
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/viaje">Vuelta al mundo</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Cocinas de este destino</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {flavors.map((id) => (
                <Badge key={id} variant="outline">
                  {flavorLabel(id)}
                </Badge>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {kitchens.map((k) => (
                <Link
                  key={k.slug}
                  to="/pais/$slug"
                  params={{ slug: k.slug }}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <img src={k.cover} alt="" className="h-44 w-full object-cover" />
                  <span className="absolute inset-0 photo-scrim-tile" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-cream">
                    <span className="block font-display text-lg">{k.name}</span>
                    <span className="line-clamp-2 text-xs opacity-80">{k.contrast}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <h2 className="font-display text-2xl">Platos de {region.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{plates.length} paradas en este destino</p>
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

        <nav className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6">
            {prev ? (
              <Link
                to="/destino/$id"
                params={{ id: prev.id }}
                className="group flex min-h-16 items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary"
              >
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    Destino anterior
                  </span>
                  <span className="block truncate font-display text-lg">{prev.label}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to="/destino/$id"
                params={{ id: next.id }}
                className="group flex min-h-16 items-center justify-end gap-3 rounded-lg border border-border px-4 py-3 text-right transition-colors hover:border-primary"
              >
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    Siguiente destino
                  </span>
                  <span className="block truncate font-display text-lg">{next.label}</span>
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