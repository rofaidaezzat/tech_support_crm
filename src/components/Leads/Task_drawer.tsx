import React, { useState } from "react";
import checkSquareIcon from "../../assets/check-square-broken.svg";
import checkIcon from "../../assets/check-02.svg";
import starIcon from "../../assets/stars.svg";
import editIcon from "../../assets/edit-03.svg";
import bellIcon from "../../assets/bell-ringing-04.svg";
import calendarIcon from "../../assets/calendar-03.svg";
import infoIcon from "../../assets/information-circle-contained.svg";
import userProfileIcon from "../../assets/user-profile-02.svg";

interface TaskDrawerProps {
  onClose?: () => void;
  onNewTask?: () => void;
}

const TaskCard = () => {
  return (
    <div
      style={{
        background: "rgba(245, 246, 250, 1)",
        width: "100%",
        height: 293,
        borderRadius: 12,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={starIcon} alt="Star" width={24} height={24} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: "#141414",
            }}
          >
            Call Mohamed Yasser for followup
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={editIcon} alt="Edit" width={24} height={24} style={{ cursor: "pointer" }} />
          <img src={checkIcon} alt="Complete" width={24} height={24} style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          color: "#6B7280",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        Lorem ipsum dolor sit amet consectetur. In lacus in odio faucibus pellentesque aliquam metus justo nulla. Sollicitudin est in eros ligula consectetur eu porttitor leo vel.
      </p>

      {/* Details Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
        {/* Lead Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={userProfileIcon} alt="User" width={20} height={20} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>Lead Name:</span>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#141414", fontWeight: 500 }}>
            Mohammed Mahmoud
          </span>
        </div>

        {/* Priority */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={infoIcon} alt="Info" width={20} height={20} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>Priority</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4B5563" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>Low</span>
          </div>
        </div>

        {/* Assigned by */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={userProfileIcon} alt="User" width={20} height={20} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>Assigned by:</span>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#141414", fontWeight: 500 }}>
            Yasser Helmy
          </span>
        </div>

        {/* Due date */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={calendarIcon} alt="Calendar" width={20} height={20} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>Due date</span>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#EF4444" }}>
            Yesterday
          </span>
        </div>
      </div>

      {/* Reminder */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
        <img src={bellIcon} alt="Bell" width={20} height={20} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
          We will remind you at 2 Apr
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
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: "16px 0" }}>
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
            width: 473,
            height: 35,
            borderBottom: "1px solid rgba(212, 213, 216, 1)",
          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                width: 118.25,
                height: 35,
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontWeight: activeTab === tab ? 700 : 500,
                fontSize: 16,
                lineHeight: "100%",
                color: activeTab === tab ? "rgba(0, 35, 111, 1)" : "#4B5563",
                borderBottom: activeTab === tab ? "1px solid rgba(0, 35, 111, 1)" : "1px solid transparent",
                marginBottom: -1, // Overlaps container border seamlessly
                transition: "color 0.2s, border-color 0.2s",
                boxSizing: "border-box",
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
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          paddingTop: 24,
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
