import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Leaf, ShoppingCart } from "lucide-react";
import { useExplorer } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PantrySheet } from "@/components/explorer/pantry-sheet";
import { CravingRoulette } from "@/components/explorer/craving-roulette";
import { BasketToast } from "@/components/layout/basket-toast";

export function AppShell({
  children,
  actions = true,
  overlay = false,
}: {
  children: ReactNode;
  actions?: boolean;
  overlay?: boolean;
}) {
  const basketCount = useExplorer((s) => s.basket.length);
  const favorites = useExplorer((s) => s.favorites);
  const favoritesOnly = useExplorer((s) => s.favoritesOnly);
  const setFavoritesOnly = useExplorer((s) => s.setFavoritesOnly);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header
        className={cn(
          "z-40",
          overlay
            ? "absolute inset-x-0 top-0"
            : "sticky top-0 border-b border-border bg-background/90 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
          <Link
            to="/"
            className={cn(
              "flex min-h-11 min-w-0 items-center gap-2",
              overlay && "overlay-mark",
            )}
          >
            <Leaf className="size-5 shrink-0 text-leaf" />
            <span className="font-display text-xl font-medium tracking-tight">Hoja</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {actions ? (
              <>
                <CravingRoulette />
                <PantrySheet />
                <Button variant={overlay ? "secondary" : "outline"} asChild className="relative px-3">
                  <Link to="/lista" aria-label="Lista de compras">
                    <ShoppingCart />
                    <span className="hidden sm:inline">Lista</span>
                    {basketCount > 0 ? (
                      <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground tabular-nums">
                        {basketCount}
                      </span>
                    ) : null}
                  </Link>
                </Button>
                <Button
                  variant={favoritesOnly ? "default" : overlay ? "secondary" : "outline"}
                  size="icon"
                  aria-pressed={favoritesOnly}
                  aria-label="Ver mesa guardada"
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                >
                  <Heart className={cn(favoritesOnly && "fill-current")} />
                </Button>
                {favorites.length > 0 ? (
                  <span
                    className={cn(
                      "hidden text-xs tabular-nums sm:inline",
                      overlay ? "text-cream/80" : "text-muted-foreground",
                    )}
                  >
                    {favorites.length}
                  </span>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <p className="font-display text-lg text-foreground">Hoja</p>
          <p>Recetas del mundo, por tipo de plato, país o lo que hay en tu cocina.</p>
        </div>
      </footer>
      <BasketToast />
    </div>
  );
}
