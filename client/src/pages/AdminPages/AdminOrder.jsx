import React, { useEffect, useState } from "react";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:6969/admin/order");
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Delivery Method</th>
              <th>Payment Method</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Restaurant Name</th>
              <th>Restaurant Address</th>
              <th>Order Items</th>
              <th>Total Money Order</th> {/* New Attribute */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{new Date(order.orderAt).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>${order.totalPrice}</td>
                <td>{order.deliverInfo.deliveryMethod}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.customerId.name}</td>
                <td>{order.customerId.phone}</td>
                <td>{order.restaurantId.resName}</td>
                <td>{order.restaurantId.resAddress}</td>
                <td>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        Dish: {item.dishId.name} - Quantity: {item.quantity} - $
                        {item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                {/* New Total Money Order */}
                <td>
                  $
                  {order.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
};
export default AdminOrder;
