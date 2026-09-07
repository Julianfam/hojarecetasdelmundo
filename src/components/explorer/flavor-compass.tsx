import { FLAVORS, SWATCH_DOT, SWATCH_ON, type FlavorId } from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { DriftRail } from "@/components/explorer/drift-rail";

export function FlavorCompass({
  selected,
  onToggle,
  onPhoto = false,
}: {
  selected: FlavorId[];
  onToggle: (id: FlavorId) => void;
  onPhoto?: boolean;
}) {
  return (
    <DriftRail label="Sabores">
      {FLAVORS.map((f) => {
        const on = selected.includes(f.id);
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(f.id)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-150",
              on
                ? SWATCH_ON[f.swatch]
                : onPhoto
                  ? "border-cream/40 bg-ink/30 text-cream hover:bg-ink/45"
                  : "border-border bg-card text-foreground hover:border-primary/40",
            )}
          >
            <span className={cn("mr-2 inline-block size-2 rounded-full", on ? "bg-current opacity-70" : SWATCH_DOT[f.swatch])} />
            {f.label}
          </button>
        );
      })}
    </DriftRail>
  );
}
