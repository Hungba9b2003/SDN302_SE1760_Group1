import React, { useState } from "react";
import "./OrderHistory.css"; // Add appropriate CSS styles
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const OrderHistory = () => {
  const [status, setStatus] = useState("-1");
  const [startDate, setStartDate] = useState("2024-10-08");
  const [endDate, setEndDate] = useState("2024-10-08");
  const [showDetail, setShowDetail] = useState(false);

  const handleClose = () => setShowDetail(false);
  const handleShow = () => setShowDetail(true);
  const orderData = {
    productImage:
      "data:image/jpeg;base64,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",
    productName: "Dog Toy",
    customerName: "John Doe",
    totalPrice: "500.000 VNĐ",
    status: "Processing",
    shippingAddress: "123 Main St, Springfield, USA",
    shippingFee: "30.000 VNĐ",
  };
  return (
    <>
      <Modal show={showDetail} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 style={{ fontWeight: "900", color: "red" }}>
            {orderData.productName}
          </h2>
          <div>
            {/* Hiển thị ảnh sản phẩm */}
            <img
              src={orderData.productImage}
              alt={orderData.productName}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                marginBottom: "15px",
              }}
            />
            <p>
              <strong>Customer Name:</strong> {orderData.customerName}
            </p>

            <p>
              <strong>Status:</strong> {orderData.status}
            </p>
            <p>
              <strong>Shipping Address:</strong> {orderData.shippingAddress}
            </p>
            <p>
              <strong>Shipping Fee:</strong> {orderData.shippingFee}
            </p>
            <p style={{ color: "red" }}>
              <strong>Total Price: </strong>
              {orderData.totalPrice}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="block-section">
        <div className="container">
          <div className="now-incoming incoming-full mb-4">
            <div className="slick-slider">
              <div className="slick-list">
                <div
                  className="slick-track"
                  style={{
                    opacity: 1,
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <h1 className="block-title text-center mb-4">Order history</h1>

          <div className="history-table-container">
            <div className="row mb-3 filter-history">
              <div className="col-md-3">
                <div className="form-group" style={{ width: "60%" }}>
                  <label className="filter-table-label">Status</label>
                  <select
                    name="status"
                    className="form-control custom-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="-1">All</option>
                    <option value="4">Hoàn tất</option>
                    <option value="8">Hủy</option>
                  </select>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label className="filter-table-label">From date</label>
                  <input
                    type="date"
                    className="form-control flatpickr-input"
                    placeholder="10/8/2024"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label className="filter-table-label">To date</label>
                  <input
                    type="date"
                    className="form-control flatpickr-input"
                    placeholder="10/8/2024"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-1">
                <button type="button" className="btn btn-primary btn-sm mt-4">
                  Search
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table history-table">
                <thead className="thead-dark">
                  <tr>
                    <th>STT</th>
                    <th>OrderId</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Restaurant</th>
                    <th>TotalPrice</th>
                    <th>Status</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody className="tbody-info">
                  <tr>
                    <td>1</td>
                    <td>123456</td>
                    <td>2024-10-07</td>
                    <td
                      style={{
                        width: "200px",
                        boxSizing: "border-box",
                        paddingLeft: "20px",
                      }}
                      title={orderData.shippingAddress}
                    >
                      <div className="text-ellipsis">
                        {orderData.shippingAddress}
                      </div>
                    </td>
                    <td>{orderData.customerName}</td>
                    <td>{orderData.totalPrice}</td>
                    <td>{orderData.status}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        style={{ backgroundColor: "#ee4d2d" }}
                        onClick={() => setShowDetail(true)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                  {/* Thêm nhiều hàng ở đây nếu cần */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
