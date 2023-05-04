const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbUri = require("./config/db.config");
const PORT = require("./config/server.config");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();
const coustomerRoute = require("./routes/customer.routes");
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes calls
userRoutes(app);
coustomerRoute(app);

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(PORT, async () => {
  console.log(process.env.URI);
  await mongoose
    .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
      () => console.log("successfully connected"),
      (err) => console.log(err)
    );

  console.log("server is listening to the port:", PORT);

  //connect to mongo db and it creates db also
});
