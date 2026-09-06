import { FLAVORS, type FlavorId } from "@/lib/recipes";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-wrap gap-2">
      {FLAVORS.map((f) => {
        const on = selected.includes(f.id);
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onToggle(f.id)}
            aria-pressed={on}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-150",
              on
                ? "border-primary bg-primary text-primary-foreground"
                : onPhoto
                  ? "border-foreground/35 bg-background/25 text-foreground hover:bg-background/40"
                  : "border-border bg-card text-foreground hover:border-primary/40",
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
