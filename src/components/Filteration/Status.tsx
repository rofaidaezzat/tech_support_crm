import React, { useState } from "react";

const STATUS_OPTIONS = [
  { label: "Fresh", count: 200 },
  { label: "Deal", count: 200 },
  { label: "Interested", count: 200 },
  { label: "Not interested", count: 200 },
  { label: "Meeting", count: 200 },
  { label: "After meeting followup", count: 200 },
  { label: "Wrong number", count: 200 },
  { label: "No answer", count: 200 },
];

interface StatusProps {
  onApply?: (selected: string[]) => void;
  onClear?: () => void;
}

const Status: React.FC<StatusProps> = ({ onApply, onClear }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleClear = () => {
    setSelected([]);
    onClear?.();
  };

  const handleApply = () => {
    onApply?.(selected);
  };

  return (
    <div style={styles.container}>
      {/* Options list */}
      <div style={styles.optionsList}>
        {STATUS_OPTIONS.map((option) => (
          <label key={option.label} style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={selected.includes(option.label)}
              onChange={() => toggleOption(option.label)}
              style={styles.checkbox}
            />
            <span style={styles.optionText}>
              {option.label}
              <span style={styles.count}> ({option.count})</span>
            </span>
          </label>
        ))}
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Action buttons */}
      <div style={styles.buttonsRow}>
        {/* Clear button */}
        <button style={styles.clearButton} onClick={handleClear}>
          Clear
        </button>

        {/* Apply button */}
        <button style={styles.applyButton} onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
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
  },

  optionsList: {
    display: "flex",
    minWidth: "290px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
  },

  checkboxRow: {
    display: "inline-flex",
    height: "40px",
    padding: "8px",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
  },

  checkbox: {
    width: "18px",
    height: "18px",
    accentColor: "#00236F",
    cursor: "pointer",
    flexShrink: 0,
  },

  optionText: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#1A1A2E",
    fontFamily: "Inter, sans-serif",
    whiteSpace: "nowrap",
  },

  count: {
    color: "#8C8C9E",
    fontWeight: 400,
  },

  divider: {
    width: "100%",
    height: "1px",
    background: "#E8E8F0",
  },

  buttonsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },

  applyButton: {
    borderRadius: "12px",
    background: "var(--Foundation-brand-brand-500, #00236F)",
    display: "flex",
    height: "48px",
    padding: "8px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    border: "none",
    color: "#FFF",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },

  clearButton: {
    borderRadius: "12px",
    display: "flex",
    height: "48px",
    padding: "8px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    border: "none",
    background: "transparent",
    color: "var(--Foundation-brand-brand-500, #00236F)",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },
};

export default Status;
