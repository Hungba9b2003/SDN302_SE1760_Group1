const Order = require("../models/Order");
const Report = require("../models/Report");
const Customer = require("../models/Customer");
const Account = require("../models/Account");
const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");
const Review = require("../models/Review");
const mongoose = require("mongoose");
//DASHBOARD
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.find()
      .populate("customerId")
      .populate("restaurantId")
      .populate({
        path: "items.dishId", // Populate dish details inside items array
        model: "Dish",
      })
      .exec();

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
//REPORT MANAGEMENT
const getReport = async (req, res, next) => {
  try {
    const report = await Report.find({})
      .populate("customerId")
      .populate("restaurantId")
      .exec();

    res.status(200).json({
      message: "List of report",
      data: {
        orders: report,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getReportbyCustomer = async (req, res, next) => {
  const { id } = req.params;

  try {
    const reports = await Report.find({ customerId: id });

    if (!reports || reports.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports found for this customer." });
    }

    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving reports", error: error.message });
  }
};
const getReportByRestaurant = async (req, res, next) => {
  const { id } = req.params;

  try {
    const reports = await Report.find({ restaurantId: id });

    if (!reports || reports.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports found for this restaurant." });
    }

    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving reports", error: error.message });
  }
};
//ACCOUT MANAGEMENT
//get list account
const getListAccount = async (req, res, next) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get list account (contain more infor)
const getAccountInfoById = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    const accounts = await Account.findById(req.params.id);
    if (!accounts) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (accounts.role === "Customer") {
      const customer = await Customer.findById(accountId).populate("orders");

      console.log(customer);
      res.status(200).json({ accounts, customer });
    }
    if (accounts.role === "Restaurant") {
      const restaurant = await Restaurant.findById(accountId);
      res.status(200).json({ accounts, restaurant });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//create new account
//delete account
const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Review.find()
      .populate("dishId")
      .populate("customerId")
      .exec();
    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

//CUSTOMER MANAGEMENT
//create new customer
const createCustomer = async (req, res) => {
  try {
    const newId = new mongoose.Types.ObjectId();
    const { customerData, accountData } = req.body; // Destructure data from request body
    const newCustomer = new Customer({
      ...customerData,
      _id: newId,
    });
    const newAccount = new Account({
      ...accountData,
      _id: newId,
    });
    await newCustomer.save();
    await newAccount.save();

    res.status(201).json({
      message: "Customer and account created successfully",
      customer: newCustomer,
      account: newAccount,
    });
  } catch (error) {
    // Handle validation errors or other issues
    res.status(400).json({ message: error.message });
  }
};
//get list customer
const getListCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("orders");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get customer by Id
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("orders");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update customer by Id
const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the current customer document to check existing values
    const currentCustomer = await Customer.findById(id);
    if (!currentCustomer) {
      return res.status(404).send("Customer not found");
    }

    // Prepare update operations
    const updateOperations = {
      $set: {}, // For setting fields
      $push: {}, // For pushing to arrays
    };

    // If req.body has fields to update directly, add them to $set
    Object.keys(req.body).forEach((key) => {
      if (key !== "orders" && key !== "carts") {
        updateOperations.$set[key] = req.body[key]; // Set other fields
      }
    });

    // Check if orders is provided and add to $push if not already present
    if (req.body.orders) {
      const ordersToAdd = Array.isArray(req.body.orders)
        ? req.body.orders
        : [req.body.orders];
      const newOrders = ordersToAdd.filter(
        (order) => !currentCustomer.orders.includes(order)
      ); // Filter out existing orders

      if (newOrders.length > 0) {
        updateOperations.$push.orders = { $each: newOrders }; // Push new orders if any
      }
    }

    // Check if cart information is provided
    if (req.body.newDishId && req.body.quantity && req.body.price) {
      // Check if this dishId is already in the carts
      const existingCartItem = currentCustomer.carts.find(
        (cart) => cart.dishId.toString() === req.body.newDishId
      );

      if (!existingCartItem) {
        // If not found, push new cart item
        updateOperations.$push.carts = {
          dishId: req.body.newDishId,
          quantity: req.body.quantity,
          price: req.body.price,
        };
      }
    }

    // Perform the update only if there's something to update
    if (
      Object.keys(updateOperations.$push).length > 0 ||
      Object.keys(updateOperations.$set).length > 0
    ) {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        updateOperations,
        { new: true, runValidators: true } // Validate and return updated document
      );

      res
        .status(200)
        .json({ message: "Update successful", customer: updatedCustomer });
    } else {
      res.status(200).json({
        message: "No changes made, customer is already up to date",
        customer: currentCustomer,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete customer
const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to find and delete the customer by ID
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
      customer: deletedCustomer,
      account: deletedAccount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//RESTAURANT MANAGEMENT
const createRestaurant = async (req, res) => {
  try {
    const newId = new mongoose.Types.ObjectId();
    const { resData, accountData } = req.body;
    const newRes = new Restaurant({
      ...resData,
      _id: newId,
    });
    const newAccount = new Account({
      ...accountData,
      _id: newId,
    });
    await newRes.save();
    await newAccount.save();

    res.status(201).json({
      message: "Restaurant and account created successfully",
      restaurant: newRes,
      account: newAccount,
    });
  } catch (error) {
    // Handle validation errors or other issues
    res.status(400).json({ message: error.message });
  }
};
const getListRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateRestaurantById = async (req, res) => {
  try {
    const { id } = req.params; // Get the restaurant ID from the request parameters
    const updateData = req.body; // Data to update, expected from the request body

    // Use findByIdAndUpdate to partially update the restaurant document
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Returns the updated document
        runValidators: true, // Ensures the data meets schema validation rules
      }
    );

    // Check if the restaurant was found and updated
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Send the updated restaurant data in response
    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to find and delete the customer by ID
    const deletedRes = await Restaurant.findByIdAndDelete(id);
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedRes) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      message: "Restaurant deleted successfully",
      customer: deletedRes,
      account: deletedAccount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFeedback,
  getOrder,
  getReport,
  createCustomer,
  getListCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  getListAccount,
  getAccountInfoById,
  getRestaurantById,
  getListRestaurant,
  updateRestaurantById,
  createRestaurant,
  deleteRestaurantById,
  getReportByRestaurant,
  getReportbyCustomer,
};
