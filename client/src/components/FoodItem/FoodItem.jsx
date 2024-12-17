import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ image, name, price, desc, id, category }) => {
  const { cartItems, updateCart } = useContext(StoreContext);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const navigate = useNavigate();

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentSubmit = () => {
    console.log(`Comment for ${name}:`, comment);
    setComment("");
    setShowCommentBox(false);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleDetailPage = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={image}
          alt=""
          onClick={handleDetailPage}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={(e) => {
              e.stopPropagation();
              updateCart(id, 1); // Set quantity to 1 if item is not in cart
            }}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={(e) => {
                e.stopPropagation();
                updateCart(id, cartItems[id] - 1); // Decrease quantity by 1
              }}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={(e) => {
                e.stopPropagation();
                updateCart(id, cartItems[id] + 1); // Increase quantity by 1
              }}
              alt="Add to cart"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p> <img src={assets.rating_stars} alt="Rating" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
      <button
        className={`wishlist-button ${isWishlisted ? "wishlisted" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist();
        }}
      >
        {isWishlisted ? "Wishlisted" : "Wishlist"}
      </button>
      <button
        className="comment-button"
        onClick={(e) => {
          e.stopPropagation();
          toggleCommentBox();
        }}
      >
        {showCommentBox ? "Cancel" : "Comment"}
      </button>
      {showCommentBox && (
        <div className="comment-box">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            className="enter-comment"
          />
          <button
            className="submit-comment-button"
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
