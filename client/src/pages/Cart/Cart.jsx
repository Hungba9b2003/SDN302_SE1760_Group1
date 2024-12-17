import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, foodList, updateCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  // Local state to track item quantities before updating cart
  const [quantities, setQuantities] = useState(
    Object.keys(cartItems).reduce((acc, itemId) => {
      acc[itemId] = cartItems[itemId];
      return acc;
    }, {})
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));
  };

  const handleQuantityBlur = (itemId) => {
    const newQuantity = quantities[itemId];
    if (newQuantity > 0) {
      updateCart(itemId, newQuantity);
    } else {
      updateCart(itemId, 0); // Remove item if quantity is 0
    }
  };

  const handleRemoveItem = (itemId) => {
    updateCart(itemId, 0); // Remove item by setting quantity to 0
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p>{" "}
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <input
                    type="number"
                    min="0"
                    value={quantities[item._id] || 0}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                    onBlur={() => handleQuantityBlur(item._id)}
                    className="cart-item-quantity-input"
                  />
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    className="cart-items-remove-icon"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
              </b>
            </div>
          </div>
          <button onClick={() => alert("Checkout is disabled for now.")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
