const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesController = new DishesController()

const disherRoutes = Router();

disherRoutes.post("/", ensureAuthenticated, dishesController.create);
disherRoutes.put("/:id_dishe", ensureAuthenticated, dishesController.update);
disherRoutes.get("/:id_dishe", ensureAuthenticated, dishesController.index);
disherRoutes.get("/show", ensureAuthenticated, dishesController.show);


module.exports = disherRoutes;
