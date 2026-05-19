interface ViewMoreSalesReportProps {
  onClose?: () => void;
  date?: string;
  submitted?: string[];
  notSubmitted?: string[];
}

const defaultSubmitted = Array(8).fill("Mohammed Mansour");
const defaultNotSubmitted = Array(2).fill("Mohammed Mansour");

const View_More_Sales_Report: React.FC<ViewMoreSalesReportProps> = ({ 
  onClose,
  date = "Sun 6 April, 2026",
  submitted = defaultSubmitted,
  notSubmitted = defaultNotSubmitted
}) => {
  return (
    <div style={{
      display: "flex",
      width: 435,
      flexDirection: "column",
      alignItems: "flex-start",
      boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
      borderRadius: 12
    }}>
      {/* Header */}
      <div style={{
        borderRadius: "12px 12px 0 0",
        borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
        background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
        display: "flex",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "flex-start",
        alignSelf: "stretch",
        boxSizing: "border-box"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
              <path d="M1 7.66608H5L7.04044 1L11.4382 15L12.9903 7.66608H17" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#111827", fontFamily: "Inter, sans-serif" }}>Sales Daily Reports</span>
          </div>
          <span style={{ fontSize: 16, color: "#4B5563", fontFamily: "Inter, sans-serif" }}>{date}</span>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#FFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{
        borderRadius: "0 0 12px 12px",
        background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
        display: "flex",
        padding: "32px 24px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 24,
        alignSelf: "stretch",
        boxSizing: "border-box",
        maxHeight: "80vh",
        overflowY: "auto"
      }}>
        {/* Submitted Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#BBE5B3", flexShrink: 0 }} />
            <span style={{ fontSize: 16, fontWeight: 500, color: "#111827", fontFamily: "Inter, sans-serif" }}>Submitted ({submitted.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 22 }}>
            {submitted.map((name, i) => (
              <div key={`sub-${i}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img 
                  src={`https://i.pravatar.cc/150?u=${encodeURIComponent(name+i)}`} 
                  alt={name} 
                  style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", backgroundColor: "#D4D5D8" }} 
                />
                <span style={{ fontSize: 14, color: "#374151", fontFamily: "Inter, sans-serif" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Not Submitted Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FCA5A5", flexShrink: 0 }} />
            <span style={{ fontSize: 16, fontWeight: 500, color: "#111827", fontFamily: "Inter, sans-serif" }}>Not submitted ({notSubmitted.length})</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 22 }}>
            {notSubmitted.map((name, i) => (
              <div key={`nsub-${i}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img 
                  src={`https://i.pravatar.cc/150?u=${encodeURIComponent(name+i+100)}`} 
                  alt={name} 
                  style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", backgroundColor: "#D4D5D8" }} 
                />
                <span style={{ fontSize: 14, color: "#374151", fontFamily: "Inter, sans-serif" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_More_Sales_Report;
