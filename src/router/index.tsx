import routes from "./routes";
import { Route, type RouteObject, Routes } from "react-router";
import { type ReactElement } from "react";
import { ChatDataProvider } from "@components/context/СhatDataContext";

const ApplicationRouter = (): ReactElement => {
    return (
        <ChatDataProvider>
            <Routes>
                {routes.map((route: RouteObject) => (
                    <Route
                        id={route.id}
                        key={route.id}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </ChatDataProvider>
    );
};

export default ApplicationRouter;
