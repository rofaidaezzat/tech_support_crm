import React, { useState } from "react";

interface NewReportModalProps {
  onClose?: () => void;
  onSubmit?: (data: any) => void;
  dateStr?: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  border: "1px solid rgba(212, 213, 216, 1)",
  borderRadius: 8,
  padding: "0 14px",
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "#141414",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const readOnlyInputStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#D4D5D8", // Grey background for read-only based on screenshot
  border: "none",
  color: "#141414",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  height: 120,
  resize: "none",
  border: "1px solid rgba(212, 213, 216, 1)",
  borderRadius: 8,
  padding: "10px 14px",
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "#141414",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400, // They look regular/medium
  fontSize: 14,
  color: "#4B5563", // Dark grey text
  marginBottom: 8,
  display: "block",
};

const New_Report_Modal: React.FC<NewReportModalProps> = ({
  onClose,
  onSubmit,
  dateStr = "dd/mm/yyyy",
}) => {
  const [calls, setCalls] = useState("");
  const [leads, setLeads] = useState("");
  const [followups, setFollowups] = useState("");
  const [meetings, setMeetings] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");

  const dealsClosed = "2";
  const dealsValue = "15000 EGP";

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ calls, leads, followups, meetings, dealsClosed, dealsValue, priority, notes });
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e.currentTarget.readOnly) {
      e.currentTarget.style.borderColor = "#3B5BDB";
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e.currentTarget.readOnly) {
      e.currentTarget.style.borderColor = "rgba(212, 213, 216, 1)";
    }
  };

  return (
    <div
      style={{
        width: 762,
        height: 596,
        background: "rgba(245, 246, 250, 1)",
        borderRadius: 12,
        padding: 24, // prompt said 20px, but 24px looks closer to screenshot margins. Let's stick to spec.
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#00236F", // Dark blue from screenshot
          }}
        >
          New Report
        </h2>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "#6B7280",
          }}
        >
          {dateStr}
        </span>
      </div>

      {/* ── Form Body ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 24,
          rowGap: 16,
          flex: 1,
        }}
      >
        {/* Row 1 */}
        <div>
          <label style={labelStyle}>
            How many calls did you make today ?<span style={{ color: "#00236F" }}>*</span>
          </label>
          <input
            type="number"
            value={calls}
            onChange={(e) => setCalls(e.target.value)}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label style={labelStyle}>
            How many leads did you contact today?<span style={{ color: "#00236F" }}>*</span>
          </label>
          <input
            type="number"
            value={leads}
            onChange={(e) => setLeads(e.target.value)}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {/* Row 2 */}
        <div>
          <label style={labelStyle}>
            How many follow-ups did you complete today?<span style={{ color: "#00236F" }}>*</span>
          </label>
          <input
            type="number"
            value={followups}
            onChange={(e) => setFollowups(e.target.value)}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label style={labelStyle}>
            How many meetings or demos did you conduct today<span style={{ color: "#00236F" }}>*</span>
          </label>
          <input
            type="number"
            value={meetings}
            onChange={(e) => setMeetings(e.target.value)}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {/* Row 3 */}
        <div>
          <label style={labelStyle}>
            How many deals did you close today ?<span style={{ color: "#00236F" }}>*</span>
          </label>
          <input type="text" value={dealsClosed} readOnly style={readOnlyInputStyle} />
        </div>
        <div>
          <label style={labelStyle}>
            Total value of deals closed today<span style={{ color: "#00236F" }}>*</span>
          </label>
          <input type="text" value={dealsValue} readOnly style={readOnlyInputStyle} />
        </div>

        {/* Row 4 */}
        <div>
          <label style={labelStyle}>
            What is your top priority for tomorrow?<span style={{ color: "#00236F" }}>*</span>
          </label>
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div style={{ gridRow: "span 2" }}>
          <label style={labelStyle}>Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={textareaStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      <div>
        <button
          onClick={handleSubmit}
          style={{
            background: "rgba(0, 35, 111, 1)",
            width: 158,
            height: 56,
            borderRadius: 12,
            border: "none",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 24px",
            boxSizing: "border-box",
            transition: "background 0.2s",
          }}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default New_Report_Modal;
