const { Router } = require("express");
const {
  getRecipeId,
  getRecipeName,
  postRecipe,
  getAllRecipes,
} = require("../Handlers/recipeHandler");

const recipesRoutes = Router();

recipesRoutes.get("/recipes/:id", getRecipeId);

recipesRoutes.get("/recipe", getRecipeName);

recipesRoutes.post("/recipes", postRecipe);

recipesRoutes.get("/recipes", getAllRecipes);

module.exports = recipesRoutes;
