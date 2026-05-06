import { ArrowDownUp, ChevronDown, Plus } from 'lucide-react'
import filterIcon from '../assets/filter.svg';
import starsIcon from '../assets/stars.svg';
import { useState } from 'react';
import mailIcon from '../assets/message-text-02 (1).svg';
import Pagination from '../components/Pagination';
import New_Report_Modal from '../components/Reports/New_Report_Modal';
import Top_Periority_notes from '../components/Reports/Top_Periority_notes';
const Reports = () => {
    const [sortOpen, setSortOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  return (
 <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
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
          Reports
        </div>

        <button
          onClick={() => setIsNewReportModalOpen(true)}
          style={{
            background: "rgba(0, 35, 111, 1)",
            width: 167,
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
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <Plus size={20} color="#fff" style={{ opacity: 1 }} />
          New Report
        </button>
      </div>
      {/* ── Filter Bar ── */}
      <div
        style={{
          marginTop: 24,
          width: "100%",
          height: 64,
          background: "rgba(237, 239, 242, 1)",
          borderRadius: 12,
          paddingTop: 12,
          paddingRight: 16,
          paddingBottom: 12,
          paddingLeft: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Left group */}
        <div style={{ display: "flex", alignItems: "center", width: 644 }}>
          {/* Filter input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(212, 213, 216, 1)",
              borderRadius: 12,
              paddingTop: 8,
              paddingRight: 12,
              paddingBottom: 8,
              paddingLeft: 12,
              height: 40,
              width: 406,
              gap: 8,
              background: "transparent",
              flexShrink: 0,
              boxSizing: "border-box",
              marginRight: 40,
            }}
          >
            <img src={filterIcon} alt="filter" width={24} height={24} />
            <input
              type="text"
              placeholder="Filter by date, name,..."
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                flex: 1,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#141414",
              }}
            />
           
          </div>

          {/* Date dropdown */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(212, 213, 216, 1)",
              borderRadius: 12,
              padding: "0 12px",
              height: 40,
              gap: 8,
              background: "transparent",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              color: "#4B5563",
              boxSizing: "border-box",
              flexShrink: 0,
              marginRight: 16,
            }}
          >
            Date
            <ChevronDown size={16} color="#4B5563" />
          </button>

          {/* Value dropdown */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(212, 213, 216, 1)",
              borderRadius: 12,
              padding: "0 12px",
              height: 40,
              gap: 8,
              background: "transparent",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              color: "#4B5563",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            Deals Value
            <ChevronDown size={16} color="#4B5563" />
          </button>
        </div>

        {/* Sort by button */}
        <button
          onClick={() => setSortOpen((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(212, 213, 216, 1)",
            borderRadius: 12,
            paddingRight: 12,
            paddingLeft: 12,
            height: 40,
            width: 108,
            gap: 8,
            background: "transparent",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "#4B5563",
            boxSizing: "border-box",
          }}
        >
          Sort by
          <ArrowDownUp size={16} color="#4B5563" />
        </button>
      </div>
      {/* ── Table ── */}
      <div
        style={{
          marginTop: 16,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(212, 213, 216, 1)",
        }}
      >
        {/* Table Header */}
        <div
          style={{
            width: "100%",
            height: 48,
            background: "rgba(212, 213, 216, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 12,
            paddingLeft: 12,
            boxSizing: "border-box",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          {[
            { label: "Date",                 flex: 1 },
            { label: "Calls",                flex: 1 },
            { label: "Contacts",             flex: 1 },
            { label: "Followups",            flex: 1 },
            { label: "Meetings",             flex: 1 },
            { label: "Deals",                flex: 1 },
            { label: "Deals Value",          flex: 1.4 },
            { label: "Top Priority & notes", flex: 1.4 },
          ].map(({ label, flex }) => (
            <div
              key={label}
              style={{
                flex,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#141414",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div style={{ width: "100%", background: "#fff" }}>
          {[...Array(10)].map((_, i, arr) => (
            <div
              key={i}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 12,
                paddingLeft: 12,
                boxSizing: "border-box",
                height: 72,
                borderBottom: i < arr.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
              }}
            >
              {/* Date */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                04/11/2026
              </div>

              {/* Calls */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                66666
              </div>

              {/* Contacts */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                888
              </div>

              {/* Followups */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                444
              </div>

              {/* Meetings */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                888
              </div>

              {/* Deals */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                888
              </div>

              {/* Deals Value */}
              <div style={{ flex: 1.4, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                120,000,000
              </div>

              {/* Top Priority & notes */}
              <div style={{ flex: 1.4, display: "flex", alignItems: "center" }}>
                <img src={mailIcon} alt="Email" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsNotesModalOpen(true)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pagination ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Pagination currentPage={currentPage} totalPages={4} onPageChange={setCurrentPage} />
      </div>

      {/* ── Modals ── */}
      {isNewReportModalOpen && (
        <div
          onClick={() => setIsNewReportModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <New_Report_Modal
              onClose={() => setIsNewReportModalOpen(false)}
              onSubmit={() => {
                setIsNewReportModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {isNotesModalOpen && (
        <div
          onClick={() => setIsNotesModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Top_Periority_notes onClose={() => setIsNotesModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports