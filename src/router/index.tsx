import routes from "./routes";
import { Route, type RouteObject, Routes } from "react-router";
import { type ReactElement } from "react";

const ApplicationRouter = (): ReactElement => {
    return (
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
    );
};

export default ApplicationRouter;
