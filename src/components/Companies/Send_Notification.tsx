import React, { useState } from "react";
import "../../styles/company-modal-mobile.css";

interface Company {
  id: string;
  name: string;
  owner: string;
}

interface SendNotificationProps {
  company: Company;
  onClose: () => void;
  onSubmit: (title: string, details: string) => void;
}

const SendNotification: React.FC<SendNotificationProps> = ({
  company,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const handleSend = () => {
    if (title.trim() && details.trim()) {
      onSubmit(title, details);
    }
  };

  const isFormValid = title.trim() !== "" && details.trim() !== "";

  return (
    <div style={styles.container} className="send-notification-container">
      {/* Header (First part in modal) */}
      <div style={styles.header}>
        <div style={styles.headerTitleCol}>
          <div style={styles.headerTitleRow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M6.33333 18.0909C7.04101 18.6562 7.97553 19 9 19C10.0245 19 10.959 18.6562 11.6667 18.0909M1.50763 15.1818C1.08602 15.1818 0.85054 14.5194 1.10557 14.1514C1.69736 13.2975 2.26855 12.0451 2.26855 10.537L2.29296 8.35166C2.29296 4.29145 5.29581 1 9 1C12.7588 1 15.8058 4.33993 15.8058 8.45995L15.7814 10.537C15.7814 12.0555 16.3329 13.3147 16.9006 14.169C17.1458 14.5379 16.9097 15.1818 16.4933 15.1818H1.50763Z"
                stroke="#464646"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={styles.titleText}>Send Notification</span>
          </div>
          <span style={styles.subtitleText}>to “{company.name}”</span>
        </div>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Title input field */}
        <div style={styles.titleCol}>
          <label style={styles.labelStyle}>
            Title<span style={styles.requiredStar}>*</span>
          </label>
          <input
            style={styles.inputStyle}
            type="text"
            placeholder="Special Offer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Details textarea field */}
        <div style={styles.detailsCol} className="send-notification-details-col">
          <label style={styles.labelStyle}>
            Details<span style={styles.requiredStar}>*</span>
          </label>
          <textarea
            style={styles.textareaStyle}
            placeholder="Type notification details here..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
      </div>

      {/* Footer (End part in modal) */}
      <div style={styles.footer}>
        <button
          style={{
            ...styles.sendBtn,
            background: isFormValid ? "var(--Foundation-brand-brand-500, #00236F)" : "#D4D5D8",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
          onClick={handleSend}
          disabled={!isFormValid}
        >
          Send Notification
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    width: "462px",
    flexDirection: "column",
    alignItems: "flex-start",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
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
    marginLeft: "26px",
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
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  titleCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "8px",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  detailsCol: {
    display: "flex",
    width: "422px",
    height: "118px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
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
  },
  textareaStyle: {
    width: "100%",
    flex: 1,
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #D4D5D8",
    background: "#FFF",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
    outline: "none",
    boxSizing: "border-box",
    resize: "none",
    lineHeight: "1.5",
  },
  footer: {
    borderRadius: "0 0 12px 12px",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    display: "flex",
    height: "76px",
    padding: "8px 20px 20px 20px",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  sendBtn: {
    borderRadius: "12px",
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
    whiteSpace: "nowrap",
    transition: "background 0.2s ease",
  },
};

export default SendNotification;
