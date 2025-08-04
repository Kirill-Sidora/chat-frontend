import { type ReactElement, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../../router/routes";

const ProtectedRoute = ({ children }: PropsWithChildren): ReactElement => {
    const nickName = localStorage.getItem("nickName");
    return nickName ? <>{children}</> : <Navigate to={paths.REGISTRATION.path} replace />;
};

export default ProtectedRoute;
