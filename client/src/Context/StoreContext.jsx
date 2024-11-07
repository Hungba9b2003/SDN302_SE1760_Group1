import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodListAPI, setFoodListAPI] = useState([]); // State để lưu food_list từ API
  const [menuListAPI, setMenuListAPI] = useState([]); // State để lưu menu_list từ API
  const [restaurantListAPI, setRestaurantListAPI] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ordersData, setOrdersData] = useState({}); // State để lưu dữ liệu đơn hàng

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
  }, []);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:6969/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const fetchMenuList = async () => {
    try {
      const response = await axiosInstance.get("/dish/categories");
      setMenuListAPI(response.data.categories); // Cập nhật state với dữ liệu menu list
    } catch (error) {
      console.error("Error fetching menu categories:", error);
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axiosInstance.get("/dish");
      setFoodListAPI(response.data.dishes); // Cập nhật state với dữ liệu food list
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
      const itemInfo = foodListAPI.find((dish) => dish._id === itemId); // Sử dụng foodListAPI thay vì foodList
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
        setCartItems({}); // Xóa giỏ hàng sau khi đặt hàng thành công
        console.log("Order placed successfully:", response.data);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    } else {
      console.warn("User must be logged in to place an order.");
    }
  };

  const contextValue = {
    searchQuery,
    setSearchQuery,
    restaurantListAPI,
    menuListAPI,
    foodListAPI, // Truyền foodListAPI thay vì food_list
    cartItems,
    updateCart,
    getTotalCartAmount,
    placeOrder,
    ordersData, // Thêm ordersData vào context để có thể sử dụng ở các component con
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
