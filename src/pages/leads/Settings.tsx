import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Settings = () => {
  const [taskReminder, setTaskReminder] = useState(true);
  const [followupReminder, setFollowupReminder] = useState(true);
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');

  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      {/* ── Header ── */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 33,
          lineHeight: "100%",
          color: "rgba(0, 35, 111, 1)",
          width: 136,
          height: 40,
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        Settings
      </div>

      {/* Main Container */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 678, marginLeft: 271 /* (413 - 142) approximation for left alignment relative to header, or just let it sit where it is based on layout. Let's just follow the 678 width and flow naturally */ }}>
        
        {/* ── Profile Section ── */}
        <div style={{ display: "flex", flexDirection: "column", width: 678 }}>
          {/* Header */}
          <div
            style={{
              background: "rgba(237, 239, 242, 1)",
              width: 678,
              height: 71,
              paddingTop: 24,
              paddingRight: 32,
              paddingBottom: 24,
              paddingLeft: 32,
              boxSizing: "border-box",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              borderTopWidth: 1,
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: "#4B5563",
              display: "flex",
              alignItems: "center",
            }}
          >
            Profile
          </div>

          {/* Body */}
          <div
            style={{
              background: "rgba(255, 255, 255, 1)",
              width: 678,
              padding: 32,
              boxSizing: "border-box",
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* User Info */}
            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
              {/* Avatar */}
              <div
                style={{
                  background: "rgba(138, 154, 189, 1)",
                  width: 136,
                  height: 136,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 48,
                  fontWeight: 700,
                }}
              >
                MS
              </div>
              
              {/* Info details */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
                  Mahmoud Eldawly
                </div>
                <div style={{ background: "rgba(237, 239, 242, 1)", padding: "4px 8px", borderRadius: 8, width: "fit-content", fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4B5563" }}>
                  Sales member
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563", marginTop: 4 }}>
                  Mahmouadeldawly@email.com
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
                  01122334455
                </div>
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderTop: "1px solid rgba(237, 239, 242, 1)",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, lineHeight: "100%", letterSpacing: "0%", color: "rgba(20, 20, 20, 1)" }}>Edit Profile</span>
                <ChevronRight size={20} color="#6B7280" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderTop: "1px solid rgba(237, 239, 242, 1)",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, lineHeight: "100%", letterSpacing: "0%", color: "rgba(20, 20, 20, 1)" }}>Change Password</span>
                <ChevronRight size={20} color="#6B7280" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Notifications Section ── */}
        <div style={{ display: "flex", flexDirection: "column", width: 678, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", borderRadius: 12, overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              background: "rgba(237, 239, 242, 1)",
              width: "100%",
              height: 71,
              paddingTop: 24,
              paddingRight: 32,
              paddingBottom: 24,
              paddingLeft: 32,
              boxSizing: "border-box",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: "#4B5563",
              display: "flex",
              alignItems: "center",
            }}
          >
            Notifications
          </div>

          {/* Body */}
          <div style={{ background: "rgba(255, 255, 255, 1)", width: "100%", padding: 32, boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            
            {/* Task Reminder */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid rgba(237, 239, 242, 1)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "80%" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>Task Reminder</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280", lineHeight: "140%" }}>
                  Receive Alerts when a scheduled task is approaching it's deadline.
                </span>
              </div>
              {/* Toggle switch */}
              <div
                onClick={() => setTaskReminder(!taskReminder)}
                style={{
                  width: 44,
                  height: 24,
                  background: taskReminder ? "rgba(0, 35, 111, 1)" : "rgba(212, 213, 216, 1)",
                  borderRadius: 12,
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    background: "#fff",
                    borderRadius: "50%",
                    position: "absolute",
                    top: 2,
                    left: taskReminder ? 22 : 2,
                    transition: "all 0.2s",
                  }}
                />
              </div>
            </div>

            {/* Followup Reminder */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "80%" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>Followup Reminder</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280", lineHeight: "140%" }}>
                  Receive Alerts for neglected leads approaching their followup time.
                </span>
              </div>
              {/* Toggle switch */}
              <div
                onClick={() => setFollowupReminder(!followupReminder)}
                style={{
                  width: 44,
                  height: 24,
                  background: followupReminder ? "rgba(0, 35, 111, 1)" : "rgba(212, 213, 216, 1)",
                  borderRadius: 12,
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    background: "#fff",
                    borderRadius: "50%",
                    position: "absolute",
                    top: 2,
                    left: followupReminder ? 22 : 2,
                    transition: "all 0.2s",
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* ── Language Section ── */}
        <div style={{ display: "flex", flexDirection: "column", width: 678, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", borderRadius: 12, overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              background: "rgba(237, 239, 242, 1)",
              width: "100%",
              height: 71,
              paddingTop: 24,
              paddingRight: 32,
              paddingBottom: 24,
              paddingLeft: 32,
              boxSizing: "border-box",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: "#4B5563",
              display: "flex",
              alignItems: "center",
            }}
          >
            Language
          </div>

          {/* Body */}
          <div style={{ background: "rgba(255, 255, 255, 1)", width: "100%", display: "flex", flexDirection: "column" }}>
            
            {/* English Option */}
            <div
              onClick={() => setLanguage('English')}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 32px",
                background: language === 'English' ? "rgba(237, 239, 242, 0.5)" : "#fff",
                borderBottom: "1px solid rgba(237, 239, 242, 1)",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>English</span>
              {/* Radio Circle */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: language === 'English' ? "6px solid rgba(0, 35, 111, 1)" : "1px solid rgba(212, 213, 216, 1)",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Arabic Option */}
            <div
              onClick={() => setLanguage('Arabic')}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 32px",
                background: language === 'Arabic' ? "rgba(237, 239, 242, 0.5)" : "#fff",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>Arabic</span>
              {/* Radio Circle */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: language === 'Arabic' ? "6px solid rgba(0, 35, 111, 1)" : "1px solid rgba(212, 213, 216, 1)",
                  boxSizing: "border-box",
                }}
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;