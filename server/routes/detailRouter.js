const express = require("express");
const { DetailController } = require("../controller");

const detailRouter = express.Router();

// Route: Lấy một chi tiết cụ thể theo ID
detailRouter.get("/:id", DetailController.getById);

module.exports = detailRouter;
