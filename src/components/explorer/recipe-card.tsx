import { Link } from "@tanstack/react-router";
import { Clock, Heart, ShoppingCart } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
import { FLAVORS } from "@/lib/recipes";
import { countrySlug } from "@/lib/countries";
import { useExplorer } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function RecipeCard({
  recipe,
  favorite,
  onFavorite,
  overlap,
  featured = false,
}: {
  recipe: Recipe;
  favorite: boolean;
  onFavorite: (slug: string) => void;
  overlap?: number;
  featured?: boolean;
}) {
  const inBasket = useExplorer((s) => s.basket.some((i) => i.slug === recipe.slug));
  const toggleBasket = useExplorer((s) => s.toggleBasket);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl bg-muted",
        featured ? "min-h-[70svh]" : "aspect-[3/4]",
      )}
    >
      <Link
        to="/recipe/$slug"
        params={{ slug: recipe.slug }}
        className="absolute inset-0 block"
      >
        <img
          src={recipe.image}
          alt={recipe.name}
          width={720}
          height={960}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
      </Link>

      <button
        type="button"
        aria-label={inBasket ? "Quitar de la lista" : "Sumar a la lista"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleBasket(recipe.slug, recipe.name);
        }}
        className="absolute top-3 left-3 z-10 flex size-11 items-center justify-center rounded-md bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-150 hover:bg-background/60"
      >
        <ShoppingCart className={cn("size-5", inBasket && "fill-primary text-primary")} />
      </button>

      <button
        type="button"
        aria-label={favorite ? "Quitar de mesa" : "Guardar en mesa"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onFavorite(recipe.slug);
        }}
        className="absolute top-3 right-3 z-10 flex size-11 items-center justify-center rounded-md bg-background/40 text-foreground backdrop-blur-sm transition-colors duration-150 hover:bg-background/60"
      >
        <Heart className={cn("size-5", favorite && "fill-primary text-primary")} />
      </button>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 text-foreground",
          featured && "p-6 sm:p-8",
        )}
      >
        <p className="text-xs tracking-[0.16em] uppercase opacity-80">
          <Link
            to="/pais/$slug"
            params={{ slug: countrySlug(recipe.country) }}
            className="pointer-events-auto hover:underline"
          >
            {recipe.country}
          </Link>
        </p>
        <h3
          className={cn(
            "mt-1 font-display font-medium tracking-tight",
            featured ? "text-3xl sm:text-5xl" : "text-2xl",
          )}
        >
          <Link
            to="/recipe/$slug"
            params={{ slug: recipe.slug }}
            className="pointer-events-auto"
          >
            {recipe.name}
          </Link>
        </h3>
        {featured ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-90">{recipe.story}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs opacity-80">
            <Clock className="size-3.5" />
            <span className="tabular-nums">{recipe.timeMin} min</span>
          </span>
          {overlap ? (
            <Badge variant="stamp">{overlap} de tu despensa</Badge>
          ) : (
            <Badge variant="muted">{recipe.difficulty}</Badge>
          )}
          {recipe.flavors.slice(0, featured ? 4 : 2).map((id) => (
            <Badge key={id} variant="outline" className="border-foreground/30 bg-background/40 text-foreground">
              {FLAVORS.find((f) => f.id === id)?.label ?? id}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
