// components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/jwt/JwtHelper";
import { UserRole } from "../types/Auth/User.type";

interface ProtectedRouteProps {
    allowedRoles: UserRole[];
    children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const role = getUserRole();


    if (role == null) {
        return <Navigate to="/auth" replace />;
    }

    if (!allowedRoles.map(String).includes(String(role))) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};


export default ProtectedRoute;
