import React, { useState, useEffect } from "react";
import "../../module/admin.css";
import AdminNavbar from "../../components/AdminComponents/AdminNavbar";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";

const AdminRevenueReport = () => {
  const [revenueReport, setRevenueReport] = useState([
    {
      month: "January 2024",
      totalRevenue: 100000,
      topProduct: "Pizza Hut (Main St)",
      topProductRevenue: 25000,
    },
    {
      month: "February 2024",
      totalRevenue: 125000,
      topProduct: "Sushi Paradise",
      topProductRevenue: 30000,
    },
    {
      month: "March 2024",
      totalRevenue: 90000,
      topProduct: "Burger King (Central)",
      topProductRevenue: 22000,
    },
  ]);

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <div className="admin-main">
          <h1>Revenue Report</h1>
          <div className="revenue-report">
            <table className="table revenue-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Income</th>
                  <th>Most Popular Restaurant</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {revenueReport.map((report) => (
                  <tr key={report.month}>
                    <td>{report.month}</td>
                    <td>{report.totalRevenue} VND</td>
                    <td>{report.topProduct}</td>
                    <td>{report.topProductRevenue} VND</td>
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

export default AdminRevenueReport;
