require("dotenv").config();
const mongoDbUri = process.env.URI;

module.exports = mongoDbUri;
