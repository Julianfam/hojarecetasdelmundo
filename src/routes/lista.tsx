import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, Search, ShoppingCart, Trash2 } from "lucide-react";
import { RECIPES } from "@/lib/recipes";
import { useExplorer } from "@/lib/store";
import { buildMarket } from "@/lib/market";
import { AppShell } from "@/components/layout/app-shell";
import { CheckoutDialog } from "@/components/market/checkout-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lista")({
  component: ListaPage,
});

function ListaPage() {
  const basket = useExplorer((s) => s.basket);
  const pantry = useExplorer((s) => s.pantry);
  const remove = useExplorer((s) => s.removeFromBasket);
  const clear = useExplorer((s) => s.clearBasket);
  const addToBasket = useExplorer((s) => s.addToBasket);
  const setQty = useExplorer((s) => s.setBasketQty);
  const [skipPantry, setSkipPantry] = useState(true);
  const [got, setGot] = useState<string[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [addQuery, setAddQuery] = useState("");

  const market = useMemo(() => buildMarket(basket, pantry), [basket, pantry]);
  const visibleAisles = useMemo(
    () =>
      market.aisles
        .map((aisle) => ({
          ...aisle,
          lines: skipPantry ? aisle.lines.filter((l) => !l.inPantry) : aisle.lines,
        }))
        .filter((aisle) => aisle.lines.length > 0),
    [market, skipPantry],
  );
  const visibleCount = visibleAisles.reduce((n, aisle) => n + aisle.lines.length, 0);

  const suggestions = useMemo(() => {
    const q = addQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    const taken = new Set(basket.map((i) => i.slug));
    return RECIPES.filter(
      (r) =>
        !taken.has(r.slug) &&
        (r.name.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q) ||
          r.city?.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))),
    ).slice(0, 6);
  }, [addQuery, basket]);

  return (
    <AppShell>
      <main className={cn("mx-auto max-w-6xl px-4 py-8 sm:px-6", market.dishes.length > 0 && "pb-28")}>
        <Button variant="ghost" asChild className="mb-6 -ml-2 w-fit">
          <Link to="/">
            <ArrowLeft />
            Hoja
          </Link>
        </Button>
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Mercado</p>
        <h1 className="mt-2 font-display text-4xl">Lista de compras</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Suma platos. Los ingredientes se juntan solos. En la caja, la lista sale hacia Notas o
          WhatsApp.
        </p>

        {market.dishes.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <ShoppingCart className="mx-auto size-8 text-primary" />
            <p className="mt-4 font-display text-2xl">La bolsa está vacía.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Abre un plato y pulsa A la lista, o busca aquí para sumarlo.
            </p>
            <AddDish
              query={addQuery}
              onQuery={setAddQuery}
              hits={suggestions}
              onAdd={(slug, name) => {
                addToBasket(slug, name);
                setAddQuery("");
              }}
            />
            <Button asChild className="mt-6">
              <Link to="/">Explorar platos</Link>
            </Button>
          </div>
        ) : (
          <>
            <section className="mt-8">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-2xl">Platos</h2>
                <Button variant="ghost" className="h-9 px-2" onClick={clear}>
                  Vaciar lista
                </Button>
              </div>
              <ul className="grid gap-2">
                {market.dishes.map((dish) => (
                  <li
                    key={dish.slug}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
                  >
                    <img src={dish.image} alt="" className="size-14 shrink-0 rounded-md object-cover" />
                    <Link to="/recipe/$slug" params={{ slug: dish.slug }} className="min-w-0 flex-1">
                      <span className="block font-display text-lg leading-tight">{dish.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {dish.country} · {dish.servings} pers.
                      </span>
                    </Link>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9"
                        aria-label={`Menos ${dish.name}`}
                        disabled={dish.qty <= 1}
                        onClick={() => setQty(dish.slug, dish.qty - 1)}
                      >
                        <Minus />
                      </Button>
                      <span className="w-6 text-center text-sm tabular-nums">{dish.qty}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9"
                        aria-label={`Más ${dish.name}`}
                        disabled={dish.qty >= 9}
                        onClick={() => setQty(dish.slug, dish.qty + 1)}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Quitar ${dish.name}`}
                      onClick={() => remove(dish.slug)}
                    >
                      <Trash2 />
                    </Button>
                  </li>
                ))}
              </ul>
              <AddDish
                query={addQuery}
                onQuery={setAddQuery}
                hits={suggestions}
                onAdd={(slug, name) => {
                  addToBasket(slug, name);
                  setAddQuery("");
                }}
              />
            </section>

            <section className="mt-10 pb-24">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-2xl">Ingredientes</h2>
                <button
                  type="button"
                  onClick={() => setSkipPantry((v) => !v)}
                  aria-pressed={skipPantry}
                  className={cn(
                    "min-h-11 rounded-full border px-4 text-sm",
                    skipPantry
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground",
                  )}
                >
                  {skipPantry ? "Sin lo de la despensa" : "Incluir despensa"}
                </button>
              </div>
              {visibleAisles.map((aisle) => (
                <div key={aisle.label} className="mb-5">
                  <h3 className="mb-2 text-xs tracking-[0.16em] text-primary uppercase">{aisle.label}</h3>
                  <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                    {aisle.lines.map((line) => {
                      const on = got.includes(line.id);
                      return (
                        <li key={line.id}>
                          <button
                            type="button"
                            onClick={() =>
                              setGot((list) =>
                                list.includes(line.id)
                                  ? list.filter((k) => k !== line.id)
                                  : [...list, line.id],
                              )
                            }
                            className={cn(
                              "flex w-full items-baseline justify-between gap-3 px-4 py-3 text-left text-sm",
                              on && "text-muted-foreground line-through",
                            )}
                          >
                            <span>
                              {line.item}
                              {line.inPantry ? (
                                <span className="ml-2 text-xs tracking-wide text-primary uppercase">
                                  Despensa
                                </span>
                              ) : null}
                            </span>
                            <span className="shrink-0 tabular-nums text-muted-foreground">
                              {line.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {visibleCount === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Con lo de tu despensa no falta nada. Incluye la despensa o suma otro plato.
                </p>
              ) : null}
            </section>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-primary/30 bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-6">
              <div className="mx-auto flex max-w-6xl items-center gap-3">
                <p className="min-w-0 flex-1 text-sm text-muted-foreground">
                  {market.dishes.length} {market.dishes.length === 1 ? "plato" : "platos"} ·{" "}
                  {visibleCount} {visibleCount === 1 ? "ingrediente" : "ingredientes"}
                </p>
                <Button onClick={() => setCheckout(true)}>Ir a caja</Button>
              </div>
            </div>

            <CheckoutDialog
              open={checkout}
              onOpenChange={setCheckout}
              market={market}
              skipPantry={skipPantry}
            />
          </>
        )}
      </main>
    </AppShell>
  );
}

function AddDish({
  query,
  onQuery,
  hits,
  onAdd,
}: {
  query: string;
  onQuery: (value: string) => void;
  hits: (typeof RECIPES)[number][];
  onAdd: (slug: string, name: string) => void;
}) {
  return (
    <div className="mt-4">
      <label className="relative block">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-faint" />
        <Input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Sumar otro plato…"
          aria-label="Buscar un plato para la lista"
          className="pl-11"
        />
      </label>
      {hits.length > 0 ? (
        <ul className="relative z-40 mt-2 mb-20 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          {hits.map((hit) => (
            <li key={hit.slug} className="border-b border-border last:border-b-0">
              <button
                type="button"
                onClick={() => onAdd(hit.slug, hit.name)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-muted"
              >
                <img src={hit.image} alt="" className="size-10 shrink-0 rounded-md object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block font-display leading-tight">{hit.name}</span>
                  <span className="text-xs text-muted-foreground">{hit.country}</span>
                </span>
                <Plus className="size-4 text-primary" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
