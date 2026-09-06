import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FAMILIES, getFamily, RECIPES } from "@/lib/recipes";
import { getCountry } from "@/lib/countries";
import { useExplorer } from "@/lib/store";
import { AppShell } from "@/components/layout/app-shell";
import { RecipeCard } from "@/components/explorer/recipe-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tipo/$id")({
  component: TipoPage,
  notFoundComponent: TipoMissing,
});

function TipoMissing() {
  return (
    <AppShell actions={false}>
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Esa mesa se extravió</h1>
        <p className="mt-2 text-muted-foreground">El atlas sigue abierto por tipo de plato.</p>
        <Button asChild className="mt-6">
          <Link to="/">Volver</Link>
        </Button>
      </main>
    </AppShell>
  );
}

function TipoPage() {
  const { id } = Route.useParams();
  const family = getFamily(id);
  if (!family) return <TipoMissing />;

  const plates = RECIPES.filter((r) => r.familyId === family.id);
  const countries = [...new Set(plates.map((r) => r.country))];
  const first = plates[0];
  const favorites = useExplorer((s) => s.favorites);
  const toggleFavorite = useExplorer((s) => s.toggleFavorite);
  const index = FAMILIES.findIndex((f) => f.id === family.id);
  const prev = index > 0 ? FAMILIES[index - 1] : undefined;
  const next = index >= 0 && index < FAMILIES.length - 1 ? FAMILIES[index + 1] : undefined;

  return (
    <AppShell overlay>
      <main>
        <section className="relative min-h-[78svh]">
          <img src={family.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/45 to-background/40" />
          <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pt-24 pb-10 sm:px-6">
            <Button variant="secondary" asChild className="mb-6 w-fit">
              <Link to="/">
                <ArrowLeft />
                Hoja
              </Link>
            </Button>
            <p className="text-xs tracking-[0.18em] text-foreground/80 uppercase">
              Tipo {index + 1} de {FAMILIES.length} · {countries.length} países
            </p>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight text-foreground sm:text-7xl">
              {family.label}
            </h1>
            <p className="mt-4 max-w-2xl font-display text-xl leading-snug text-foreground/90">{family.blurb}</p>
            {first ? (
              <Button asChild className="mt-6 w-fit">
                <Link to="/recipe/$slug" params={{ slug: first.slug }}>
                  Recorrer esta mesa
                </Link>
              </Button>
            ) : null}
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">El mismo gesto, otro país</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {countries.map((name) => {
                const kitchen = getCountry(name);
                return kitchen ? (
                  <Link
                    key={name}
                    to="/pais/$slug"
                    params={{ slug: kitchen.slug }}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm hover:border-primary"
                  >
                    {name}
                  </Link>
                ) : (
                  <span key={name} className="rounded-full border border-border px-3 py-1.5 text-sm">
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <h2 className="font-display text-2xl">{plates.length} platos en esta mesa</h2>
            <p className="mt-1 text-sm text-muted-foreground">{family.hint}</p>
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
                to="/tipo/$id"
                params={{ id: prev.id }}
                className="group flex min-h-16 items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary"
              >
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    Tipo anterior
                  </span>
                  <span className="block truncate font-display text-lg">{prev.label}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to="/tipo/$id"
                params={{ id: next.id }}
                className="group flex min-h-16 items-center justify-end gap-3 rounded-lg border border-border px-4 py-3 text-right transition-colors hover:border-primary"
              >
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    Siguiente tipo
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