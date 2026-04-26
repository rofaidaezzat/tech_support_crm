import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Deals from "../pages/leads/Deals";
import Leads from "../pages/leads/Leads";
import Reports from "../pages/leads/Reports";
import Search_Results from "../pages/leads/Search_Results";
import Settings from "../pages/leads/Settings";
import Layout from "../components/Layout";
import Overview from "../pages/leads/Overview";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Overview />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/search" element={<Search_Results />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  )
);