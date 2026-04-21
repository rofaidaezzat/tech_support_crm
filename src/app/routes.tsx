import { createBrowserRouter } from "react-router";
import DashboardPage from "../pages/DashboardPage";
import BillingPage from "../pages/BillingPage";
import { ROUTES } from "../types/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: () => (
      <div className="min-h-screen">
        <nav className="border-b p-4">
          <div className="container mx-auto flex gap-4">
            <a href={ROUTES.DASHBOARD} className="hover:underline">Dashboard</a>
            <a href={ROUTES.BILLING} className="hover:underline">Billing</a>
          </div>
        </nav>
        <div id="content">
          {/* Outlet for child routes would go here */}
        </div>
      </div>
    ),
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "billing",
        Component: BillingPage,
      },
    ],
  },
]);
