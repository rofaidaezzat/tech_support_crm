import React from "react";
import closeIcon from "../../assets/x-02.svg";
import "../../styles/leads-modal-mobile.css";
import calendarIcon from "../../assets/calendar-01.svg";
import userIcon from "../../assets/user-profile-01.svg";
import thumbDownIcon from "../../assets/thumb down.svg";
import thumbUpIcon from "../../assets/thumb up.svg";
import meetingIcon from "../../assets/team meeting.svg";
import dealIcon from "../../assets/Deal.svg";
import vectorIcon from "../../assets/Vector.svg";
import { useGetAssignmentHistoryQuery } from "../../app/service/crudAssignment_lead";

interface TimelineEntry {
  status: string;
  date: string;
  person: string;
  icon: string;
  color?: string;
}

interface StatusTimelineProps {
  onClose?: () => void;
  leadName?: string;
  entries?: TimelineEntry[];
  leadId?: string;
}

const DEFAULT_ENTRIES: TimelineEntry[] = [
  { status: "Interested",     date: "20/4/2025", person: "Mohammed Yasser", icon: vectorIcon },
  { status: "Not interested", date: "20/4/2025", person: "Mohammed Yasser", icon: thumbDownIcon },
  { status: "Interested",     date: "20/4/2025", person: "Mohammed Yasser", icon: thumbUpIcon },
  { status: "Meeting",        date: "20/4/2025", person: "Mohammed Yasser", icon: meetingIcon },
  { status: "Deal",           date: "20/4/2025", person: "Mohammed Yasser", icon: dealIcon, color: "#00236F" },
];

const formatDate = (isoString?: string | null) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const getStatusConfig = (status: string) => {
  const normalized = (status || "").toUpperCase();
  switch (normalized) {
    case "FRESH":
      return { label: "Fresh", icon: vectorIcon };
    case "INTERESTED":
      return { label: "Interested", icon: thumbUpIcon };
    case "NOT_INTERESTED":
      return { label: "Not interested", icon: thumbDownIcon };
    case "MEETING":
      return { label: "Meeting", icon: meetingIcon };
    case "AFTER_MEETING_FOLLOWUP":
      return { label: "After meeting followup", icon: meetingIcon };
    case "WRONG_NUMBER":
      return { label: "Wrong number", icon: thumbDownIcon };
    case "NO_ANSWER":
      return { label: "No answer", icon: thumbDownIcon };
    case "DEAL":
      return { label: "Deal", icon: dealIcon, color: "#00236F" };
    default:
      return { label: status, icon: vectorIcon };
  }
};

const getPersonName = (assignment: any) => {
  if (assignment.sales) {
    return `${assignment.sales.first_name} ${assignment.sales.last_name}`.trim();
  }
  if (assignment.assigned_by_user) {
    return `${assignment.assigned_by_user.first_name} ${assignment.assigned_by_user.last_name}`.trim();
  }
  return "Unknown";
};

const StatusTimeline: React.FC<StatusTimelineProps> = ({
  onClose,
  leadName = "leads name",
  entries: propEntries,
  leadId,
}) => {
  const { data: historyData, isLoading } = useGetAssignmentHistoryQuery(leadId || "", {
    skip: !leadId,
  });

  const entries = React.useMemo(() => {
    if (propEntries) return propEntries;
    if (!leadId || !historyData?.data) return DEFAULT_ENTRIES;

    return historyData.data.map((item: any) => {
      const config = getStatusConfig(item.status);
      return {
        status: config.label,
        date: formatDate(item.assigned_at),
        person: getPersonName(item),
        icon: config.icon,
        color: config.color,
      };
    });
  }, [propEntries, historyData, leadId]);

  return (
    <div
      className="leads-modal-root"
      style={{
        width: 462,
        height: 618,
        background: "#F5F6FA",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .skeleton-pulse {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #E2E8F0;
        }
      `}</style>
      {/* ── Header ── */}
      <div
        className="leads-modal-header"
        style={{
          width: 462,
          height: 91,
          background: "#F5F6FA",
          borderBottom: "1px solid #D4D5D8",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Status Timeline icon (waveform SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
              <path d="M1 7.66608H5L7.04044 1L11.4382 15L12.9903 7.66608H17" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#141414",
              }}
            >
              Status Timeline
            </span>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#6B7280",
              paddingLeft: 26,
            }}
          >
            for "{leadName}"
          </span>
        </div>

        {/* Close button */}
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
            flexShrink: 0,
          }}
        >
          <img src={closeIcon} alt="Close" width={14} height={14} />
        </button>
      </div>

      {/* ── Body ── */}
      <div
        className="leads-modal-body"
        style={{
          width: 462,
          height: 527,
          background: "#F5F6FA",
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          padding: "24px 20px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[0, 1, 2].map((idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  {/* Icon column + connecting dashed line */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                      width: 48,
                    }}
                  >
                    {/* Icon circle placeholder */}
                    <div
                      className="skeleton-pulse"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    {/* Dashed connector line placeholder (hide on last item) */}
                    {idx < 2 && (
                      <div
                        style={{
                          width: 0,
                          flexGrow: 1,
                          minHeight: 28,
                          borderLeft: "2px dashed #D4D5D8",
                          margin: "4px 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Content placeholder */}
                  <div style={{ paddingBottom: idx < 2 ? 28 : 0, display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                    {/* Status placeholder */}
                    <div
                      className="skeleton-pulse"
                      style={{
                        width: 120,
                        height: 16,
                        borderRadius: 4,
                        marginTop: 4,
                      }}
                    />
                    {/* Date placeholder */}
                    <div
                      className="skeleton-pulse"
                      style={{
                        width: 80,
                        height: 12,
                        borderRadius: 4,
                        marginTop: 4,
                      }}
                    />
                    {/* Person placeholder */}
                    <div
                      className="skeleton-pulse"
                      style={{
                        width: 100,
                        height: 12,
                        borderRadius: 4,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
              No timeline history found.
            </div>
          ) : (
            entries.map((entry, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                {/* Icon column + connecting dashed line */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    width: 48,
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#EDEFF2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      paddingRight: 0,
                    }}
                  >
                    <img
                      src={entry.icon}
                      alt={entry.status}
                      style={{
                        width: 24,
                        height: 24,
                        transform: "rotate(-90deg)",
                        paddingRight: 0,
                      }}
                    />
                  </div>
                  {/* Dashed connector line (hide on last item) */}
                  {idx < entries.length - 1 && (
                    <div
                      style={{
                        width: 0,
                        flexGrow: 1,
                        minHeight: 28,
                        borderLeft: "2px dashed #D4D5D8",
                        margin: "4px 0",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: idx < entries.length - 1 ? 28 : 0 }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: entry.color ?? "#141414",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {entry.status}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <img src={calendarIcon} alt="Date" width={16} height={16} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
                      {entry.date}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <img src={userIcon} alt="Person" width={16} height={16} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
                      {entry.person}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusTimeline;
