import React, { useState, useEffect } from 'react';
import AdminResNavbar from '../../components/AdminComponents/AdminResNavbar';
import AdminResSidebar from '../../components/AdminComponents/AdminResSidebar';
import '../../module/adminRes.css';

const AdminResFeedbackRating = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Gọi API từ backend để lấy dữ liệu đánh giá và phản hồi
    fetch('/api/admin/feedback-rating')
      .then(response => response.json())
      .then(data => setFeedbacks(data))
      .catch(error => console.error('Error fetching feedback and ratings:', error));
  }, []);

  return (
    <div className="adminres-container">
      <AdminResNavbar />
      <div className="adminres-content">
        <AdminResSidebar />
        <div className="adminres-main">
          <h1>Feedback & Report Management</h1>
          <div className="feedback-rating-list">
          <table className="table feedback-table">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Dish</th>
                  <th>Feedback</th>
                  <th>Rating</th>
                  <th>Username</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.productName}</td>
                    <td>{feedback.rating} ⭐</td>
                    <td>{feedback.comment}</td>
                    <td>{feedback.username}</td>
                    <td>{new Date(feedback.date).toLocaleDateString()}</td>
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

export default AdminResFeedbackRating;
