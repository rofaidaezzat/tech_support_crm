import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowDownUp } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import Pagination from '../components/Pagination';
import mail04Icon from '../assets/mail-04.svg';
import StatusTicket from '../components/Filteration/staus_ticket';
import StatusSuport from '../components/Filteration/Status_suport';
import DateFilter from '../components/Filteration/Date';
import { Sort } from '../components/Filteration/Sort';
import { toast } from 'sonner';
import TicketMessage from '../components/Support_com_Page/Ticket_Message';
import SendNotification from '../components/Companies/Send_Notification';
import '../styles/tables-mobile.css';

import filterIcon from '../assets/filter.svg';

// Reusable overlay for modals
const ModalOverlay = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div
    style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_TICKETS = [
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Resolved" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
  { date: "04/11/2026", ticketId: "#123", company: "John Dorghamasadsad inc", reporter: "John Dorghamasadsad", agent: "Wael Metwally", phone: "01120202020", status: "Open" },
];

const DATE_OPTIONS = ["Today", "Yesterday", "This week", "Last week", "This month", "Last month", "This year"];
const STATUS_OPTIONS = ["Open", "Resolved", "Pending", "Closed"];

const getStatusStyle = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "open") return { color: "#A80D0B", bg: "#FCE8E6" };
  if (s === "resolved") return { color: "#107C41", bg: "#E6F9EC" };
  if (s === "pending") return { color: "#8C6A04", bg: "#FFF8E1" };
  if (s === "closed") return { color: "#464646", bg: "#EDEFF2" };
  return { color: "#464646", bg: "#EDEFF2" };
};

type ActiveFilter = "date" | "status" | "sort" | null;

