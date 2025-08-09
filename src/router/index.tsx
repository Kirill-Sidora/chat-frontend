import { Route, type RouteObject, Routes } from "react-router";
import { type ReactElement } from "react";
import routes from "./routes";

const ApplicationRouter = (): ReactElement => {
    return (
        <Routes>
            {routes.map((route: RouteObject) => {
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
