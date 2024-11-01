import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios"; // Import axios
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodListAPI, setFoodListAPI] = useState([]); // State để lưu food_list từ API
  const [menuListAPI, setMenuListAPI] = useState([]); // State để lưu menu_list từ API
  const [restaurantListAPI, setRestaurantListAPI] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Gọi API để lấy dữ liệu từ http://localhost:9999/
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy danh sách thực phẩm
        const foodResponse = await axios.get("http://localhost:9999/");
        if (foodResponse?.data?.data?.dishs) {
          setFoodListAPI(foodResponse.data.data.dishs); // Cập nhật state với dữ liệu từ API
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

        // Gọi API để lấy thông tin nhà hàng
        const restaurant = await axios.get("http://localhost:9999");
        if (restaurant?.data?.data?.restaurants) {
          setRestaurantListAPI(menuResponse.data.data.restaurants); // Cập nhật state với dữ liệu từ API
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

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        // Find the item in foodListAPI using the food ID
        const itemInfo = foodListAPI.find((product) => product._id === itemId);

        // Ensure itemInfo exists before accessing its properties
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity; // Adjusting to use the correct property for price
        }
      }
    }

    return totalAmount;
  };

  const placeOrder = (deliveryData) => {
    console.log(deliveryData);
  };

  const contextValue = {
    searchQuery,
    setSearchQuery,
    restaurantListAPI,
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
