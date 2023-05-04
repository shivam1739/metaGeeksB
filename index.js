const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbUri = require("./config/db.config");
const PORT = require("./config/server.config");
const userRoutes = require("./routes/user.routes");
const coustomerRoute = require("./routes/customer.routes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes calls
userRoutes(app);
coustomerRoute(app);

app.listen(PORT, () => {
  console.log("server is listening to the port:", PORT);

  //connect to mongo db and it creates db also
  mongoose.connect(dbUri);
});
