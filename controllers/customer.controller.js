const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const customerSetvice = require("../services/customer.service");

const addCustomerData = async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);
    const data = await customerSetvice.saveExcelDataToMongo(req.file);
    if (data) {
      return res.json({
        data: data,
        message: "successfully add the data",
        statusCode: 201,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: err, statusCode: 500 });
  }
};
const getAllCustomer = async (req, res) => {
  try {
    const data = await customerSetvice.getAllCustomer();
    return res.json({
      data: data,
      message: "successfully fetch the data",
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err, statusCode: 500 });
  }
};

const updateCustomerData = async (req, res) => {
  try {
    const data = await customerSetvice.updateCustomer(req.body, req.params);
    return res.json({
      data: data,
      message: "successfully update the data",
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err, statusCode: 500 });
  }
};

module.exports = { addCustomerData, getAllCustomer, updateCustomerData };
