const mongoose = require("mongoose");

const { Schema } = mongoose;

const excelSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

const excelModel = mongoose.model("Customer", excelSchema);
module.exports = excelModel;
