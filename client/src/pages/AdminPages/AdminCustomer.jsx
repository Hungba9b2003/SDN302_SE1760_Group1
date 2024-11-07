import React, { useState, useEffect } from "react";
import "../../module/admincustomer.css";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      phone: "",
      address: [{ location: "", phone: "" }],
      avatar: "",
      orders: [],
      carts: [],
    },
    account: {
      email: "",
      password: "",
      role: "Customer",
    },
  });

  // Fetch the list of customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:6969/admin/list-customer");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      customer: {
        ...prevData.customer,
        [name]: value,
      },
    }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...formData.customer.address];
    updatedAddresses[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      customer: {
        ...prevData.customer,
        address: updatedAddresses,
      },
    }));
  };

  const addAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      customer: {
        ...prevData.customer,
        address: [...prevData.customer.address, { location: "", phone: "" }],
      },
    }));
  };

  // toogle update and create
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const method = selectedCustomer ? "PUT" : "POST";
  //     const url = selectedCustomer
  //       ? `http://localhost:6969/admin/customer/${selectedCustomer._id}`
  //       : "http://localhost:6969/admin/customer";

  //     // Prepare data to be sent based on the selected customer
  //     const customerData = {
  //       ...formData.customer,
  //       ...(selectedCustomer ? {} : formData.account), // Include account data only when creating a new customer
  //     };

  //     console.log("Customer Data:", customerData); // Add this line to debug
  //     if (
  //       !customerData.name ||
  //       !customerData.phone ||
  //       !customerData.avatar ||
  //       !customerData.address.length
  //     ) {
  //       throw new Error("Please fill in all required fields.");
  //     }

  //     const response = await fetch(url, {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(customerData),
  //     });

  //     if (!response.ok) {
  //       const errorDetails = await response.json();
  //       throw new Error(`Error: ${errorDetails.message}`);
  //     }

  //     // Reset form and update customer list
  //     setFormData({
  //       customer: {
  //         name: "",
  //         phone: "",
  //         address: [{ location: "", phone: "" }],
  //         avatar: "",
  //         orders: [],
  //         carts: [],
  //       },
  //       account: {
  //         email: "",
  //         password: "",
  //         role: "customer",
  //       },
  //     });
  //     setSelectedCustomer(null);
  //     fetchCustomers(); // Refresh customer list
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert(error.message); // Display error message
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = selectedCustomer ? "PUT" : "POST";
      const url = selectedCustomer
        ? `http://localhost:6969/admin/customer/${selectedCustomer._id}`
        : "http://localhost:6969/admin/customer";

      // Prepare data for the request
      const customerData = {
        ...formData.customer,
        ...(selectedCustomer ? {} : formData.account), // Include account data only when creating a new customer
      };

      // Debugging log
      console.log("Customer Data:", customerData);

      // Check if all required fields are filled
      if (
        !customerData.name ||
        !customerData.phone ||
        !customerData.avatar ||
        !customerData.address.length ||
        (!selectedCustomer &&
          (!formData.account.email || !formData.account.password))
      ) {
        throw new Error("Please fill in all required fields.");
      }

      // Structure the data for the request
      const requestData = selectedCustomer
        ? customerData
        : {
            customerData, // Include customer data for POST
            accountData: formData.account, // Include account data for POST only
          };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error: ${errorDetails.message}`);
      }

      // Reset form and update customer list
      setFormData({
        customer: {
          name: "",
          phone: "",
          address: [{ location: "", phone: "" }],
          avatar: "",
          orders: [],
          carts: [],
        },
        account: {
          email: "",
          password: "",
          role: "customer",
        },
      });
      setSelectedCustomer(null);
      fetchCustomers(); // Refresh customer list
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message); // Display error message
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address || [{ location: "", phone: "" }],
        avatar: customer.avatar,
        orders: customer.orders || [],
        carts: customer.carts || [],
      },
      account: {
        email: customer.email,
        password: "", // Do not pre-fill for security reasons
        role: customer.role || "customer",
      },
    });
    setSelectedCustomer(customer);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await fetch(`http://localhost:6969/admin/customer/${id}`, {
          method: "DELETE",
        });
        fetchCustomers(); // Refresh customer list
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div>
      <h1>Customer Management</h1>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>
                <img
                  src={customer.avatar}
                  alt="Avatar"
                  style={{ width: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>
                <button onClick={() => handleEdit(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <h2>{selectedCustomer ? "Edit Customer" : "Add Customer"}</h2>
        <input
          type="text"
          name="name"
          value={formData.customer.name}
          onChange={handleInputChange}
          placeholder="Customer Name"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.customer.phone}
          onChange={handleInputChange}
          placeholder="Customer Phone"
          required
        />
        <input
          type="text"
          name="avatar"
          value={formData.customer.avatar}
          onChange={handleInputChange}
          placeholder="Avatar URL"
        />

        <h3>Addresses</h3>
        {formData.customer.address.map((address, index) => (
          <div key={index}>
            <input
              type="text"
              name="location"
              value={address.location}
              onChange={(e) => handleAddressChange(index, e)}
              placeholder="Address Location"
              required
            />
            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={(e) => handleAddressChange(index, e)}
              placeholder="Address Phone"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addAddress}>
          Add Address
        </button>

        {/* Only show account information fields when creating a customer */}
        {!selectedCustomer && (
          <>
            <h3>Account Information</h3>
            <input
              type="email"
              name="email"
              value={formData.account.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  account: {
                    ...formData.account,
                    email: e.target.value,
                  },
                })
              }
              placeholder="Account Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.account.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  account: {
                    ...formData.account,
                    password: e.target.value,
                  },
                })
              }
              placeholder="Account Password"
              required
            />
          </>
        )}

        <button type="submit">{selectedCustomer ? "Update" : "Add"}</button>
        {selectedCustomer && (
          <button type="button" onClick={() => setSelectedCustomer(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerManagement;
