import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChefHat, Clock, Heart, ShoppingCart, Timer, Users, UtensilsCrossed } from "lucide-react";
import {
  familyMates,
  FLAVORS,
  formatStepClock,
  getFamily,
  getRecipe,
  pantryOverlap,
  REGIONS,
  similarRecipes,
  tourStop,
  type Recipe,
} from "@/lib/recipes";
import { countrySlug, countryStops, getCountry } from "@/lib/countries";
import { recipeBoosts } from "@/lib/boosts";
import { useExplorer } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/layout/app-shell";
import { RecipeCard } from "@/components/explorer/recipe-card";
import { CookMode } from "@/components/recipe/cook-mode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/recipe/$slug")({
  component: RecipePage,
  notFoundComponent: RecipeMissing,
});

function RecipeMissing() {
  return (
    <AppShell actions={false}>
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Esa receta se extravió</h1>
        <p className="mt-2 text-muted-foreground">Hoja no reconoce esa ruta. El atlas sigue abierto.</p>
        <Button asChild className="mt-6">
          <Link to="/">Volver</Link>
        </Button>
      </main>
    </AppShell>
  );
}

const PROFILE: { key: keyof Recipe["profile"]; label: string }[] = [
  { key: "picante", label: "Picante" },
  { key: "umami", label: "Umami" },
  { key: "acido", label: "Ácido" },
  { key: "dulce", label: "Dulce" },
  { key: "grasa", label: "Cuerpo" },
  { key: "aroma", label: "Aroma" },
];

function RecipePage() {
  const { slug } = Route.useParams();
  const recipe = getRecipe(slug);

  if (!recipe) return <RecipeMissing />;

  return <RecipeBody recipe={recipe} />;
}

