import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
