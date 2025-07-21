import React from 'react';
import SidebarDashboard from "../components/ui/SidebarDashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SidebarDashboard />
      <div className="p-4 md:ml-64">
        <div >{children}</div>
      </div>
    </div>
  );
};


export default DashboardLayout;