function RecipeBody({ recipe }: { recipe: Recipe }) {
  const favorites = useExplorer((s) => s.favorites);
  const pantry = useExplorer((s) => s.pantry);
  const toggleFavorite = useExplorer((s) => s.toggleFavorite);
  const basket = useExplorer((s) => s.basket);
  const toggleBasket = useExplorer((s) => s.toggleBasket);
  const inBasket = basket.some((item) => item.slug === recipe.slug);
  const [cook, setCook] = useState(false);

  const related = useMemo(() => similarRecipes(recipe), [recipe]);
  const mates = useMemo(() => familyMates(recipe, 3), [recipe]);
  const family = getFamily(recipe.familyId);
  const stop = useMemo(() => tourStop(recipe.slug), [recipe.slug]);
  const kitchen = getCountry(recipe.country);
  const inCountry = useMemo(() => countryStops(recipe.country), [recipe.country]);
  const countryIndex = inCountry.findIndex((r) => r.slug === recipe.slug);

  const region = REGIONS.find((r) => r.id === recipe.regionId);
  const fav = favorites.includes(recipe.slug);
  const overlap = pantryOverlap(recipe, pantry);

  return (
    <AppShell overlay>
      <main>
        <section className="relative min-h-[78svh]">
          <img
            src={recipe.image}
            alt={recipe.name}
            width={720}
            height={960}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 photo-scrim" />
          <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pt-24 pb-10 sm:px-6">
            <Button variant="secondary" asChild className="mb-6 w-fit">
              <Link to="/">
                <ArrowLeft />
                Hoja
              </Link>
            </Button>
            <p className="text-xs tracking-[0.18em] text-cream/80 uppercase">
              Parada {stop.index + 1} de {stop.total}
              {" · "}
              <Link
                to="/pais/$slug"
                params={{ slug: countrySlug(recipe.country) }}
                className="underline-offset-4 hover:underline"
              >
                {recipe.country}
              </Link>
              {recipe.city ? ` · ${recipe.city}` : ""}
              {family ? (
                <>
                  {" · "}
                  <Link
                    to="/tipo/$id"
                    params={{ id: family.id }}
                    className="underline-offset-4 hover:underline"
                  >
                    {family.label}
                  </Link>
                </>
              ) : null}
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-cream sm:text-6xl">
              {recipe.name}
            </h1>
            {recipe.nameLocal && recipe.nameLocal !== recipe.name ? (
              <p className="mt-1 text-cream/80 italic">{recipe.nameLocal}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={() => setCook(true)}>
                <ChefHat />
                Modo cocina
              </Button>
              <Button variant={inBasket ? "default" : "secondary"} onClick={() => toggleBasket(recipe.slug, recipe.name)}>
                <ShoppingCart className={cn(inBasket && "fill-current")} />
                {inBasket ? "En la lista" : "A la lista"}
              </Button>
              {inBasket ? (
                <Button variant="secondary" asChild>
                  <Link to="/lista">Ver lista</Link>
                </Button>
              ) : null}
              <Button variant={fav ? "default" : "secondary"} onClick={() => toggleFavorite(recipe.slug)}>
                <Heart className={cn(fav && "fill-current")} />
                {fav ? "En tu mesa" : "Guardar"}
              </Button>
            </div>
          </div>
        </section>

        <article className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <blockquote className="border-l-2 border-primary pl-4 font-display text-xl leading-snug text-foreground italic">
              {recipe.story}
            </blockquote>
            {kitchen ? (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <Link
                  to="/pais/$slug"
                  params={{ slug: kitchen.slug }}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Cocina de {kitchen.name}.
                </Link>{" "}
                {kitchen.contrast}
              </p>
            ) : null}
            <p className="mt-4 rounded-lg border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Truco de cocina. </span>
              {recipe.tip}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/destino/$id" params={{ id: recipe.regionId }}>
                <Badge variant="muted">{region?.label}</Badge>
              </Link>
              <Badge variant="outline">{recipe.difficulty}</Badge>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-3.5" />
                <span className="tabular-nums">{recipe.timeMin} min</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="size-3.5" />
                <span className="tabular-nums">{recipe.servings} pers.</span>
              </span>
              {overlap > 0 ? <Badge variant="stamp">{overlap} de tu despensa</Badge> : null}
            </div>

            <Separator className="my-6" />

            <h2 className="font-display text-lg">Perfil de sabor</h2>
            <ul className="mt-3 space-y-2">
              {PROFILE.map(({ key, label }) => (
                <li key={key} className="grid grid-cols-[4.5rem_1fr_1.5rem] items-center gap-3 text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${recipe.profile[key] * 10}%` }}
                    />
                  </div>
                  <span className="text-right tabular-nums text-muted-foreground">
                    {recipe.profile[key]}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {recipe.flavors.map((id) => (
                <Badge key={id} variant="outline">
                  {FLAVORS.find((f) => f.id === id)?.label ?? id}
                </Badge>
              ))}
              {recipeBoosts(recipe).map((b) => (
                <Badge key={b.id} variant="stamp">
                  {b.label}
                </Badge>
              ))}
            </div>

            <Separator className="my-6" />

            <h2 className="font-display text-lg">Ingredientes</h2>
            <ul className="mt-3 divide-y divide-border">
              {recipe.ingredients.map((ing) => {
                const have = pantry.includes(ing.key);
                return (
                  <li
                    key={`${ing.key}-${ing.item}`}
                    className={cn(
                      "flex items-baseline justify-between gap-3 py-2 text-sm",
                      have && "text-primary",
                    )}
                  >
                    <span>{ing.item}</span>
                    <span className="shrink-0 text-muted-foreground">{ing.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>

        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <h2 className="font-display text-2xl">Paso a paso</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {recipe.timeMin} min en total · {recipe.steps.length} pasos
          </p>
          <ol className="mt-4 grid gap-3">
            {recipe.steps.map((step, i) => (
              <li
                key={`${i}-${step.text.slice(0, 24)}`}
                className="grid grid-cols-[3rem_1fr] gap-4 rounded-lg border border-border bg-card p-4"
              >
                <span className="font-display text-2xl text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
                    <span className="inline-flex items-center gap-1">
                      <UtensilsCrossed className="size-3.5" />
                      {step.tool}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Timer className="size-3.5" />
                      {formatStepClock(step.minutes)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed sm:text-base">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <nav className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl gap-3 px-4 py-6 sm:px-6">
            <p className="mb-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Vuelta al mundo · {countryIndex + 1} de {inCountry.length} en {recipe.country}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
            {stop.prev ? (
              <Link
                to="/recipe/$slug"
                params={{ slug: stop.prev.slug }}
                className="group flex min-h-16 items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary"
              >
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {stop.prev.country === recipe.country
                      ? `Anterior en ${recipe.country}`
                      : `Viene de ${stop.prev.country}`}
                  </span>
                  <span className="block truncate font-display text-lg">{stop.prev.name}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}
            {stop.next ? (
              <Link
                to="/recipe/$slug"
                params={{ slug: stop.next.slug }}
                className="group flex min-h-16 items-center justify-end gap-3 rounded-lg border border-border px-4 py-3 text-right transition-colors hover:border-primary"
              >
                <span className="min-w-0">
                  <span className="block text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {stop.next.country === recipe.country
                      ? `Siguiente en ${recipe.country}`
                      : `Entra a ${stop.next.country}`}
                  </span>
                  <span className="block truncate font-display text-lg">{stop.next.name}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </Link>
            ) : null}
            </div>
          </div>
        </nav>

        {mates.length > 0 && family ? (
          <section className="border-t border-border">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl">{family.label}</h2>
                  <p className="text-sm text-muted-foreground">{family.blurb}</p>
                </div>
                <Button variant="ghost" className="h-9 px-2" asChild>
                  <Link to="/tipo/$id" params={{ id: family.id }}>
                    Toda la mesa
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {mates.map((r) => (
                  <RecipeCard
                    key={r.slug}
                    recipe={r}
                    favorite={favorites.includes(r.slug)}
                    onFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="border-t border-border">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-2xl">Más de {recipe.country}</h2>
                <Button variant="ghost" className="h-9 px-2" asChild>
                  <Link to="/pais/$slug" params={{ slug: countrySlug(recipe.country) }}>
                    Toda la cocina
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <RecipeCard
                    key={r.slug}
                    recipe={r}
                    favorite={favorites.includes(r.slug)}
                    onFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <CookMode recipe={recipe} open={cook} onOpenChange={setCook} />
    </AppShell>
  );
}