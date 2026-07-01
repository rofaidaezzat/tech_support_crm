import React, { useState } from "react";

interface StatusTicketProps {
  selected: string;
  onSelect: (option: string) => void;
  onClose: () => void;
}

const OPTIONS = [
  "Open",
  "Resolved",
];

const RadioIcon = ({ selected }: { selected: boolean }) => {
  if (selected) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="9" stroke="#00236F" strokeWidth="2"/>
        <circle cx="10" cy="10" r="5" fill="#00236F"/>
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="9" stroke="#8B909A" strokeWidth="2"/>
    </svg>
  );
};

const StatusTicket: React.FC<StatusTicketProps> = ({ selected, onSelect, onClose }) => {
  const [tempSelected, setTempSelected] = useState<string>(selected);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleApply = () => {
    onSelect(tempSelected);
    onClose();
  };

  const handleClear = () => {
    setTempSelected("");
  };

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
          zIndex: 999,
        }}
        onClick={onClose}
      />
      
      {/* Popover Card */}
      <div style={styles.container}>
        <div style={styles.optionsWrapper}>
          {OPTIONS.map((option) => {
            const isSelected = tempSelected.toLowerCase() === option.toLowerCase();
            const isHovered = hoveredOption === option;
            return (
              <div
                key={option}
                onClick={() => setTempSelected(option)}
                onMouseEnter={() => setHoveredOption(option)}
                onMouseLeave={() => setHoveredOption(null)}
                style={{
                  ...styles.optionRow,
                  background: (isSelected || isHovered) ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
                }}
              >
                <div style={styles.innerRow}>
                  <RadioIcon selected={isSelected} />
                  <span style={styles.optionText}>
                    {option} <span style={styles.countText}>(200)</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Footer actions */}
        <div style={styles.footer}>
          <button style={styles.clearButton} onClick={handleClear}>
            Clear
          </button>
          <button style={styles.applyButton} onClick={handleApply}>
            Apply
          </button>
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
    padding: "12px 16px",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "12px",
    boxSizing: "border-box",
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 1000,
  },
  optionsWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "240px",
    gap: "4px",
  },
  optionRow: {
    display: "inline-flex",
    width: "100%",
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
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    userSelect: "none",
  },
  countText: {
    color: "#6B7280",
    marginLeft: "4px",
  },
  divider: {
    width: "100%",
    height: "1px",
    background: "#EDEFF2",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    width: "100%",
  },
  clearButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--Foundation-brand-brand-500, #00236F)",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "normal",
    padding: "8px 16px",
  },
  applyButton: {
    borderRadius: "12px",
    background: "var(--Foundation-brand-brand-500, #00236F)",
    border: "none",
    cursor: "pointer",
    color: "#FFF",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "normal",
    padding: "8px 24px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};

export default StatusTicket;
