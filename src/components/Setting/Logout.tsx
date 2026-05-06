import React from "react";
import closeIcon from "../../assets/x-02.svg";
import logoutIcon from "../../assets/logout.svg";

interface LogoutProps {
  onClose?: () => void;
  onLogout?: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onClose, onLogout }) => {
  return (
    <div
      style={{
        width: 462,
        height: 412,
        background: "rgba(245, 246, 250, 1)",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          height: 76,
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(212, 213, 216, 1)",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#141414",
          }}
        >
          Logout
        </span>
        <button
          onClick={onClose}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(212, 213, 216, 1)",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img src={closeIcon} alt="Close" width={14} height={14} />
        </button>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 20px 20px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Icon Container */}
        <div
          style={{
            width: 98,
            height: 98,
            background: "#D4D5D8",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
            flexShrink: 0,
          }}
        >
          <img src={logoutIcon} alt="Logout" style={{ width: 48, height: 48 }} />
        </div>

        {/* Text Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
            width: 255,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: "#141414",
              textAlign: "center",
            }}
          >
            You are about to logout.
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#4B5563",
              textAlign: "center",
            }}
          >
            Are you Sure you want to logout ?
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            width: 422,
            height: 48,
            gap: 12,
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              height: 48,
              borderRadius: 12,
              background: "#fff",
              border: "1px solid rgba(212, 213, 216, 1)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 15,
              color: "#141414",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            style={{
              flex: 1,
              height: 48,
              borderRadius: 12,
              background: "#00236F",
              border: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 15,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
