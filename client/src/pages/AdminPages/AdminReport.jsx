import React, { useState, useEffect } from "react";

const AdminReport = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:6969/admin/report");
      const result = await response.json();
      setReports(result.data?.orders || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  const closeDetails = () => {
    setSelectedReport(null);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Reports Management</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Reports List</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Reason</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Created Date</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td style={tableCellStyle}>{report.reason}</td>
                <td style={tableCellStyle}>{report.status}</td>
                <td style={tableCellStyle}>
                  {new Date(report.createdDate).toLocaleDateString()}
                </td>
                <td style={tableCellStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleReportClick(report)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <div style={detailsStyle}>
          <h2>Report Details</h2>
          <p>
            <strong>Reason:</strong> {selectedReport.reason}
          </p>
          <p>
            <strong>Details:</strong> {selectedReport.details}
          </p>
          <p>
            <strong>Status:</strong> {selectedReport.status}
          </p>
          <p>
            <strong>Created Date:</strong>{" "}
            {new Date(selectedReport.createdDate).toLocaleString()}
          </p>
          <p>
            <strong>Resolved Date:</strong>{" "}
            {selectedReport.resolvedAt
              ? new Date(selectedReport.resolvedAt).toLocaleString()
              : "Not resolved yet"}
          </p>

          {selectedReport.restaurantId && (
            <>
              <h3>Restaurant Information</h3>
              <p>
                <strong>Name:</strong> {selectedReport.restaurantId.resName}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedReport.restaurantId.resAddress}
              </p>
              <p>
                <strong>Status:</strong> {selectedReport.restaurantId.status}
              </p>
              <p>
                <strong>Approved:</strong>{" "}
                {selectedReport.restaurantId.approved ? "Yes" : "No"}
              </p>
              <p>
                <strong>Approval Date:</strong>{" "}
                {selectedReport.restaurantId.approvalDate
                  ? new Date(
                      selectedReport.restaurantId.approvalDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {selectedReport.restaurantId.restImage.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Restaurant ${index + 1}`}
                    style={imageStyle}
                  />
                ))}
              </div>
            </>
          )}

          {selectedReport.customerId ? (
            <>
              <h3>Customer Information</h3>
              <img
                src={selectedReport.customerId.avatar}
                alt="Customer Avatar"
                style={avatarStyle}
              />
              <p>
                <strong>Name:</strong> {selectedReport.customerId.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedReport.customerId.phone}
              </p>
              <div>
                <strong>Address:</strong>
                {selectedReport.customerId.address.map((addr) => (
                  <div key={addr._id}>
                    <p>{addr.location}</p>
                    <p>{addr.phone}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              <strong>Customer:</strong> Guest Order
            </p>
          )}
          <button style={buttonStyle} onClick={closeDetails}>
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  fontWeight: "bold",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

const buttonStyle = {
  padding: "5px 10px",
  margin: "5px",
  cursor: "pointer",
};

const detailsStyle = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  backgroundColor: "#fafafa",
};

const avatarStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
};

const imageStyle = {
  width: "100px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "5px",
};

export default AdminReport;
