import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [menuList, setMenuList] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:6969/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const fetchMenuList = async () => {
    try {
      const response = await axiosInstance.get("/dish/categories");
      setMenuList(response.data.categories);
    } catch (error) {
      console.error("Error fetching menu categories:", error);
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axiosInstance.get("/dish");
      setFoodList(response.data.dishes);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    fetchMenuList();
    fetchFoodList();
  }, [token]);

  const updateCart = async (itemId, newQuantity) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (newQuantity > 0) {
        updatedCart[itemId] = newQuantity;
      } else {
        delete updatedCart[itemId];
      }

      // Call API if token exists, otherwise only update the state
      if (token) {
        const cartItemsArray = Object.keys(updatedCart).map((dishId) => ({
          dishId,
          quantity: updatedCart[dishId],
        }));

        axiosInstance
          .post("/cart", { cartItems: cartItemsArray })
          .catch((error) => {
            console.error("Error updating cart:", error);
          });
      }

      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const itemInfo = foodList.find((dish) => dish._id === itemId);
      return total + (itemInfo ? itemInfo.price * cartItems[itemId] : 0);
    }, 0);
  };

  const placeOrder = async (deliveryData) => {
    if (token) {
      try {
        const response = await axiosInstance.post("/order/create", {
          restaurantId: deliveryData.restaurantId,
          items: cartItems,
        });
        setOrdersData((prev) => ({
          ...prev,
          [response.data.order._id]: response.data.order,
        }));
        setCartItems({});
        console.log("Order placed successfully:", response.data);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    } else {
      console.warn("User must be logged in to place an order.");
    }
  };

  const contextValue = {
    foodList,
    menuList,
    cartItems,
    updateCart,
    getTotalCartAmount,
    placeOrder,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
