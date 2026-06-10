import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowDownUp } from 'lucide-react';
import Pagination from '../components/Pagination';
import mail04Icon from '../assets/mail-04.svg';

// ── Filter icon ──────────────────────────────────────────────────────────────
const FilterSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 4.5H21M6.75 12H17.25M10.5 19.5H13.5" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_TICKETS = [
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Resolved" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Mohammed Abdellah", phone: "01120202020", status: "Open" },
];

const MOCK_TEAM = [
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
  { startDate: "04/11/2026", name: "John Dorghamasadsad", email: "elawad55@email.com", phone: "01111111111", assigned: 12, resolved: 5, status: "Inactive", time: "2h ago" },
];

const DATE_OPTIONS    = ["Today", "Yesterday", "This week", "Last week", "This month", "Last month", "This year"];
const STATUS_OPTIONS  = ["Open", "Resolved", "Pending", "Closed"];

const getStatusStyle = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "open")     return { color: "#A80D0B", bg: "#FCE8E6" };
  if (s === "resolved") return { color: "#107C41", bg: "#E6F9EC" };
  if (s === "pending")  return { color: "#8C6A04", bg: "#FFF8E1" };
  if (s === "closed")   return { color: "#464646", bg: "#EDEFF2" };
  return { color: "#464646", bg: "#EDEFF2" };
};

type ActiveFilter = "date" | "status" | "sort" | null;

const TEAM_COL_HEADERS = ["Start date", "Support agent", "Email", "Phone number", "Assigned tickets", "Resolved tickets", "Status", "Actions"];
const teamWidthMap: Record<string, number | string> = {
  "Start date":       110,
  "Support agent":    160,
  "Email":            180,
  "Phone number":     120,
  "Assigned tickets": 120,
  "Resolved tickets": 120,
  "Status":           100,
  "Actions":          70,
};

