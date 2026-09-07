import { Link } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { dateStamp, todaysTable, festivalRecipes, type Festival, type FestivalAccent } from "@/lib/festivals";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SWATCH_DOT } from "@/lib/swatch";

const ACCENT: Record<FestivalAccent, string> = {
  gold: "border-primary/40 bg-primary/10",
  chile: "border-chile/40 bg-chile/10",
  leaf: "border-leaf/40 bg-leaf/10",
  wine: "border-wine/40 bg-wine/10",
  rojo: "border-rojo/40 bg-rojo/10",
  mora: "border-mora/40 bg-mora/10",
  naranja: "border-naranja/40 bg-naranja/10",
  queso: "border-queso/50 bg-queso/20",
};

const BAR: Record<FestivalAccent, string> = {
  gold: "bg-primary",
  chile: "bg-chile",
  leaf: "bg-leaf",
  wine: "bg-wine",
  rojo: "bg-rojo",
  mora: "bg-mora",
  naranja: "bg-naranja",
  queso: "bg-queso",
};

export function FestivalTable({
  seed,
  lead,
  rest,
  dishes,
}: {
  seed: number;
  lead?: Festival;
  rest?: Festival[];
  dishes?: ReturnType<typeof festivalRecipes>;
}) {
  const table = lead ? { lead, rest: rest ?? [] } : todaysTable();
  const show = dishes ?? festivalRecipes(table.lead, seed, 6);
  if (!table.lead) return null;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className={cn("relative overflow-hidden rounded-xl border p-4 sm:p-5", ACCENT[table.lead.accent])}>
          <span className={cn("absolute inset-y-0 left-0 w-1.5", BAR[table.lead.accent])} />
          <div className="flex flex-wrap items-start justify-between gap-3 pl-2">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Hoy en la mesa · {dateStamp()}
              </p>
              <h2 className="mt-1 font-display text-2xl">{table.lead.name}</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{table.lead.blurb}</p>
            </div>
            {table.rest.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {table.rest.slice(0, 4).map((fest) => (
                  <span
                    key={fest.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs"
                  >
                    <span className={cn("size-1.5 rounded-full", SWATCH_DOT[fest.accent])} />
                    {fest.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="-mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-1">
            {show.map((dish) => (
              <Link
                key={dish.slug}
                to="/recipe/$slug"
                params={{ slug: dish.slug }}
                className="relative h-36 w-36 shrink-0 overflow-hidden rounded-lg"
              >
                <img src={dish.image} alt="" className="h-full w-full object-cover" />
                <span className="absolute inset-0 photo-scrim-tile" />
                <span className="absolute inset-x-0 bottom-0 p-2 text-cream">
                  <span className="block font-display text-sm leading-tight">{dish.name}</span>
                  <span className="text-[0.7rem] opacity-80">{dish.country}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShuffleMesa({ onShuffle }: { onShuffle: () => void }) {
  return (
    <Button variant="chile" className="h-9 bg-rojo text-rojo-foreground hover:bg-rojo/90 px-3" onClick={onShuffle}>
      <Shuffle />
      Otra mesa
    </Button>
  );
}
