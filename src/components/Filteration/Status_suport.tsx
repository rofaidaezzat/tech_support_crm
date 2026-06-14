import React, { useState } from "react";

interface StatusSuportProps {
  onCall: () => void;
  onSendNotification: () => void;
  onClose: () => void;
}

const StatusSuport: React.FC<StatusSuportProps> = ({ onCall, onSendNotification, onClose }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const s = styles;

  return (
    <>
      {/* Click outside overlay */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 998,
        }}
        onClick={onClose}
      />

      {/* Popover Card */}
      <div style={s.container}>
        {/* Call Option */}
        <div
          onClick={() => {
            onCall();
            onClose();
          }}
          onMouseEnter={() => setHoveredItem("call")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            ...s.optionRow,
            background: hoveredItem === "call" ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
          }}
        >
          <div style={s.innerRow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12.8715 6.32596C14.0713 6.52705 15.1613 7.09377 16.0315 7.96214C16.9016 8.8305 17.4649 9.91824 17.671 11.1157M13.0547 2.40002C15.1888 2.76108 17.1352 3.77113 18.6831 5.31133C20.2311 6.85611 21.2386 8.7985 21.6004 10.9283M19.9333 19.4017C19.9333 19.4017 18.7747 20.5397 18.4907 20.8733C18.0282 21.3669 17.4832 21.6 16.7688 21.6C16.7001 21.6 16.6268 21.6 16.5581 21.5954C15.1979 21.5086 13.9339 20.9785 12.9859 20.526C10.3938 19.2737 8.11773 17.4959 6.22631 15.2427C4.66463 13.3643 3.62046 11.6275 2.92893 9.76284C2.50302 8.62482 2.34731 7.73818 2.416 6.90181C2.4618 6.36708 2.66789 5.92375 3.048 5.54442L4.60968 3.98593C4.83408 3.77569 5.07223 3.66144 5.30579 3.66144C5.59431 3.66144 5.82788 3.83511 5.97443 3.98136C5.97901 3.98593 5.98359 3.9905 5.98817 3.99507C6.26753 4.25558 6.53315 4.52523 6.81251 4.81316C6.95448 4.95941 7.10103 5.10566 7.24758 5.25648L8.49784 6.50419C8.98329 6.98864 8.98329 7.43654 8.49784 7.92099C8.36503 8.05353 8.2368 8.18607 8.10399 8.31404C7.71929 8.70709 8.02149 8.40551 7.62306 8.76199C7.6139 8.77113 7.60474 8.7757 7.60016 8.78485C7.2063 9.17789 7.27958 9.5618 7.36201 9.82231C7.36659 9.83602 7.37117 9.84973 7.37575 9.86345C7.70091 10.6495 8.15888 11.3899 8.855 12.272L8.85958 12.2766C10.1236 13.8305 11.4563 15.0416 12.9263 15.9694C13.1141 16.0882 13.3065 16.1842 13.4896 16.2756C13.6545 16.3579 13.8102 16.4356 13.943 16.5179C13.9614 16.527 13.9797 16.5407 13.998 16.5499C14.1537 16.6275 14.3003 16.6641 14.4514 16.6641C14.8315 16.6641 15.0696 16.4265 15.1475 16.3488L16.0452 15.4529C16.2009 15.2975 16.4482 15.1101 16.7367 15.1101C17.0207 15.1101 17.2542 15.2884 17.3962 15.4438C17.4008 15.4483 17.4008 15.4483 17.4054 15.4529L19.9288 17.9712C20.4005 18.4373 19.9333 19.4017 19.9333 19.4017Z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={s.optionText}>Call</span>
          </div>
        </div>

        {/* Send Notification Option */}
        <div
          onClick={() => {
            onSendNotification();
            onClose();
          }}
          onMouseEnter={() => setHoveredItem("notification")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            ...s.optionRow,
            background: hoveredItem === "notification" ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
          }}
        >
          <div style={s.innerRow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9.33333 20.0909C10.041 20.6562 10.9755 21 12 21C13.0245 21 13.959 20.6562 14.6667 20.0909M4.50763 17.1818C4.08602 17.1818 3.85054 16.5194 4.10557 16.1514C4.69736 15.2975 5.26855 14.0451 5.26855 12.537L5.29296 10.3517C5.29296 6.29145 8.29581 3 12 3C15.7588 3 18.8058 6.33993 18.8058 10.4599L18.7814 12.537C18.7814 14.0555 19.3329 15.3147 19.9006 16.169C20.1458 16.5379 19.9097 17.1818 19.4933 17.1818H4.50763Z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={s.optionText}>Send Notification</span>
          </div>
        </div>
      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderRadius: "12px",
    background: "var(--Foundation-neutral-white, #FFF)",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.17)",
    display: "inline-flex",
    padding: "12px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
    boxSizing: "border-box",
    position: "absolute",
    top: "32px",
    right: 0,
    zIndex: 999,
  },
  optionRow: {
    display: "inline-flex",
    width: "160px",
    height: "40px",
    padding: "8px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  innerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  optionText: {
    color: "var(--Foundation-neutral-neutral-950, #141414)",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
};

export default StatusSuport;
