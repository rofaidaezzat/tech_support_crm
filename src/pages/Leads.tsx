import React, { useState, useRef, useEffect } from 'react';
import { Plus, Filter, Sparkles, ChevronDown, ChevronUp, ArrowDownUp } from 'lucide-react';
import { useGetLeadsQuery, useUpdateLeadMutation, useGetLeadStatsQuery } from '../app/service/crudleads';
import { toast } from 'sonner';
import { getCookie } from '../app/service/baseQuery';
import '../styles/tables-mobile.css';
import whatsappIcon from '../assets/ic_baseline-whatsapp.svg';
import filePlusIcon from '../assets/file-plus-01.svg';
import editIcon from '../assets/edit-contained.svg';
import coinIcon from '../assets/coin-unbroken.svg';
import mailIcon from '../assets/message-text-02 (1).svg';
import mail04Icon from '../assets/mail-04.svg';
import starsIcon from '../assets/stars.svg';
import Pagination from '../components/Pagination';
import filterIcon from '../assets/filter.svg';
// Modals
import Add_new_lead from '../components/Leads/Add_new_lead';
import Edit_lead_info from '../components/Leads/Edit_lead_info';
import Convert_to_deal from '../components/Leads/Convert_to_deal';
import Lead_form from '../components/Leads/Lead_form';
import Empty_table from '../components/Empty_table';
import Notes from '../components/Deals/Notes';
import Leads_messages from '../components/Leads/Leads_messages';
import StatusTimeline from '../components/Leads/StatusTimeline';
// Filter Components
import DateFilter from '../components/Filteration/Date';
import { FollowUp } from '../components/Filteration/FollowUp';
import { Sort } from '../components/Filteration/Sort';
import Source from '../components/Filteration/Source';
import Status from '../components/Filteration/Status';
import Priority from '../components/Filteration/Priority';

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

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

const getPriorityStyle = (priority: string) => {
  const p = (priority || "").toLowerCase();
  if (p === "critical" || p === "urgent") {
    return {
      dotColor: "#E03131",
      textColor: "#E03131",
    };
  }
  if (p === "high") {
    return {
      dotColor: "#E8590C",
      textColor: "#E8590C",
    };
  }
  if (p === "medium") {
    return {
      dotColor: "rgba(140, 106, 4, 1)",
      textColor: "rgba(140, 106, 4, 1)",
    };
  }
  if (p === "low") {
    return {
      dotColor: "#464646",
      textColor: "#464646",
    };
  }
  return {
    dotColor: "#748899",
    textColor: "#748899",
  };
};

const STATUS_OPTIONS = [
  "Fresh",
  "Interested",
  "Not interested",
  "Meeting",
  "After meeting followup",
  "Wrong number",
  "No answer",
  "Deal",
];

// Map display labels → API values
const STATUS_TO_API: Record<string, string> = {
  "Fresh": "FRESH",
  "Interested": "INTERESTED",
  "Not interested": "NOT_INTERESTED",
  "Meeting": "MEETING",
  "After meeting followup": "AFTER_MEETING_FOLLOWUP",
  "Wrong number": "WRONG_NUMBER",
  "No answer": "NO_ANSWER",
  "Deal": "DEAL",
};

// Map API values → display labels
const STATUS_FROM_API: Record<string, string> = {
  "FRESH": "Fresh",
  "INTERESTED": "Interested",
  "NOT_INTERESTED": "Not interested",
  "MEETING": "Meeting",
  "AFTER_MEETING_FOLLOWUP": "After meeting followup",
  "WRONG_NUMBER": "Wrong number",
  "NO_ANSWER": "No answer",
  "DEAL": "Deal",
};

