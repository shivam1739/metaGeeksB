const Customer = require("../models/excel.model");
const XLSX = require("xlsx");
const saveExcelDataToMongo = async (filePath) => {
  const workbook = XLSX.readFile(filePath.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  console.log(jsonData);
  const data = await Customer.create(jsonData);
  return data;
};
const getAllCustomer = async () => {
  try {
    const response = await Customer.find();
    return response;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
const updateCustomer = async (updateData, data) => {
  try {
    const response = Customer.findOneAndUpdate(
      { _id: data.id },
      {
        name: updateData.name,
        email: updateData.email,
        age: updateData.age,
        phoneNumber: updateData.phoneNumber,
        address: updateData.address,
      },
      { new: true }
    );
    return response;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

module.exports = { saveExcelDataToMongo, getAllCustomer, updateCustomer };
