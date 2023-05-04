const jwt = require("jsonwebtoken");
require("dotenv").config();
const userService = require("../services/user.service");
require("dotenv").config();
//signup function
exports.signup = async (req, res) => {
  try {
    const result = await userService.createUser(req.body, req.params);
    let statusCode;
    let response;
    if (result.error) {
      statusCode = 403;
      response = result;
    } else {
      statusCode = 201;
      response = result;
    }
    res.status(statusCode).send({
      result: response,
    });
  } catch (err) {
    res.status(500).send({
      result: err,
    });
  }
};

//signin function
exports.signin = async (req, res) => {
  try {
    const result = await userService.verifyUserByEmail(req.body);
    console.log(result);
    let statusCode;
    let response;
    if (result.error) {
      statusCode = 401;
      response = result.error;
    } else {
      statusCode = 201;
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET_KEY
      );

      response = {
        message: "user Validated",
        token: token,
      };
    }
    res.status(statusCode).send({
      result: response,
    });
  } catch (err) {
    res.status(500).send({
      result: err,
    });
  }
};
