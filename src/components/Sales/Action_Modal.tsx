import React from 'react';

interface ActionModalProps {
  onClose: () => void;
  onPause: () => void;
  onEditTarget?: () => void;
}

export const Action_Modal: React.FC<ActionModalProps> = ({ onClose, onPause, onEditTarget }) => {
  return (
    <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 10, marginTop: 4 }}>
      <div
        style={{
          borderRadius: 12,
          background: "var(--Foundation-neutral-white, #FFF)",
          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.17)",
          display: "inline-flex",
          padding: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        {/* Edit target */}
        <div 
          style={{ display: "flex", width: 115, height: 40, alignItems: "center", gap: 8, cursor: "pointer", borderRadius: 8, padding: "0 8px" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          onClick={() => { onClose(); onEditTarget && onEditTarget(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M12 12V11C11.4477 11 11 11.4477 11 12H12ZM12.0797 12H13.0797C13.0797 11.4477 12.632 11 12.0797 11V12ZM12.0797 12.0721V13.0721C12.632 13.0721 13.0797 12.6244 13.0797 12.0721H12.0797ZM12 12.0721H11C11 12.6244 11.4477 13.0721 12 13.0721V12.0721ZM21 12H20C20 16.4183 16.4183 20 12 20V21V22C17.5228 22 22 17.5228 22 12H21ZM12 21V20C7.58172 20 4 16.4183 4 12H3H2C2 17.5228 6.47715 22 12 22V21ZM3 12H4C4 7.58172 7.58172 4 12 4V3V2C6.47715 2 2 6.47715 2 12H3ZM12 3V4C16.4183 4 20 7.58172 20 12H21H22C22 6.47715 17.5228 2 12 2V3ZM16.5 12H15.5C15.5 13.933 13.933 15.5 12 15.5V16.5V17.5C15.0376 17.5 17.5 15.0376 17.5 12H16.5ZM12 16.5V15.5C10.067 15.5 8.5 13.933 8.5 12H7.5H6.5C6.5 15.0376 8.96243 17.5 12 17.5V16.5ZM7.5 12H8.5C8.5 10.067 10.067 8.5 12 8.5V7.5V6.5C8.96243 6.5 6.5 8.96243 6.5 12H7.5ZM12 7.5V8.5C13.933 8.5 15.5 10.067 15.5 12H16.5H17.5C17.5 8.96243 15.0376 6.5 12 6.5V7.5ZM12 12V13H12.0797V12V11H12V12ZM12.0797 12H11.0797V12.0721H12.0797H13.0797V12H12.0797ZM12.0797 12.0721V11.0721H12V12.0721V13.0721H12.0797V12.0721ZM12 12.0721H13V12H12H11V12.0721H12Z" fill="#464646"/>
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#141414", whiteSpace: "nowrap" }}>Edit target</span>
        </div>

        {/* Pause lead */}
        <div 
          style={{ display: "flex", width: 115, height: 40, alignItems: "center", gap: 8, cursor: "pointer", borderRadius: 8, padding: "0 8px" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#FEF2F2"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          onClick={onPause}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M17.625 3H6.375C4.51104 3 3 4.51104 3 6.375V17.625C3 19.489 4.51104 21 6.375 21H17.625C19.489 21 21 19.489 21 17.625V6.375C21 4.51104 19.489 3 17.625 3Z" stroke="#A80D0B" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M8.625 9.89062C8.625 9.19164 9.19164 8.625 9.89062 8.625H14.1094C14.8084 8.625 15.375 9.19164 15.375 9.89062V14.1094C15.375 14.8084 14.8084 15.375 14.1094 15.375H9.89062C9.19164 15.375 8.625 14.8084 8.625 14.1094V9.89062Z" stroke="#A80D0B" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#A80D0B", whiteSpace: "nowrap" }}>Pause lead</span>
        </div>
      </div>
    </div>
  );
};
