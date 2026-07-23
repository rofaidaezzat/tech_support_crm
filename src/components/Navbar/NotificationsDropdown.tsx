import React from "react";
import taskIcon from "../../assets/notification icons.svg";
import followUpIcon from "../../assets/notification icons (1).svg";
import dailyReportIcon from "../../assets/notification icons (2).svg";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  extractNotifications,
  Notification,
} from "../../app/service/crudnotifications";

interface NotificationsDropdownProps {
  onViewAll?: () => void;
}

function formatRelativeTime(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSec < 60) return "Just now";
  const mins = Math.floor(diffInSec / 60);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} d ago`;
  return date.toLocaleDateString();
}

function getIconForType(type: string) {
  switch (type) {
    case "SUPPORT_TICKET":
      return followUpIcon;
    case "NEW_ASSIGNMENT":
    case "TASK_REMINDER":
    case "TASK_OVERDUE":
      return taskIcon;
    default:
      return dailyReportIcon;
  }
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  onViewAll,
}) => {
  const { data: response, isLoading } = useGetNotificationsQuery({ limit: 5 });
  const [markAsRead] = useMarkAsReadMutation();

  const notificationsList = extractNotifications(response);

  const handleNotificationClick = (notif: Notification) => {
    if (!notif.is_read) {
      markAsRead(notif.id);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.11)",
        borderRadius: 12,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Part 1: Header ── */}
      <div
        style={{
          width: "100%",
          height: 48,
          background: "rgba(255, 255, 255, 1)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottom: "1px solid rgba(212, 213, 216, 1)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 20,
          paddingRight: 20,
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: "#141414",
          }}
        >
          Notifications
        </span>
      </div>

      {/* ── Part 2: Body ── */}
      <div
        style={{
          width: "100%",
          background: "rgba(255, 255, 255, 1)",
          overflowY: "auto",
          maxHeight: 320,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {isLoading ? (
          <div
            style={{
              padding: 20,
              textAlign: "center",
              fontSize: 13,
              color: "#6B7280",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Loading notifications...
          </div>
        ) : notificationsList.length === 0 ? (
          <div
            style={{
              padding: 24,
              textAlign: "center",
              fontSize: 13,
              color: "#6B7280",
              fontFamily: "Inter, sans-serif",
            }}
          >
            No notifications available
          </div>
        ) : (
          notificationsList.map((notif, index) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px",
                borderBottom:
                  index < notificationsList.length - 1
                    ? "1px solid rgba(212, 213, 216, 0.5)"
                    : "none",
                background: notif.is_read ? "transparent" : "rgba(230, 233, 241, 0.4)",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(245, 246, 250, 1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = notif.is_read
                  ? "transparent"
                  : "rgba(230, 233, 241, 0.4)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 99,
                  background: "var(--Foundation-brand-brand-50, #E6E9F1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src={getIconForType(notif.type)}
                  alt={notif.title}
                  width={24}
                  height={24}
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: notif.is_read ? 500 : 600,
                    fontSize: 13,
                    color: "#141414",
                    marginBottom: 3,
                  }}
                >
                  {notif.title}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#6B7280",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {notif.body}
                </div>
              </div>

              {/* Time */}
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 11,
                  color: "#9CA3AF",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 4,
                }}
              >
                <span>{formatRelativeTime(notif.created_at)}</span>
                {!notif.is_read && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#00236F",
                      display: "inline-block",
                    }}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Part 3: View All Footer ── */}
      <div
        onClick={() => {
          if (onViewAll) onViewAll();
        }}
        style={{
          borderTop: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
          background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
          display: "flex",
          padding: "9px 12px",
          alignItems: "center",
          alignSelf: "stretch",
          cursor: "pointer",
          flexShrink: 0,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background =
            "rgba(237, 239, 242, 1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background =
            "var(--Foundation-neutral-neutral-25, #F5F6FA)";
        }}
      >
        <span
          style={{
            color: "var(--Foundation-brand-brand-500, #00236F)",
            fontFamily: "Inter",
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
          }}
        >
          View All
        </span>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
