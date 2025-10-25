import { useAuth } from "@/provider/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg rounded bg-transparent">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
