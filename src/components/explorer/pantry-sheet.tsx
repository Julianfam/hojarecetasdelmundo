import { ShoppingBasket } from "lucide-react";
import { PANTRY_GROUPS } from "@/lib/recipes";
import { useExplorer } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function PantrySheet() {
  const pantry = useExplorer((s) => s.pantry);
  const toggle = useExplorer((s) => s.togglePantry);
  const clear = useExplorer((s) => s.clearPantry);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative px-3 sm:px-4">
          <ShoppingBasket />
          <span className="hidden sm:inline">Despensa</span>
          {pantry.length > 0 ? (
            <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground tabular-nums">
              {pantry.length}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tu despensa</SheetTitle>
          <SheetDescription>
            Marca lo que tienes a mano. Hoja te sugiere platos que ya puedes empezar.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {PANTRY_GROUPS.map((group) => (
            <section key={group.label} className="mb-6">
              <h3 className="mb-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.keys.map((item) => {
                  const on = pantry.includes(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggle(item.key)}
                      aria-pressed={on}
                      className={cn(
                        "min-h-11 rounded-md border px-3 text-sm transition-[background-color,border-color,color] duration-150",
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground",
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
          {pantry.length > 0 ? (
            <Button variant="ghost" onClick={clear} className="w-full">
              Vaciar despensa
            </Button>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
