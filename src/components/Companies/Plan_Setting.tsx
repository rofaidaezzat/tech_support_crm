import React, { useState, useRef, useEffect } from "react";

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

interface PlanSettingProps {
  company: Company;
  onClose: () => void;
  onSave: (updatedCompany: Company) => void;
}

const PLAN_OPTIONS = ["Plan 1", "Plan 2", "Custom plan"];

const PlanSetting: React.FC<PlanSettingProps> = ({
  company,
  onClose,
  onSave,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(company.plan);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleUpgradeOnly = () => {
    const updatedCompany: Company = {
      ...company,
      plan: selectedPlan,
    };
    onSave(updatedCompany);
  };

  const handleRenew = () => {
    // Add 1 year to current renewal date (format DD/MM/YYYY)
    let newRenewalDate = company.renewalDate;
    if (company.renewalDate && company.renewalDate.includes("/")) {
      const parts = company.renewalDate.split("/");
      if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parseInt(parts[2], 10);
        newRenewalDate = `${day}/${month}/${year + 1}`;
      }
    }

    const updatedCompany: Company = {
      ...company,
      plan: selectedPlan,
      renewalDate: newRenewalDate,
      status: "Active", // renewing makes it active again
    };
    onSave(updatedCompany);
  };

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Header (First part in modal) */}
      <div style={styles.header}>
        <div style={styles.headerTitleCol}>
          <div style={styles.headerTitleRow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M14.3466 13.1322L12.0009 10.8L9.54662 13.2426M12.0009 10.8V16.8M2.40093 17.5408L2.40102 8.41649C2.40102 7.50257 2.40068 6.20083 2.40039 5.25829C2.40019 4.59537 2.93752 4.05859 3.60044 4.05859H9.31865L12.0837 7.01223H20.4C21.0627 7.01223 21.6 7.54951 21.6 8.21227L21.5997 17.5409C21.5996 18.8664 20.5251 19.9409 19.1997 19.9409L4.80092 19.9408C3.47543 19.9408 2.40091 18.8663 2.40093 17.5408Z"
                stroke="#464646"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={styles.titleText}>Plan Settings</span>
          </div>
          <span style={styles.subtitleText}>for “{company.name}”</span>
        </div>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Select Plan field */}
        <div style={styles.selectPlanCol}>
          <label style={styles.labelStyle}>
            Select Plan<span style={styles.requiredStar}>*</span>
          </label>
          <div
            ref={dropdownRef}
            style={{ position: "relative", width: "100%" }}
          >
            {/* Trigger */}
            <div
              style={styles.inputStyle}
              onClick={() => setDropdownOpen((o) => !o)}
            >
              <span>{selectedPlan}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Options list popup */}
            {dropdownOpen && (
              <div style={styles.dropdown}>
                {PLAN_OPTIONS.map((plan) => {
                  const isSelected = selectedPlan === plan;
                  return (
                    <div
                      key={plan}
                      style={{
                        ...styles.optionRow,
                        ...(isSelected ? styles.optionRowSelected : {}),
                      }}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setDropdownOpen(false);
                      }}
                    >
                      {/* Radio button */}
                      <div style={{
                        ...styles.radioOuter,
                        borderColor: isSelected ? "var(--Foundation-brand-brand-500, #00236F)" : "#8B909A"
                      }}>
                        {isSelected && <div style={styles.radioInner} />}
                      </div>
                      <span style={styles.optionLabel}>{plan}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Next renewal date */}
        <div style={styles.renewalRow}>
          <span style={styles.renewalLabel}>Next renewal date</span>
          <span style={styles.renewalDateVal}>{company.renewalDate}</span>
        </div>
      </div>

      {/* Buttons footer */}
      <div style={styles.footer}>
        <button style={styles.renewBtn} onClick={handleRenew}>
          Renew
        </button>
        <button style={styles.upgradeBtn} onClick={handleUpgradeOnly}>
          Upgrade Only
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    width: "462px",
    height: "341px",
    flexDirection: "column",
    alignItems: "flex-start",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    borderRadius: "12px",
    overflow: "visible",
    boxSizing: "border-box",
  },
  header: {
    borderRadius: "12px 12px 0 0",
    borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    display: "flex",
    padding: "20px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  headerTitleCol: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  headerTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  titleText: {
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
  },
  subtitleText: {
    fontSize: "13px",
    fontFamily: "Inter, sans-serif",
    color: "#6B7280",
    marginLeft: "32px",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#6B7280",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    display: "flex",
    padding: "24px 20px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    flex: "1 0 0",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  selectPlanCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "8px",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  labelStyle: {
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
  },
  requiredStar: {
    color: "#00236F",
    marginLeft: "2px",
  },
  inputStyle: {
    width: "100%",
    height: "40px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #D4D5D8",
    background: "#FFF",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
    outline: "none",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 100,
    borderRadius: "12px",
    background: "var(--Foundation-neutral-white, #FFF)",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.17)",
    display: "flex",
    width: "100%",
    padding: "12px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
    boxSizing: "border-box",
  },
  optionRow: {
    display: "flex",
    width: "100%",
    height: "40px",
    padding: "8px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    boxSizing: "border-box",
    transition: "background 0.15s ease",
  },
  optionRowSelected: {
    background: "var(--Foundation-brand-brand-50, #E6E9F1)",
  },
  radioOuter: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#8B909A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  radioInner: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "var(--Foundation-brand-brand-500, #00236F)",
  },
  optionLabel: {
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
    fontWeight: 400,
    userSelect: "none",
  },
  renewalRow: {
    borderRadius: "12px",
    background: "var(--Foundation-neutral-neutral-50, #EDEFF2)",
    display: "flex",
    height: "35px",
    padding: "8px 12px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  renewalLabel: {
    fontSize: "13px",
    fontFamily: "Inter, sans-serif",
    color: "#4B5563",
    fontWeight: 500,
  },
  renewalDateVal: {
    fontSize: "13px",
    fontFamily: "Inter, sans-serif",
    color: "#1F2937",
    fontWeight: 600,
  },
  footer: {
    borderRadius: "0 0 12px 12px",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    display: "flex",
    height: "76px",
    padding: "8px 17px 20px 23px",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch",
    gap: "8px",
    boxSizing: "border-box",
  },
  upgradeBtn: {
    borderRadius: "12px",
    background: "var(--Foundation-brand-brand-500, #00236F)",
    display: "flex",
    height: "48px",
    padding: "8px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    border: "none",
    color: "#FFF",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  renewBtn: {
    borderRadius: "12px",
    border: "1px solid var(--Foundation-brand-brand-500, #00236F)",
    display: "flex",
    height: "48px",
    padding: "8px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    background: "#FFF",
    color: "var(--Foundation-brand-brand-500, #00236F)",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default PlanSetting;
