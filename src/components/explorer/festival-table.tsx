import { Link } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { currentFestivals, festivalRecipes, type FestivalAccent } from "@/lib/festivals";
import { useExplorer } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCENT: Record<FestivalAccent, string> = {
  chile: "border-chile/40 bg-chile/10",
  leaf: "border-leaf/40 bg-leaf/10",
  gold: "border-primary/40 bg-primary/10",
};

const DOT: Record<FestivalAccent, string> = {
  chile: "bg-chile",
  leaf: "bg-leaf",
  gold: "bg-primary",
};

export function FestivalTable({ seed }: { seed: number }) {
  const festivals = currentFestivals();
  const [lead, ...rest] = festivals;
  if (!lead) return null;
  const dishes = festivalRecipes(lead, seed, 6);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className={cn("rounded-xl border p-4 sm:p-5", ACCENT[lead.accent])}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Hoy en la mesa
              </p>
              <h2 className="mt-1 font-display text-2xl">{lead.name}</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{lead.blurb}</p>
            </div>
            {rest.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {rest.map((fest) => (
                  <span
                    key={fest.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs"
                  >
                    <span className={cn("size-1.5 rounded-full", DOT[fest.accent])} />
                    {fest.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="-mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-1">
            {dishes.map((dish) => (
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
    <Button variant="chile" className="h-9 px-3" onClick={onShuffle}>
      <Shuffle />
      Otra mesa
    </Button>
  );
}
