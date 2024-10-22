import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios"; // Import axios
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [foodListAPI, setFoodListAPI] = useState([]); // State để lưu food_list từ API
  const [menuListAPI, setMenuListAPI] = useState([]); // State để lưu menu_list từ API
  // Gọi API để lấy dữ liệu từ http://localhost:9999/
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy danh sách thực phẩm
        const foodResponse = await axios.get("http://localhost:9999/");
        if (foodResponse?.data?.data?.Foods) {
          setFoodListAPI(foodResponse.data.data.Foods); // Cập nhật state với dữ liệu từ API
        } else {
          console.warn("Không tìm thấy 'Foods' trong dữ liệu trả về từ API.");
        }

        // Gọi API để lấy danh sách menu
        const menuResponse = await axios.get("http://localhost:9999");
        if (menuResponse?.data?.data?.categories) {
          setMenuListAPI(menuResponse.data.data.categories); // Cập nhật state với dữ liệu từ API
        } else {
          console.warn(
            "Không tìm thấy 'categories' trong dữ liệu trả về từ API."
          );
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchData();
  }, []); // Chỉ chạy một lần sau khi component được render

  console.log(menuListAPI);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find(
          (product) => product.food_id === Number(item)
        );
        totalAmount += itemInfo.food_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const placeOrder = (deliveryData) => {
    console.log(deliveryData);
  };

  const contextValue = {
    menuListAPI,
    foodListAPI,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
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
