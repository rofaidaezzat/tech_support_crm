import React, { useState } from 'react';
import '../../styles/sales-modals-mobile.css';

interface InviteNewSalesProps {
  onClose: () => void;
}

export const Invite_New_Sales: React.FC<InviteNewSalesProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');

  return (
    <div
      className="sales-modal-container"
      style={{
        display: "flex",
        width: 462,
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderRadius: "12px 12px 0 0",
          borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
          background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
          display: "flex",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "#141414" }}>
            Invite New Sales
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#FFF",
            border: "1px solid #E6E9F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          borderRadius: "0 0 12px 12px",
          background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
          display: "flex",
          paddingTop: 24,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 64,
          alignSelf: "stretch",
          boxSizing: "border-box",
        }}
      >
        {/* Input area */}
        <div
          className="sales-modal-form"
          style={{
            display: "flex",
            width: 422,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <label style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#464646" }}>
            Email Address*
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Mahmoudeldawly26@email|"
            style={{
              width: "100%",
              height: 48,
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid var(--Foundation-brand-brand-500, #00236F)",
              background: "transparent",
              boxSizing: "border-box",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              color: "#141414",
              outline: "none",
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            borderRadius: "0 0 12px 12px",
            background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
            display: "flex",
            height: 76,
            padding: "8px 20px 20px 20px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <button
            className="sales-modal-btn"
            style={{
              borderRadius: 12,
              background: "var(--Foundation-brand-brand-500, #00236F)",
              border: "none",
              display: "flex",
              width: 422,
              height: 48,
              padding: "8px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#FFF",
            }}
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};
