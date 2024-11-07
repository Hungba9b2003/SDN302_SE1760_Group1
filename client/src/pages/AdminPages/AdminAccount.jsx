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

const AdminAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:6969/admin/list-account");
        const data = await response.json();
        setAccounts(data);
        setFilteredAccounts(data);  // Initially show all accounts
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  const fetchAccountById = async (id) => {
    try {
      const response = await fetch(`http://localhost:6969/admin/account/${id}`);
      const data = await response.json();
      setSelectedAccount(data);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "All") {
      setFilteredAccounts(accounts);
    } else {
      const filtered = accounts.filter(
        (account) => account.role.toLowerCase() === selectedFilter.toLowerCase()
      );
      setFilteredAccounts(filtered);
    }
  };

  return (
    <div>
      <h1>Admin Accounts</h1>

      {/* Filter Dropdown */}
      <label htmlFor="filter">Filter by Role: </label>
      <select
        id="filter"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: "20px" }}
      >
        <option value="All">All</option>
        <option value="Customer">Customer</option>
        <option value="Restaurant">Restaurant</option>
      </select>

      {!selectedAccount ? (
        <>
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
        </>
      ) : (
        <>
          <h1>Account Details</h1>
          {selectedAccount.accounts.role.toUpperCase() === "CUSTOMER" ? (
            <CustomerDetails customer={selectedAccount.customer} />
          ) : (
            <RestaurantDetails restaurant={selectedAccount.restaurant} />
          )}
        </>
      )}
    </div>
  );
};

export default AdminAccount;
