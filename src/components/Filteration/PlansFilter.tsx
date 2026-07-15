import React from "react";

interface PlansFilterProps {
  selected: string[];
  onSelect: (options: string[]) => void;
  onClose: () => void;
}

const OPTIONS = [
  "All plans",
  "Plan 1",
  "Plan 2",
  "Plan 3",
];

const CheckboxIcon = ({ selected }: { selected: boolean }) => {
  if (selected) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <rect width="20" height="20" rx="4" fill="#00236F"/>
        <path d="M5 10.5L8.5 14L15 7" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="18" height="18" rx="3" stroke="#8B909A" strokeWidth="2"/>
    </svg>
  );
};

const PlansFilter: React.FC<PlansFilterProps> = ({ selected, onSelect, onClose }) => {
  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((o) => o !== option));
    } else {
      onSelect([...selected, option]);
    }
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
      <div style={{
        ...styles.container,
        right: document.documentElement.dir === 'rtl' ? 'auto' : 0,
        left: document.documentElement.dir === 'rtl' ? 0 : 'auto',
      }}>
        {OPTIONS.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <div
              key={option}
              onClick={() => handleToggle(option)}
              style={{
                ...styles.optionRow,
                background: isSelected ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
              }}
            >
              <div style={styles.innerRow}>
                <CheckboxIcon selected={isSelected} />
                <span style={styles.optionText}>{option}</span>
              </div>
            </div>
          );
        })}
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
    top: "calc(100% + 4px)",
    right: 0,
    zIndex: 1000,
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
    color: "var(--Foundation-neutral-neutral-800, #464646)",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
};

export default PlansFilter;
