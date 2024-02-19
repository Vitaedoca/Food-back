const { Router } = require("express");

const UsersControllers = require("../controllers/UsersControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersControllers = new UsersControllers();

usersRoutes.post("/",  usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.get("/", ensureAuthenticated, usersControllers.index);
usersRoutes.get("/", ensureAuthenticated, usersControllers.show);


module.exports = usersRoutes;