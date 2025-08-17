import ApplicationRouter from "@router/index";
import { BrowserRouter as RouterProvider } from "react-router-dom";
import { type ReactElement } from "react";
import "@domains/Theme/style.css";

const Application = (): ReactElement => {
    return (
        <div className="application-container">
            <RouterProvider>
                <ApplicationRouter />
            </RouterProvider>
        </div>
    );
};

export default Application;