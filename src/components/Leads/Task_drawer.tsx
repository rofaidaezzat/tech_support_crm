import React, { useState } from "react";
import checkSquareIcon from "../../../../assets/check-square-broken.svg";
import checkIcon from "../../../../assets/check-02.svg";
import starIcon from "../../../../assets/Icon (1).svg";

interface TaskDrawerProps {
  onClose?: () => void;
  onNewTask?: () => void;
}

const TaskCard = () => {
  return (
    <div
      style={{
        background: "rgba(245, 246, 250, 1)",
        borderRadius: 8,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={starIcon} alt="Star" width={19} height={18} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: "#141414",
            }}
          >
            Call Mohamed Yasser for followup
          </span>
        </div>
        <img src={checkIcon} alt="Complete" width={24} height={24} style={{ cursor: "pointer" }} />
      </div>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: "#6B7280",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        Lorem ipsum dolor sit amet consectetur. In lacus in odio faucibus pellentesque aliquam metus justo nulla. Sollicitudin est in eros ligula consectetur eu porttitor leo vel.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4B5563" }}>
          Assigned by <span style={{ color: "#141414", fontWeight: 500 }}>John Kraniski</span>
        </span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>
          Due today
        </span>
      </div>
    </div>
  );
};

const Task_drawer: React.FC<TaskDrawerProps> = ({ onClose, onNewTask }) => {
  const [activeTab, setActiveTab] = useState("Today");
  const tabs = ["All", "Today", "Overdue", "Completed"];

  return (
    <div
      style={{
        width: 521,
        height: 955,
        background: "rgba(255, 255, 255, 1)",
        boxShadow: "-1px 0px 4px 0px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: "32px 32px 16px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <img src={checkSquareIcon} alt="Tasks" width={24} height={24} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#141414",
            }}
          >
            Tasks
          </span>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(212, 213, 216, 1)",
          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "12px 0",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: activeTab === tab ? "rgba(0, 35, 111, 1)" : "#4B5563",
                borderBottom: activeTab === tab ? "2px solid rgba(0, 35, 111, 1)" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* ── Task List ── */}
      <div
        style={{
          flex: 1,
          padding: "16px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
        }}
      >
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          padding: "24px 32px",
          background: "#fff",
          borderTop: "1px solid rgba(212, 213, 216, 0.5)",
        }}
      >
        <button
          onClick={onNewTask}
          style={{
            background: "rgba(0, 35, 111, 1)",
            borderRadius: 12,
            border: "none",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          New Task
        </button>
      </div>
    </div>
  );
};

export default Task_drawer;