const Support = () => {
  const [activeTab, setActiveTab]           = useState<"ticket" | "team">("ticket");
  const [activeFilter, setActiveFilter]     = useState<ActiveFilter>(null);
  const [hoveredFilter, setHoveredFilter]   = useState<string | null>(null);
  const [searchQuery, setSearchQuery]       = useState("");
  const [selectedDate, setSelectedDate]     = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder]           = useState<string>("newest");
  const [currentPage, setCurrentPage]       = useState(1);
  const [teamPage, setTeamPage]             = useState(1);
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [openTeamActionMenu, setOpenTeamActionMenu] = useState<number | null>(null);

  const actionMenuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const teamActionMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openActionMenu !== null) {
        const ref = actionMenuRefs.current[openActionMenu];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenActionMenu(null);
        }
      }
      if (openTeamActionMenu !== null) {
        const ref = teamActionMenuRefs.current[openTeamActionMenu];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenTeamActionMenu(null);
        }
      }
      if (activeFilter !== null) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openActionMenu, openTeamActionMenu, activeFilter]);

  const ITEMS_PER_PAGE = 10;
  const filteredTickets = MOCK_TICKETS.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      t.date.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.reporter.toLowerCase().includes(q) ||
      t.agent.toLowerCase().includes(q) ||
      t.ticketId.toLowerCase().includes(q);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(t.status);
    return matchesSearch && matchesStatus;
  });
  const totalPages     = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE) || 1;
  const displayTickets = filteredTickets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Team pagination
  const TEAM_PER_PAGE   = 10;
  const totalTeamPages  = Math.ceil(MOCK_TEAM.length / TEAM_PER_PAGE) || 1;
  const displayTeam     = MOCK_TEAM.slice((teamPage - 1) * TEAM_PER_PAGE, teamPage * TEAM_PER_PAGE);

  const filterBtnStyle = (key: string): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: activeFilter === key ? "1px solid #00236F" : "1px solid #D4D5D8",
    borderRadius: 12,
    padding: "0 12px",
    height: 40,
    minWidth: 88,
    gap: 8,
    background: hoveredFilter === key || activeFilter === key ? "#E6E9F1" : "transparent",
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "#4B5563",
    boxSizing: "border-box" as const,
    flexShrink: 0,
  });

  const COL_HEADERS = ["Date", "Ticket ID", "Company name", "Reporter", "Support agent", "Phone number", "Ticket's status", "Message", "Actions"];
  const widthMap: Record<string, number | string> = {
    "Date":            90,
    "Ticket ID":       80,
    "Company name":    180,
    "Reporter":        160,
    "Support agent":   160,
    "Phone number":    120,
    "Ticket's status": 120,
    "Message":         80,
    "Actions":         70,
  };

  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

        {/* ── Header ── */}
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 33,
          lineHeight: "100%",
          color: "rgba(0, 35, 111, 1)",
          marginBottom: 16,
        }}>
          Support
        </div>

        {/* ── Tabs ── */}
        {/* Full-width wrapper carries the bottom border across the whole screen */}
        <div style={{
          width: "100%",
          borderBottom: "1px solid #D4D5D8",
          marginTop: 8,
          marginBottom: 16,
        }}>
          {/* Inner 462px tab buttons */}
          <div style={{
            width: 462,
            height: 35,
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}>
            {/* Ticket tab */}
            <button
              id="support-tab-ticket"
              onClick={() => setActiveTab("ticket")}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "8px",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: activeTab === "ticket" ? 600 : 400,
                color: activeTab === "ticket" ? "#00236F" : "#747474",
                borderBottom: activeTab === "ticket" ? "2px solid #00236F" : "2px solid transparent",
                marginBottom: -1,
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H9M9 3H15V7H9V3Z" stroke={activeTab === "ticket" ? "#00236F" : "#747474"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12H15M9 16H12" stroke={activeTab === "ticket" ? "#00236F" : "#747474"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ticket
            </button>

            {/* Team tab */}
            <button
              id="support-tab-team"
              onClick={() => setActiveTab("team")}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "8px",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: activeTab === "team" ? 600 : 400,
                color: activeTab === "team" ? "#00236F" : "#747474",
                borderBottom: activeTab === "team" ? "2px solid #00236F" : "2px solid transparent",
                marginBottom: -1,
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke={activeTab === "team" ? "#00236F" : "#747474"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Team
            </button>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div
          className="filter-bar"
          style={{
            marginTop: 8,
            width: "100%",
            height: 64,
            background: "rgba(237, 239, 242, 1)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {/* Left group */}
          <div className="filter-bar-left" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* Search input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: searchQuery ? "1px solid #00236F" : "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "8px 12px",
                height: 40,
                gap: 8,
                background: "transparent",
                width: 280,
                boxSizing: "border-box",
              }}
            >
              <FilterSVG />
              <input
                type="text"
                id="support-search"
                placeholder="Filter by date, company name,..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
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

            {/* Date filter */}
            <div style={{ position: "relative" }}>
              <button
                id="support-filter-date"
                onClick={(e) => { e.stopPropagation(); setActiveFilter(activeFilter === "date" ? null : "date"); }}
                onMouseEnter={() => setHoveredFilter("date")}
                onMouseLeave={() => setHoveredFilter(null)}
                style={filterBtnStyle("date")}
              >
                Date
                {selectedDate ? (
                  <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#141414", fontWeight: 600 }}>1</div>
                ) : activeFilter === "date" ? (
                  <ChevronUp size={16} color="#4B5563" />
                ) : (
                  <ChevronDown size={16} color="#4B5563" />
                )}
              </button>
              {activeFilter === "date" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000, borderRadius: 12, background: "#fff", boxShadow: "0px 4px 20px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.04)", border: "1px solid rgba(212,213,216,1)", padding: "8px 0", minWidth: 200 }}
                >
                  {DATE_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => { setSelectedDate(selectedDate === opt ? null : opt); setActiveFilter(null); setCurrentPage(1); }}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer", background: selectedDate === opt ? "#E6E9F1" : "transparent" }}
                    >
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: selectedDate === opt ? "5px solid #00236F" : "2px solid #D4D5D8", boxSizing: "border-box", background: "#fff", flexShrink: 0 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: selectedDate === opt ? 500 : 400, color: selectedDate === opt ? "#00236F" : "#464646" }}>{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status filter */}
            <div style={{ position: "relative" }}>
              <button
                id="support-filter-status"
                onClick={(e) => { e.stopPropagation(); setActiveFilter(activeFilter === "status" ? null : "status"); }}
                onMouseEnter={() => setHoveredFilter("status")}
                onMouseLeave={() => setHoveredFilter(null)}
                style={filterBtnStyle("status")}
              >
                Status
                {selectedStatuses.length > 0 ? (
                  <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#141414", fontWeight: 600 }}>{selectedStatuses.length}</div>
                ) : activeFilter === "status" ? (
                  <ChevronUp size={16} color="#4B5563" />
                ) : (
                  <ChevronDown size={16} color="#4B5563" />
                )}
              </button>
              {activeFilter === "status" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000, borderRadius: 12, background: "#fff", boxShadow: "0px 4px 20px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.04)", border: "1px solid rgba(212,213,216,1)", padding: "8px 0", minWidth: 180 }}
                >
                  {STATUS_OPTIONS.map((opt) => {
                    const isSel = selectedStatuses.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => { setSelectedStatuses(isSel ? selectedStatuses.filter(s => s !== opt) : [...selectedStatuses, opt]); setCurrentPage(1); }}
                        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer", background: isSel ? "#E6E9F1" : "transparent" }}
                      >
                        <div style={{ width: 16, height: 16, borderRadius: 4, border: isSel ? "5px solid #00236F" : "2px solid #D4D5D8", boxSizing: "border-box", background: "#fff", flexShrink: 0 }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: isSel ? 500 : 400, color: isSel ? "#00236F" : "#464646" }}>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Reset Filters */}
            <button
              id="support-reset-filters"
              onClick={() => { setSearchQuery(""); setSelectedDate(null); setSelectedStatuses([]); setSortOrder("newest"); setCurrentPage(1); setActiveFilter(null); }}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#00236F", fontFamily: "Inter", fontSize: 16, fontWeight: 400, lineHeight: "normal", padding: 0, whiteSpace: "nowrap" }}
            >
              Reset Filters
            </button>
          </div>

          {/* Right group: Sort by */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <button
                id="support-sort"
                onClick={(e) => { e.stopPropagation(); setActiveFilter(activeFilter === "sort" ? null : "sort"); }}
                onMouseEnter={() => setHoveredFilter("sort")}
                onMouseLeave={() => setHoveredFilter(null)}
                style={{ ...filterBtnStyle("sort"), width: 108 }}
              >
                Sort by
                <ArrowDownUp size={16} color="#4B5563" />
              </button>
              {activeFilter === "sort" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 1000, borderRadius: 12, background: "#fff", boxShadow: "0px 4px 20px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.04)", border: "1px solid rgba(212,213,216,1)", padding: "8px 0", minWidth: 180 }}
                >
                  {[["newest", "Newest first"], ["oldest", "Oldest first"], ["a-z", "A → Z"], ["z-a", "Z → A"]].map(([val, label]) => (
                    <div
                      key={val}
                      onClick={() => { setSortOrder(val); setCurrentPage(1); setActiveFilter(null); }}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer", background: sortOrder === val ? "#E6E9F1" : "transparent" }}
                    >
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: sortOrder === val ? "5px solid #00236F" : "2px solid #D4D5D8", boxSizing: "border-box", background: "#fff", flexShrink: 0 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: sortOrder === val ? 500 : 400, color: sortOrder === val ? "#00236F" : "#464646" }}>{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── TICKET TABLE ── */}
        {activeTab === "ticket" && (
          <div style={{ marginTop: 16, width: "100%", display: "flex", flexDirection: "column", borderRadius: 12, border: "1px solid rgba(212, 213, 216, 1)", overflow: "visible" }}>
            {/* Header */}
            <div style={{ width: "100%", height: 48, background: "rgba(212, 213, 216, 1)", display: "flex", alignItems: "center", padding: "0 16px", boxSizing: "border-box", borderTopLeftRadius: 12, borderTopRightRadius: 12, justifyContent: "space-between" }}>
              {COL_HEADERS.map((col) => (
                <div
                  key={col}
                  style={{
                    width: widthMap[col],
                    flexShrink: 0,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#141414",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: (col === "Message" || col === "Actions") ? "flex" : "block",
                    justifyContent: (col === "Message" || col === "Actions") ? "center" : "flex-start",
                  }}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Body */}
            <div style={{ width: "100%", background: "#fff", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
              {displayTickets.map((ticket, i) => {
                const statusStyle = getStatusStyle(ticket.status);
                return (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      boxSizing: "border-box",
                      height: 72,
                      borderBottom: i < displayTickets.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
                      justifyContent: "space-between",
                      borderBottomLeftRadius:  i === displayTickets.length - 1 ? 12 : 0,
                      borderBottomRightRadius: i === displayTickets.length - 1 ? 12 : 0,
                    }}
                  >
                    {/* Date */}
                    <div style={{ width: widthMap["Date"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                      {ticket.date}
                    </div>
                    {/* Ticket ID */}
                    <div style={{ width: widthMap["Ticket ID"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>
                      {ticket.ticketId}
                    </div>
                    {/* Company name */}
                    <div style={{ width: widthMap["Company name"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ticket.company}
                    </div>
                    {/* Reporter */}
                    <div style={{ width: widthMap["Reporter"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ticket.reporter}
                    </div>
                    {/* Support agent */}
                    <div style={{ width: widthMap["Support agent"], flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646" }}>{ticket.agent}</span>
                      <ChevronDown size={16} color="#141414" />
                    </div>
                    {/* Phone number */}
                    <div style={{ width: widthMap["Phone number"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646" }}>
                      {ticket.phone}
                    </div>
                    {/* Status */}
                    <div style={{ width: widthMap["Ticket's status"], flexShrink: 0 }}>
                      <span style={{
                        display: "inline-flex",
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        borderRadius: 12,
                        padding: "3px 12px",
                        fontSize: 12,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                      }}>
                        {ticket.status}
                      </span>
                    </div>
                    {/* Message */}
                    <div style={{ width: widthMap["Message"], flexShrink: 0, display: "flex", justifyContent: "center" }}>
                      <img src={mail04Icon} alt="Message" width={24} height={24} style={{ cursor: "pointer" }} />
                    </div>
                    {/* Actions */}
                    <div
                      style={{ width: widthMap["Actions"], flexShrink: 0, display: "flex", justifyContent: "center", position: "relative" }}
                      ref={(el) => { actionMenuRefs.current[i] = el; }}
                    >
                      <div
                        onClick={(e) => { e.stopPropagation(); setOpenActionMenu(openActionMenu === i ? null : i); }}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: openActionMenu === i ? "#F3F4F6" : "transparent" }}
                      >
                        <svg width="4" height="20" viewBox="0 0 4 20" fill="none">
                          <circle cx="2" cy="2"  r="2" fill="#6B7280"/>
                          <circle cx="2" cy="10" r="2" fill="#6B7280"/>
                          <circle cx="2" cy="18" r="2" fill="#6B7280"/>
                        </svg>
                      </div>
                      {openActionMenu === i && (
                        <>
                          <div onClick={() => setOpenActionMenu(null)} style={{ position: "fixed", inset: 0, zIndex: 998 }} />
                          <div style={{ position: "absolute", top: 32, right: 0, background: "#FFF", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)", border: "1px solid #EDEFF2", borderRadius: 8, zIndex: 999, width: 160, display: "flex", flexDirection: "column", padding: 4 }}>
                            {["View ticket", "Assign agent", "Change status", "Close ticket"].map((action) => (
                              <div
                                key={action}
                                onClick={() => setOpenActionMenu(null)}
                                style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", borderRadius: 4, fontFamily: "Inter, sans-serif", color: "#374151", textAlign: "left" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                {action}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TEAM TABLE ── */}
        {activeTab === "team" && (
          <>
            <div style={{ marginTop: 16, width: "100%", display: "flex", flexDirection: "column", borderRadius: 12, border: "1px solid rgba(212, 213, 216, 1)", overflow: "visible" }}>
              {/* Header */}
              <div style={{ width: "100%", height: 48, background: "rgba(212, 213, 216, 1)", display: "flex", alignItems: "center", padding: "0 16px", boxSizing: "border-box", borderTopLeftRadius: 12, borderTopRightRadius: 12, justifyContent: "space-between" }}>
                {TEAM_COL_HEADERS.map((col) => (
                  <div
                    key={col}
                    style={{
                      width: teamWidthMap[col],
                      flexShrink: 0,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#141414",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: (col === "Assigned tickets" || col === "Resolved tickets" || col === "Actions") ? "flex" : "block",
                      justifyContent: (col === "Assigned tickets" || col === "Resolved tickets" || col === "Actions") ? "center" : "flex-start",
                    }}
                  >
                    {col}
                  </div>
                ))}
              </div>
              {/* Body */}
              <div style={{ width: "100%", background: "#fff", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                {displayTeam.map((member, i) => (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      boxSizing: "border-box",
                      height: 72,
                      borderBottom: i < displayTeam.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
                      justifyContent: "space-between",
                      borderBottomLeftRadius:  i === displayTeam.length - 1 ? 12 : 0,
                      borderBottomRightRadius: i === displayTeam.length - 1 ? 12 : 0,
                    }}
                  >
                    {/* Start date */}
                    <div style={{ width: teamWidthMap["Start date"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                      {member.startDate}
                    </div>
                    {/* Support agent */}
                    <div style={{ width: teamWidthMap["Support agent"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {member.name}
                    </div>
                    {/* Email */}
                    <div style={{ width: teamWidthMap["Email"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {member.email}
                    </div>
                    {/* Phone number */}
                    <div style={{ width: teamWidthMap["Phone number"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646" }}>
                      {member.phone}
                    </div>
                    {/* Assigned tickets */}
                    <div style={{ width: teamWidthMap["Assigned tickets"], flexShrink: 0, display: "flex", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646" }}>
                      {member.assigned}
                    </div>
                    {/* Resolved tickets */}
                    <div style={{ width: teamWidthMap["Resolved tickets"], flexShrink: 0, display: "flex", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646" }}>
                      {member.resolved}
                    </div>
                    {/* Status */}
                    <div style={{ width: teamWidthMap["Status"], flexShrink: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        color: member.status === "Active" ? "#107C41" : "#464646"
                      }}>
                        {member.status}
                      </span>
                      <span style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        color: "#747474"
                      }}>
                        {member.time}
                      </span>
                    </div>
                    {/* Actions */}
                    <div
                      style={{ width: teamWidthMap["Actions"], flexShrink: 0, display: "flex", justifyContent: "center", position: "relative" }}
                      ref={(el) => { teamActionMenuRefs.current[i] = el; }}
                    >
                      <div
                        onClick={(e) => { e.stopPropagation(); setOpenTeamActionMenu(openTeamActionMenu === i ? null : i); }}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: openTeamActionMenu === i ? "#F3F4F6" : "transparent" }}
                      >
                        <svg width="4" height="20" viewBox="0 0 4 20" fill="none">
                          <circle cx="2" cy="2"  r="2" fill="#6B7280"/>
                          <circle cx="2" cy="10" r="2" fill="#6B7280"/>
                          <circle cx="2" cy="18" r="2" fill="#6B7280"/>
                        </svg>
                      </div>
                      {openTeamActionMenu === i && (
                        <>
                          <div onClick={() => setOpenTeamActionMenu(null)} style={{ position: "fixed", inset: 0, zIndex: 998 }} />
                          <div style={{ position: "absolute", top: 32, right: 0, background: "#FFF", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)", border: "1px solid #EDEFF2", borderRadius: 8, zIndex: 999, width: 160, display: "flex", flexDirection: "column", padding: 4 }}>
                            {["View agent details", "Edit assignment", "Change status", "Remove agent"].map((action) => (
                              <div
                                key={action}
                                onClick={() => setOpenTeamActionMenu(null)}
                                style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", borderRadius: 4, fontFamily: "Inter, sans-serif", color: "#374151", textAlign: "left" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                {action}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Team Pagination */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <Pagination currentPage={teamPage} totalPages={totalTeamPages} onPageChange={setTeamPage} />
            </div>
          </>
        )}

        {/* ── Ticket Pagination ── */}
        {activeTab === "ticket" && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Support;
