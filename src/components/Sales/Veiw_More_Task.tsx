import React from 'react';

interface ViewMoreTaskProps {
  onClose?: () => void;
  tasks?: string[];
  date?: string;
}

const defaultTasks = [
  "Weekly meeting with the team.",
  "Weekly meeting with the team.",
  "Weekly meeting with the team.",
  "Weekly meeting with the team.",
  "Weekly meeting with the team."
];

const Veiw_More_Task: React.FC<ViewMoreTaskProps> = ({ 
  onClose, 
  tasks = defaultTasks,
  date = "Sun 6 April, 2026"
}) => {
  return (
    <div style={{
      width: 435,
      height: 330,
      display: "flex",
      flexDirection: "column",
      boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
      borderRadius: 12
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(245, 246, 250, 1)",
        height: 91,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px 24px",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottom: "1px solid rgba(212, 213, 216, 1)",
        boxSizing: "border-box",
        width: "100%"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
              <path d="M1 7.66608H5L7.04044 1L11.4382 15L12.9903 7.66608H17" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#111827", fontFamily: "Inter, sans-serif" }}>Tasks</span>
          </div>
          <span style={{ fontSize: 16, color: "#4B5563", fontFamily: "Inter, sans-serif" }}>{date}</span>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#FFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{
        borderRadius: "0 0 12px 12px",
        background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
        display: "flex",
        padding: "32px 24px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 20,
        flex: 1,
        overflowY: "auto",
        boxSizing: "border-box"
      }}>
        {tasks.map((task, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#A7B8D6",
              flexShrink: 0
            }} />
            <span style={{
              fontSize: 16,
              color: "#111827",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400
            }}>
              {task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Veiw_More_Task;
