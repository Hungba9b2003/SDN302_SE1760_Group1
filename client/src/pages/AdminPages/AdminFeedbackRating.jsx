import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";
import "../../module/admin.css";

const AdminFeedbackRating = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      productName: "Pizza Hut (Main St)",
      dishName: "Margherita Pizza", // New column for dish name
      comment:
        "The crust was a bit too dry, but the sauce and cheese were delicious.",
      rating: 4,
      username: "JohnDoe123",
      date: new Date("2024-10-08").toISOString(), // Example date
    },
    {
      id: 2,
      productName: "Sushi Paradise",
      dishName: "California Roll", // New column for dish name
      comment: "Excellent quality and fresh ingredients!",
      rating: 5,
      username: "JaneSmith",
      date: new Date("2024-10-07").toISOString(), // Example date
    },
  ]);

  // Function to handle editing a feedback
  const handleEditFeedback = (id, editedFeedback) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, ...editedFeedback } : feedback
      )
    );
  };

  // Function to handle deleting a feedback
  const handleDeleteFeedback = (id) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.filter((feedback) => feedback.id !== id)
    );
  };

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main">
          <h1>Feedback & Report Management</h1>
          <div className="feedback-rating-list">
            <table className="table feedback-table">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Dish</th> {/* New column for dish name */}
                  <th>Feedback</th>
                  <th>Rating</th>
                  <th>Username</th>
                  <th>Date</th>
                  <th>Actions</th> {/* Added column for edit/delete buttons */}
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.productName}</td>
                    <td>{feedback.dishName}</td>{" "}
                    {/* New column for dish name */}
                    <td>{feedback.comment}</td>
                    <td>{feedback.rating} ⭐</td>
                    <td>{feedback.username}</td>
                    <td>{new Date(feedback.date).toLocaleDateString()}</td>
                    <td>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedbackRating;
