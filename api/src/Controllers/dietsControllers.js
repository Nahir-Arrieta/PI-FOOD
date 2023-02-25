const { Diets } = require("../db.js");
const axios = require("axios");

const dietsControllers = async () => {
  const allDiets = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`
  );
  const dietsData = allDiets.data.results.map((element) => {
    return {
      diets: element.diets.map((diet) => {
        return diet;
      }),
    };
  });

  const diets = dietsData.map((element) => {
    return element.diets;
  });

  const dietsUnique = [...new Set(diets.flat())];

  const dietsName = dietsUnique.map((diet) => {
    return {
      name: diet,
    };
  });

  const dietsBd = await Diets.findAll();
  if (dietsBd.length === 0) {
    const dietsBd = await Diets.bulkCreate(dietsName);
    return dietsBd;
  } else {
    return dietsBd;
  }
};

module.exports = dietsControllers;
