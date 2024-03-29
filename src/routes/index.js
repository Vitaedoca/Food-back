const { Router } = require("express");

const usersRoutes = require("./user.routes");
const sessionsRoutes = require("./sessions.routes");
const disherRoutes = require("./dishes.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/dishes", disherRoutes);


module.exports = routes;