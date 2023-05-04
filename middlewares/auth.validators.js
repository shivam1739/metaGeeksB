userService = require("../services/user.service");

const isUserAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  //if token is not provided
  if (!token) {
    res.status(401).send({
      message: "JWT token is notprovided",
    });
  }

  //if token is provided
  const isVerifiedToken = await userService.verifyJwttoken(token);

  //if token is Invalid
  if (!isVerifiedToken || isVerifiedToken === "invalid signature") {
    return res.status(401).send({
      message: "JWT Token Is Invalid",
    });
  }

  //if token is valid
  const userInfo = await userService.getUserByEmail({
    email: isVerifiedToken.email,
  });
  if (!userInfo) {
    return res.status(401).send({
      message: "Email is Invalid",
    });
  }
  req.user = userInfo;

  next();
};

const isManager = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      message: "user is Invalid",
    });
  }
  // console.log("================req.user", req.user);
  if (req.user.role != "manager") {
    return res.status(401).send({
      message: "user doesn't have required permissions",
    });
  }
  next();
};

module.exports = { isUserAuthenticated, isManager };
