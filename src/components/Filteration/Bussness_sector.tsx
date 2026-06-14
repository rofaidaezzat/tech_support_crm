import React, { useState, useRef, useEffect } from "react";

interface SectorOption {
  label: string;
  count: number;
}

interface BusinessSectorFilterProps {
  options?: SectorOption[];
  onApply?: (selectedSectors: string[]) => void;
  onClear?: () => void;
  onClose?: () => void;
  initialSelected?: string[];
}

const defaultOptions: SectorOption[] = [
  { label: "Real estate", count: 200 },
  { label: "Marketing", count: 200 },
  { label: "Education", count: 200 },
  { label: "Consultations", count: 200 },
  { label: "Software", count: 200 },
  { label: "Retailers", count: 200 },
];

const BusinessSectorFilter: React.FC<BusinessSectorFilterProps> = ({
  options = defaultOptions,
  onApply,
  onClear,
  onClose,
  initialSelected = [],
}) => {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const handleToggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
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
    <div ref={containerRef} style={styles.container}>
      {/* Options list */}
      <div style={styles.listWrapper}>
        {options.map((option) => {
          const isSelected = selected.includes(option.label);
          return (
            <div
              key={option.label}
              style={{
                ...styles.row,
                ...(isSelected ? styles.rowSelected : {}),
              }}
              onClick={() => handleToggle(option.label)}
            >
              {/* Checkbox */}
              {isSelected ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#00236F" />
                  <path
                    d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <rect
                    x="3.5"
                    y="3.5"
                    width="17"
                    height="17"
                    rx="1.5"
                    stroke="#D4D5D8"
                    strokeWidth="1"
                    fill="#FFF"
                  />
                </svg>
              )}

              {/* Text label */}
              <span style={styles.rowText}>
                {option.label}&nbsp;&nbsp;
                <span style={styles.rowCount}>({option.count})</span>
              </span>
            </div>
          );
        })}
      </div>

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
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "4px",
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
  rowText: {
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
    fontWeight: 400,
    lineHeight: "1.4",
    userSelect: "none",
  },
  rowCount: {
    color: "#6B7280",
  },
  divider: {
    width: "100%",
    height: "1px",
    background: "#E8E8F0",
    margin: "4px 0",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  clearButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--Foundation-brand-brand-500, #00236F)",
    fontFamily: "Inter, sans-serif",
    padding: "8px 16px",
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
    fontFamily: "Inter, sans-serif",
    lineHeight: "1",
  },
};

export default BusinessSectorFilter;
