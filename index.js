const mongoose = require("mongoose");
const express = require("express");
const app = express();
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
