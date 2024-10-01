import React from "react";
import Layout from "../components/shared/Layout";
import DashboardStatsGrid from "../components/DashboardStatsGrid";
import TransactionChart from "../components/TransactionChart";
import BuyerProfilePieChart from "../components/BuyerProfilePieChart";
import RecentOrders from "../components/RecentOrders";
import PopularProducts from "../components/PopularProducts";
export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <DashboardStatsGrid />
        <div className="flex flex-row gap-4 w-full">
          <TransactionChart />
          <BuyerProfilePieChart />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <RecentOrders />
          <PopularProducts />
        </div>
      </div>
    </Layout>
  );
}
