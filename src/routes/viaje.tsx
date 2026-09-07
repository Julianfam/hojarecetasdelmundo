import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { RECIPES, REGIONS, tourList } from "@/lib/recipes";
import { countryKitchens } from "@/lib/countries";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/viaje")({
  component: ViajePage,
});

function ViajePage() {
  const first = tourList()[0];
  const kitchens = countryKitchens().length;

  return (
    <AppShell overlay>
      <main>
        <section className="relative min-h-[78svh]">
          <img src="/dishes/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 photo-scrim" />
          <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pt-24 pb-10 sm:px-6">
            <Button variant="secondary" asChild className="mb-6 w-fit">
              <Link to="/">
                <ArrowLeft />
                Hoja
              </Link>
            </Button>
            <p className="text-xs tracking-[0.18em] text-cream/80 uppercase">
              {REGIONS.length} destinos · {kitchens} cocinas · {RECIPES.length} platos
            </p>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight text-cream sm:text-7xl">
              Vuelta al mundo
            </h1>
            <p className="mt-4 max-w-2xl font-display text-xl leading-snug text-cream/90">
              Nueve destinos, de México al Jollof. Una parada detrás de otra.
            </p>
            {first ? (
              <Button asChild className="mt-6 w-fit">
                <Link to="/recipe/$slug" params={{ slug: first.slug }}>
                  Parada 1 · {first.name}
                </Link>
              </Button>
            ) : null}
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <h2 className="font-display text-2xl">Los destinos</h2>
            <p className="mt-1 text-sm text-muted-foreground">Entra a un continente o recorre el atlas entero.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {REGIONS.map((r, i) => {
                const count = RECIPES.filter((x) => x.regionId === r.id).length;
                return (
                  <Link
                    key={r.id}
                    to="/destino/$id"
                    params={{ id: r.id }}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <img src={r.cover} alt="" className="h-52 w-full object-cover" />
                    <span className="absolute inset-0 photo-scrim-tile" />
                    <span className="absolute inset-x-0 bottom-0 p-4 text-cream">
                      <span className="text-xs tracking-[0.16em] uppercase opacity-80">
                        Destino {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block font-display text-2xl leading-tight">{r.label}</span>
                      <span className="text-sm opacity-80">
                        {r.hint} · {count} platos
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}