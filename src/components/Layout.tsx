import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current page from the pathname for the Sidebar active state
  const currentPath = location.pathname.substring(1) || "overview";
  
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar on the left */}
      <Sidebar
        currentPage={currentPath}
        onNavigate={(page) => {
          if (page === "logout") {
            // Handle logout if needed
            console.log("Logout clicked");
          } else if (page === "overview") {
            navigate("/");
          } else {
            navigate(`/${page}`);
          }
        }}
      />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Navbar at the top. We remove its absolute positioning for a flexible layout,
            or wrap it in a container. The existing Navbar has absolute positioning,
            so we'll just render it as is, but we'll need to make sure the main content is padded. */}
        <div style={{ position: "relative", zIndex: 10 }}>
            <Navbar />
        </div>

        {/* Scrollable page content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginTop: 88, // Navbar height from Navbar.tsx
            padding: "24px",
            backgroundColor: "#F9FAFB",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
