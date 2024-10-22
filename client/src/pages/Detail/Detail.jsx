// src/pages/Detail.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import "./Detail.css";
const Detail = () => {
  const { food_id } = useParams(); // Lấy ID món ăn từ URL
  const { food_list, addToCart, foodListAPI } = useContext(StoreContext); // Lấy addToCart từ StoreContext

  // Tìm món ăn dựa trên ID
  const foodItem = foodListAPI.find((item) => item.food_id == food_id);

  // Kiểm tra nếu không tìm thấy món ăn
  if (!foodItem) {
    return <div className="text-center">Món ăn không tồn tại.</div>;
  }

  return (
    <div className="container">
      <div className="row-detail">
        {" "}
        <div className="left-detail">
          <img
            src={foodItem.food_image}
            alt={foodItem.food_name}
            className="img-fluid"
          />
        </div>
        <div className="right-detail">
          {" "}
          <h2>Food name: {foodItem.food_name}</h2>
          <p className="text-muted">Description: {foodItem.food_desc}</p>
          <h4 className="text-danger">Price: {foodItem.food_price}₫</h4>
          <div className="mb-4">
            <p>Mới</p>
            <p> Khuyến mãi</p>
          </div>
          <Button
            className="button"
            variant="primary"
            size="lg"
            onClick={() => addToCart(foodItem.food_id)} // Thêm chức năng thêm vào giỏ hàng
          >
            Thêm vào giỏ hàng
          </Button>
          <Button
            className="button"
            variant="primary"
            size="lg"
            onClick={() => addToCart(foodItem.food_id)} // Thêm chức năng thêm vào giỏ hàng
          >
            Buy now
          </Button>
        </div>
      </div>

      <div className="detail-down">
        <h4>Mô tả chi tiết người bán</h4>
        <p>{foodItem.food_desc}</p>
      </div>
    </div>
  );
};

export default Detail;
