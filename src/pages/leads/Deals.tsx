import { Plus } from 'lucide-react'
const Deals = () => {
  return (
    <div> 
      {/* ── Header ── */}
          <div
            style={{
              width: "100%",
              height: 56,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 33,
                lineHeight: "100%",
                color: "rgba(0, 35, 111, 1)",
                width: 98,
                height: 40,
                display: "flex",
                alignItems: "center",
              }}
            >
              Deads
            </div>
    
            <button
              style={{
                background: "rgba(0, 35, 111, 1)",
                width: 149,
                height: 56,
                borderRadius: 12,
                padding: "8px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                border: "none",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Plus size={20} color="#fff" />
              Add Deal
            </button>
          </div>
           {/* ── Filter Bar ── */}
          </div>
  )
}

export default Deals