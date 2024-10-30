const { Router } = require("express");
const Customer = require("../models/Customer");
const Dish = require("../models/Dish");
const CustomerRouter = Router();
CustomerRouter.post("/cart/add", async (req, res, next) => {
  try {
    const { dishId, quantity } = req.body;

    const customer = await Customer.findOne({ email: req.user.email });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const dish = await Dish.findById(dishId);
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    const itemIndex = customer.cart.items.findIndex(
      (item) => item.dishId.toString() === dishId
    );

    if (itemIndex > -1) {
      customer.cart.items[itemIndex].quantity += quantity;
    } else {
      customer.cart.items.push({
        dishId: dish._id,
        quantity,
        price: dish.price,
      });
    }

    customer.cart.totalAmount = customer.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await customer.save();
    res.json({ message: "Item added to cart", cart: customer.cart });
  } catch (error) {
    next(error);
  }
});

CustomerRouter.delete("/cart/remove", async (req, res, next) => {
  const { dishId } = req.body;

  try {
    const customer = await Customer.findOne({ email: req.user.email });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const itemIndex = customer.cart.items.findIndex(
      (item) => item.dishId.toString() === dishId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    customer.cart.items.splice(itemIndex, 1);

    customer.cart.totalAmount = customer.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await customer.save();

    res.json({ message: "Item removed from cart", cart: customer.cart });
  } catch (error) {
    next(error);
  }
});

module.exports = CustomerRouter;
