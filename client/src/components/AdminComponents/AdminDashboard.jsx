import React, { useState, useEffect } from "react";

const CustomerDetails = ({ customer }) => (
  <div>
    <h2>Customer Details</h2>
    <img
      src={customer.avatar}
      alt="Customer Avatar"
      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
    />
    <p>
      <strong>Name:</strong> {customer.name}
    </p>
    <p>
      <strong>Phone:</strong> {customer.phone}
    </p>

    <h3>Address</h3>
    {customer.address.map((addr) => (
      <div key={addr._id} style={{ marginBottom: "10px" }}>
        <p>
          <strong>Location:</strong> {addr.location}
        </p>
        <p>
          <strong>Phone:</strong> {addr.phone}
        </p>
      </div>
    ))}

    <h3>Orders</h3>
    {customer.orders.length > 0 ? (
      customer.orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Delivery Method:</strong> {order.deliverInfo.deliveryMethod}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <h4>Items</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item._id}>
                Dish ID: {item.dishId.name} - Quantity: {item.quantity} - Price:
                ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p>No orders available</p>
    )}
  </div>
);

const RestaurantDetails = ({ restaurant }) => (
  <div>
    <h2>Restaurant Details</h2>
    <p>Name: {restaurant.resName}</p>
    <p>Address: {restaurant.resAddress}</p>
    <div>
      <h3>Images</h3>
      {restaurant.restImage.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Restaurant Image ${index + 1}`}
          style={{ width: "100px", height: "100px", marginRight: "10px" }}
        />
      ))}
    </div>
    <p>Status: {restaurant.status}</p>
    <p>Approved: {restaurant.approved ? "Yes" : "No"}</p>
    <p>
      Approval Date: {new Date(restaurant.approvalDate).toLocaleDateString()}
    </p>
    <h3>Menu</h3>
    <ul>
      {restaurant.menu.map((dish) => (
        <li key={dish.dishId}>
          Dish ID: {dish.dishId} - Status: {dish.status}
        </li>
      ))}
    </ul>
    <h3>Revenue Reports</h3>
    <ul>
      {restaurant.revenueReport.map((report) => (
        <li key={report}>{report}</li>
      ))}
    </ul>
    <img src={restaurant.IDPhoto} alt="ID Photo" />
  </div>
);

const AdminDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [view, setView] = useState("All");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [statistics, setStatistics] = useState({
    totalCustomers: 0,
    totalRestaurants: 0,
    pendingRestaurants: 0,
    totalOrders: 0,
  });

  // Fetch all accounts and statistics on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/admin/list-account"
        );
        const data = await response.json();
        console.log(data);
        setAccounts(data);
        setFilteredAccounts(data); // Initial state shows all accounts

        const customerCount = Array.isArray(data)
          ? data.filter((acc) => acc.role?.toLowerCase() === "customer").length
          : 0;

        const restaurantCount = Array.isArray(data)
          ? data.filter((acc) => acc.role?.toLowerCase() === "restaurant")
              .length
          : 0;

        const pendingRestaurants = Array.isArray(data)
          ? data.filter(
              (acc) =>
                // acc.role?.toLowerCase() === "restaurant" &&
                acc.status?.toLowerCase() === "disable"
            ).length
          : 0;

        setStatistics({
          totalCustomers: customerCount,
          totalRestaurants: restaurantCount,
          pendingRestaurants: pendingRestaurants,
          // totalOrders: totalOrders,
        });
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // Filter accounts based on selected view
  useEffect(() => {
    if (view === "All") {
      setFilteredAccounts(accounts);
    } else {
      setFilteredAccounts(accounts.filter((account) => account.role === view));
    }
  }, [view, accounts]);

  // Fetch individual account details by ID
  const fetchAccountById = async (id) => {
    try {
      const response = await fetch(`http://localhost:6969/admin/account/${id}`);
      const data = await response.json();
      setSelectedAccount(data);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  return (
    <div>
      {/* Statistics Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>Total Customers: {statistics.totalCustomers}</h3>
        </div>
        <div>
          <h3>Total Restaurants: {statistics.totalRestaurants}</h3>
        </div>
        <div>
          <h3>InActive Restaurants: {statistics.pendingRestaurants}</h3>
        </div>
        <div>
          <h3>Total Orders: {statistics.totalOrders}</h3>
        </div>
      </div>

      {/* Navigation Tabs for Filtering */}
      <div>
        <button onClick={() => setView("All")}>All</button>
        <button onClick={() => setView("Customer")}>Customers</button>
        <button onClick={() => setView("Restaurant")}>Restaurants</button>
      </div>

      {/* Account Table */}
      {!selectedAccount ? (
        <div>
          <h2>Accounts List</h2>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr
                  key={account._id}
                  onClick={() => fetchAccountById(account._id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{account.email}</td>
                  <td>{account.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Display Account Details based on Role
        <div>
          <button onClick={() => setSelectedAccount(null)}>
            Back to Accounts
          </button>
          {selectedAccount.accounts.role.toUpperCase() === "CUSTOMER" ? (
            <CustomerDetails customer={selectedAccount.customer} />
          ) : (
            <RestaurantDetails restaurant={selectedAccount.restaurant} />
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
