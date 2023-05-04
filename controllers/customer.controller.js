const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const customerSetvice = require("../services/customer.service");

const addCustomerData = async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);
    const data = await customerSetvice.saveExcelDataToMongo(req.file);
    if (data) {
      res
        .status(201)
        .send({ data: data, message: "successfully add the data" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};
const getAllCustomer = async (req, res) => {
  try {
    const data = await customerSetvice.getAllCustomer();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

const updateCustomerData = async (req, res) => {
  try {
    const data = await customerSetvice.updateCustomer(req.body, req.params);
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
};

module.exports = { addCustomerData, getAllCustomer, updateCustomerData };
