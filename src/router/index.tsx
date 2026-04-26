import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Deals from "../pages/Deals";
import Leads from "../pages/Leads";
import Reports from "../pages/Reports";
import Search_Results from "../pages/Search_Results";
import Settings from "../pages/Settings";
import Layout from "../components/Layout";
import Overview from "../pages/Overview";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Overview />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/search" element={<Search_Results />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  )
);