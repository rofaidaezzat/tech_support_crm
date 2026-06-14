import React, { useState, useRef, useEffect } from "react";

interface SalesFilterProps {
  onApply?: (from: number | null, to: number | null) => void;
  onClear?: () => void;
  onClose?: () => void;
  initialFrom?: number | null;
  initialTo?: number | null;
  min?: number;
  max?: number;
}

const SalesFilter: React.FC<SalesFilterProps> = ({
  onApply,
  onClear,
  onClose,
  initialFrom = null,
  initialTo = null,
  min = 0,
  max = 100,
}) => {
  const [fromVal, setFromVal] = useState<number>(initialFrom !== null ? initialFrom : min);
  const [toVal, setToVal] = useState<number>(initialTo !== null ? initialTo : max);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if initial props change
  useEffect(() => {
    if (initialFrom !== null) setFromVal(initialFrom);
    if (initialTo !== null) setToVal(initialTo);
  }, [initialFrom, initialTo]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleDrag = (e: React.MouseEvent, type: "from" | "to") => {
    e.preventDefault();
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = moveEvent.clientX - rect.left;
      const percent = Math.min(Math.max(0, clickX / rect.width), 1);
      const val = Math.round(min + percent * (max - min));
      if (type === "from") {
        setFromVal(Math.min(val, toVal));
      } else {
        setToVal(Math.max(val, fromVal));
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleInputChange = (type: "from" | "to", value: string) => {
    const num = value === "" ? "" : Number(value);
    if (num === "") {
      if (type === "from") setFromVal(min);
      else setToVal(max);
      return;
    }
    if (isNaN(num)) return;
    const clamped = Math.min(Math.max(min, num), max);
    if (type === "from") {
      setFromVal(Math.min(clamped, toVal));
    } else {
      setToVal(Math.max(clamped, fromVal));
    }
  };

  const handleClear = () => {
    setFromVal(min);
    setToVal(max);
    onClear?.();
  };

  const handleApply = () => {
    onApply?.(fromVal, toVal);
  };

  const leftPercent = ((fromVal - min) / (max - min)) * 100;
  const rightPercent = ((toVal - min) / (max - min)) * 100;

  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Input Fields Row */}
        <div style={styles.rowContainer}>
          <div style={styles.fromContainer}>
            <span style={styles.labelStyle}>From</span>
            <input
              style={styles.inputStyle}
              placeholder="Input text"
              value={fromVal}
              type="number"
              min={min}
              max={max}
              onChange={(e) => handleInputChange("from", e.target.value)}
            />
          </div>
          <span style={styles.separator}>—</span>
          <div style={styles.toContainer}>
            <span style={styles.labelStyle}>To</span>
            <input
              style={styles.inputStyle}
              placeholder="Input text"
              value={toVal}
              type="number"
              min={min}
              max={max}
              onChange={(e) => handleInputChange("to", e.target.value)}
            />
          </div>
        </div>

        {/* Custom Slider Track */}
        <div style={styles.sliderWrapper}>
          <div ref={trackRef} style={styles.track}>
            {/* Colored segment */}
            <div
              style={{
                ...styles.progressColored,
                left: `${leftPercent}%`,
                width: `${rightPercent - leftPercent}%`,
              }}
            />
            {/* Left Thumb handle container */}
            <div
              style={{
                ...styles.circleContainer,
                left: `${leftPercent}%`,
              }}
              onMouseDown={(e) => handleDrag(e, "from")}
            >
              <span style={styles.circleLabel}>{fromVal}</span>
              <div style={styles.circleHandle} />
            </div>

            {/* Right Thumb handle container */}
            <div
              style={{
                ...styles.circleContainer,
                left: `${rightPercent}%`,
              }}
              onMouseDown={(e) => handleDrag(e, "to")}
            >
              <span style={styles.circleLabel}>{toVal}</span>
              <div style={styles.circleHandle} />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Footer buttons */}
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
    gap: "16px",
    boxSizing: "border-box",
  },
  contentWrapper: {
    display: "flex",
    minWidth: "290px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "24px",
    boxSizing: "border-box",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "12px",
    boxSizing: "border-box",
  },
  fromContainer: {
    display: "flex",
    width: "108px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    boxSizing: "border-box",
  },
  toContainer: {
    display: "flex",
    width: "108px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    boxSizing: "border-box",
  },
  separator: {
    alignSelf: "flex-end",
    marginBottom: "12px",
    color: "#D4D5D8",
    fontSize: "14px",
    userSelect: "none",
  },
  inputStyle: {
    width: "100%",
    height: "40px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #D4D5D8",
    background: "#FFF",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
    outline: "none",
    boxSizing: "border-box",
  },
  labelStyle: {
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
  },
  sliderWrapper: {
    borderRadius: "8px",
    height: "43px",
    alignSelf: "stretch",
    display: "flex",
    alignItems: "flex-end",
    position: "relative",
    boxSizing: "border-box",
    padding: "0 12px 6px 12px",
  },
  track: {
    height: "8px",
    background: "#EDEFF2",
    borderRadius: "4px",
    width: "100%",
    position: "relative",
  },
  progressColored: {
    borderRadius: "4px",
    background: "var(--Foundation-brand-brand-500, #00236F)",
    height: "8px",
    position: "absolute",
  },
  circleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    position: "absolute",
    transform: "translateX(-50%)",
    bottom: "-8px",
    cursor: "pointer",
    userSelect: "none",
    zIndex: 10,
  },
  circleHandle: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#FFF",
    border: "2px solid #D4D5D8",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.17)",
    boxSizing: "border-box",
  },
  circleLabel: {
    fontSize: "12px",
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
    fontWeight: 500,
  },
  divider: {
    width: "100%",
    height: "1px",
    background: "#E8E8F0",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    width: "100%",
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
    background: "var(--Foundation-brand-brand-500, #00236F)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    color: "#FFF",
    fontFamily: "Inter, sans-serif",
    padding: "12px 24px",
  },
};

export default SalesFilter;
