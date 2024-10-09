import React, { useState, useEffect } from 'react';
import '../../module/adminRes.css';
import AdminNavbar from '../../components/AdminComponents/AdminResNavbar';
import AdminSidebar from '../../components/AdminComponents/AdminResSidebar';

const AdminResRevenueReport = () => {
  const [revenueReport, setRevenueReport] = useState([]);

  useEffect(() => {
    // Giả sử bạn sẽ gọi API từ backend để lấy dữ liệu báo cáo tài chính
    fetch('/api/admin/revenue-report')
      .then(response => response.json())
      .then(data => setRevenueReport(data))
      .catch(error => console.error('Error fetching revenue report:', error));
  }, []);

  return (
    <div className="adminres-container">
      <AdminNavbar />
      <div className="adminres-content">
        <AdminSidebar />
        <div className="adminres-main">
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

export default AdminResRevenueReport;
