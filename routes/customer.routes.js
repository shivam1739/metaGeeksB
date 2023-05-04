const customerController = require("../controllers/customer.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const middelware = require("../middlewares/auth.validators");
const route = (app) => {
  app.post(
    "/meta-geeks/api/v1/add-customer/csv",
    middelware.isUserAuthenticated,
    middelware.isManager,
    upload.single("file"),
    (req, res) => customerController.addCustomerData(req, res)
  );
  app.get(
    "/meta-geeks/api/v1/customers",
    middelware.isUserAuthenticated,
    customerController.getAllCustomer
  );
  app.patch(
    "/meta-geeks/api/v1/customers/:id",
    middelware.isUserAuthenticated,
    customerController.updateCustomerData
  );
};
module.exports = route;
