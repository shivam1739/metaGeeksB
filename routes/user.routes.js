const userController = require("../controllers/user.controller");

module.exports = function (app) {
  app.post("/metageeks/api/v1/auth/signup/:role", userController.signup);
  app.post("/metageeks/api/v1/auth/signin", userController.signin);
};
