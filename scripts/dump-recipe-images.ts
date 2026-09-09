import { RECIPES } from "../src/lib/recipes";
import { pickDishImage } from "../src/lib/dish-images";

const rows = RECIPES.map((recipe) => ({
  slug: recipe.slug,
  name: recipe.name,
  family: recipe.familyId,
  country: recipe.country,
  region: recipe.regionId,
  source: pickDishImage({
    slug: recipe.slug,
    name: recipe.name,
    country: recipe.country,
    regionId: recipe.regionId,
    family: recipe.familyId,
  }),
}));

process.stdout.write(JSON.stringify(rows));
