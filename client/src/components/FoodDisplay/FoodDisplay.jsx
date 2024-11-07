import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { foodListAPI, searchQuery } = useContext(StoreContext);

  // Filter the food items based on category and searchQuery
  const filteredFoodList = foodListAPI.filter((item) => {
    // Kiểm tra xem món ăn có thuộc danh mục đã chọn hoặc thỏa mãn các điều kiện bổ sung
    const isInCategory =
      category === "All" ||
      (Array.isArray(item?.categories) &&
        item.categories.some((cat) => cat.name === category)) ||
      category === item?.categories?.name;

    // Kiểm tra nếu tên món ăn khớp hoàn toàn với searchQuery (nếu có)
    const matchesSearchQuery =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.toLowerCase() === item.name.toLowerCase();

    // Chỉ trả về item nếu thỏa mãn cả hai điều kiện
    return isInCategory && matchesSearchQuery;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item) => (
            <FoodItem
              key={item._id}
              image={
                item.image && item.image[0]
                  ? `${
                      Object.values(item.image[0]).join("").split(".png")[0]
                    }.png`
                  : "/path/to/default-image.png"
              }
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))
        ) : (
          <p>No dishes match your search.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
