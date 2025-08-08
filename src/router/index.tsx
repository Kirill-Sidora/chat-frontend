import { ChatDataProvider } from "@components/context/СhatDataContext";
import { Route, type RouteObject, Routes } from "react-router";
import { type ReactElement } from "react";
import routes from "./routes";

const ApplicationRouter = (): ReactElement => {
    const TARGET_ROUTE_ID = "message";
    return (
        <Routes>
            {routes.map((route: RouteObject) => {
                if (route.id === TARGET_ROUTE_ID) {
                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <ChatDataProvider>
                                    {route.element}
                                </ChatDataProvider>
                            }
                        />
                    );
                }

                return (
                    <Route
                        key={route.id}
                        path={route.path}
                        element={route.element}
                    />
                );
            })}
        </Routes>
    );
};

export default ApplicationRouter;
