import React from "react";
import "../../styles/company-modal-mobile.css";

interface Company {
  id: string;
  name: string;
  owner: string;
  sector: string;
  plan: string;
  status: string;
  renewalDate: string;
  salesCount: number;
}

interface PauseCompanyProps {
  company: Company;
  onClose: () => void;
  onConfirm: () => void;
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
      bg: "var(--Foundation-error-red-50, #FDE7E7)",
      color: "var(--Foundation-error-red-700, #A80D0B)",
    };
  }
  if (s === "paused") {
    return {
      bg: "var(--Foundation-neutral-neutral-50, #EDEFF2)",
      color: "#464646",
    };
  }
  return {
    bg: "var(--Foundation-neutral-neutral-50, #EDEFF2)",
    color: "#464646",
  };
};

const PauseCompany: React.FC<PauseCompanyProps> = ({
  company,
  onClose,
  onConfirm,
}) => {
  const statusStyle = getStatusStyle(company.status);

  return (
    <div style={styles.container} className="pause-modal-container">
      {/* Title */}
      <span style={styles.titleText} className="pause-title">
        Are you sure you want to pause this company current plan ?
      </span>

      {/* Company info bar */}
      <div style={styles.companyBar}>
        <span style={styles.companyName} title={company.name}>
          {company.name}
        </span>
        <span
          style={{
            ...styles.statusBadge,
            background: statusStyle.bg,
            color: statusStyle.color,
          }}
        >
          {company.status}
        </span>
      </div>

      {/* Buttons Row */}
      <div style={styles.buttonsRow}>
        <button style={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
        <button style={styles.confirmBtn} onClick={onConfirm}>
          Confirm & Pause
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderRadius: "12px",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    display: "flex",
    width: "462px",
    paddingTop: "32px",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingBottom: "24px",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "32px",
    boxSizing: "border-box",
    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
  },
  titleText: {
    color: "var(--Foundation-neutral-neutral-950, #141414)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "19px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  },
  companyBar: {
    borderRadius: "12px",
    background: "var(--Foundation-neutral-neutral-50, #EDEFF2)",
    display: "flex",
    padding: "8px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  companyName: {
    color: "var(--Foundation-neutral-neutral-950, #141414)",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    width: "146px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left",
  },
  statusBadge: {
    borderRadius: "12px",
    display: "flex",
    height: "24px",
    padding: "4px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Inter",
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: "normal",
  },
  buttonsRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  cancelBtn: {
    borderRadius: "12px",
    border: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
    display: "flex",
    height: "48px",
    padding: "8px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    background: "#FFFFFF",
    color: "#141414",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "background 0.2s ease",
  },
  confirmBtn: {
    borderRadius: "12px",
    background: "var(--Foundation-error-red-700, #A80D0B)",
    display: "flex",
    height: "48px",
    padding: "8px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    border: "none",
    color: "#FFFFFF",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "background 0.2s ease",
  },
};

export default PauseCompany;
