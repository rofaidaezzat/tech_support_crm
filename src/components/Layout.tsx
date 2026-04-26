import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Task_drawer from "./Leads/Task_drawer";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  // Extract the current page from the pathname for the Sidebar active state
  const currentPath = location.pathname.substring(1) || "overview";

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar on the left */}
      <Sidebar
        currentPage={currentPath}
        onNavigate={(page) => {
          if (page === "logout") {
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
        <div style={{ position: "relative", zIndex: 10 }}>
          <Navbar onTasksClick={() => setIsTaskDrawerOpen(true)} />
        </div>

        {/* Scrollable page content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginTop: 88,
            padding: "24px",
            backgroundColor: "#F9FAFB",
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* ── Task Drawer Overlay ── */}
      {isTaskDrawerOpen && (
        <div
          onClick={() => setIsTaskDrawerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.25)",
            zIndex: 100,
          }}
        />
      )}

      {/* ── Task Drawer (slides in from right) ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          zIndex: 101,
          transform: isTaskDrawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      >
        <Task_drawer
          onClose={() => setIsTaskDrawerOpen(false)}
          onNewTask={() => {
            // Handle new task creation
          }}
        />
      </div>
    </div>
  );
};

export default Layout;
