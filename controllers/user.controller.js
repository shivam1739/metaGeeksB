const jwt = require("jsonwebtoken");
require("dotenv").config();
const userService = require("../services/user.service");
require("dotenv").config();
//signup function
exports.signup = async (req, res) => {
  try {
    console.log(req.body, "=======================");
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
    return res.json({
      message: "succsessfull signup",
      code: 200,
      success: true,
      data: response,
    });
  } catch (err) {
    return res.json({
      err: err,
      statusCode: 500,
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
        success: true,
        statusCode: 200,
      };
    }
    return res.json(response);
  } catch (err) {
    return res.json({
      err: err,
      statusCode: 500,
    });
  }
};
