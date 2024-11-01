import React, { useContext } from "react";
import "./Checkout.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, foodListAPI } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p>{" "}
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodListAPI.map((item, index) => {
          const quantity = cartItems[item._id] || 0; // Lấy số lượng từ giỏ hàng, mặc định là 0 nếu không có
          if (quantity > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  {/* Hiển thị hình ảnh đầu tiên trong danh sách ảnh */}
                  <img
                    src={
                      Object.values(item.image[0]).join("").split(".jpg")[0] +
                      ".jpg"
                    }
                    alt={item.name}
                  />

                  {/* Hiển thị tên món ăn */}
                  <p>{item.name}</p>

                  {/* Hiển thị giá của món ăn */}
                  <p>${item.price}</p>

                  {/* Hiển thị số lượng của món ăn trong giỏ */}
                  <div>{quantity}</div>

                  <p>${item.price * quantity}</p>

                  <p
                    className="cart-items-remove-icon"
                    onClick={() => removeFromCart(item._id)}
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
          <button onClick={() => navigate("/order")}>
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

export default Checkout;
