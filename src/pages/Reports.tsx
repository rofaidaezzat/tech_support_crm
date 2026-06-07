import { ArrowDownUp, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import filterIcon from '../assets/filter.svg';
import { useState } from 'react';
import { getCookie } from '../app/service/baseQuery';
import '../styles/tables-mobile.css';
import mailIcon from '../assets/message-text-02 (1).svg';
import Pagination from '../components/Pagination';
import New_Report_Modal from '../components/Reports/New_Report_Modal';
import Top_Periority_notes from '../components/Reports/Top_Periority_notes';
import DateFilter from '../components/Filteration/Date';
import Value from '../components/Filteration/Value';
import { Sort } from '../components/Filteration/Sort';
import Empty_table from '../components/Empty_table';
import { useGetReportsQuery, useCreateReportMutation } from '../app/service/crudreports';
import { toast } from 'sonner';

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

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatLocalDate(start),
    endDate: formatLocalDate(end)
  };
};

const formatDateString = (dateStr?: string) => {
  if (!dateStr) return "";
  const datePart = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  const parts = datePart.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

const Reports = () => {
  const isSalesManager = getCookie("user_type") === "SALES_MANAGER";
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [valueFilter, setValueFilter] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedReportForNotes, setSelectedReportForNotes] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("-date");

  const queryParams: any = {
    page: currentPage,
    limit: 10,
  };

  if (searchQuery) {
    queryParams.search = searchQuery;
  }

  if (dateFilter) {
    if (dateFilter.preset) {
      const { startDate, endDate } = getPresetDateRange(dateFilter.preset);
      queryParams['date[gte]'] = startDate;
      queryParams['date[lte]'] = endDate;
    } else {
      if (dateFilter.startDate) queryParams['date[gte]'] = dateFilter.startDate;
      if (dateFilter.endDate) queryParams['date[lte]'] = dateFilter.endDate;
    }
  }

  if (valueFilter) {
    if (valueFilter.from) {
      queryParams['revenue_today[gte]'] = valueFilter.from;
    }
    if (valueFilter.to) {
      queryParams['revenue_today[lte]'] = valueFilter.to;
    }
  }

  if (sortQuery) {
    queryParams.sort = sortQuery;
  }

  const { data: reportsData, isLoading: isLoadingReports } = useGetReportsQuery(queryParams);
  const reports = reportsData?.data || [];
  const totalPages = reportsData?.pagination?.totalPages || 1;

  const [createReport] = useCreateReportMutation();

  const handleNewReportClick = () => {
    setIsNewReportModalOpen(true);
  };

  const handleCreateReportSubmit = async (formData: any) => {
    try {
      const payload = {
        calls_today: Number(formData.calls),
        follow_ups_today: Number(formData.followups),
        leads_contacted_today: Number(formData.leads),
        meetings_today: Number(formData.meetings),
        top_periority_tomorrow: formData.priority || undefined,
        additional_notes: formData.notes || undefined,
      };
      await createReport(payload).unwrap();
      toast.success("Report created successfully");
      setIsNewReportModalOpen(false);
    } catch (err: any) {
      console.error("Failed to create report:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to create report";
      toast.error(errMsg);
    }
  };

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

        {!isSalesManager && (
          <button
            onClick={handleNewReportClick}
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
        )}
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
        <div className="filter-bar-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              marginRight: 8,
            }}
          >
            <img src={filterIcon} alt="filter" width={24} height={24} />
            <input
              type="text"
              placeholder="Filter by date, name,..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === "date" ? null : "date")}
              onMouseEnter={() => setHoveredFilter('date')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                width: 88,
                gap: 8,
                background: hoveredFilter === 'date' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Date
              {dateFilter ? (
                <div style={{
                  background: "#B0BBD2",
                  width: 20,
                  height: 22,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                  boxSizing: "border-box",
                  fontSize: 11,
                  color: "#141414",
                  fontWeight: 600,
                }}>
                  1
                </div>
              ) : activeFilter === 'date' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === "date" && (
              <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, zIndex: 50 }}>
                <DateFilter
                  onClose={() => setActiveFilter(null)}
                  onApply={(date) => {
                    setDateFilter(date);
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

          {/* Value dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === "value" ? null : "value")}
              onMouseEnter={() => setHoveredFilter('value')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                width: 139,
                gap: 8,
                background: hoveredFilter === 'value' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Deals value
              {valueFilter ? (
                <div style={{
                  background: "#B0BBD2",
                  width: 20,
                  height: 22,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 2,
                  boxSizing: "border-box",
                  fontSize: 11,
                  color: "#141414",
                  fontWeight: 600,
                }}>
                  1
                </div>
              ) : activeFilter === 'value' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === "value" && (
              <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, zIndex: 50 }}>
                <Value
                  onClose={() => setActiveFilter(null)}
                  onApply={(val) => {
                    setValueFilter(val);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClear={() => {
                    setValueFilter(null);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  initialFrom={valueFilter?.from}
                  initialTo={valueFilter?.to}
                />
              </div>
            )}
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setDateFilter(null);
              setValueFilter(null);
              setSearchQuery("");
              setSortQuery("-date");
              setCurrentPage(1);
              setActiveFilter(null);
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--Foundation-brand-brand-500, #00236F)",
              fontFamily: "Inter",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              padding: 0,
              whiteSpace: "nowrap",
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* Right group: Sort by */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Sort by dropdown */}
          <div className="filter-bar-right" style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === "sort" ? null : "sort")}
              onMouseEnter={() => setHoveredFilter('sort')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                paddingRight: 12,
                paddingLeft: 12,
                height: 40,
                width: 108,
                gap: 8,
                background: hoveredFilter === 'sort' ? "#E6E9F1" : "transparent",
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
            {activeFilter === "sort" && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, zIndex: 50 }}
              >
                <Sort
                  isOpen={true}
                  onClose={() => setActiveFilter(null)}
                  onApply={(sortData) => {
                    setSortQuery(sortData);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                />
              </div>
            )}
          </div>
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
            { label: "Date", width: 70 },
            ...(isSalesManager ? [{ label: "Created by", width: 146 }] : []),
            { label: "Calls", width: 41 },
            { label: "Contacts", width: 59 },
            { label: "Followups", width: 65 },
            { label: "Meetings", width: 60 },
            { label: "Deals", width: 41 },
            { label: "Revenue (EGP)", width: 96 },
            { label: "Top Priority & notes", width: 125 },
          ].map(({ label, width }) => (
            <div
              key={label}
              style={{
                width,
                flexShrink: 0,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: label === "Created by" ? 700 : 600,
                color: label === "Created by" ? "var(--Foundation-neutral-neutral-800, #464646)" : "#141414",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: label === "Created by" ? "normal" : undefined,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div style={{ width: "100%", background: "#fff" }}>
          {reports.length === 0 ? (
            <Empty_table message={isLoadingReports ? "Loading reports..." : "No reports added yet..."} />
          ) : (
            reports.map((report: any, i: number, arr: any[]) => (
              <div
                key={report.id || i}
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
                  {formatDateString(report.date)}
                </div>

                {/* Created by */}
                {isSalesManager && (
                  <div style={{
                    color: "var(--Foundation-neutral-neutral-800, #464646)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "140%",
                    width: 146,
                    flexShrink: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {report.sales ? `${report.sales.first_name} ${report.sales.last_name}` : "N/A"}
                  </div>
                )}

                {/* Calls */}
                <div style={{ width: 41, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                  {report.calls_today}
                </div>

                {/* Contacts */}
                <div style={{ width: 59, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                  {report.leads_contacted_today}
                </div>

                {/* Followups */}
                <div style={{ width: 65, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                  {report.follow_ups_today}
                </div>

                {/* Meetings */}
                <div style={{ width: 60, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                  {report.meetings_today}
                </div>

                {/* Deals */}
                <div style={{ width: 41, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                  {report.deals_closed_today}
                </div>

                {/* Deals Value */}
                <div style={{ width: 96, flexShrink: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "140%", letterSpacing: 0, color: "#4B5563" }}>
                  {report.revenue_today?.toLocaleString() || "0"}
                </div>

                {/* Top Priority & notes */}
                <div style={{ width: 125, flexShrink: 0, display: "flex", alignItems: "center" }}>
                  <img
                    src={mailIcon}
                    alt="Email"
                    width={24}
                    height={24}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedReportForNotes(report);
                      setIsNotesModalOpen(true);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Pagination ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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
              onSubmit={handleCreateReportSubmit}
            />
          </div>
        </div>
      )}

      {isNotesModalOpen && selectedReportForNotes && (
        <div
          onClick={() => {
            setIsNotesModalOpen(false);
            setSelectedReportForNotes(null);
          }}
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
            <Top_Periority_notes
              onClose={() => {
                setIsNotesModalOpen(false);
                setSelectedReportForNotes(null);
              }}
              priorityText={selectedReportForNotes.top_periority_tomorrow}
              notesText={selectedReportForNotes.additional_notes}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports