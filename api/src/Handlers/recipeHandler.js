const {
  recipeIdControllers,
  recipeIdControllersBd,
  allRecipesControllers,
  allRcipesControllersBd,
  recipeNameControllers,
  recipeNameControllersBd,
  postRecipeControllers,
} = require("../Controllers/recipeControllers");

const getRecipeId = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeApi = await recipeIdControllers(id);
    if (recipeApi === "Recipe not found") {
      const recipeBd = await recipeIdControllersBd(id);
      res.status(200).send(recipeBd);
    } else {
      res.status(200).send(recipeApi);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
const getAllRecipes = async (req, res) => {
  try {
    const allApi = await allRecipesControllers();
    const allBd = await allRcipesControllersBd();
    if (allBd === "Recipe not found") {
      res.status(200).send(allApi);
    } else {
      const all = allApi.concat(allBd);
      res.status(200).send(all);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const getRecipeName = async (req, res) => {
  try {
    const { name } = req.query;
    name.toLowerCase();
    const recipeApi = await recipeNameControllers(name);
    if (recipeApi === "Recipe not found" || recipeApi.length === 0) {
      const recipeBd = await recipeNameControllersBd(name);
      res.status(200).send(recipeBd);
    } else {
      res.status(200).send(recipeApi);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const postRecipe = async (req, res) => {
  try {
    const { name, image, summary, healthScore, steps, diets } = req.body;
    const recipe = await postRecipeControllers(
      name,
      image,
      summary,
      healthScore,
      steps,
      diets
    );
    res.status(200).send(recipe);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getRecipeId,
  getRecipeName,
  postRecipe,
  getAllRecipes,
};
