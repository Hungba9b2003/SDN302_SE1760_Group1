// src/pages/Detail.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import "./Detail.css";

const Detail = () => {
  const { food_id } = useParams(); // Lấy ID món ăn từ URL
  const { addToCart, foodListAPI, restaurantListAPI } =
    useContext(StoreContext); // Lấy addToCart từ StoreContext

  // Tìm món ăn dựa trên ID
  const foodItem = foodListAPI.find((item) => item._id === food_id);

  // Kiểm tra nếu không tìm thấy món ăn
  if (!foodItem) {
    return <div className="text-center">Món ăn không tồn tại.</div>;
  }

  // Tìm thông tin nhà hàng dựa trên restaurantId của món ăn
  const restaurant = restaurantListAPI.find(
    (rest) => rest.restaurantId === foodItem.restaurantId
  );

  // Kiểm tra nếu không tìm thấy nhà hàng
  if (!restaurant) {
    return (
      <div className="text-center">Không tìm thấy thông tin nhà hàng.</div>
    );
  }

  return (
    <div className="container">
      <div className="row-detail">
        <div className="left-detail">
          {/* Hiển thị hình ảnh đầu tiên trong danh sách ảnh */}
          <img
            src={
              Object.values(foodItem.image[0])
                .join("")
                .match(/.*\.(jpg|png)/i)?.[0] || "" // Lấy URL đến .jpg hoặc .png
            }
            alt={foodItem.name}
            className="img-fluid"
          />
        </div>
        <div className="right-detail">
          <h2>Food name: {foodItem.name}</h2>
          <p className="text-muted">Description: {foodItem.description}</p>
          <h4 className="text-danger">Price: {foodItem.price}₫</h4>
          <div className="mb-4">
            <Badge variant="success">Mới</Badge>
            <Badge variant="warning">Khuyến mãi</Badge>
          </div>
          <Button
            className="button"
            variant="primary"
            size="lg"
            onClick={() => addToCart(foodItem._id)} // Thêm chức năng thêm vào giỏ hàng
          >
            Thêm vào giỏ hàng
          </Button>
          <Button
            className="button"
            variant="primary"
            size="lg"
            onClick={() => addToCart(foodItem._id)} // Thêm chức năng thêm vào giỏ hàng
          >
            Buy now
          </Button>
        </div>
      </div>

      <div className="detail-down">
        <div className="seller-details">
          <h2>Thông tin chi tiết người bán</h2>

          {/* Tên người bán */}
          <div className="seller-info">
            <strong>Tên:</strong> {restaurant.resName}
          </div>

          {/* Địa chỉ người bán */}
          <div className="seller-info">
            <strong>Địa chỉ:</strong> {restaurant.resAddress}
          </div>

          {/* Hình ảnh người bán */}
          <div className="seller-info">
            <strong>Hình ảnh:</strong>
            <img
              src={restaurant.restImage}
              alt="Seller"
              className="seller-image"
            />
          </div>

          {/* Trạng thái người bán */}
          <div className="seller-info">
            <strong>Trạng thái:</strong> {restaurant.status}
          </div>

          {/* Đánh giá người bán */}
          <div className="seller-info">
            <strong>Đánh giá:</strong> 5 / 5
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
