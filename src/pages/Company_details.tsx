import React from 'react';
import { Mail, Phone, User, Users, MapPin, Edit3, Trash2, ChevronDown, Download } from 'lucide-react';

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
  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      {/* Breadcrumbs & Export */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              background: "#fff",
              border: "1px solid rgba(212, 213, 216, 1)",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#4B5563",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            &larr; Back
          </button>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#747474" }}>
            Companies / <span style={{ fontWeight: 600, color: "#141414" }}>{company.name}</span>
          </span>
        </div>

        <button
          onClick={onExport}
          style={{
            background: "#fff",
            border: "1px solid rgba(0, 35, 111, 1)",
            height: 40,
            borderRadius: 12,
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            color: "rgba(0, 35, 111, 1)",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <Download size={16} />
          Export Company
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
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {/* Circular Logo with a premium gradient */}
              <div style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #EC4899 0%, #F43F5E 40%, #E11D48 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 12px rgba(225, 29, 72, 0.25)",
              }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 36, fontWeight: 700, color: "#fff" }}>
                  {company.name.charAt(0)}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 700, color: "#141414" }}>
                  {company.name}
                </span>
                <span style={{
                  display: "inline-flex",
                  width: "fit-content",
                  background: "#EDEFF2",
                  color: "#464646",
                  borderRadius: 12,
                  padding: "4px 12px",
                  fontSize: 13,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}>
                  {company.sector}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={onEdit}
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
                onClick={onDelete}
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

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
              <Mail size={16} color="#747474" />
              <span>companyemail@email.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
              <Phone size={16} color="#747474" />
              <span>0112334455</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
              <User size={16} color="#747474" />
              <span>{company.owner}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
              <Users size={16} color="#747474" />
              <span>10-50 employee</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#464646", fontFamily: "Inter, sans-serif", fontSize: 14, gridColumn: "span 2" }}>
              <MapPin size={16} color="#747474" />
              <span>eldawly st, Alexandria, Egypt</span>
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

        {/* Subscription Info Card */}
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
          {/* Subscription Info Title & Actions */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
                Subscription Info
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", color: "rgba(0, 35, 111, 1)", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}>
                <span>Actions</span>
                <ChevronDown size={16} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 16 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Current Plan:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>{company.plan}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Billing Cycle:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>Yearly</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 16 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Price:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>10000 EGP</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Start Date:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>29/4/2025</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 16, alignItems: "center" }}>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Renewal Date:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>{company.renewalDate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 16 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Max Users:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>16</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474" }}>Days Remaining:</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>29</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #EDEFF2", paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
                AI Consumption
              </span>
              <select style={{ border: "1px solid #D4D5D8", borderRadius: 8, padding: "4px 8px", fontFamily: "Inter, sans-serif", fontSize: 12, outline: "none" }}>
                <option>This month</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
            <select style={{ border: "1px solid #D4D5D8", borderRadius: 8, padding: "4px 8px", fontFamily: "Inter, sans-serif", fontSize: 12, outline: "none" }}>
              <option>This Month</option>
            </select>
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
              <select style={{ border: "1px solid #D4D5D8", borderRadius: 8, padding: "4px 8px", fontFamily: "Inter, sans-serif", fontSize: 12, outline: "none" }}>
                <option>Monthly</option>
              </select>
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
              <select style={{ border: "1px solid #D4D5D8", borderRadius: 8, padding: "4px 8px", fontFamily: "Inter, sans-serif", fontSize: 12, outline: "none" }}>
                <option>Monthly</option>
              </select>
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
              <select style={{ border: "1px solid #D4D5D8", borderRadius: 8, padding: "4px 8px", fontFamily: "Inter, sans-serif", fontSize: 12, outline: "none" }}>
                <option>This month</option>
              </select>
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
    </div>
  );
};

export default CompanyDetails;
