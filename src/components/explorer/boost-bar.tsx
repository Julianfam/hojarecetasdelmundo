import { BOOSTS, type BoostId } from "@/lib/boosts";
import { SWATCH_ON } from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { DriftRail } from "@/components/explorer/drift-rail";

export function BoostBar({
  selected,
  onSelect,
  onPhoto = false,
}: {
  selected: BoostId | null;
  onSelect: (id: BoostId) => void;
  onPhoto?: boolean;
}) {
  const active = BOOSTS.find((b) => b.id === selected);

  return (
    <div>
      <p
        className={cn(
          "text-[0.7rem] font-medium tracking-[0.2em] uppercase",
          onPhoto ? "text-cream/70" : "text-muted-foreground",
        )}
      >
        Boost
      </p>
      <div className="mt-2">
        <DriftRail label="Boost">
          {BOOSTS.map((b) => {
            const on = selected === b.id;
            return (
              <button
                key={b.id}
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(b.id)}
                className={cn(
                  "min-h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-150",
                  on
                    ? SWATCH_ON[b.swatch]
                    : onPhoto
                      ? "border-cream/40 bg-ink/30 text-cream hover:bg-ink/45"
                      : "border-border bg-card text-foreground hover:border-primary/40",
                )}
              >
                {b.label}
              </button>
            );
          })}
        </DriftRail>
      </div>
      {active ? (
        <p className={cn("mt-2 text-sm", onPhoto ? "text-cream/75" : "text-muted-foreground")}>
          {active.blurb}
        </p>
      ) : null}
    </div>
  );
}
