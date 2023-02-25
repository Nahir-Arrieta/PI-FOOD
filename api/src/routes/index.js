const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRoutes = require("./RecipesRoutes.js");
const dietsRoutes = require("./DietsRoutes.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(recipesRoutes);
router.use(dietsRoutes);

module.exports = router;
