import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router";
import Leads from "../pages/Leads";
import Search_Results from "../pages/Search_Results";
import Settings from "../pages/Settings";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Reset_Password from "../pages/Reset_Password";
import OTP_Verification from "../pages/OTP_Verification";
import Update_Password from "../pages/Update_Password";
import Companies from "../pages/Companies";
import Plans from "../pages/Plans";
import Support from "../pages/Support";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/overview" element={<Navigate to="/leads" replace />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/search" element={<Search_Results />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/support" element={<Support />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<Reset_Password />} />
      <Route path="/otp-verification" element={<OTP_Verification />} />
      <Route path="/update-password" element={<Update_Password />} />
    </>
  )
);