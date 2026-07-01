import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import { getCookie } from "../app/service/baseQuery";
import { useTranslation } from "../context/LanguageContext";

interface SidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

// ── Inline SVG Icons ──────────────────────────────────────────────────────────

const OverviewIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color }}>
    <path
      d="M10.6 2.20855V19.0006M1 10.6046H20.2M17.56 20.2L3.16 18.4009C1.96 18.2809 1 17.3214 1 16.1219V5.08718C1 3.88775 1.96 2.92821 3.16 2.80826L17.56 1.00912C19 0.889176 20.2 1.96866 20.2 3.28804V17.8011C20.2 19.2405 18.88 20.3199 17.56 20.0801V20.2Z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const LeadsIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color }}>
    <path
      d="M1 20.2L1.0004 16.5996C1.00063 14.6115 2.61234 13 4.6004 13H11.7999M15.4 15.2286L17.8 17.8L20.2 15.2286M17.8 17.8V11.2M13 4.6C13 6.58822 11.3882 8.2 9.4 8.2C7.41177 8.2 5.8 6.58822 5.8 4.6C5.8 2.61177 7.41177 1 9.4 1C11.3882 1 13 2.61177 13 4.6Z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const CompaniesIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="15.2"
    viewBox="0 0 21 18"
    fill="none"
    style={{ color }}
  >
    <path
      d="M6.34375 15.6154V5.09231M14.0625 15.6154V5.09231M6.9375 4.50769V2.16923C6.9375 1.52348 7.46916 1 8.125 1H12.2812C12.9371 1 13.4688 1.52348 13.4688 2.16923V4.50769M3.375 16.2H17.625C18.9367 16.2 20 15.153 20 13.8615V6.84615C20 5.55466 18.9367 4.50769 17.625 4.50769H3.375C2.06332 4.50769 1 5.55466 1 6.84615V13.8615C1 15.153 2.06332 16.2 3.375 16.2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PlansIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{ color }}
  >
    <path
      d="M4.50975 9.78025C5.26973 7.22665 7.37459 5.25225 10.003 4.67842M9.47579 18.9636C7.09534 18.2552 5.2182 16.378 4.50975 13.9976M18.6592 13.9976C17.9507 16.378 16.0736 18.2552 13.6931 18.9636M13.166 4.67842C15.9726 5.29116 18.1822 7.50083 18.795 10.3074M10.3637 6.83921H13.0272C13.5176 6.83921 13.9151 6.4417 13.9151 5.95135V3.28776C13.9151 2.79741 13.5176 2.3999 13.0272 2.3999H10.3637C9.8733 2.3999 9.47579 2.79741 9.47579 3.28776V5.95135C9.47579 6.4417 9.8733 6.83921 10.3637 6.83921ZM10.3637 21.5999H13.0272C13.5176 21.5999 13.9151 21.2024 13.9151 20.712V18.0485C13.9151 17.5581 13.5176 17.1606 13.0272 17.1606H10.3637C9.8733 17.1606 9.47579 17.5581 9.47579 18.0485V20.712C9.47579 21.2024 9.8733 21.5999 10.3637 21.5999ZM16.1067 10.6679V13.3314C16.1067 13.8218 16.5043 14.2193 16.9946 14.2193H19.6582C20.1485 14.2193 20.5461 13.8218 20.5461 13.3314V10.6679C20.5461 10.1775 20.1485 9.77999 19.6582 9.77999H16.9946C16.5043 9.77999 16.1067 10.1775 16.1067 10.6679ZM2.40039 10.6679L2.40039 13.3314C2.40039 13.8218 2.7979 14.2193 3.28825 14.2193H5.95184C6.44219 14.2193 6.8397 13.8218 6.8397 13.3314L6.8397 10.6679C6.8397 10.1775 6.44219 9.77999 5.95184 9.77999H3.28825C2.7979 9.77999 2.40039 10.1775 2.40039 10.6679Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const SupportIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{ color }}
  >
    <path
      d="M14.3865 14.3865C13.0685 15.7045 10.9315 15.7045 9.61351 14.3865M14.3865 14.3865C15.7045 13.0685 15.7045 10.9315 14.3865 9.61351M14.3865 14.3865L17.9662 17.9662M9.61351 14.3865C8.2955 13.0685 8.2955 10.9315 9.61351 9.61351M9.61351 14.3865L6.03379 17.9662M9.61351 9.61351C10.9315 8.2955 13.0685 8.2955 14.3865 9.61351M9.61351 9.61351L6.03379 6.03379M14.3865 9.61351L17.9662 6.03379M18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color }}>
    <path
      fillRule="evenodd" clipRule="evenodd"
      d="M11.6763 2.31627C11.2488 0.561243 8.75121 0.561243 8.3237 2.31627C8.25987 2.57999 8.13468 2.82492 7.95831 3.03112C7.78194 3.23732 7.55938 3.39897 7.30874 3.50291C7.0581 3.60684 6.78646 3.65014 6.51592 3.62927C6.24538 3.60839 5.9836 3.52394 5.75187 3.38279C4.20832 2.44227 2.44201 4.20855 3.38254 5.75207C3.99006 6.74884 3.45117 8.04936 2.31713 8.32499C0.560955 8.75137 0.560955 11.25 2.31713 11.6753C2.58093 11.7392 2.8259 11.8645 3.03211 12.041C3.23831 12.2175 3.39991 12.4402 3.50375 12.691C3.6076 12.9418 3.65074 13.2135 3.62968 13.4841C3.60862 13.7547 3.52394 14.0165 3.38254 14.2482C2.44201 15.7917 4.20832 17.558 5.75187 16.6175C5.98356 16.4761 6.24536 16.3914 6.51597 16.3704C6.78658 16.3493 7.05834 16.3924 7.30912 16.4963C7.5599 16.6001 7.7826 16.7617 7.95911 16.9679C8.13561 17.1741 8.26091 17.4191 8.32482 17.6829C8.75121 19.439 11.2499 19.439 11.6752 17.6829C11.7393 17.4192 11.8647 17.1744 12.0413 16.9684C12.2178 16.7623 12.4405 16.6008 12.6912 16.497C12.9419 16.3932 13.2135 16.35 13.4841 16.3709C13.7546 16.3919 14.0164 16.4764 14.2481 16.6175C15.7917 17.558 17.558 15.7917 16.6175 14.2482C16.4763 14.0165 16.3918 13.7547 16.3709 13.4842C16.35 13.2136 16.3932 12.942 16.497 12.6913C16.6008 12.4406 16.7623 12.2179 16.9683 12.0414C17.1744 11.8648 17.4192 11.7394 17.6829 11.6753C19.439 11.2489 19.439 8.75025 17.6829 8.32499C17.4191 8.26108 17.1741 8.13578 16.9679 7.95928C16.7617 7.78278 16.6001 7.56007 16.4962 7.3093C16.3924 7.05853 16.3493 6.78677 16.3703 6.51617C16.3914 6.24556 16.4761 5.98376 16.6175 5.75207C17.558 4.20855 15.7917 2.44227 14.2481 3.38279C14.0164 3.52418 13.7546 3.60886 13.484 3.62992C13.2134 3.65098 12.9417 3.60784 12.6909 3.504C12.4401 3.40016 12.2174 3.23856 12.0409 3.03236C11.8644 2.82616 11.7391 2.58119 11.6752 2.3174L11.6763 2.31627Z"
      stroke="currentColor" strokeWidth="2"
    />
    <path
      d="M12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z"
      stroke="currentColor" strokeWidth="2"
    />
  </svg>
);

const LogoutIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color }}>
    <path
      d="M14.6471 7.8001V5.7001C14.6471 5.14314 14.424 4.609 14.0268 4.21517C13.6297 3.82135 13.091 3.6001 12.5294 3.6001H5.11765C4.55601 3.6001 4.01738 3.82135 3.62024 4.21517C3.22311 4.609 3 5.14314 3 5.7001V18.3001C3 18.8571 3.22311 19.3912 3.62024 19.785C4.01738 20.1788 4.55601 20.4001 5.11765 20.4001H12.5294C13.091 20.4001 13.6297 20.1788 14.0268 19.785C14.424 19.3912 14.6471 18.8571 14.6471 18.3001V16.2001M8.29412 12.0001H21M21 12.0001L17.8235 8.8501M21 12.0001L17.8235 15.1501"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

// ── Sidebar Component ─────────────────────────────────────────────────────────

const Sidebar: React.FC<SidebarProps> = ({ currentPage = "leads", onNavigate }) => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState(currentPage);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    setActiveItem(currentPage);
  }, [currentPage]);

  const handleNav = (id: string) => {
    setActiveItem(id);
    if (onNavigate) onNavigate(id);
  };

  const userType = getCookie("user_type");
  const isSalesManager = userType?.toUpperCase() === "SALES_MANAGER";

  const navItems = [
    { id: "leads",     label: t("sidebar.leads"),     Icon: LeadsIcon     },
    { id: "companies", label: t("sidebar.companies"), Icon: CompaniesIcon },
    { id: "plans",     label: t("sidebar.plans"),     Icon: PlansIcon     },
    { id: "support",   label: t("sidebar.support"),   Icon: SupportIcon   },
    { id: "settings",  label: t("sidebar.settings"),  Icon: SettingsIcon  }
  ];

  return (
    <>
      <div
        style={{
          width: 94,
          height: "100%",
          background: "#00236F",
          borderRight: "1px solid rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            width: 94,
            height: 75,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            rodo.
          </span>
        </div>

        {/* Nav Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 16 }}>
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            const iconColor = isActive
              ? "var(--Foundation-brand-brand-500, #00236F)"
              : "#EDEFF2";

            return (
              <div
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 94,
                  height: 75,
                  gap: 8,
                  paddingTop: 12,
                  paddingRight: 24,
                  paddingBottom: 12,
                  paddingLeft: 24,
                  background: isActive ? "#B0BBD2" : "transparent",
                  borderLeft: isActive ? "4px solid #B0BBD2" : "4px solid transparent",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  transition: "background 0.2s, border-left 0.2s",
                  position: "relative",
                }}
              >
                {/* Icon wrapper — 24×24, no border */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.Icon color={iconColor} />
                </div>

                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: "100%",
                    color: isActive ? "#00236F" : "#FFFFFF",
                    transition: "color 0.2s",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Logout at bottom */}
        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={() => setIsLogoutModalOpen(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 94,
              height: 75,
              gap: 8,
              paddingTop: 12,
              paddingRight: 24,
              paddingBottom: 12,
              paddingLeft: 24,
              borderLeft: "4px solid transparent",
              cursor: "pointer",
              transition: "background 0.2s",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LogoutIcon color="#EDEFF2" />
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 400,
                color: "#EDEFF2",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {t("sidebar.logout")}
            </span>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div
          onClick={() => setIsLogoutModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Logout
              onClose={() => setIsLogoutModalOpen(false)}
              onLogout={() => setIsLogoutModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
