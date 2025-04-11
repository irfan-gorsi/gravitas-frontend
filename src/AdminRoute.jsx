import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "./authUtils";
const AdminRoute = () => {

    const role = getUserRole();
    
    return role === "admin" ? <Outlet /> : <Navigate to="/home" />;
};

export default AdminRoute;
