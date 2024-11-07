const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");

adminRouter.get("/order", adminController.getOrder);
//money calculating

adminRouter.get("/report", adminController.getReport);
adminRouter.get("/reportByCustomer/:id", adminController.getReportbyCustomer);
adminRouter.get("/reportByRestaurant/:id", adminController.getReportByRestaurant);

adminRouter.get("/feedback",adminController.getFeedback);

adminRouter.post("/customer", adminController.createCustomer);
adminRouter.get("/list-customer", adminController.getListCustomers);
adminRouter.get("/customer/:id", adminController.getCustomerById);
adminRouter.put("/customer/:id", adminController.updateCustomerById);
adminRouter.delete("/customer/:id", adminController.deleteCustomerById);

adminRouter.get("/list-account/", adminController.getListAccount);
adminRouter.get("/account/:id", adminController.getAccountInfoById);

adminRouter.post("/restaurant", adminController.createRestaurant);
adminRouter.get("/list-restaurant", adminController.getListRestaurant);
adminRouter.get("/restaurant/:id", adminController.getRestaurantById);
adminRouter.put("/restaurant/:id", adminController.updateRestaurantById);
adminRouter.delete("/restaurant/:id", adminController.deleteRestaurantById);

module.exports = adminRouter;