const Support = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [openStatusDropdownIndex, setOpenStatusDropdownIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<{ preset: any; startDate: string; endDate: string } | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [activeTicketMessage, setActiveTicketMessage] = useState<any | null>(null);
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false);
  const [notifiedTicket, setNotifiedTicket] = useState<any>(null);

  const actionMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openActionMenu !== null) {
        const ref = actionMenuRefs.current[openActionMenu];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenActionMenu(null);
        }
      }
      if (activeFilter !== null) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openActionMenu, activeFilter]);

  const ITEMS_PER_PAGE = 10;
  const parseTicketDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const getPresetDateRange = (preset: string) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (preset) {
      case "Today":
        start = today;
        end = today;
        break;
      case "Yesterday":
        start = new Date(today);
        start.setDate(today.getDate() - 1);
        end = new Date(start);
        break;
      case "This week": {
        const day = today.getDay();
        start = new Date(today);
        start.setDate(today.getDate() - day);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      }
      case "Last week": {
        const day = today.getDay();
        start = new Date(today);
        start.setDate(today.getDate() - day - 7);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      }
      case "This month": {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      }
      case "Last month": {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      }
      case "This year": {
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        break;
      }
      default:
        break;
    }

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  const filteredTickets = tickets.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      t.date.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.reporter.toLowerCase().includes(q) ||
      t.agent.toLowerCase().includes(q) ||
      t.ticketId.toLowerCase().includes(q);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(t.status);

    let matchesDate = true;
    if (dateFilter) {
      const ticketDate = parseTicketDate(t.date);
      ticketDate.setHours(0, 0, 0, 0);

      let filterStart: Date | null = null;
      let filterEnd: Date | null = null;

      if (dateFilter.preset) {
        const range = getPresetDateRange(dateFilter.preset);
        filterStart = range.start;
        filterEnd = range.end;
      } else {
        if (dateFilter.startDate) {
          filterStart = new Date(dateFilter.startDate);
          filterStart.setHours(0, 0, 0, 0);
        }
        if (dateFilter.endDate) {
          filterEnd = new Date(dateFilter.endDate);
          filterEnd.setHours(23, 59, 59, 999);
        }
      }

      if (filterStart && ticketDate < filterStart) matchesDate = false;
      if (filterEnd && ticketDate > filterEnd) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortOrder === "newest" || sortOrder === "oldest") {
      const dateA = parseTicketDate(a.date).getTime();
      const dateB = parseTicketDate(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    }
    if (sortOrder === "a-z" || sortOrder === "z-a") {
      const compA = a.company.toLowerCase();
      const compB = b.company.toLowerCase();
      if (compA < compB) return sortOrder === "a-z" ? -1 : 1;
      if (compA > compB) return sortOrder === "a-z" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTickets.length / ITEMS_PER_PAGE) || 1;
  const displayTickets = sortedTickets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  const COL_HEADERS = [
    { key: "date", label: t("support.colDate") },
    { key: "ticketId", label: t("support.colTicketId") },
    { key: "company", label: t("support.colCompanyName") },
    { key: "reporter", label: t("support.colReporter") },
    { key: "phone", label: t("support.colPhone") },
    { key: "status", label: t("support.colTicketStatus") },
    { key: "message", label: t("support.colMessage") },
    { key: "actions", label: t("support.colActions") },
  ];
  const widthMap: Record<string, number> = {
    date: 90,
    ticketId: 80,
    company: 180,
    reporter: 160,
    phone: 120,
    status: 120,
    message: 80,
    actions: 70,
  };

  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 33,
            lineHeight: "100%",
            color: "rgba(0, 35, 111, 1)",
          }}>
            {t("support.title")}
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
              <img src={filterIcon} alt="filter" width={24} height={24} />
              <input
                type="text"
                id="support-search"
                placeholder={t("support.searchPlaceholder")}
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
                {t("support.dateFilter")}
                {dateFilter ? (
                  <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#141414", fontWeight: 600 }}>1</div>
                ) : activeFilter === "date" ? (
                  <ChevronUp size={16} color="#4B5563" />
                ) : (
                  <ChevronDown size={16} color="#4B5563" />
                )}
              </button>
              {activeFilter === "date" && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: document.documentElement.dir === 'rtl' ? "auto" : 0,
                  right: document.documentElement.dir === 'rtl' ? 0 : "auto",
                  zIndex: 1000
                }}>
                  <DateFilter
                    onClose={() => setActiveFilter(null)}
                    onApply={(data) => {
                      setDateFilter(data);
                      setCurrentPage(1);
                      setActiveFilter(null);
                    }}
                    onClear={() => {
                      setDateFilter(null);
                      setCurrentPage(1);
                      setActiveFilter(null);
                    }}
                    initialPreset={dateFilter?.preset}
                    initialStartDate={dateFilter?.startDate}
                    initialEndDate={dateFilter?.endDate}
                  />
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
                {t("support.statusFilter")}
                {selectedStatuses.length > 0 ? (
                  <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#141414", fontWeight: 600 }}>{selectedStatuses.length}</div>
                ) : activeFilter === "status" ? (
                  <ChevronUp size={16} color="#4B5563" />
                ) : (
                  <ChevronDown size={16} color="#4B5563" />
                )}
              </button>
              {activeFilter === "status" && (
                <StatusTicket
                  selected={selectedStatuses[0] || ""}
                  onSelect={(newStatus) => {
                    setSelectedStatuses(newStatus ? [newStatus] : []);
                    setCurrentPage(1);
                  }}
                  onClose={() => setActiveFilter(null)}
                />
              )}
            </div>

            {/* Reset Filters */}
            <button
              id="support-reset-filters"
              onClick={() => { setSearchQuery(""); setDateFilter(null); setSelectedStatuses([]); setSortOrder("newest"); setCurrentPage(1); setActiveFilter(null); }}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#00236F", fontFamily: "Inter", fontSize: 16, fontWeight: 400, lineHeight: "normal", padding: 0, whiteSpace: "nowrap" }}
            >
              {t("support.resetFilters")}
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
                {t("support.sortBy")}
                <ArrowDownUp size={16} color="#4B5563" />
              </button>
              {activeFilter === "sort" && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  right: document.documentElement.dir === 'rtl' ? "auto" : 0,
                  left: document.documentElement.dir === 'rtl' ? 0 : "auto",
                  zIndex: 1000
                }}>
                  <Sort
                    isOpen={activeFilter === "sort"}
                    onClose={() => setActiveFilter(null)}
                    onApply={(selectedValue) => {
                      setSortOrder(selectedValue);
                      setCurrentPage(1);
                    }}
                    defaultValue={sortOrder}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── TICKET TABLE ── */}
        <div
          className="responsive-table-container"
          style={{
            marginTop: 16,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 12,
            border: "1px solid rgba(212, 213, 216, 1)",
            overflow: "visible",
          }}
        >
            {/* Header */}
            <div
              className="responsive-table-row"
              style={{
                width: "100%",
                height: 48,
                background: "rgba(212, 213, 216, 1)",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                boxSizing: "border-box",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                justifyContent: "space-between",
              }}
            >
              {COL_HEADERS.map((col) => (
                <div
                  key={col.key}
                  style={{
                    width: widthMap[col.key],
                    flexShrink: 0,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#141414",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: (col.key === "message" || col.key === "actions") ? "flex" : "block",
                    justifyContent: (col.key === "message" || col.key === "actions") ? "center" : "flex-start",
                  }}
                >
                  {col.label}
                </div>
              ))}
            </div>

            {/* Body */}
            <div style={{ minWidth: "max-content", width: "100%", background: "#fff", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
              {displayTickets.map((ticket, i) => {
                const statusStyle = getStatusStyle(ticket.status);
                return (
                  <div
                    key={i}
                    className="responsive-table-row"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      boxSizing: "border-box",
                      height: 72,
                      borderBottom: i < displayTickets.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
                      justifyContent: "space-between",
                      borderBottomLeftRadius: i === displayTickets.length - 1 ? 12 : 0,
                      borderBottomRightRadius: i === displayTickets.length - 1 ? 12 : 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    {/* Date */}
                    <div style={{ width: widthMap["date"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                      {ticket.date}
                    </div>
                    {/* Ticket ID */}
                    <div style={{ width: widthMap["ticketId"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>
                      {ticket.ticketId}
                    </div>
                    {/* Company name */}
                    <div style={{ width: widthMap["company"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ticket.company}
                    </div>
                    {/* Reporter */}
                    <div style={{ width: widthMap["reporter"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ticket.reporter}
                    </div>
                    {/* Phone number */}
                    <div style={{ width: widthMap["phone"], flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#464646" }}>
                      {ticket.phone}
                    </div>
                    {/* Status */}
                    <div style={{ width: widthMap["status"], flexShrink: 0, position: "relative" }}>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStatusDropdownIndex(openStatusDropdownIndex === i ? null : i);
                        }}
                        style={{
                          display: "inline-flex",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          borderRadius: 12,
                          padding: "3px 12px",
                          fontSize: 12,
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {ticket.status}
                      </span>
                      {openStatusDropdownIndex === i && (
                        <StatusTicket
                          selected={ticket.status}
                          onSelect={(newStatus) => {
                            const ticketToUpdate = displayTickets[i];
                            setTickets(prev => prev.map((t) => t === ticketToUpdate ? { ...t, status: newStatus } : t));
                            setOpenStatusDropdownIndex(null);
                          }}
                          onClose={() => setOpenStatusDropdownIndex(null)}
                        />
                      )}
                    </div>
                    {/* Message */}
                    <div style={{ width: widthMap["message"], flexShrink: 0, display: "flex", justifyContent: "center" }}>
                      <img
                        src={mail04Icon}
                        alt="Message"
                        width={24}
                        height={24}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveTicketMessage(ticket)}
                      />
                    </div>
                    {/* Actions */}
                    <div
                      style={{ width: widthMap["actions"], flexShrink: 0, display: "flex", justifyContent: "center", position: "relative" }}
                      ref={(el) => { actionMenuRefs.current[i] = el; }}
                    >
                      <div
                        onClick={(e) => { e.stopPropagation(); setOpenActionMenu(openActionMenu === i ? null : i); }}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: openActionMenu === i ? "#F3F4F6" : "transparent" }}
                      >
                        <svg width="4" height="20" viewBox="0 0 4 20" fill="none">
                          <circle cx="2" cy="2" r="2" fill="#6B7280" />
                          <circle cx="2" cy="10" r="2" fill="#6B7280" />
                          <circle cx="2" cy="18" r="2" fill="#6B7280" />
                        </svg>
                      </div>
                      {openActionMenu === i && (
                        <StatusSuport
                          onCall={() => {
                            toast.success(`Calling ${ticket.reporter}...`);
                          }}
                          onSendNotification={() => {
                            setNotifiedTicket(ticket);
                            setIsSendNotificationOpen(true);
                            setOpenActionMenu(null);
                          }}
                          onClose={() => setOpenActionMenu(null)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        {/* ── Ticket Pagination ── */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

        {/* Ticket Message Modal */}
        <TicketMessage
          ticket={activeTicketMessage}
          onClose={() => setActiveTicketMessage(null)}
        />

        {/* Send Notification Modal */}
        {isSendNotificationOpen && notifiedTicket && (
          <ModalOverlay onClose={() => setIsSendNotificationOpen(false)}>
            <SendNotification
              company={{
                id: notifiedTicket.ticketId,
                name: notifiedTicket.company,
                owner: notifiedTicket.reporter
              }}
              onClose={() => setIsSendNotificationOpen(false)}
              onSubmit={(title) => {
                toast.success(`Notification "${title}" sent to ${notifiedTicket.reporter}!`);
                setIsSendNotificationOpen(false);
              }}
            />
          </ModalOverlay>
        )}
      </div>
    </div>
  );
};

export default Support;
