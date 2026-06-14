import React from 'react';
import { Edit3, Trash2, ChevronDown } from 'lucide-react';
import defaultCompanyLogo from '../assets/e05b9827c703ebae7eecb4a5cb3d31a12982d2db.png';
import Deactivate from '../components/Companies/Deactivate';
import Time from '../components/Companies/Time';
import EditInfo from '../components/Companies/Edit_info';

interface CompanyDetailsProps {
  company: any;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onExport: () => void;
}

const getStatusStyle = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "active") {
    return {
      bg: "#E6F9EC",
      color: "#107C41",
    };
  }
  if (s === "expired") {
    return {
      bg: "#FCE8E6",
      color: "#A80D0B",
    };
  }
  if (s === "paused") {
    return {
      bg: "#EDEFF2",
      color: "#464646",
    };
  }
  return {
    bg: "#EDEFF2",
    color: "#464646",
  };
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: 13,
  color: "#141414",
  marginBottom: 6,
  display: "block",
};

const saveButtonStyle: React.CSSProperties = {
  marginTop: "auto",
  alignSelf: "center",
  width: "100%",
  height: 48,
  borderRadius: 12,
  border: "none",
  background: "rgba(0, 35, 111, 1)",
  color: "#fff",
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
  display: "inline-flex",
  height: "40px",
  padding: "0 36px 0 12px",
  alignItems: "center",
  gap: "8px",
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  color: "var(--Foundation-neutral-neutral-800, #464646)",
  background: "#fff",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 8L10.0008 12.58L15 8' stroke='%23464646' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "20px 20px",
  boxSizing: "border-box",
};

const periodButtonStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
  display: "flex",
  height: "40px",
  padding: "0 12px",
  alignItems: "center",
  gap: "8px",
  background: "#fff",
  cursor: "pointer",
  boxSizing: "border-box",
};

