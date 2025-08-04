import HomePage from "@pages/HomePage";
import MessagePage from "@pages/MessagePage";
import RegistrationPage from "@pages/RegistrationPage";
import { type RouteObject } from "react-router-dom";

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

const routes: RouteObject[] = [
    {
        ...paths.HOME,
        element: <HomePage />,
    },
    {
        ...paths.MESSAGE,
        element: <MessagePage />,
    },
    {
        ...paths.REGISTRATION,
        element: <RegistrationPage />,
    },
];

export default routes;
