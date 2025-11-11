import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, records: 0 });

  useEffect(() => {
    // Example: call future admin API
    setStats({ users: 24, records: 87 }); // placeholder
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🛠 Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-green-100 rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Total Records</h3>
          <p className="text-3xl font-bold">{stats.records}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
