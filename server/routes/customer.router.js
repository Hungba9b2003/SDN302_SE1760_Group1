const { Router } = require("express");
const Customer = require("../models/Customer");
const Dish = require("../models/Dish");
const CustomerRouter = Router();
CustomerRouter.post("/", async (req, res) => {
  const { cartItems } = req.body; // Expecting { cartItems: [{ dishId, quantity }] }

  try {
    const customer = await Customer.findOne({ email: req.user.email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (
      !Array.isArray(cartItems) ||
      !cartItems.every((item) => item.dishId && item.quantity >= 0)
    ) {
      return res.status(400).json({ message: "Invalid cart items format" });
    }

    customer.cart.items = cartItems.map(({ dishId, quantity }) => ({
      dishId,
      quantity,
    }));

    const totalAmount = customer.cart.items.reduce((total, item) => {
      const dish = item.dishId;
      return total + dish.price * item.quantity;
    }, 0);

    customer.cart.totalAmount = totalAmount;

    await customer.save();

    res.json({ message: "Cart updated successfully", cart: customer.cart });
  } catch (error) {
    next(error);
  }
});

module.exports = CustomerRouter;
