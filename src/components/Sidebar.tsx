import React, { useState } from "react";
import overviewIcon from "../assets/overview.svg";
import leadsIcon from "../assets/leads.svg";
import dealsIcon from "../assets/deals.svg";
import reportsIcon from "../assets/reports.svg";
import settingIcon from "../assets/setting.svg";
import logoutIcon from "../assets/logout.svg";

interface SidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: overviewIcon },
  { id: "leads", label: "Leads", icon: leadsIcon },
  { id: "deals", label: "Deals", icon: dealsIcon },
  { id: "reports", label: "Reports", icon: reportsIcon },
  { id: "settings", label: "Settings", icon: settingIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage = "reports", onNavigate }) => {
  const [activeItem, setActiveItem] = useState(currentPage);

  const handleNav = (id: string) => {
    setActiveItem(id);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  // CSS filter to convert the default dark grey stroke to a navy blue (#00236F)
  // This is an approximation using brightness/sepia/hue-rotate
  const activeIconFilter =
    "brightness(0) saturate(100%) invert(14%) sepia(82%) saturate(2657%) hue-rotate(209deg) brightness(96%) contrast(105%)";

  return (
    <div
      style={{
        width: 118,
        height: 955,
        background: "rgba(255, 255, 255, 1)",
        borderRight: "1px solid rgba(237, 239, 242, 1)",
        display: "flex",
        flexDirection: "column",
        paddingTop: 32, // Padding from top
        paddingBottom: 32, // Padding from bottom
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 118,
                height: 75,
                gap: 8,
                padding: isActive ? "12px 24px" : "16px 0",
                background: isActive ? "rgba(230, 233, 241, 1)" : "transparent",
                borderLeft: isActive ? "4px solid rgba(0, 35, 111, 1)" : "4px solid transparent",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "background 0.2s, border-left 0.2s",
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                width={18}
                height={14}
                style={{
                  filter: isActive ? activeIconFilter : "none",
                  transition: "filter 0.2s",
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  fontStyle: "normal",
                  lineHeight: "100%",
                  color: isActive ? "rgba(0, 35, 111, 1)" : "#4B5563",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 46,
                  height: 19,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "auto" }}>
        <div
          onClick={() => handleNav("logout")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 0",
            cursor: "pointer",
            transition: "background 0.2s",
            gap: 8,
          }}
        >
          <img src={logoutIcon} alt="Logout" width={24} height={24} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#4B5563",
            }}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