const INITIAL_LEADS = [
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Website", followup: "25/12/2026" },
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Ads", followup: "25/12/2026" },
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Referral", followup: "25/12/2026" },
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Organic", followup: "25/12/2026" },
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Website", followup: "25/12/2026" },
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Website", followup: "25/12/2026" },
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Website", followup: "25/12/2026" },
  { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", status: "After meeting follow up", phone: "+201121504065", priority: "Medium", source: "Website", followup: "25/12/2026" },
];

const MOCK_SALES_MEMBERS = [
  { id: "11111111-2222-4333-8444-555555555551", first_name: "Mohamed", last_name: "Modather", email: "mohamed@example.com" },
  { id: "11111111-2222-4333-8444-555555555552", first_name: "Wael", last_name: "Abdelrasool", email: "wael@example.com" },
  { id: "11111111-2222-4333-8444-555555555553", first_name: "Abdelwahed", last_name: "Elsaye", email: "abdelwahed@example.com" },
  { id: "11111111-2222-4333-8444-555555555554", first_name: "Mahmoud", last_name: "Eldawly", email: "mahmoud@example.com" },
];

const BASE_COL_HEADERS = ["Date", "Lead info", "Status", "Phone number", "Message", "Priority", "Lead Source", "Next Followup", "Actions"];

const formatDate = (isoString?: string | null) => {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
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

const getFollowUpDateRange = (preset: string) => {
  const today = new Date();
  let start: Date | null = new Date();
  let end: Date | null = new Date();
  let presetName: string | null = null;

  switch (preset.toLowerCase()) {
    case "today":
      start = today;
      end = today;
      break;
    case "tomorrow":
      start = new Date(today);
      start.setDate(today.getDate() + 1);
      end = new Date(start);
      break;
    case "this week":
    case "this-week": {
      const day = today.getDay();
      start = new Date(today);
      start.setDate(today.getDate() - day);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      break;
    }
    case "next week":
    case "next-week": {
      const day = today.getDay();
      start = new Date(today);
      start.setDate(today.getDate() - day + 7);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      break;
    }
    case "no followup":
    case "no-followup":
      start = null;
      end = null;
      presetName = "no-followup";
      break;
    case "missed":
      start = new Date(1970, 0, 1);
      end = new Date(today);
      end.setDate(today.getDate() - 1);
      presetName = "missed";
      break;
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
    startDate: start ? formatLocalDate(start) : undefined,
    endDate: end ? formatLocalDate(end) : undefined,
    presetName: presetName || undefined
  };
};

const Leads = () => {
  const isSalesManager = getCookie("user_type") === "SALES_MANAGER";
  const COL_HEADERS = isSalesManager
    ? ["Date", "Lead info", "Assigned to", "Status", "Phone number", "Message", "Priority", "Lead Source", "Next Followup", "Actions"]
    : BASE_COL_HEADERS;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<{ preset: any; startDate: string; endDate: string } | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [followUpFilter, setFollowUpFilter] = useState<{ preset: string | null; startDate: string; endDate: string } | null>(null);
  const [sortQuery, setSortQuery] = useState("-created_at");

  // Construct search params to pass to query
  const queryParams: any = {
    page: currentPage,
    limit: 10,
  };

  if (searchQuery) {
    queryParams.search = searchQuery;
  }

  // Date Filter
  if (dateFilter) {
    if (dateFilter.preset) {
      const { startDate, endDate } = getPresetDateRange(dateFilter.preset);
      queryParams.start_date = startDate;
      queryParams.end_date = endDate;
    } else {
      if (dateFilter.startDate) queryParams.start_date = dateFilter.startDate;
      if (dateFilter.endDate) queryParams.end_date = dateFilter.endDate;
    }
  }

  // Status Filter
  if (selectedStatuses.length > 0) {
    queryParams.status = selectedStatuses.map(s => STATUS_TO_API[s] || s).join(',');
  }

  // Priority Filter
  if (selectedPriorities.length > 0) {
    queryParams.priority = selectedPriorities.map(p => p.toUpperCase()).join(',');
  }

  // Source Filter
  if (selectedSources.length > 0) {
    queryParams.source = selectedSources.join(',');
  }

  // Follow Up Filter
  if (followUpFilter) {
    if (followUpFilter.preset) {
      const { startDate, endDate, presetName } = getFollowUpDateRange(followUpFilter.preset);
      if (startDate) queryParams.next_follow_up_start = startDate;
      if (endDate) queryParams.next_follow_up_end = endDate;
      if (presetName) queryParams.next_follow_up_preset = presetName;
    } else {
      if (followUpFilter.startDate) queryParams.next_follow_up_start = followUpFilter.startDate;
      if (followUpFilter.endDate) queryParams.next_follow_up_end = followUpFilter.endDate;
    }
  }

  // Sort Filter
  if (sortQuery) {
    queryParams.sort = sortQuery;
  }

  const { data: leadsData, isLoading } = useGetLeadsQuery(queryParams);

  // Fetch stats in parallel — only refetch when search/priority/assignment changes, NOT on paging/sort
  const statsParams = {
    ...(searchQuery ? { search: searchQuery } : {}),
    ...(selectedPriorities.length > 0 ? { priority: selectedPriorities.map(p => p.toUpperCase()).join(',') } : {}),
  };
  const { data: leadStatsData } = useGetLeadStatsQuery(statsParams);
  const [updateLead] = useUpdateLeadMutation();
  const [leads, setLeads] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openPriorityDropdown, setOpenPriorityDropdown] = useState<number | null>(null);
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [openAssignDropdown, setOpenAssignDropdown] = useState<number | null>(null);
  const [salesSearchQuery, setSalesSearchQuery] = useState("");

  useEffect(() => {
    if (leadsData?.data) {
      const mappedLeads = leadsData.data.map((lead: any) => ({
        id: lead.id,
        date: formatDate(lead.created_at),
        name: lead.name,
        company: lead.company_name || "",
        status: STATUS_FROM_API[lead.status] || lead.status,
        phone: lead.phone,
        priority: lead.priority ? lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1).toLowerCase() : "None",
        source: lead.source,
        followup: formatDate(lead.next_follow_up),
        assignedToName: lead.assigned_to ? `${lead.assigned_to.first_name} ${lead.assigned_to.last_name}`.trim() : "",
        assignedToDate: formatDate(lead.updated_at),
      }));
      setLeads(mappedLeads);
    }
  }, [leadsData]);
  
  // Filter Dropdowns & Modals
  type ActiveFilter = 'date' | 'status' | 'source' | 'followup' | 'sort' | 'priority' | null;
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  // Modal States
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isEditLeadOpen, setIsEditLeadOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isConvertToDealOpen, setIsConvertToDealOpen] = useState(false);
  const [selectedConvertLead, setSelectedConvertLead] = useState<any>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isStatusTimelineOpen, setIsStatusTimelineOpen] = useState(false);
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const priorityDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const actionMenuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const assignDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown !== null) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
      if (openPriorityDropdown !== null) {
        const ref = priorityDropdownRefs.current[openPriorityDropdown];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenPriorityDropdown(null);
        }
      }
      if (openActionMenu !== null) {
        const ref = actionMenuRefs.current[openActionMenu];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenActionMenu(null);
        }
      }
      if (openAssignDropdown !== null) {
        const ref = assignDropdownRefs.current[openAssignDropdown];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenAssignDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown, openPriorityDropdown, openActionMenu, openAssignDropdown]);

  const handleAssignToChange = async (leadIndex: number, salesId: string) => {
    const lead = leads[leadIndex];
    if (!lead?.id) return;
    const selectedSales = MOCK_SALES_MEMBERS.find((s) => s.id === salesId);
    const fullName = selectedSales ? `${selectedSales.first_name} ${selectedSales.last_name}` : "";
    const todayStr = formatDate(new Date().toISOString());

    // Optimistic local update
    setLeads((prev) =>
      prev.map((l, i) =>
        i === leadIndex
          ? { ...l, assignedToName: fullName, assignedToDate: todayStr }
          : l
      )
    );
    setOpenAssignDropdown(null);

    try {
      await updateLead({
        id: lead.id,
        body: {
          assigned_to_id: salesId,
        },
      }).unwrap();
      toast.success(`Lead successfully assigned to ${fullName}!`);
    } catch (err: any) {
      // Revert optimistic update on error
      setLeads((prev) =>
        prev.map((l, i) =>
          i === leadIndex
            ? { ...l, assignedToName: lead.assignedToName, assignedToDate: lead.assignedToDate }
            : l
        )
      );
      let errMsg = err?.data?.message || err?.message || "Failed to assign lead.";
      if (Array.isArray(errMsg)) errMsg = errMsg.join(", ");
      toast.error(errMsg);
    }
  };

  const handleStatusChange = async (leadIndex: number, newStatus: string) => {
    // "Deal" opens the Convert to Deal modal instead of calling the status API
    if (newStatus === "Deal") {
      setSelectedConvertLead(leads[leadIndex]);
      setIsConvertToDealOpen(true);
      setOpenDropdown(null);
      return;
    }
    const lead = leads[leadIndex];
    if (!lead?.id) return;
    // Optimistic local update
    setLeads((prev) =>
      prev.map((l, i) => (i === leadIndex ? { ...l, status: newStatus } : l))
    );
    setOpenDropdown(null);
    try {
      await updateLead({
        id: lead.id,
        status: STATUS_TO_API[newStatus] || newStatus,
        body: {},
      }).unwrap();
    } catch (err: any) {
      // Revert optimistic update on error
      setLeads((prev) =>
        prev.map((l, i) => (i === leadIndex ? { ...l, status: lead.status } : l))
      );
      let errMsg = err?.data?.message || err?.message || "Failed to update status.";
      if (Array.isArray(errMsg)) errMsg = errMsg.join(", ");
      toast.error(errMsg);
    }
  };

  const handlePriorityChange = async (leadIndex: number, newPriority: string) => {
    const lead = leads[leadIndex];
    if (!lead?.id) return;
    // Optimistic local update
    setLeads((prev) =>
      prev.map((l, i) => (i === leadIndex ? { ...l, priority: newPriority } : l))
    );
    setOpenPriorityDropdown(null);
    try {
      await updateLead({
        id: lead.id,
        priority: newPriority === "None" ? "MEDIUM" : newPriority.toUpperCase(),
        body: {},
      }).unwrap();
    } catch (err: any) {
      // Revert optimistic update on error
      setLeads((prev) =>
        prev.map((l, i) => (i === leadIndex ? { ...l, priority: lead.priority } : l))
      );
      let errMsg = err?.data?.message || err?.message || "Failed to update priority.";
      if (Array.isArray(errMsg)) errMsg = errMsg.join(", ");
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
          Leads
        </div>

        <button
          onClick={() => setIsAddLeadOpen(true)}
          style={{
            background: "rgba(0, 35, 111, 1)",
            width: 154,
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
            cursor: "pointer",
          }}
        >
          <Plus size={20} color="#fff" />
          Add Lead
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
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div className="filter-bar-left" style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {isAISearchOpen ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "8px 12px",
                height: 40,
                gap: 8,
                background: "#EDEFF2",
                width: 406,
                boxSizing: "border-box",
                opacity: 1,
              }}
            >
              <input
                type="text"
                placeholder="Describe what you want..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  flex: 1,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "var(--Foundation-neutral-neutral-800, #464646)",
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--Foundation-neutral-neutral-800, #464646)",
                  whiteSpace: "nowrap",
                  marginRight: 4,
                  userSelect: "none"
                }}
              >
                (0/5) AI limit
              </span>
              <svg
                onClick={() => setIsAISearchOpen(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="19.2"
                height="19.2"
                viewBox="0 0 20 20"
                fill="none"
                style={{ cursor: "pointer", flexShrink: 0 }}
              >
                <path d="M12.4235 0L14.2538 4.94621L19.2 6.77647L14.2538 8.60673L12.4235 13.5529L10.5933 8.60673L5.64706 6.77647L10.5933 4.94621L12.4235 0Z" fill="var(--Foundation-brand-brand-500, #00236F)"/>
                <path d="M3.95294 11.2941L5.55177 13.6482L7.90588 15.2471L5.55177 16.8459L3.95294 19.2L2.35411 16.8459L0 15.2471L2.35411 13.6482L3.95294 11.2941Z" fill="var(--Foundation-brand-brand-500, #00236F)"/>
              </svg>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: searchQuery ? "1px solid var(--Foundation-brand-brand-500, #00236F)" : "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "8px 12px",
                height: 40,
                gap: 8,
                background: "transparent",
                width: 406,
                boxSizing: "border-box",
                opacity: 1,
                transform: "rotate(0deg)",
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
              <img
                src={starsIcon}
                alt="stars"
                width={24}
                height={24}
                style={{ cursor: "pointer" }}
                onClick={() => setIsAISearchOpen(true)}
              />
            </div>
          )}

          {/* Date */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'date' ? null : 'date')}
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
            {activeFilter === 'date' && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 500, marginTop: 4 }}>
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
                  dateCounts={leadStatsData?.data?.date}
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'status' ? null : 'status')}
              onMouseEnter={() => setHoveredFilter('status')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                minWidth: 88,
                gap: 8,
                background: hoveredFilter === 'status' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Status
              {selectedStatuses.length > 0 ? (
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
                  {selectedStatuses.length}
                </div>
              ) : activeFilter === 'status' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'status' && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 500, marginTop: 4 }}>
                <Status
                  onApply={(selected) => {
                    setSelectedStatuses(selected);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClear={() => {
                    setSelectedStatuses([]);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClose={() => setActiveFilter(null)}
                  initialSelected={selectedStatuses}
                  counts={leadStatsData?.data?.status}
                />
              </div>
            )}
          </div>

          {/* Priority */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'priority' ? null : 'priority')}
              onMouseEnter={() => setHoveredFilter('priority')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                minWidth: 88,
                gap: 8,
                background: hoveredFilter === 'priority' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Priority
              {selectedPriorities.length > 0 ? (
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
                  {selectedPriorities.length}
                </div>
              ) : activeFilter === 'priority' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'priority' && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 500, marginTop: 4 }}>
                <Priority
                  onApply={(selected) => {
                    setSelectedPriorities(selected);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClear={() => {
                    setSelectedPriorities([]);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClose={() => setActiveFilter(null)}
                  initialSelected={selectedPriorities}
                />
              </div>
            )}
          </div>

          {/* Source */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'source' ? null : 'source')}
              onMouseEnter={() => setHoveredFilter('source')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                minWidth: 88,
                gap: 8,
                background: hoveredFilter === 'source' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Source
              {selectedSources.length > 0 ? (
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
                  {selectedSources.length}
                </div>
              ) : activeFilter === 'source' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'source' && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 500, marginTop: 4 }}>
                <Source
                  onApply={(selected) => {
                    setSelectedSources(selected);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClear={() => {
                    setSelectedSources([]);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClose={() => setActiveFilter(null)}
                  initialSelected={selectedSources}
                  counts={leadStatsData?.data?.source}
                />
              </div>
            )}
          </div>

          {/* Followup */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'followup' ? null : 'followup')}
              onMouseEnter={() => setHoveredFilter('followup')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                minWidth: 88,
                gap: 8,
                background: hoveredFilter === 'followup' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Followup
              {followUpFilter ? (
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
              ) : activeFilter === 'followup' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'followup' && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 500, marginTop: 4 }}>
                <FollowUp
                  isOpen={true}
                  onClose={() => setActiveFilter(null)}
                  onApply={(data) => {
                    setFollowUpFilter({ preset: data.filterType, startDate: data.startDate, endDate: data.endDate });
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  onClear={() => {
                    setFollowUpFilter(null);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  defaultFilter={followUpFilter?.preset || undefined}
                  defaultStartDate={followUpFilter?.startDate}
                  defaultEndDate={followUpFilter?.endDate}
                  followUpCounts={leadStatsData?.data?.date as any}
                />
              </div>
            )}
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setDateFilter(null);
              setSelectedStatuses([]);
              setSelectedPriorities([]);
              setSelectedSources([]);
              setFollowUpFilter(null);
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
          <div className="filter-bar-right" style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'sort' ? null : 'sort')}
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
            {activeFilter === 'sort' && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ position: "absolute", top: "100%", right: 0, zIndex: 500, marginTop: 4 }}
              >
                <Sort
                  isOpen={true}
                  onClose={() => setActiveFilter(null)}
                  onApply={(val) => {
                    let apiSort = "-created_at";
                    if (val === "oldest") apiSort = "created_at";
                    else if (val === "newest") apiSort = "-created_at";
                    else if (val === "a-z") apiSort = "name";
                    else if (val === "z-a") apiSort = "-name";
                    
                    setSortQuery(apiSort);
                    setCurrentPage(1);
                    setActiveFilter(null);
                  }}
                  defaultValue={
                    sortQuery === "created_at" ? "oldest" :
                    sortQuery === "-created_at" ? "newest" :
                    sortQuery === "name" ? "a-z" :
                    sortQuery === "-name" ? "z-a" : "newest"
                  }
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
          overflow: "visible",
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
            padding: "0 12px",
            boxSizing: "border-box",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            justifyContent: "space-between",
          }}
        >
          {COL_HEADERS.map((col) => {
            const widthMap: Record<string, number> = {
              "Date": 70,
              "Lead info": 146,
              "Assigned to": 162,
              "Status": 112,
              "Phone number": 99,
              "Message": 58,
              "Priority": 60,
              "Lead Source": 79,
              "Next Followup": 91,
              "Actions": 132,
            };
            return (
              <div
                key={col}
                style={{
                  width: widthMap[col] || 100,
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#141414",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: col === "Actions" ? "flex" : "block",
                  justifyContent: col === "Actions" ? "center" : "flex-start",
                }}
              >
                {col}
              </div>
            );
          })}
        </div>

        {/* Table Body */}
        <div style={{ width: "100%", background: "#fff" }}>
          {isLoading ? (
            <div style={{ padding: "40px", textAlign: "center", fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
              Loading leads...
            </div>
          ) : leads.length === 0 ? (
            <Empty_table message="No leads added yet..." />
          ) : (
            leads.map((lead, i) => (
              <div
                key={i}
                className="responsive-table-row"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "16px 12px",
                boxSizing: "border-box",
                height: 72,
                borderBottom: i < leads.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
                justifyContent: "space-between",
                borderBottomLeftRadius: i === leads.length - 1 ? 12 : 0,
                borderBottomRightRadius: i === leads.length - 1 ? 12 : 0,
              }}
            >
              {/* Date */}
              <div style={{ width: 70, flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                {lead.date}
              </div>
              {/* Lead info */}
              <div style={{ width: 146, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>
                  {lead.name}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>
                  {lead.company}
                </span>
              </div>

              {/* Assigned to (SALES_MANAGER only) */}
              {isSalesManager && (
                <div 
                  style={{ width: 162, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 8, position: "relative" }}
                  ref={(el) => { assignDropdownRefs.current[i] = el; }}
                >
                  <div 
                    onClick={() => {
                      setOpenAssignDropdown(openAssignDropdown === i ? null : i);
                      setSalesSearchQuery("");
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}
                  >
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "var(--Foundation-neutral-neutral-800, #464646)", lineHeight: "140%" }}>
                      {lead.assignedToName || "—"}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M7 10L12.0008 14.58L17 10" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "var(--Foundation-neutral-neutral-600, #747474)", lineHeight: "140%" }}>
                    {lead.assignedToDate}
                  </span>

                  {openAssignDropdown === i && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        marginTop: 4,
                        borderRadius: 12,
                        background: "var(--Foundation-neutral-white, #FFF)",
                        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.17)",
                        display: "flex",
                        width: 277,
                        height: 252,
                        padding: 12,
                        boxSizing: "border-box",
                        flexDirection: "column",
                        gap: 4,
                        zIndex: 200,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, flex: "1 0 0%", width: "100%", boxSizing: "border-box" }}>
                        {/* Search Input Container */}
                        <div style={{ position: "relative", width: "100%" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#747474"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
                          >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <input
                            type="text"
                            placeholder="Search sales name..."
                            value={salesSearchQuery}
                            onChange={(e) => setSalesSearchQuery(e.target.value)}
                            style={{
                              width: "100%",
                              height: 36,
                              border: "1px solid rgba(212, 213, 216, 1)",
                              borderRadius: 8,
                              padding: "0 10px 0 34px",
                              fontFamily: "Inter, sans-serif",
                              fontSize: 13,
                              color: "#141414",
                              background: "transparent",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        {/* List Container */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            flex: 1,
                            overflowY: "auto",
                            width: "100%",
                          }}
                        >
                          {MOCK_SALES_MEMBERS.filter((s) =>
                            `${s.first_name} ${s.last_name}`.toLowerCase().includes(salesSearchQuery.toLowerCase())
                          ).map((member) => {
                            const fullName = `${member.first_name} ${member.last_name}`;
                            const isSelected = lead.assignedToName === fullName;
                            return (
                              <div
                                key={member.id}
                                onClick={() => handleAssignToChange(i, member.id)}
                                style={{
                                  background: isSelected ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
                                  display: "flex",
                                  height: 40,
                                  padding: 8,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: 8,
                                  alignSelf: "stretch",
                                  borderRadius: 8,
                                  cursor: "pointer",
                                  boxSizing: "border-box",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) e.currentTarget.style.background = "#F3F4F6";
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) e.currentTarget.style.background = "transparent";
                                }}
                              >
                                {isSelected ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                                    <circle cx="12" cy="12" r="10" stroke="#00236F" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="5" fill="#00236F" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                                    <circle cx="12" cy="12" r="10" stroke="#747474" strokeWidth="2" />
                                  </svg>
                                )}
                                <span
                                  style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: 13,
                                    fontWeight: isSelected ? 500 : 400,
                                    color: "#141414",
                                  }}
                                >
                                  {fullName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Status with dropdown */}
              <div
                style={{ width: 112, flexShrink: 0, position: "relative", display: "flex", justifyContent: "flex-start", alignItems: "center" }}
                ref={(el) => { dropdownRefs.current[i] = el; }}
              >
                <div
                  onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(230, 233, 241, 1)",
                    borderRadius: 12,
                    padding: "4px 12px",
                    height: 26,
                    boxSizing: "border-box",
                    cursor: "pointer",
                    gap: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      lineHeight: "140%",
                      color: "rgba(70, 70, 70, 1)",
                      height: 18,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      textAlign: "center"
                    }}
                  >
                    {lead.status}
                  </span>
                </div>

                {/* Dropdown */}
                {openDropdown === i && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      zIndex: 1000,
                      background: "rgba(255, 255, 255, 1)",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)",
                      borderRadius: 12,
                      padding: "4px 0",
                      minWidth: 220,
                      border: "1px solid rgba(212, 213, 216, 1)",
                    }}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleStatusChange(i, option)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 16px",
                          borderBottom: option === STATUS_OPTIONS[STATUS_OPTIONS.length - 1]
                            ? "none"
                            : "1px solid var(--Foundation-neutral-neutral-50, #EDEFF2)",
                          alignSelf: "stretch",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(237, 239, 242, 1)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        }}
                      >
                        {/* Radio circle */}
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: lead.status === option
                              ? "5px solid rgba(0, 35, 111, 1)"
                              : "2px solid rgba(212, 213, 216, 1)",
                            boxSizing: "border-box",
                            background: "#fff",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 14,
                            fontWeight: 400,
                            color: lead.status === option ? "rgba(0, 35, 111, 1)" : "rgba(70, 70, 70, 1)",
                            userSelect: "none",
                          }}
                        >
                          {option}
                        </span>
                        
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div style={{ width: 99, flexShrink: 0, fontFamily: "Inter, sans-serif", fontStyle: "normal", fontWeight: 400, fontSize: 13, lineHeight: "140%", color: "var(--Foundation-neutral-neutral-800, #464646)" }}>
                {"*******" + lead.phone.slice(-4)}
              </div>

              {/* Message icon */}
              <div style={{ width: 58, flexShrink: 0, display: "flex", alignItems: "center" }}>
                <img src={mail04Icon} alt="Message" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsMessagesOpen(true)} />
              </div>

              {/* Priority */}
              <div 
                style={{ width: 60, flexShrink: 0, position: "relative" }}
                ref={(el) => { priorityDropdownRefs.current[i] = el; }}
              >
                <div
                  onClick={() => setOpenPriorityDropdown(openPriorityDropdown === i ? null : i)}
                  style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: getPriorityStyle(lead.priority).dotColor,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      width: 50,
                      height: 18,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      lineHeight: "140%",
                      letterSpacing: "0%",
                      color: getPriorityStyle(lead.priority).textColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lead.priority}
                  </span>
                </div>

                {/* Priority Dropdown */}
                {openPriorityDropdown === i && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 1000,
                      borderRadius: 12,
                      background: "var(--Foundation-neutral-white, #FFF)",
                      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.17)",
                      display: "inline-flex",
                      flexDirection: "column",
                      padding: 12,
                      alignItems: "flex-start",
                      gap: 4,
                      minWidth: 130,
                      border: "1px solid rgba(212, 213, 216, 1)",
                    }}
                  >
                    {PRIORITY_OPTIONS.map((option) => {
                      const isSelected = lead.priority === option;
                      return (
                        <div
                          key={option}
                          onClick={() => handlePriorityChange(i, option)}
                          style={{
                            display: "inline-flex",
                            height: 40,
                            padding: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                            alignSelf: "stretch",
                            cursor: "pointer",
                            borderRadius: 8,
                            transition: "background 0.2s ease",
                            background: isSelected ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--Foundation-brand-brand-50, #E6E9F1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isSelected ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent";
                          }}
                        >
                          {/* Radio circle */}
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              border: isSelected
                                ? "5px solid rgba(0, 35, 111, 1)"
                                : "2px solid rgba(212, 213, 216, 1)",
                              boxSizing: "border-box",
                              background: "#fff",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: 14,
                              fontWeight: 400,
                              color: isSelected ? "rgba(0, 35, 111, 1)" : "rgba(70, 70, 70, 1)",
                              userSelect: "none",
                            }}
                          >
                            {option}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Lead Source */}
              <div style={{ width: 79, flexShrink: 0, display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(231, 253, 253, 1)",
                    height: 24,
                    borderRadius: 12,
                    padding: "4px 8px",
                    boxSizing: "border-box",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 9,
                    color: "#0E7490",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    maxWidth: "100%",
                  }}
                >
                  {lead.source}
                </span>
              </div>

              {/* Next Followup */}
              <div style={{ width: 91, flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                {lead.followup}
              </div>

              {/* Actions */}
              <div style={{ width: 132, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, position: "relative" }} ref={(el) => { actionMenuRefs.current[i] = el; }}>
                {/* Phone call icon — FIRST */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="19.2" 
                  height="19.2" 
                  viewBox="0 0 22 22" 
                  fill="none" 
                  style={{ cursor: "pointer", flexShrink: 0 }}
                  onClick={() => { window.open(`https://teams.microsoft.com/l/call/0/0?users=${encodeURIComponent('4:' + lead.phone)}`, '_blank'); }}
                >
                  <path d="M11.4711 4.92605C12.671 5.12715 13.7609 5.69387 14.6311 6.56224C15.5012 7.4306 16.0645 8.51834 16.2706 9.71577M11.6543 1.00012C13.7884 1.36118 15.7348 2.37122 17.2827 3.91143C18.8307 5.4562 19.8382 7.3986 20.2 9.52838M18.533 18.0018C18.533 18.0018 17.3743 19.1398 17.0903 19.4734C16.6278 19.967 16.0828 20.2001 15.3684 20.2001C15.2997 20.2001 15.2264 20.2001 15.1577 20.1955C13.7975 20.1087 12.5336 19.5786 11.5856 19.1261C8.99344 17.8738 6.71733 16.096 4.82592 13.8428C3.26424 11.9644 2.22007 10.2276 1.52854 8.36294C1.10263 7.22492 0.946916 6.33828 1.01561 5.5019C1.06141 4.96717 1.26749 4.52385 1.64761 4.14451L3.20929 2.58603C3.43369 2.37579 3.67184 2.26153 3.9054 2.26153C4.19392 2.26153 4.42749 2.43521 4.57404 2.58146C4.57862 2.58603 4.5832 2.5906 4.58778 2.59517C4.86714 2.85568 5.13276 3.12533 5.41212 3.41326C5.55409 3.55951 5.70064 3.70576 5.84719 3.85658L7.09745 5.10428C7.5829 5.58874 7.5829 6.03663 7.09745 6.52109C6.96464 6.65363 6.83641 6.78617 6.7036 6.91414C6.3189 7.30719 6.6211 7.0056 6.22267 7.36209C6.21351 7.37123 6.20435 7.3758 6.19977 7.38494C5.80591 7.77799 5.87919 8.1619 5.96162 8.42241C5.9662 8.43612 5.97078 8.44983 5.97536 8.46354C6.30052 9.24964 6.75849 9.99004 7.4546 10.8721L7.45918 10.8767C8.72318 12.4306 10.0559 13.6417 11.526 14.5695C11.7137 14.6883 11.9061 14.7843 12.0893 14.8757C12.2541 14.958 12.4098 15.0357 12.5426 15.118C12.561 15.1271 12.5793 15.1408 12.5976 15.1499C12.7533 15.2276 12.8999 15.2642 13.051 15.2642C13.4311 15.2642 13.6693 15.0265 13.7471 14.9489L14.6448 14.053C14.8005 13.8976 15.0478 13.7102 15.3363 13.7102C15.6203 13.7102 15.8538 13.8885 15.9958 14.0439C16.0004 14.0484 16.0004 14.0484 16.005 14.053L18.5284 16.5713C19.0001 17.0374 18.533 18.0018 18.533 18.0018Z" stroke="#00236F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <img 
                  src={whatsappIcon} 
                  alt="WhatsApp" 
                  width={24} 
                  height={24} 
                  style={{ cursor: "pointer", strokeWidth: 2, stroke: "var(--Foundation-neutral-neutral-800, #464646)" }} 
                  onClick={() => { window.open(`https://web.whatsapp.com/send?phone=${encodeURIComponent(lead.phone)}`, '_blank'); }}
                />
                <img src={filePlusIcon} alt="Add File" width={24} height={24} style={{ cursor: "pointer", strokeWidth: 2, stroke: "var(--Foundation-neutral-neutral-800, #464646)" }} onClick={() => setIsLeadFormOpen(true)} />
                
                {/* Three dots menu */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => setOpenActionMenu(openActionMenu === i ? null : i)}>
                  <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" fill="#464646"/>
                </svg>

                {/* Dropdown Menu */}
                {openActionMenu === i && (
                  <div style={{
                    position: "absolute",
                    top: 32,
                    right: 0,
                    zIndex: 10,
                    borderRadius: 12,
                    background: "var(--Foundation-neutral-white, #FFF)",
                    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.17)",
                    display: "inline-flex",
                    flexDirection: "column",
                    padding: 12,
                    alignItems: "flex-start",
                    gap: 4
                  }}>
                    {/* Note */}
                    <div 
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      onClick={() => { setSelectedLeadId(lead.id); setIsNotesOpen(true); setOpenActionMenu(null); }}
                    >
                      <img src={mailIcon} alt="Note" width={20} height={20} style={{ stroke: "#464646" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#141414", whiteSpace: "nowrap" }}>Note</span>
                    </div>

                    {/* Status timeline */}
                    <div 
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      onClick={() => { setSelectedLeadId(lead.id); setIsStatusTimelineOpen(true); setOpenActionMenu(null); }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 16" fill="none">
                        <path d="M1 7.66608H5L7.04044 1L11.4382 15L12.9903 7.66608H17" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#141414", whiteSpace: "nowrap" }}>Status timeline</span>
                    </div>

                    {/* Convert to deal */}
                    <div 
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      onClick={() => { setSelectedConvertLead(lead); setIsConvertToDealOpen(true); setOpenActionMenu(null); }}
                    >
                      <img src={coinIcon} alt="Convert to deal" width={20} height={20} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#141414", whiteSpace: "nowrap" }}>Convert to deal</span>
                    </div>

                    {/* Edit info */}
                    <div 
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      onClick={() => { setSelectedLeadId(lead.id); setIsEditLeadOpen(true); setOpenActionMenu(null); }}
                    >
                      <img src={editIcon} alt="Edit info" width={20} height={20} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#141414", whiteSpace: "nowrap" }}>Edit info</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        </div>
      </div>

      {/* ── Pagination ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Pagination currentPage={currentPage} totalPages={leadsData?.pagination?.totalPages || 1} onPageChange={setCurrentPage} />
      </div>

      {/* ── Modals ── */}
      {isAddLeadOpen && (
        <ModalOverlay onClose={() => setIsAddLeadOpen(false)}>
          <Add_new_lead onClose={() => setIsAddLeadOpen(false)} />
        </ModalOverlay>
      )}
      {isEditLeadOpen && selectedLeadId && (
        <ModalOverlay onClose={() => { setIsEditLeadOpen(false); setSelectedLeadId(null); }}>
          <Edit_lead_info leadId={selectedLeadId} onClose={() => { setIsEditLeadOpen(false); setSelectedLeadId(null); }} />
        </ModalOverlay>
      )}
      {isConvertToDealOpen && (
        <ModalOverlay onClose={() => { setIsConvertToDealOpen(false); setSelectedConvertLead(null); }}>
          <Convert_to_deal
            onClose={() => { setIsConvertToDealOpen(false); setSelectedConvertLead(null); }}
            leadId={selectedConvertLead?.id}
            leadName={selectedConvertLead?.name}
            companyName={selectedConvertLead?.company}
            currentStatus={selectedConvertLead?.status}
          />
        </ModalOverlay>
      )}
      {isLeadFormOpen && (
        <ModalOverlay onClose={() => setIsLeadFormOpen(false)}>
          <Lead_form onClose={() => setIsLeadFormOpen(false)} />
        </ModalOverlay>
      )}
      {isNotesOpen && (
        <ModalOverlay onClose={() => { setIsNotesOpen(false); setSelectedLeadId(null); }}>
          <Notes 
            leadId={selectedLeadId || undefined} 
            leadName={leads.find(l => l.id === selectedLeadId)?.name} 
            onClose={() => { setIsNotesOpen(false); setSelectedLeadId(null); }} 
          />
        </ModalOverlay>
      )}
      {isMessagesOpen && (
        <ModalOverlay onClose={() => setIsMessagesOpen(false)}>
          <Leads_messages onClose={() => setIsMessagesOpen(false)} />
        </ModalOverlay>
      )}
      {isStatusTimelineOpen && selectedLeadId && (
        <ModalOverlay onClose={() => { setIsStatusTimelineOpen(false); setSelectedLeadId(null); }}>
          <StatusTimeline 
            onClose={() => { setIsStatusTimelineOpen(false); setSelectedLeadId(null); }} 
            leadId={selectedLeadId}
            leadName={leads.find(l => l.id === selectedLeadId)?.name || ""}
          />
        </ModalOverlay>
      )}

    </div>
  );
};

export default Leads;