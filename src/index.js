import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextWrapper } from "./context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages";
import CoreTable from "./components/BaseTable/CoreTable";
import DisTable from "./components/BaseTable/DistTable";
import ChartComponent from "./components/ChartBar/ChartComponent";
import Chart from "./components/ChartBar/BarContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/table",
    element: <CoreTable />
  },
  {
    path: "/table2",
    element: <DisTable />
  },
  {
    path: "/chart",
    element: <ChartComponent  />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextWrapper>
      <RouterProvider router={router} />
    </ContextWrapper>
  </React.StrictMode>
);

reportWebVitals();
