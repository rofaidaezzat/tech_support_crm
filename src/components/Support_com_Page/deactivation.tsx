import React from "react";

interface SupportDeactivateProps {
  agentName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const SupportDeactivateAgent: React.FC<SupportDeactivateProps> = ({
  agentName,
  onClose,
  onConfirm,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <span style={styles.titleText}>
          Are you sure you want to deactivate <br />
          {agentName} ?
        </span>

        {/* Description */}
        <span style={styles.descriptionText}>
          {agentName} will no longer be able to access this account after deactivation.
        </span>

        {/* Buttons Row */}
        <div style={styles.buttonsRow}>
          <button style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.confirmBtn} onClick={onConfirm}>
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderRadius: "24px",
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
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "1.3",
  },
  descriptionText: {
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.5",
    maxWidth: "380px",
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
    color: "#464646",
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

export default SupportDeactivateAgent;