const periodButtonTextStyle: React.CSSProperties = {
  color: "var(--Foundation-neutral-neutral-800, #464646)",
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

const ChartBackground = ({ children, yTicks, xTicks }: { children: React.ReactNode; yTicks: number[]; xTicks: string[] }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: 180, marginTop: 10 }}>
      {/* Y Axis Labels */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 20, width: 30, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8 }}>
        {yTicks.map(tick => (
          <span key={tick} style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#747474" }}>{tick}</span>
        ))}
      </div>

      {/* Grid and Chart Area */}
      <div style={{ marginLeft: 30, height: 160, position: "relative", borderLeft: "1px solid #EDEFF2", borderBottom: "1px solid #EDEFF2" }}>
        {/* Horizontal Grid lines */}
        {yTicks.slice(1, -1).map((tick, idx) => {
          const topPercent = (idx + 1) * (100 / (yTicks.length - 1));
          return (
            <div
              key={tick}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${topPercent}%`,
                borderTop: "1px dashed #EDEFF2",
              }}
            />
          );
        })}

        {/* Chart Lines (SVGs) */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 10, bottom: 10 }}>
          {children}
        </div>
      </div>

      {/* X Axis Labels */}
      <div style={{ position: "absolute", left: 30, right: 0, bottom: 0, height: 20, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4 }}>
        {xTicks.map(tick => (
          <span key={tick} style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#747474" }}>{tick}</span>
        ))}
      </div>
    </div>
  );
};

const CompanyDetails = ({ company, onBack, onEdit, onDelete, onExport }: CompanyDetailsProps) => {
  const [isDeactivateOpen, setIsDeactivateOpen] = React.useState(false);
  const [isEditInfoOpen, setIsEditInfoOpen] = React.useState(false);

  const [aiConsumptionPeriod, setAiConsumptionPeriod] = React.useState("This month");
  const [isAiConsumptionOpen, setIsAiConsumptionOpen] = React.useState(false);

  const [activityChangePeriod, setActivityChangePeriod] = React.useState("This Month");
  const [isActivityChangeOpen, setIsActivityChangeOpen] = React.useState(false);

  const [aiUsagePeriod, setAiUsagePeriod] = React.useState("Monthly");
  const [isAiUsageOpen, setIsAiUsageOpen] = React.useState(false);

  const [avgUsersPeriod, setAvgUsersPeriod] = React.useState("Monthly");
  const [isAvgUsersOpen, setIsAvgUsersOpen] = React.useState(false);

  const [salesFunnelPeriod, setSalesFunnelPeriod] = React.useState("This month");
  const [isSalesFunnelOpen, setIsSalesFunnelOpen] = React.useState(false);

  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      {/* Breadcrumbs & Export */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              display: "flex",
              height: "32px",
              padding: "8px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "12px",
              border: "1px solid var(--Foundation-neutral-neutral-800, #464646)",
              background: "#fff",
              cursor: "pointer",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--Foundation-neutral-neutral-950, #141414)",
              boxSizing: "border-box",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="8.75"
              viewBox="0 0 12 11"
              fill="none"
              style={{ width: "10px", height: "8.75px", flexShrink: 0 }}
            >
              <path
                d="M5.16667 1L1 5.375L5.16667 9.75M1 5.375H11"
                stroke="var(--Foundation-neutral-neutral-950, #141414)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <span
            style={{
              color: "var(--Foundation-neutral-neutral-800, #464646)",
              fontFamily: "Inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            Companies /{" "}
            <span
              style={{
                color: "var(--Foundation-neutral-neutral-950, #141414)",
                fontFamily: "Inter",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              {company.name}
            </span>
          </span>
        </div>

        <button
          onClick={onExport}
          style={{
            borderRadius: "12px",
            border: "1px solid var(--Foundation-brand-brand-500, #00236F)",
            display: "flex",
            height: "48px",
            padding: "8px 24px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            background: "#fff",
            color: "var(--Foundation-brand-brand-500, #00236F)",
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ width: "20px", height: "20px", flexShrink: 0 }}
          >
            <path
              d="M3.33301 16.9856C3.67026 17.315 4.12768 17.5 4.60463 17.5H15.3947C15.8717 17.5 16.3291 17.315 16.6663 16.9856M10.0007 2.5V12.4521M5.89017 8.64941L10.0007 12.4521L14.1112 8.64941"
              stroke="#00236F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export company
        </button>
      </div>

      {/* Row 1: Profile Card & Subscription Card */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Profile Card */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          boxSizing: "border-box",
        }}>
          {/* Header and Details section aligned horizontally */}
          <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
            {/* Circular Logo with cover image */}
            <div style={{
              borderRadius: "99px",
              backgroundImage: `url(${defaultCompanyLogo})`,
              backgroundPosition: "50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundColor: "lightgray",
              width: "136px",
              height: "136px",
              flexShrink: 0,
            }} />

            {/* Text details column (Frame 1321318227) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
              {/* Name & Actions row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch" }}>
                <span
                  style={{
                    color: "var(--Foundation-neutral-neutral-950, #141414)",
                    fontFamily: "Inter",
                    fontSize: "19px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {company.name}
                </span>

                {/* Actions */}
                <div style={{ display: "flex", gap: 16 }}>
                  <button
                    onClick={() => setIsEditInfoOpen(true)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: "rgba(0, 35, 111, 1)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <Edit3 size={16} />
                    Edit info
                  </button>
                  <button
                    onClick={() => setIsDeactivateOpen(true)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--Foundation-error-red-700, #A80D0B)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Sector Tag */}
              <span
                style={{
                  borderRadius: "12px",
                  background: "var(--Foundation-brand-brand-50, #E6E9F1)",
                  color: "var(--Foundation-brand-brand-500, #00236F)",
                  display: "flex",
                  padding: "4px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  width: "fit-content",
                  fontSize: 13,
                  fontFamily: "Inter",
                  fontWeight: 500,
                }}
              >
                {company.sector}
              </span>

              {/* Info grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="11.667"
                    viewBox="0 0 17 14"
                    fill="none"
                    style={{ width: "15px", height: "11.667px", flexShrink: 0 }}
                  >
                    <path
                      d="M2.23926 2.29159L7.79937 6.28346C8.12042 6.51396 8.5456 6.51395 8.86664 6.28346L14.4268 2.29159M2.70801 12.4999H13.958C14.9935 12.4999 15.833 11.6294 15.833 10.5555V2.7777C15.833 1.70381 14.9935 0.833252 13.958 0.833252H2.70801C1.67247 0.833252 0.833008 1.70381 0.833008 2.7777V10.5555C0.833008 11.6294 1.67247 12.4999 2.70801 12.4999Z"
                      stroke="var(--Foundation-neutral-neutral-800, #464646)"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>companyemail@email.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{ width: "20px", height: "20px", flexShrink: 0 }}
                  >
                    <path
                      d="M17.2192 15.6425C17.2192 15.6425 16.2536 16.5909 16.017 16.8689C15.6316 17.2802 15.1774 17.4745 14.5821 17.4745C14.5248 17.4745 14.4637 17.4745 14.4065 17.4706C13.273 17.3983 12.2197 16.9565 11.4297 16.5794C9.2696 15.5359 7.37284 14.0543 5.79667 12.1767C4.49527 10.6113 3.62513 9.16405 3.04885 7.61014C2.69392 6.66179 2.56416 5.92292 2.62141 5.22594C2.65957 4.78034 2.83131 4.4109 3.14807 4.09479L4.44947 2.79605C4.63647 2.62085 4.83493 2.52563 5.02957 2.52563C5.27 2.52563 5.46464 2.67036 5.58676 2.79224C5.59058 2.79605 5.5944 2.79986 5.59821 2.80366C5.83101 3.02076 6.05236 3.24546 6.28517 3.48541C6.40347 3.60728 6.5256 3.72916 6.64773 3.85484L7.68961 4.89459C8.09415 5.29831 8.09415 5.67155 7.68961 6.07527C7.57893 6.18572 7.47207 6.29616 7.36139 6.40281C7.04082 6.73035 7.29265 6.47903 6.96062 6.7761C6.95299 6.78372 6.94536 6.78753 6.94154 6.79514C6.61333 7.12268 6.67439 7.44261 6.74309 7.6597C6.7469 7.67112 6.75072 7.68255 6.75453 7.69398C7.0255 8.34906 7.40714 8.96605 7.98724 9.70112L7.99105 9.70493C9.04438 10.9999 10.155 12.0091 11.38 12.7823C11.5365 12.8813 11.6968 12.9613 11.8494 13.0375C11.9868 13.106 12.1166 13.1708 12.2273 13.2393C12.2425 13.2469 12.2578 13.2584 12.2731 13.266C12.4028 13.3307 12.525 13.3612 12.6509 13.3612C12.9677 13.3612 13.1661 13.1631 13.231 13.0984L13.9791 12.3519C14.1088 12.2224 14.3149 12.0662 14.5553 12.0662C14.792 12.0662 14.9866 12.2148 15.1049 12.3442C15.1087 12.3481 15.1087 12.3481 15.1125 12.3519L17.2154 14.4504C17.6085 14.8389 17.2192 15.6425 17.2192 15.6425Z"
                    stroke="#464646"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>0112334455</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  style={{ width: "19px", height: "19px", flexShrink: 0 }}
                >
                  <path
                    d="M9.2736 7.12499C9.2736 8.32152 8.43822 9.17182 7.40772 9.17182C6.37722 9.17182 5.54184 8.32152 5.54184 7.12499C5.54184 5.92846 6.37722 5.21348 7.40772 5.21348C8.43822 5.21348 9.2736 5.92846 9.2736 7.12499Z"
                    stroke="#464646"
                    strokeWidth="1.66667"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.2705 14.0008C12.2705 15.2315 10.8311 16.2292 7.52051 16.2292C4.2099 16.2292 2.77051 15.2315 2.77051 14.0008C2.77051 12.7701 4.89716 11.7724 7.52051 11.7724C10.1439 11.7724 12.2705 12.7701 12.2705 14.0008Z"
                    stroke="#464646"
                    strokeWidth="1.66667"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.458 3.16675L14.1309 4.61563L15.7168 4.80783L14.5467 5.8955L14.854 7.46316L13.458 6.6865L12.062 7.46316L12.3693 5.8955L11.1992 4.80783L12.7851 4.61563L13.458 3.16675Z"
                    stroke="#464646"
                    strokeWidth="1.66667"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{company.owner}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14.25"
                  height="14.25"
                  viewBox="0 0 15 15"
                  fill="none"
                  style={{ width: "14.25px", height: "14.25px", flexShrink: 0 }}
                >
                  <path
                    d="M7.125 8.39844C8.99826 8.39844 10.6538 8.75565 11.8096 9.29785C13.0311 9.87097 13.4168 10.4979 13.417 10.9072C13.417 11.439 13.1289 12.0293 12.1641 12.5322C11.1716 13.0494 9.54292 13.417 7.125 13.417C4.70708 13.417 3.07835 13.0494 2.08594 12.5322C1.12111 12.0293 0.833008 11.439 0.833008 10.9072C0.833172 10.4979 1.21886 9.87097 2.44043 9.29785C3.59616 8.75565 5.25174 8.39844 7.125 8.39844ZM7.125 0.833008C8.27365 0.833008 9.31418 1.95614 9.31445 3.17383C9.31445 4.35184 8.31158 5.40137 7.125 5.40137C5.93842 5.40137 4.93555 4.35184 4.93555 3.17383C4.93582 1.95614 5.97635 0.833008 7.125 0.833008Z"
                    stroke="var(--Foundation-neutral-neutral-800, #464646)"
                    strokeWidth="1.66667"
                  />
                </svg>
                <span>10-50 employee</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14, gridColumn: "span 2" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  style={{ width: "19px", height: "19px", aspectRatio: "1/1", flexShrink: 0 }}
                >
                  <path
                    d="M12.6663 7.91667C12.6663 6.16708 11.2493 4.75 9.49967 4.75C7.75009 4.75 6.33301 6.16708 6.33301 7.91667C6.33301 9.66625 7.75009 11.0833 9.49967 11.0833C11.2493 11.0833 12.6663 9.66625 12.6663 7.91667ZM7.91634 7.91667C7.91634 7.04583 8.62884 6.33333 9.49967 6.33333C10.3705 6.33333 11.083 7.04583 11.083 7.91667C11.083 8.7875 10.3705 9.5 9.49967 9.5C8.62884 9.5 7.91634 8.7875 7.91634 7.91667Z"
                    fill="#464646"
                  />
                  <path
                    d="M9.04123 17.2663C9.17582 17.3613 9.34207 17.4167 9.5004 17.4167C9.65873 17.4167 9.82498 17.3692 9.95957 17.2663C10.1971 17.0921 15.8575 13.015 15.8337 7.90877C15.8337 4.41752 12.9917 1.57544 9.5004 1.57544C6.00915 1.57544 3.16707 4.41752 3.16707 7.90877C3.14332 13.0071 8.80373 17.0921 9.04123 17.2663ZM9.5004 3.16669C12.1208 3.16669 14.2504 5.29627 14.2504 7.91669C14.2662 11.4317 10.775 14.5904 9.5004 15.6275C8.22582 14.5904 4.73457 11.4396 4.7504 7.91669C4.7504 5.29627 6.87998 3.16669 9.5004 3.16669Z"
                    fill="#464646"
                  />
                </svg>
                <span>eldawly st, Alexandria, Egypt</span>
              </div>
            </div>
          </div>
        </div>

          <div style={{ borderTop: "1px solid #EDEFF2", paddingTop: 16, marginTop: 8 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414", display: "block", marginBottom: 8 }}>
              Description
            </span>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474", lineHeight: "150%", margin: 0 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dapibus elementum tellus libero diam accumsan elit tellus libero eget. Magna volutpat in fermentum orci velit enim ut imperdiet. Dui etiam iaculis libero gravida auctor. Tincidunt lorem proin morbi tortor vestibulum magna arcu. Fringilla lacus vulputate velit eros. Proin aliquet tristique mauris sed. Tincidunt lorem proin morbi tortor vestibulum magna arcu. Fringilla lacus vulputate velit eros. Proin aliquet Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
        </div>

        {/* Right side container with two separate cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* First Card: Subscription Info */}
          <div style={{
            borderRadius: "12px",
            background: "var(--Foundation-neutral-white, #FFF)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
            display: "flex",
            width: "100%",
            padding: "24px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "24px",
            flex: "1 0 0",
            boxSizing: "border-box",
          }}>
            {/* Header: Title & Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "19px",
                fontWeight: 400,
                color: "var(--Foundation-neutral-neutral-950, #141414)",
                width: "234px",
                lineHeight: "normal",
                fontStyle: "normal",
              }}>
                Subscription Info
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", color: "rgba(0, 35, 111, 1)", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}>
                <span>Actions</span>
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Content grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 16, columnGap: 24, width: "100%" }}>
              {/* Row 1 */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Current Plan:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>{company.plan}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Billing Cycle:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>Yearly</span>
              </div>

              {/* Row 2 */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Price:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>10000 EGP</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Start Date:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>29/4/2025</span>
              </div>

              {/* Row 3 */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Subscription Status :</span>
                <span style={{
                  display: "inline-flex",
                  background: getStatusStyle(company.status).bg,
                  color: getStatusStyle(company.status).color,
                  borderRadius: 12,
                  padding: "2px 8px",
                  fontSize: 12,
                  fontWeight: 600,
                }}>{company.status}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Renewal Date:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>{company.renewalDate}</span>
              </div>

              {/* Row 4 */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Max Users:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>16</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Days Remaining:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>29</span>
              </div>
            </div>
          </div>

          {/* Second Card: AI Consumption */}
          <div style={{
            borderRadius: "12px",
            background: "var(--Foundation-neutral-white, #FFF)",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
            display: "flex",
            width: "100%",
            padding: "24px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "24px",
            boxSizing: "border-box",
          }}>
            {/* Header: Title & Dropdown */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "19px",
                fontWeight: 400,
                color: "var(--Foundation-neutral-neutral-950, #141414)",
                width: "234px",
                lineHeight: "normal",
                fontStyle: "normal",
              }}>
                AI Consumption
              </span>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setIsAiConsumptionOpen(!isAiConsumptionOpen)}
                  style={periodButtonStyle}
                >
                  <span style={periodButtonTextStyle}>{aiConsumptionPeriod}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
                    <path d="M5 8L10.0008 12.58L15 8" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                {isAiConsumptionOpen && (
                  <Time
                    selected={aiConsumptionPeriod}
                    onSelect={(val) => setAiConsumptionPeriod(val)}
                    onClose={() => setIsAiConsumptionOpen(false)}
                  />
                )}
              </div>
            </div>

            {/* Progress bars in a side-by-side grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 24, rowGap: 16, width: "100%" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>Lead search</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>12%</span>
                </div>
                <div style={{ width: "100%", height: 8, background: "#EDEFF2", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "12%", height: "100%", background: "#00236F" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>Form questions</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>12%</span>
                </div>
                <div style={{ width: "100%", height: 8, background: "#EDEFF2", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "12%", height: "100%", background: "#00236F" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Activity Change vs Last Week (%) & AI Usage Trend (%) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Card 1 */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
              Activity Change vs Last Week (%)
            </span>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setIsActivityChangeOpen(!isActivityChangeOpen)}
                style={periodButtonStyle}
              >
                <span style={periodButtonTextStyle}>{activityChangePeriod}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
                  <path d="M5 8L10.0008 12.58L15 8" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              {isActivityChangeOpen && (
                <Time
                  selected={activityChangePeriod}
                  onSelect={(val) => setActivityChangePeriod(val)}
                  onClose={() => setIsActivityChangeOpen(false)}
                />
              )}
            </div>
          </div>

          <ChartBackground yTicks={[100, 80, 60, 40, 20, 0]} xTicks={["1", "5", "10", "15", "20", "25", "30"]}>
            <svg viewBox="0 0 479 64" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
              <path d="M0.126953 42.2653L79.8412 63.1653L159.556 52.7153L239.27 42.2653L318.984 10.9153L398.698 31.8153L478.413 0.465332" stroke="#00236F" strokeWidth="2" fill="none" />
              {/* Circles */}
              <circle cx="0.127" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="79.841" cy="63.165" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="159.556" cy="52.715" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="239.27" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="318.984" cy="10.915" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="398.698" cy="31.815" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="478.413" cy="0.465" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
            </svg>
          </ChartBackground>
        </div>

        {/* Card 2 */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
              AI Usage Trend (%)
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Legends */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00236F" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Estimated</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#4BA832" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Actual</span>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setIsAiUsageOpen(!isAiUsageOpen)}
                  style={periodButtonStyle}
                >
                  <span style={periodButtonTextStyle}>{aiUsagePeriod}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
                    <path d="M5 8L10.0008 12.58L15 8" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                {isAiUsageOpen && (
                  <Time
                    selected={aiUsagePeriod}
                    onSelect={(val) => setAiUsagePeriod(val)}
                    onClose={() => setIsAiUsageOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>

          <ChartBackground yTicks={[100, 80, 60, 40, 20, 0]} xTicks={["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept"]}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {/* Estimated (Blue line) */}
              <svg viewBox="0 0 479 64" width="100%" height="80%" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: "10%", overflow: "visible" }}>
                <path d="M0.126953 42.2653L79.8412 63.1653L159.556 52.7153L239.27 42.2653L318.984 10.9153L398.698 31.8153L478.413 0.465332" stroke="#00236F" strokeWidth="2" fill="none" />
                <circle cx="0.127" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="79.841" cy="63.165" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="159.556" cy="52.715" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="239.27" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="318.984" cy="10.915" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="398.698" cy="31.815" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="478.413" cy="0.465" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              </svg>
              {/* Actual (Green line) */}
              <svg viewBox="0 0 484 79" width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
                <path d="M0.370117 67.1499L60.8145 0.774902L121.259 78.2124L181.703 67.1499L242.148 45.0249L302.592 78.2124L363.037 0.774902L423.481 67.1499H483.926" stroke="#4BA832" strokeWidth="2" fill="none" />
                <circle cx="0.37" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="60.81" cy="0.77" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="121.26" cy="78.21" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="181.70" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="242.15" cy="45.02" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="302.59" cy="78.21" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="363.04" cy="0.77" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="423.48" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="483.93" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
              </svg>
            </div>
          </ChartBackground>
        </div>
      </div>

      {/* Row 3: Avg Users Trend & Sales Funnel Performance */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Card 3 */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
              Avg Users Trend
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00236F" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Hours</span>
              </div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setIsAvgUsersOpen(!isAvgUsersOpen)}
                  style={periodButtonStyle}
                >
                  <span style={periodButtonTextStyle}>{avgUsersPeriod}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
                    <path d="M5 8L10.0008 12.58L15 8" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                {isAvgUsersOpen && (
                  <Time
                    selected={avgUsersPeriod}
                    onSelect={(val) => setAvgUsersPeriod(val)}
                    onClose={() => setIsAvgUsersOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>

          <ChartBackground yTicks={[25, 20, 15, 10, 5, 0]} xTicks={["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept"]}>
            <svg viewBox="0 0 479 64" width="100%" height="80%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
              <path d="M0.126953 42.2653L79.8412 63.1653L159.556 52.7153L239.27 42.2653L318.984 10.9153L398.698 31.8153L478.413 0.465332" stroke="#00236F" strokeWidth="2" fill="none" />
              <circle cx="0.127" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="79.841" cy="63.165" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="159.556" cy="52.715" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="239.27" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="318.984" cy="10.915" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="398.698" cy="31.815" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              <circle cx="478.413" cy="0.465" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
            </svg>
          </ChartBackground>
        </div>

        {/* Card 4 */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
              Sales Funnel Performance
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00236F" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Leads</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#4BA832" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Deals</span>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setIsSalesFunnelOpen(!isSalesFunnelOpen)}
                  style={periodButtonStyle}
                >
                  <span style={periodButtonTextStyle}>{salesFunnelPeriod}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20 }}>
                    <path d="M5 8L10.0008 12.58L15 8" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                {isSalesFunnelOpen && (
                  <Time
                    selected={salesFunnelPeriod}
                    onSelect={(val) => setSalesFunnelPeriod(val)}
                    onClose={() => setIsSalesFunnelOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>

          <ChartBackground yTicks={[800, 640, 480, 320, 160, 0]} xTicks={["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept"]}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {/* Leads (Blue line) */}
              <svg viewBox="0 0 479 64" width="100%" height="80%" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: "10%", overflow: "visible" }}>
                <path d="M0.126953 42.2653L79.8412 63.1653L159.556 52.7153L239.27 42.2653L318.984 10.9153L398.698 31.8153L478.413 0.465332" stroke="#00236F" strokeWidth="2" fill="none" />
                <circle cx="0.127" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="79.841" cy="63.165" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="159.556" cy="52.715" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="239.27" cy="42.265" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="318.984" cy="10.915" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="398.698" cy="31.815" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                <circle cx="478.413" cy="0.465" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
              </svg>
              {/* Deals (Green line) */}
              <svg viewBox="0 0 484 79" width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
                <path d="M0.370117 67.1499L60.8145 0.774902L121.259 78.2124L181.703 67.1499L242.148 45.0249L302.592 78.2124L363.037 0.774902L423.481 67.1499H483.926" stroke="#4BA832" strokeWidth="2" fill="none" />
                <circle cx="0.37" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="60.81" cy="0.77" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="121.26" cy="78.21" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="181.70" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="242.15" cy="45.02" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="302.59" cy="78.21" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="363.04" cy="0.77" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="423.48" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                <circle cx="483.93" cy="67.15" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
              </svg>
            </div>
          </ChartBackground>
        </div>
      </div>

      {isDeactivateOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsDeactivateOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Deactivate
              company={company}
              onClose={() => setIsDeactivateOpen(false)}
              onConfirm={() => {
                onDelete();
                setIsDeactivateOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {isEditInfoOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsEditInfoOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EditInfo
              company={company}
              onClose={() => setIsEditInfoOpen(false)}
              onSave={(updatedCompany) => {
                onEdit(updatedCompany);
                setIsEditInfoOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
