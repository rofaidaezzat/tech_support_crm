import React, { useState } from "react";

interface PlanOption {
  id: number;
  label: string;
  count: number;
}

interface PlanFilterProps {
  options?: PlanOption[];
  onApply?: (selectedId: number | null) => void;
  onClear?: () => void;
  initialSelected?: number | null;
}

const defaultOptions: PlanOption[] = [
  { id: 1, label: "Plan name", count: 200 },
  { id: 2, label: "Plan name", count: 200 },
  { id: 3, label: "Plan name", count: 200 },
  { id: 4, label: "Plan name", count: 200 },
];

const PlanFilter: React.FC<PlanFilterProps> = ({
  options = defaultOptions,
  onApply,
  onClear,
  initialSelected = null,
}) => {
  const [selected, setSelected] = useState<number | null>(initialSelected);

  const handleClear = () => {
    setSelected(null);
    onClear?.();
  };

  const handleApply = () => {
    onApply?.(selected);
  };

  return (
    <div style={styles.container}>
      {/* Options list */}
      <div style={styles.listWrapper}>
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <div
              key={option.id}
              style={{
                ...styles.row,
                ...(isSelected ? styles.rowSelected : {}),
              }}
              onClick={() => setSelected(option.id)}
            >
              {/* Custom radio */}
              <div style={styles.radioOuter}>
                {isSelected && <div style={styles.radioInner} />}
              </div>
              <span style={styles.rowText}>
                {option.label}&nbsp;&nbsp;
                <span style={styles.rowCount}>({option.count})</span>
              </span>
            </div>
          );
        })}
      </div>

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
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  row: {
    display: "flex",
    width: "290px",
    height: "40px",
    padding: "8px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    borderRadius: "6px",
    boxSizing: "border-box",
    transition: "background 0.15s ease",
  },
  rowSelected: {
    background: "var(--Foundation-brand-brand-50, #E6E9F1)",
  },
  radioOuter: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "2px solid var(--Foundation-brand-brand-500, #00236F)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  radioInner: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "var(--Foundation-brand-brand-500, #00236F)",
  },
  rowText: {
    fontSize: "14px",
    color: "#1A1A2E",
    fontWeight: 400,
    lineHeight: "1.4",
    userSelect: "none",
  },
  rowCount: {
    color: "#6B7280",
  },
  footer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  clearButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
    padding: "8px 4px",
    lineHeight: "1",
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
    cursor: "pointer",
    color: "#FFF",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "1",
  },
};

export default PlanFilter;
