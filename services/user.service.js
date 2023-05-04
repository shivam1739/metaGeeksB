const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const roleConstants = require("../constants/user.constants");

const createUser = async (data, params) => {
  console.log(data, "data=============");
  try {
    const userObj = {
      name: data.name,
      email: data.email,
      role: params.role,
      password: data.password,
    };
    const newUser = await User.create(userObj);
    return newUser;
  } catch (err) {
    console.log("error:", err);
    return err.message;
  }
};

const verifyUserByEmail = async (data) => {
  const response = {};
  try {
    const userData = await User.findOne({ email: data.email });
    console.log(userData);
    if (userData == null) {
      //if user not found
      response.error = "Invalid Email";
    } else {
      // if user found then compare password also
      const result = bcrypt.compareSync(data.password, userData.password);
      console.log(result);

      if (result) {
        response.success = true;
      } else {
        response.error = "Invalid Password";
      }
    }
    return response;
  } catch (err) {
    console.log("Error", err);
    response.error = err.message;
    return response;
  }
};

const verifyJwttoken = (token) => {
  try {
    var decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodedToken;
  } catch (err) {
    return err.message;
  }
};

const getUserByEmail = async (data) => {
  try {
    let userInfo = await User.findOne({
      email: data.email,
    });
    return userInfo;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = {
  createUser,
  verifyUserByEmail,
  verifyJwttoken,
  getUserByEmail,
};
