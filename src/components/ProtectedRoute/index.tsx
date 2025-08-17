import { type PropsWithChildren, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "@router/routes";

const ProtectedRoute = ({ children }: PropsWithChildren): ReactNode => {
    const nickName = localStorage.getItem("nickName");

    if (!nickName) {
        return <Navigate to={paths.REGISTRATION.path} replace />;
    }

    return children;
};

export default ProtectedRoute;