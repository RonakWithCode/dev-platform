import React from 'react';

const Dashboard = () => {
  // Replace the following with actual dashboard data
  const dashboardData = {
    totalUsers: 1000,
    totalOrders: 500,
    revenue: '$50,000',
    latestOrders: [
      { id: 1, product: 'Product A', quantity: 5 },
      { id: 2, product: 'Product B', quantity: 3 },
      { id: 3, product: 'Product C', quantity: 2 },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 - Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Users</h2>
          <p className="text-3xl font-bold text-blue-500">{dashboardData.totalUsers}</p>
        </div>

        {/* Card 2 - Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
          <p className="text-3xl font-bold text-green-500">{dashboardData.totalOrders}</p>
        </div>

        {/* Card 3 - Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <p className="text-3xl font-bold text-orange-500">{dashboardData.revenue}</p>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
        <ul className="space-y-4">
          {dashboardData.latestOrders.map((order) => (
            <li key={order.id} className="bg-white p-4 rounded-md shadow-md">
              <p className="text-lg font-semibold">{order.product}</p>
              <p>Quantity: {order.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
