import HomePage from "@pages/HomePage";
import MessagePage from "@pages/MessagePage";
import RegistrationPage from "@pages/RegistrationPage";
import { Navigate, type RouteObject } from "react-router-dom";
import { type ReactElement } from "react";

export interface IRouterPAth {
    id: string;
    path: string;
    label?: string;
}

export const paths = {
    HOME: {
        id: "home",
        path: "/",
    },
    MESSAGE: {
        id: "message",
        path: "/chat",
    },
    REGISTRATION: {
        id: "registration",
        path: "/registration",
    },
};

const ProtectedRoute = ({ children }: { children: ReactElement }): ReactElement => {
    const nickName = localStorage.getItem("nickName");
    return nickName ? children : <Navigate to={paths.REGISTRATION.path} replace />;
};

const routes: RouteObject[] = [
    {
        ...paths.HOME,
        element: <HomePage />,
    },
    {
        ...paths.MESSAGE,
        element: (
            <ProtectedRoute>
                <MessagePage />
            </ProtectedRoute>
        ),
    },
    {
        ...paths.REGISTRATION,
        element: <RegistrationPage />,
    },
];

export default routes;
