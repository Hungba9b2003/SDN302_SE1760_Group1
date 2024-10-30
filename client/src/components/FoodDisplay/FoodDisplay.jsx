import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { foodListAPI } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodListAPI.map((item) => {
          // Log ra categories để kiểm tra
          {
            /* console.log("item?.categories:", item?.categories); */
          }

          // Kiểm tra nếu category là "All" hoặc nếu categories là mảng và có ít nhất một category trong mảng categories khớp với category
          const isInCategory =
            category === "All" ||
            (Array.isArray(item?.categories) &&
              item.categories.some((cat) => cat.name === category));

          if (isInCategory || category === item?.categories?.name) {
            return (
              <FoodItem
                key={item._id}
                image={
                  Object.values(item.image[0]).join("").split(".png")[0] +
                  ".png"
                }
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            );
          }
          return null; // Trả về null nếu không thuộc category
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
