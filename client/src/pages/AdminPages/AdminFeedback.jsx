import React, { useEffect, useState } from "react";

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch("http://localhost:6969/admin/feedback");
        if (!response.ok) throw new Error("Failed to fetch feedback data");
        const data = await response.json();
        setFeedbackData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching feedback data:", err);
        setError("Could not load feedback data");
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dish Feedback</h1>
      {feedbackData.length === 0 ? (
        <p style={styles.noFeedback}>No feedback available.</p>
      ) : (
        <div style={styles.feedbackContainer}>
          {feedbackData.map((feedback) => {
            const imageUrl = feedback.dishId.image[0]
              ? Object.values(feedback.dishId.image[0]).join("")  // Concatenate image URL
              : "";

            return (
              <div key={feedback._id} style={styles.feedbackCard}>
                {/* Dish Info */}
                <div style={styles.dishInfo}>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={feedback.dishId.name}
                      style={styles.dishImage}
                    />
                  )}
                  <div>
                    <h2 style={styles.dishName}>{feedback.dishId.name}</h2>
                    <p style={styles.dishDescription}>{feedback.dishId.description}</p>
                    <p style={styles.dishPrice}>${feedback.dishId.price}</p>
                  </div>
                </div>
                {/* Feedback Info */}
                <div style={styles.feedbackInfo}>
                  <p style={styles.rating}>Rating: {feedback.rating}/5</p>
                  <p style={styles.feedbackDate}>
                    Date: {new Date(feedback.date).toLocaleString()}
                  </p>
                  <p style={styles.feedbackDescription}>{feedback.description}</p>
                </div>
                {/* Customer Info */}
                {feedback.customerId ? (
                  <div style={styles.customerInfo}>
                    <p style={styles.customerName}>
                      <strong>Customer:</strong> {feedback.customerId.name}
                    </p>
                    <p style={styles.customerPhone}>
                      <strong>Phone:</strong> {feedback.customerId.phone}
                    </p>
                  </div>
                ) : (
                  <p style={styles.noCustomer}>Anonymous feedback</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  noFeedback: {
    fontSize: "18px",
    textAlign: "center",
    color: "#555",
  },
  feedbackContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  feedbackCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  dishInfo: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  dishImage: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  dishName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  dishDescription: {
    fontSize: "14px",
    color: "#555",
  },
  dishPrice: {
    fontSize: "16px",
    color: "#4CAF50",
    fontWeight: "bold",
  },
  feedbackInfo: {
    paddingTop: "10px",
  },
  rating: {
    fontSize: "16px",
    color: "#f39c12",
  },
  feedbackDate: {
    fontSize: "12px",
    color: "#888",
  },
  feedbackDescription: {
    fontSize: "14px",
    color: "#333",
  },
  customerInfo: {
    paddingTop: "10px",
    borderTop: "1px solid #eee",
  },
  customerName: {
    fontSize: "14px",
    color: "#333",
  },
  customerPhone: {
    fontSize: "14px",
    color: "#333",
  },
  noCustomer: {
    fontSize: "14px",
    color: "#888",
    fontStyle: "italic",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
};

export default FeedbackPage;
