import React, { useState, useEffect } from "react";
import "../../module/admincustomer.css";

const AdminRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    resData: {
      resName: "",
      resAddress: "",
      restImage: [],
      status: "enable",
      approved: false,
      menu: [],
      revenueReport: [],
    },
    accountData: {
      email: "",
      password: "",
      role: "restaurant",
    },
  });

  // Fetch the list of restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        "http://localhost:6969/admin/list-restaurant"
      );
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      resData: {
        ...prevData.resData,
        [name]: value,
      },
    }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      accountData: {
        ...prevData.accountData,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = selectedRestaurant ? "PUT" : "POST";
      const url = selectedRestaurant
        ? `http://localhost:6969/admin/restaurant/${selectedRestaurant._id}`
        : "http://localhost:6969/admin/restaurant";

      const requestData = selectedRestaurant
        ? formData.resData
        : { resData: formData.resData, accountData: formData.accountData };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error: ${errorDetails.message}`);
      }

      // Reset form and update restaurant list
      setFormData({
        resData: {
          resName: "",
          resAddress: "",
          restImage: [],
          status: "enable",
          approved: false,
          menu: [],
          revenueReport: [],
        },
        accountData: {
          email: "",
          password: "",
          role: "restaurant",
        },
      });
      setSelectedRestaurant(null);
      fetchRestaurants();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message);
    }
  };

  const handleEdit = (restaurant) => {
    setFormData({
      resData: {
        resName: restaurant.resName,
        resAddress: restaurant.resAddress,
        restImage: restaurant.restImage || [],
        status: restaurant.status,
        approved: restaurant.approved,
        menu: restaurant.menu || [],
        revenueReport: restaurant.revenueReport || [],
      },
      accountData: {
        email: restaurant.email || "",
        password: "",
        role: restaurant.role || "restaurant",
      },
    });
    setSelectedRestaurant(restaurant);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await fetch(`http://localhost:6969/admin/restaurant/${id}`, {
          method: "DELETE",
        });
        fetchRestaurants();
      } catch (error) {
        console.error("Error deleting restaurant:", error);
      }
    }
  };

  return (
    <div>
      <h1>Restaurant Management</h1>
      <h2>Restaurant List</h2>
      <table>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant._id}>
              <td>{restaurant.resName}</td>
              <td>{restaurant.resAddress}</td>
              <td>{restaurant.status}</td>
              <td>
                <button onClick={() => handleEdit(restaurant)}>Edit</button>
                <button onClick={() => handleDelete(restaurant._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <h2>{selectedRestaurant ? "Edit Restaurant" : "Add Restaurant"}</h2>
        <input
          type="text"
          name="resName"
          value={formData.resData.resName}
          onChange={handleInputChange}
          placeholder="Restaurant Name"
          required
        />
        <input
          type="text"
          name="resAddress"
          value={formData.resData.resAddress}
          onChange={handleInputChange}
          placeholder="Restaurant Address"
          required
        />

        <select
          name="status"
          value={formData.resData.status}
          onChange={handleInputChange}
          required
        >
          <option value="enable">Enable</option>
          <option value="disable">Disable</option>
        </select>

        {!selectedRestaurant && (
          <>
            <h3>Account Information</h3>
            <input
              type="email"
              name="email"
              value={formData.accountData.email}
              onChange={handleAccountChange}
              placeholder="Account Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.accountData.password}
              onChange={handleAccountChange}
              placeholder="Account Password"
              required
            />
          </>
        )}

        <button type="submit">{selectedRestaurant ? "Update" : "Add"}</button>
        {selectedRestaurant && (
          <button type="button" onClick={() => setSelectedRestaurant(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminRestaurant;
