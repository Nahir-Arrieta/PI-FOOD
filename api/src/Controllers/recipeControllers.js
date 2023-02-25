const axios = require("axios");
const { Op } = require("sequelize");

const { Recipe, Diets } = require("../db");

const recipeIdControllers = async (id) => {
  try {
    const recipeId = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
    );

    const dataId = {
      id: recipeId.data.id,
      name: recipeId.data.title,
      image: recipeId.data.image,
      summary: recipeId.data.summary.replace(/<[^>]*>?/gm, ""),
      healthScore: recipeId.data.healthScore,
      diets: recipeId.data.diets,
      steps: recipeId.data.analyzedInstructions[0].steps.map((step) => {
        return {
          step: step.step,
        };
      }),
    };

    return dataId;
  } catch (error) {
    return "Recipe not found";
  }
};

const recipeIdControllersBd = async (id) => {
  const recipeIdBd = await Recipe.findByPk(id, {
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipeIdBd;
};

const allRecipesControllers = async () => {
  const allRecipes = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`
  );
  const recipeData = allRecipes.data.results.map((element) => {
    return {
      id: element.id,
      image: element.image,
      name: element.title,
      diets: element.diets.map((diet) => {
        return diet;
      }),
      healthScore: element.healthScore,
    };
  });

  return recipeData;
};

const allRcipesControllersBd = async () => {
  try {
    const allRecipesBd = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return allRecipesBd;
  } catch (error) {
    return "Recipe not found";
  }
};

const recipeNameControllers = async (name) => {
  try {
    const recipeName = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&query=${name}`
    );

    const recipeData = recipeName.data.results.map((element) => {
      return {
        id: element.id,
        image: element.image,
        name: element.title,
        diets: element.diets.map((diet) => {
          return diet;
        }),
      };
    });
    return recipeData;
  } catch (error) {
    return "Recipe not found";
  }
};

const recipeNameControllersBd = async (name) => {
  const recipeNameBd = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipeNameBd;
};

const postRecipeControllers = async (
  name,
  image,
  summary,
  healthScore,
  steps,
  diets
) => {
  const createRecipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    steps,
  });

  const dietsAll = await Diets.findAll({
    where: {
      name: diets,
    },
  });
  await createRecipe.addDiets(dietsAll.map((diet) => diet.id));

  return "Recipe created";
};
module.exports = {
  recipeIdControllers,
  recipeIdControllersBd,
  allRecipesControllers,
  allRcipesControllersBd,
  recipeNameControllers,
  recipeNameControllersBd,
  postRecipeControllers,
};
