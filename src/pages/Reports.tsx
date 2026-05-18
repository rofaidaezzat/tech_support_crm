import { ArrowDownUp, ChevronDown, Plus } from 'lucide-react'
import filterIcon from '../assets/filter.svg';
import starsIcon from '../assets/stars.svg';
import { useState } from 'react';
import '../styles/tables-mobile.css';
import mailIcon from '../assets/message-text-02 (1).svg';
import Pagination from '../components/Pagination';
import New_Report_Modal from '../components/Reports/New_Report_Modal';
import Top_Periority_notes from '../components/Reports/Top_Periority_notes';
import DateFilter from '../components/Filteration/Date';
import Value from '../components/Filteration/Value';
import { Sort } from '../components/Filteration/Sort';

const Reports = () => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      {/* ── Header ── */}
      <div
        className="page-header"
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
            height: 48,
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
        className="filter-bar"
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
        <div className="filter-bar-left" style={{ display: "flex", alignItems: "center", width: 644 }}>
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
              marginRight: 20,
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
          <div style={{ position: "relative", marginRight: 12 }}>
            <button
              onClick={() => setActiveFilter(activeFilter === "date" ? null : "date")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                width: 88,
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
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "100%",
                color: "rgba(70, 70, 70, 1)",
                verticalAlign: "middle"
              }}>
                Date
              </span>
              <ChevronDown size={16} color="#4B5563" />
            </button>
            {activeFilter === "date" && (
              <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, zIndex: 50 }}>
                <DateFilter onApply={(date) => { console.log(date); setActiveFilter(null); }} />
              </div>
            )}
          </div>

          {/* Value dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === "value" ? null : "value")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                width: 139,
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
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "100%",
                color: "rgba(70, 70, 70, 1)",
                verticalAlign: "middle"
              }}>
                Deals value
              </span>
              <ChevronDown size={16} color="#4B5563" />
            </button>
            {activeFilter === "value" && (
              <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, zIndex: 50 }}>
                <Value onApply={(val) => { console.log(val); setActiveFilter(null); }} onClear={() => setActiveFilter(null)} />
              </div>
            )}
          </div>
        </div>

        {/* Sort by dropdown */}
        <div className="filter-bar-right" style={{ position: "relative" }}>
          <button
            onClick={() => setActiveFilter(activeFilter === "sort" ? null : "sort")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "100%",
              color: "rgba(70, 70, 70, 1)",
              verticalAlign: "middle"
            }}>
              Sort by
            </span>
            <ArrowDownUp size={16} color="#4B5563" />
          </button>
          {activeFilter === "sort" && (
            <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, zIndex: 50 }}>
              <Sort 
                isOpen={true} 
                onClose={() => setActiveFilter(null)} 
                onApply={(sortData) => { console.log(sortData); setActiveFilter(null); }} 
              />
            </div>
          )}
        </div>
      </div>
      {/* ── Table ── */}
      <div
        className="responsive-table-container"
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
          className="responsive-table-row"
          style={{
            width: "100%",
            height: 48,
            background: "rgba(212, 213, 216, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            boxSizing: "border-box",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          {[
            { label: "Date",                 width: 70 },
            { label: "Calls",                width: 41 },
            { label: "Contacts",             width: 59 },
            { label: "Followups",            width: 65 },
            { label: "Meetings",             width: 60 },
            { label: "Deals",                width: 41 },
            { label: "Revenue (EGP)",        width: 96 },
            { label: "Top Priority & notes", width: 125 },
          ].map(({ label, width }) => (
            <div
              key={label}
              style={{
                width,
                flexShrink: 0,
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
          {[
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
            { date: "04/11/2026", calls: 44, contacts: 24, followups: 24, meetings: 6, deals: 3, dealsValue: "250,000" },
          ].map((report, i, arr) => (
            <div
              key={i}
              className="responsive-table-row"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 12px",
                boxSizing: "border-box",
                height: 72,
                borderBottom: i < arr.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
              }}
            >
              {/* Date */}
              <div style={{ width: 70, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                {report.date}
              </div>

              {/* Calls */}
              <div style={{ width: 41, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                66666
              </div>

              {/* Contacts */}
              <div style={{ width: 59, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                888
              </div>

              {/* Followups */}
              <div style={{ width: 65, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                444
              </div>

              {/* Meetings */}
              <div style={{ width: 60, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                888
              </div>

              {/* Deals */}
              <div style={{ width: 41, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                888
              </div>

              {/* Deals Value */}
              <div style={{ width: 96, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                120,000,000
              </div>

              {/* Top Priority & notes */}
              <div style={{ width: 125, flexShrink: 0, display: "flex", alignItems: "center" }}>
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