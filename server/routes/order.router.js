const { Router } = require("express");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const OrderRouter = Router();
OrderRouter.post("/create", async (req, res, next) => {
  const { restaurantId } = req.body;

  try {
    const customer = await Customer.findOne({ email: req.user.email }).populate(
      "cart.items.dishId"
    );
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    if (!customer.cart || customer.cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = customer.cart.items.map((item) => ({
      dishId: item.dishId._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = new Order({
      customerId: customer._id,
      restaurantId,
      items: orderItems,
      totalAmount: customer.cart.totalAmount,
    });

    await order.save();

    customer.cart = { items: [], totalAmount: 0 };
    await customer.save();

    res.json({ message: "Order created successfully", order });
  } catch (error) {
    next(error);
  }
});

OrderRouter.put("/update", async (req, res, next) => {
  const { orderId, status, items } = req.body;

  try {
    const order = await Order.findOne({
      _id: orderId,
      customerId: req.user.id,
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be updated" });
    }

    if (status) {
      if (!["Pending", "Completed", "Cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      order.status = status;
    }

    if (items && Array.isArray(items)) {
      items.forEach((itemUpdate) => {
        const itemIndex = order.items.findIndex(
          (item) => item.dishId.toString() === itemUpdate.dishId
        );
        if (itemIndex > -1 && itemUpdate.quantity > 0) {
          order.items[itemIndex].quantity = itemUpdate.quantity;
          order.items[itemIndex].price =
            itemUpdate.quantity * order.items[itemIndex].price;
        }
      });

      order.totalAmount = order.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }

    await order.save();

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    next(error);
  }
});

module.exports = OrderRouter;
