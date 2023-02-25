const { Router } = require("express");
const { getDiets } = require("../Handlers/dietsHandlers");

const dietsRoutes = Router();

dietsRoutes.get("/diets", getDiets);

module.exports = dietsRoutes;
