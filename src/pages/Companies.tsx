import React, { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown, ChevronUp, ArrowDownUp, Download, Info } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { toast } from 'sonner';
import Pagination from '../components/Pagination';
import editIcon from '../assets/edit-contained.svg';
import filterIcon from '../assets/filter.svg';
import CompanyDetails from './Company_details';
import CreateCompany from '../components/Companies/CreateCompany';
import PlanFilter from '../components/Filteration/Planfilter';
import Status from '../components/Filteration/Status';
import DateFilter from '../components/Filteration/Date';
import { Sort } from '../components/Filteration/Sort';
import SalesFilter from '../components/Filteration/Sales_Count';
import PlanSetting from '../components/Companies/Plan_Setting';
import BusinessSectorFilter from '../components/Filteration/Bussness_sector';
import SendNotification from '../components/Companies/Send_Notification';
import PauseCompany from '../components/Companies/Pause_Company';
import Deactivate from '../components/Companies/Deactivate';
import PlanInfo from '../components/Companies/Plan_info';

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

const MOCK_COMPANIES = [
  { id: "1", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "2", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Expired", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "3", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Paused", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "4", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "5", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "6", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "7", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "8", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "9", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "10", name: "John Dorghamasadsad inc", owner: "John Dorghamasadsad", sector: "Real estate", plan: "Plan 1", status: "Active", renewalDate: "25/12/2026", salesCount: 100000000 },
  { id: "11", name: "Acme Technology Corp", owner: "Jane Doe", sector: "Technology", plan: "Plan 2", status: "Active", renewalDate: "15/08/2026", salesCount: 50000000 },
  { id: "12", name: "Global Health Industries", owner: "Robert Smith", sector: "Healthcare", plan: "Custom plan", status: "Paused", renewalDate: "10/10/2026", salesCount: 12000000 },
  { id: "13", name: "Apex Financial Group", owner: "Michael Brown", sector: "Finance", plan: "Plan 1", status: "Expired", renewalDate: "12/01/2027", salesCount: 85000000 },
  { id: "14", name: "Horizon Retail Enterprise", owner: "Linda Thomas", sector: "Retail", plan: "Plan 2", status: "Active", renewalDate: "14/07/2026", salesCount: 35000000 },
];

const SECTOR_OPTIONS = ["Real estate", "Technology", "Healthcare", "Finance", "Retail", "Manufacturing"];
const PLAN_OPTIONS = ["Plan 1", "Plan 2", "Custom plan"];
const STATUS_OPTIONS = ["Active", "Expired", "Paused"];
const RENEWAL_OPTIONS = ["All", "This Year", "Next Year"];
const SALES_OPTIONS = ["All", "> 50M", "< 50M"];

// COL_HEADERS will be built inside the component using t()

const getStatusStyle = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "active") {
    return {
      bg: "#E6F9EC",
      color: "#107C41",
    };
  }
  if (s === "expired") {
    return {
      bg: "#FCE8E6",
      color: "#A80D0B",
    };
  }
  if (s === "paused") {
    return {
      bg: "#EDEFF2",
      color: "#464646",
    };
  }
  return {
    bg: "#EDEFF2",
    color: "#464646",
  };
};

// Form Styles
const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  border: "1px solid #D4D5D8",
  borderRadius: 8,
  padding: "0 14px",
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "#141414",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: 13,
  color: "#141414",
  marginBottom: 6,
  display: "block",
};

const saveButtonStyle: React.CSSProperties = {
  marginTop: "auto",
  alignSelf: "center",
  width: "100%",
  height: 48,
  borderRadius: 12,
  border: "none",
  background: "rgba(0, 35, 111, 1)",
  color: "#fff",
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  boxSizing: "border-box",
};

// Dropdown Helper Styles
const filterButtonStyle = (isActive: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: isActive ? "1px solid var(--Foundation-brand-brand-500, #00236F)" : "1px solid #D4D5D8",
  borderRadius: 12,
  padding: "0 12px",
  height: 40,
  gap: 8,
  background: isActive ? "#E6E9F1" : "transparent",
  cursor: "pointer",
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "#4B5563",
  boxSizing: "border-box",
  flexShrink: 0,
  whiteSpace: "nowrap",
});

const dropdownMenuContainerStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  zIndex: 1000,
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)",
  display: "flex",
  flexDirection: "column",
  padding: "8px 0",
  minWidth: 180,
  border: "1px solid rgba(212, 213, 216, 1)",
};

const dropdownItemStyle = (isSelected: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 16px",
  cursor: "pointer",
  background: isSelected ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
  transition: "background 0.2s ease",
});

const checkboxStyle = (isSelected: boolean): React.CSSProperties => ({
  width: 16,
  height: 16,
  borderRadius: 4,
  border: isSelected ? "5px solid rgba(0, 35, 111, 1)" : "2px solid rgba(212, 213, 216, 1)",
  boxSizing: "border-box",
  background: "#fff",
  flexShrink: 0,
});

const radioStyle = (isSelected: boolean): React.CSSProperties => ({
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: isSelected ? "5px solid rgba(0, 35, 111, 1)" : "2px solid rgba(212, 213, 216, 1)",
  boxSizing: "border-box",
  background: "#fff",
  flexShrink: 0,
});

const dropdownItemTextStyle = (isSelected: boolean): React.CSSProperties => ({
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  fontWeight: isSelected ? 500 : 400,
  color: isSelected ? "rgba(0, 35, 111, 1)" : "rgba(70, 70, 70, 1)",
  userSelect: "none",
  whiteSpace: "nowrap",
});

// Format conversions
const formatDateToDisplay = (dateStr: string) => {
  if (!dateStr) return "";
  if (dateStr.includes("-")) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }
  return dateStr;
};

const formatDateToInput = (displayStr: string) => {
  if (!displayStr) return "";
  if (displayStr.includes("/")) {
    const [day, month, year] = displayStr.split("/");
    return `${year}-${month}-${day}`;
  }
  return displayStr;
};

const Companies = () => {
  const { t } = useTranslation();
  const COL_HEADERS = [
    t("companies.colCompanyName"),
    t("companies.colOwner"),
    t("companies.colSector"),
    t("companies.colPlan"),
    t("companies.colStatus"),
    t("companies.colRenewal"),
    t("companies.colSalesCount"),
    t("companies.colActions"),
  ];
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  type DatePreset =
    | "Today"
    | "Yesterday"
    | "This week"
    | "Last week"
    | "This month"
    | "Last month"
    | "This year"
    | null;
  const [selectedRenewalPreset, setSelectedRenewalPreset] = useState<DatePreset>(null);
  const [selectedRenewalStart, setSelectedRenewalStart] = useState<string>("");
  const [selectedRenewalEnd, setSelectedRenewalEnd] = useState<string>("");
  const [selectedSalesFrom, setSelectedSalesFrom] = useState<number | null>(null);
  const [selectedSalesTo, setSelectedSalesTo] = useState<number | null>(null);
  const [sortQuery, setSortQuery] = useState<string>("newest");

  // Dropdown UI state
  type ActiveFilter = 'sector' | 'plan' | 'status' | 'renewal' | 'salesCount' | 'sort' | null;
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);

  // Form input states
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyOwner, setNewCompanyOwner] = useState("");
  const [newCompanySector, setNewCompanySector] = useState("Real estate");
  const [newCompanyPlan, setNewCompanyPlan] = useState("Plan 1");
  const [newCompanyStatus, setNewCompanyStatus] = useState("Active");
  const [newCompanyRenewalDate, setNewCompanyRenewalDate] = useState("");
  const [newCompanySalesCount, setNewCompanySalesCount] = useState<number | "">("");

  const [editCompanyName, setEditCompanyName] = useState("");
  const [editCompanyOwner, setEditCompanyOwner] = useState("");
  const [editCompanySector, setEditCompanySector] = useState("Real estate");
  const [editCompanyPlan, setEditCompanyPlan] = useState("Plan 1");

  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [pausingCompany, setPausingCompany] = useState<any>(null);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [deactivatingCompany, setDeactivatingCompany] = useState<any>(null);
  const [isPlanInfoOpen, setIsPlanInfoOpen] = useState(false);
  const [selectedPlanForInfo, setSelectedPlanForInfo] = useState<string>("");
  const [editCompanyStatus, setEditCompanyStatus] = useState("Active");
  const [editCompanyRenewalDate, setEditCompanyRenewalDate] = useState("");
  const [editCompanySalesCount, setEditCompanySalesCount] = useState<number>(0);

  // Notification states
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notifiedCompany, setNotifiedCompany] = useState<any>(null);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState<any | null>(null);

  // Refs for closing dropdowns when clicking outside
  const sectorRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const renewalRef = useRef<HTMLDivElement>(null);
  const salesCountRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const actionMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (activeFilter) {
        let clickedInside = false;
        if (activeFilter === 'sector' && sectorRef.current?.contains(target)) clickedInside = true;
        if (activeFilter === 'plan' && planRef.current?.contains(target)) clickedInside = true;
        if (activeFilter === 'status' && statusRef.current?.contains(target)) clickedInside = true;
        if (activeFilter === 'renewal' && renewalRef.current?.contains(target)) clickedInside = true;
        if (activeFilter === 'salesCount' && salesCountRef.current?.contains(target)) clickedInside = true;
        if (activeFilter === 'sort' && sortRef.current?.contains(target)) clickedInside = true;

        if (!clickedInside) {
          setActiveFilter(null);
        }
      }

      if (openActionMenu !== null) {
        const ref = actionMenuRefs.current[openActionMenu];
        if (ref && !ref.contains(target)) {
          setOpenActionMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeFilter, openActionMenu]);

  // Handlers for Filters
  const handleToggleSector = (sector: string) => {
    setSelectedSectors(prev =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
    setCurrentPage(1);
  };

  const handleTogglePlan = (plan: string) => {
    setSelectedPlans(prev =>
      prev.includes(plan) ? prev.filter(p => p !== plan) : [...prev, plan]
    );
    setCurrentPage(1);
  };

  const handleToggleStatus = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSectors([]);
    setSelectedPlans([]);
    setSelectedStatuses([]);
    setSelectedRenewalPreset(null);
    setSelectedRenewalStart("");
    setSelectedRenewalEnd("");
    setSelectedSalesFrom(null);
    setSelectedSalesTo(null);
    setSortQuery("newest");
    setCurrentPage(1);
    setActiveFilter(null);
  };

  // Submit handlers
  const handleCreateCompanySubmit = () => {
    if (!newCompanyName.trim() || !newCompanyOwner.trim() || !newCompanyRenewalDate || newCompanySalesCount === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    const newComp = {
      id: Math.random().toString(),
      name: newCompanyName,
      owner: newCompanyOwner,
      sector: newCompanySector,
      plan: newCompanyPlan,
      status: newCompanyStatus,
      renewalDate: formatDateToDisplay(newCompanyRenewalDate),
      salesCount: Number(newCompanySalesCount),
    };
    setCompanies([newComp, ...companies]);
    setIsCreateOpen(false);

    // Reset fields
    setNewCompanyName("");
    setNewCompanyOwner("");
    setNewCompanySector("Real estate");
    setNewCompanyPlan("Premium");
    setNewCompanyStatus("Active");
    setNewCompanyRenewalDate("");
    setNewCompanySalesCount("");

    toast.success("Company created successfully!");
  };

  const handleEditCompanySubmit = () => {
    if (!editCompanyName.trim() || !editCompanyOwner.trim() || !editCompanyRenewalDate) {
      toast.error("Please fill in all fields.");
      return;
    }
    setCompanies(prev =>
      prev.map(c =>
        c.id === editingCompany.id
          ? {
            ...c,
            name: editCompanyName,
            owner: editCompanyOwner,
            sector: editCompanySector,
            plan: editCompanyPlan,
            status: editCompanyStatus,
            renewalDate: formatDateToDisplay(editCompanyRenewalDate),
            salesCount: Number(editCompanySalesCount),
          }
          : c
      )
    );
    setIsEditOpen(false);
    toast.success("Company details updated successfully!");
  };

  const handleStartEdit = (company: any) => {
    setEditingCompany(company);
    setEditCompanyName(company.name);
    setEditCompanyOwner(company.owner);
    setEditCompanySector(company.sector);
    setEditCompanyPlan(company.plan);
    setEditCompanyStatus(company.status);
    setEditCompanyRenewalDate(formatDateToInput(company.renewalDate));
    setEditCompanySalesCount(company.salesCount);
    setIsEditOpen(true);
    setOpenActionMenu(null);
  };

  const handleDeactivate = (company: any) => {
    setDeactivatingCompany(company);
    setIsDeactivateOpen(true);
    setOpenActionMenu(null);
  };

  const handleConfirmDeactivate = () => {
    if (deactivatingCompany) {
      setCompanies(prev => prev.filter(c => c.id !== deactivatingCompany.id));
      toast.success("Company archived successfully!");
      setIsDeactivateOpen(false);
      setDeactivatingCompany(null);
    }
  };
  const handleExportCompanies = () => {
    toast.success("Companies exported successfully!");
  };

  const handlePausePlan = (company: any) => {
    setPausingCompany(company);
    setIsPauseOpen(true);
    setOpenActionMenu(null);
  };

  const handleConfirmPausePlan = () => {
    if (pausingCompany) {
      setCompanies(prev =>
        prev.map(c =>
          c.id === pausingCompany.id
            ? { ...c, status: "Paused" }
            : c
        )
      );
      toast.success("Plan paused successfully!");
      setIsPauseOpen(false);
      setPausingCompany(null);
    }
  };

  const handleSendNotificationSubmit = () => {
    if (!notificationMessage.trim()) {
      toast.error("Please enter a message.");
      return;
    }
    toast.success(`Notification sent to ${notifiedCompany.owner}!`);
    setIsSendNotificationOpen(false);
    setNotificationMessage("");
  };

  // Filter and sort computation
  const parseRenewalDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  const isDateInPreset = (date: Date, preset: DatePreset): boolean => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const companyDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (preset === "Today") {
      return companyDay.getTime() === today.getTime();
    }
    if (preset === "Yesterday") {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return companyDay.getTime() === yesterday.getTime();
    }
    if (preset === "This week") {
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return companyDay >= startOfWeek && companyDay <= endOfWeek;
    }
    if (preset === "Last week") {
      const dayOfWeek = today.getDay();
      const startOfLastWeek = new Date(today);
      startOfLastWeek.setDate(today.getDate() - dayOfWeek - 7);
      const endOfLastWeek = new Date(startOfLastWeek);
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
      return companyDay >= startOfLastWeek && companyDay <= endOfLastWeek;
    }
    if (preset === "This month") {
      return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
    }
    if (preset === "Last month") {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth();
    }
    if (preset === "This year") {
      return date.getFullYear() === today.getFullYear();
    }
    return true;
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.plan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(company.sector);
    const matchesPlan = selectedPlans.length === 0 || selectedPlans.includes(company.plan);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(company.status);

    let matchesRenewal = true;
    if (selectedRenewalPreset || selectedRenewalStart || selectedRenewalEnd) {
      const d = parseRenewalDate(company.renewalDate);
      if (!d) {
        matchesRenewal = false;
      } else {
        if (selectedRenewalStart) {
          const start = new Date(selectedRenewalStart);
          const compDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          const startDateVal = new Date(start.getFullYear(), start.getMonth(), start.getDate());
          if (compDate < startDateVal) matchesRenewal = false;
        }
        if (selectedRenewalEnd) {
          const end = new Date(selectedRenewalEnd);
          const compDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          const endDateVal = new Date(end.getFullYear(), end.getMonth(), end.getDate());
          if (compDate > endDateVal) matchesRenewal = false;
        }
        if (selectedRenewalPreset) {
          matchesRenewal = matchesRenewal && isDateInPreset(d, selectedRenewalPreset);
        }
      }
    }

    let matchesSales = true;
    if (selectedSalesFrom !== null) {
      if (company.salesCount < selectedSalesFrom * 1000000) matchesSales = false;
    }
    if (selectedSalesTo !== null) {
      if (company.salesCount > selectedSalesTo * 1000000) matchesSales = false;
    }

    return matchesSearch && matchesSector && matchesPlan && matchesStatus && matchesRenewal && matchesSales;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortQuery === "a-z") {
      return a.name.localeCompare(b.name);
    }
    if (sortQuery === "z-a") {
      return b.name.localeCompare(a.name);
    }
    if (sortQuery === "newest") {
      const parseDate = (dStr: string) => {
        const [day, month, year] = dStr.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };
      return parseDate(b.renewalDate) - parseDate(a.renewalDate);
    }
    if (sortQuery === "oldest") {
      const parseDate = (dStr: string) => {
        const [day, month, year] = dStr.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };
      return parseDate(a.renewalDate) - parseDate(b.renewalDate);
    }
    if (sortQuery === "sales-desc") {
      return b.salesCount - a.salesCount;
    }
    if (sortQuery === "sales-asc") {
      return a.salesCount - b.salesCount;
    }
    return 0;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage) || 1;
  const paginatedCompanies = sortedCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (selectedCompanyDetails) {
    return (
      <CompanyDetails
        company={selectedCompanyDetails}
        onBack={() => setSelectedCompanyDetails(null)}
        onEdit={(updatedCompany: any) => {
          setCompanies(prev => prev.map(c => c.id === updatedCompany.id ? updatedCompany : c));
          setSelectedCompanyDetails(updatedCompany);
          toast.success("Company details updated successfully!");
        }}
        onDelete={() => {
          if (window.confirm("Are you sure you want to archive this company?")) {
            setCompanies(prev => prev.filter(c => c.id !== selectedCompanyDetails.id));
            toast.success("Company archived successfully!");
            setSelectedCompanyDetails(null);
          }
        }}
        onExport={handleExportCompanies}
      />
    );
  }

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
            display: "flex",
            alignItems: "center",
          }}
        >
          {t("companies.title")}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setIsCreateOpen(true)}
            style={{
              borderRadius: 12,
              background: "var(--Foundation-brand-brand-500, #00236F)",
              display: "flex",
              height: 48,
              padding: "8px 24px",
              justifyContent: "center",
              alignItems: "center",
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
            {t("companies.createCompany")}
          </button>

          <button
            onClick={handleExportCompanies}
            style={{
              borderRadius: 12,
              border: "1px solid var(--Foundation-brand-brand-500, #00236F)",
              display: "flex",
              height: 48,
              padding: "8px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              color: "var(--Foundation-brand-brand-500, #00236F)",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <Download size={20} color="var(--Foundation-brand-brand-500, #00236F)" />
            {t("companies.exportCompanies")}
          </button>
        </div>
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
        <div className="filter-bar-left" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* Search box */}
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
              width: 300,
              boxSizing: "border-box",
              flexShrink: 0,
              marginRight: 8,
            }}
          >
            <img src={filterIcon} alt="filter" width={24} height={24} />
            <input
              type="text"
              placeholder={t("companies.searchPlaceholder")}
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

          {/* Business sector filter */}
          <div style={{ position: "relative" }} ref={sectorRef}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'sector' ? null : 'sector')}
              onMouseEnter={() => setHoveredFilter('sector')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                gap: 8,
                background: hoveredFilter === 'sector' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t("companies.sectorFilter")}
              {selectedSectors.length > 0 ? (
                <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: 2, boxSizing: "border-box", fontSize: 11, color: "#141414", fontWeight: 600 }}>
                  {selectedSectors.length}
                </div>
              ) : activeFilter === 'sector' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'sector' && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000 }}>
                <BusinessSectorFilter
                  options={[
                    { label: "Real estate", count: companies.filter(c => c.sector === "Real estate").length },
                    { label: "Technology", count: companies.filter(c => c.sector === "Technology").length },
                    { label: "Healthcare", count: companies.filter(c => c.sector === "Healthcare").length },
                    { label: "Finance", count: companies.filter(c => c.sector === "Finance").length },
                    { label: "Retail", count: companies.filter(c => c.sector === "Retail").length },
                    { label: "Manufacturing", count: companies.filter(c => c.sector === "Manufacturing").length },
                  ]}
                  initialSelected={selectedSectors}
                  onApply={(sectors) => {
                    setSelectedSectors(sectors);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClear={() => {
                    setSelectedSectors([]);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClose={() => setActiveFilter(null)}
                />
              </div>
            )}
          </div>

          {/* Plan filter */}
          <div style={{ position: "relative" }} ref={planRef}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'plan' ? null : 'plan')}
              onMouseEnter={() => setHoveredFilter('plan')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                gap: 8,
                background: hoveredFilter === 'plan' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              {t("companies.planFilter")}
              {selectedPlans.length > 0 ? (
                <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: 2, boxSizing: "border-box", fontSize: 11, color: "#141414", fontWeight: 600 }}>
                  {selectedPlans.length}
                </div>
              ) : activeFilter === 'plan' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'plan' && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000 }}>
                <PlanFilter
                  options={[
                    { id: 1, label: "Plan 1", count: companies.filter(c => c.plan === "Plan 1").length },
                    { id: 2, label: "Plan 2", count: companies.filter(c => c.plan === "Plan 2").length },
                    { id: 3, label: "Custom plan", count: companies.filter(c => c.plan === "Custom plan").length },
                  ]}
                  initialSelected={
                    selectedPlans.includes("Plan 1")
                      ? 1
                      : selectedPlans.includes("Plan 2")
                        ? 2
                        : selectedPlans.includes("Custom plan")
                          ? 3
                          : null
                  }
                  onApply={(selectedId) => {
                    if (selectedId === 1) setSelectedPlans(["Plan 1"]);
                    else if (selectedId === 2) setSelectedPlans(["Plan 2"]);
                    else if (selectedId === 3) setSelectedPlans(["Custom plan"]);
                    else setSelectedPlans([]);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClear={() => {
                    setSelectedPlans([]);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          </div>

          {/* Status filter */}
          <div style={{ position: "relative" }} ref={statusRef}>
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
              {t("companies.statusFilter")}
              {selectedStatuses.length > 0 ? (
                <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: 2, boxSizing: "border-box", fontSize: 11, color: "#141414", fontWeight: 600 }}>
                  {selectedStatuses.length}
                </div>
              ) : activeFilter === 'status' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'status' && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000 }}>
                <Status
                  counts={{
                    ACTIVE: companies.filter(c => c.status === "Active").length,
                    EXPIRED: companies.filter(c => c.status === "Expired").length,
                    PAUSED: companies.filter(c => c.status === "Paused").length,
                    DEACTIVATED: companies.filter(c => c.status === "Deactivated").length,
                  }}
                  initialSelected={
                    selectedStatuses.includes("Active")
                      ? "ACTIVE"
                      : selectedStatuses.includes("Expired")
                        ? "EXPIRED"
                        : selectedStatuses.includes("Paused")
                          ? "PAUSED"
                          : selectedStatuses.includes("Deactivated")
                            ? "DEACTIVATED"
                            : null
                  }
                  onApply={(selectedApiKey) => {
                    if (selectedApiKey === "ACTIVE") setSelectedStatuses(["Active"]);
                    else if (selectedApiKey === "EXPIRED") setSelectedStatuses(["Expired"]);
                    else if (selectedApiKey === "PAUSED") setSelectedStatuses(["Paused"]);
                    else if (selectedApiKey === "DEACTIVATED") setSelectedStatuses(["Deactivated"]);
                    else setSelectedStatuses([]);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClear={() => {
                    setSelectedStatuses([]);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClose={() => setActiveFilter(null)}
                />
              </div>
            )}
          </div>

          {/* Renewal date filter */}
          <div style={{ position: "relative" }} ref={renewalRef}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'renewal' ? null : 'renewal')}
              onMouseEnter={() => setHoveredFilter('renewal')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                gap: 8,
                background: hoveredFilter === 'renewal' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t("companies.renewalFilter")}
              {(selectedRenewalPreset || selectedRenewalStart || selectedRenewalEnd) ? (
                <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: 2, boxSizing: "border-box", fontSize: 11, color: "#141414", fontWeight: 600 }}>
                  1
                </div>
              ) : activeFilter === 'renewal' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'renewal' && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000 }}>
                <DateFilter
                  dateCounts={{
                    today: companies.filter(c => {
                      const d = parseRenewalDate(c.renewalDate);
                      return d ? isDateInPreset(d, "Today") : false;
                    }).length,
                    yesterday: companies.filter(c => {
                      const d = parseRenewalDate(c.renewalDate);
                      return d ? isDateInPreset(d, "Yesterday") : false;
                    }).length,
                    thisWeek: companies.filter(c => {
                      const d = parseRenewalDate(c.renewalDate);
                      return d ? isDateInPreset(d, "This week") : false;
                    }).length,
                    lastWeek: companies.filter(c => {
                      const d = parseRenewalDate(c.renewalDate);
                      return d ? isDateInPreset(d, "Last week") : false;
                    }).length,
                    thisMonth: companies.filter(c => {
                      const d = parseRenewalDate(c.renewalDate);
                      return d ? isDateInPreset(d, "This month") : false;
                    }).length,
                    lastMonth: companies.filter(c => {
                      const d = parseRenewalDate(c.renewalDate);
                      return d ? isDateInPreset(d, "Last month") : false;
                    }).length,
                    thisYear: companies.filter(c => {
                      const d = parseRenewalDate(c.renewalDate);
                      return d ? isDateInPreset(d, "This year") : false;
                    }).length,
                  }}
                  initialPreset={selectedRenewalPreset}
                  initialStartDate={selectedRenewalStart}
                  initialEndDate={selectedRenewalEnd}
                  onApply={(data) => {
                    setSelectedRenewalPreset(data.preset);
                    setSelectedRenewalStart(data.startDate);
                    setSelectedRenewalEnd(data.endDate);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClear={() => {
                    setSelectedRenewalPreset(null);
                    setSelectedRenewalStart("");
                    setSelectedRenewalEnd("");
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClose={() => setActiveFilter(null)}
                />
              </div>
            )}
          </div>

          {/* Sales count filter */}
          <div style={{ position: "relative" }} ref={salesCountRef}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'salesCount' ? null : 'salesCount')}
              onMouseEnter={() => setHoveredFilter('salesCount')}
              onMouseLeave={() => setHoveredFilter(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #D4D5D8",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                gap: 8,
                background: hoveredFilter === 'salesCount' ? "#E6E9F1" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {t("companies.salesFilter")}
              {(selectedSalesFrom !== null || selectedSalesTo !== null) ? (
                <div style={{ background: "#B0BBD2", width: 20, height: 22, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: 2, boxSizing: "border-box", fontSize: 11, color: "#141414", fontWeight: 600 }}>
                  1
                </div>
              ) : activeFilter === 'salesCount' ? (
                <ChevronUp size={16} color="#4B5563" />
              ) : (
                <ChevronDown size={16} color="#4B5563" />
              )}
            </button>
            {activeFilter === 'salesCount' && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000 }}>
                <SalesFilter
                  initialFrom={selectedSalesFrom}
                  initialTo={selectedSalesTo}
                  min={0}
                  max={100}
                  onApply={(from, to) => {
                    setSelectedSalesFrom(from);
                    setSelectedSalesTo(to);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClear={() => {
                    setSelectedSalesFrom(null);
                    setSelectedSalesTo(null);
                    setActiveFilter(null);
                    setCurrentPage(1);
                  }}
                  onClose={() => setActiveFilter(null)}
                />
              </div>
            )}
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
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
            {t("companies.resetFilters")}
          </button>
        </div>

        {/* Sort by */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="filter-bar-right" style={{ position: "relative" }} ref={sortRef}>
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
              {t("companies.sortBy")}
              <ArrowDownUp size={16} color="#4B5563" />
            </button>
            {activeFilter === 'sort' && (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 1000 }}>
                <Sort
                  isOpen={true}
                  defaultValue={sortQuery}
                  onApply={(selectedValue) => {
                    setSortQuery(selectedValue);
                    setCurrentPage(1);
                  }}
                  onClose={() => setActiveFilter(null)}
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
              "Company name": 220,
              "Owner": 160,
              "Business sector": 140,
              "Plan": 110,
              "Subscription status": 160,
              "Renewal date": 120,
              "Sales count": 120,
              "Actions": 70,
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
          {paginatedCompanies.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center", fontFamily: "Inter, sans-serif", color: "#4B5563" }}>
              No companies match your filters.
            </div>
          ) : (
            paginatedCompanies.map((company, i) => (
              <div
                key={company.id}
                className="responsive-table-row"
                onClick={() => setSelectedCompanyDetails(company)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 12px",
                  boxSizing: "border-box",
                  height: 56,
                  borderBottom: i < paginatedCompanies.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                {/* Company name */}
                <div style={{ width: 220, flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#141414", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {company.name}
                </div>

                {/* Owner */}
                <div style={{ width: 160, flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {company.owner}
                </div>

                {/* Business sector */}
                <div style={{ width: 140, flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {company.sector}
                </div>

                {/* Plan */}
                <div style={{ width: 110, flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      color: "var(--Foundation-neutral-neutral-800, #464646)",
                      fontFamily: "Inter",
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "140%",
                      width: "82px",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {company.plan}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{ width: "20px", height: "20px", flexShrink: 0, cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanForInfo(company.plan);
                      setIsPlanInfoOpen(true);
                    }}
                  >
                    <path
                      d="M10 10L10 13.75M10 7.22046V7.1875M2.5 10C2.5 5.85786 5.85787 2.5 10 2.5C14.1421 2.5 17.5 5.85787 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10Z"
                      stroke="#464646"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Subscription status */}
                <div style={{ width: 160, flexShrink: 0 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: getStatusStyle(company.status).bg,
                      color: getStatusStyle(company.status).color,
                      borderRadius: 12,
                      padding: "4px 12px",
                      height: 26,
                      boxSizing: "border-box",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    {company.status}
                  </span>
                </div>

                {/* Renewal date */}
                <div style={{ width: 120, flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                  {company.renewalDate}
                </div>

                {/* Sales count */}
                <div style={{ width: 120, flexShrink: 0, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                  {company.salesCount}
                </div>

                {/* Actions */}
                <div
                  style={{ width: 70, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
                  ref={(el) => { actionMenuRefs.current[i] = el; }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ cursor: "pointer", flexShrink: 0 }}
                    onClick={(e) => { e.stopPropagation(); setOpenActionMenu(openActionMenu === i ? null : i); }}
                  >
                    <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" fill="#464646" />
                  </svg>

                  {/* Dropdown Menu */}
                  {openActionMenu === i && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: "absolute",
                        top: 32,
                        right: 0,
                        zIndex: 10,
                        borderRadius: 12,
                        background: "var(--Foundation-neutral-white, #FFF)",
                        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.17)",
                        display: "inline-flex",
                        flexDirection: "column",
                        padding: 12,
                        alignItems: "flex-start",
                        gap: 4
                      }}
                    >
                      {/* Plan settings */}
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        onClick={() => handleStartEdit(company)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M14.3466 13.1322L12.0009 10.8L9.54662 13.2426M12.0009 10.8V16.8M2.40093 17.5408L2.40102 8.41649C2.40102 7.50257 2.40068 6.20083 2.40039 5.25829C2.40019 4.59537 2.93752 4.05859 3.60044 4.05859H9.31865L12.0837 7.01223H20.4C21.0627 7.01223 21.6 7.54951 21.6 8.21227L21.5997 17.5409C21.5996 18.8664 20.5251 19.9409 19.1997 19.9409L4.80092 19.9408C3.47543 19.9408 2.40091 18.8663 2.40093 17.5408Z" stroke="#464646" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, color: "var(--Foundation-neutral-neutral-950, #141414)", whiteSpace: "nowrap" }}>
                          Plan settings
                        </span>
                      </div>

                      {/* Send Notification */}
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        onClick={() => {
                          setNotifiedCompany(company);
                          setIsSendNotificationOpen(true);
                          setOpenActionMenu(null);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M9.33333 20.0909C10.041 20.6562 10.9755 21 12 21C13.0245 21 13.959 20.6562 14.6667 20.0909M4.50763 17.1818C4.08602 17.1818 3.85054 16.5194 4.10557 16.1514C4.69736 15.2975 5.26855 14.0451 5.26855 12.537L5.29296 10.3517C5.29296 6.29145 8.29581 3 12 3C15.7588 3 18.8058 6.33993 18.8058 10.4599L18.7814 12.537C18.7814 14.0555 19.3329 15.3147 19.9006 16.169C20.1458 16.5379 19.9006 17.1818 19.4933 17.1818H4.50763Z" stroke="#464646" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, color: "var(--Foundation-neutral-neutral-950, #141414)", whiteSpace: "nowrap" }}>
                          Send Notification
                        </span>
                      </div>

                      {/* Pause plan */}
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        onClick={() => handlePausePlan(company)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M17.625 3H6.375C4.51104 3 3 4.51104 3 6.375V17.625C3 19.489 4.51104 21 6.375 21H17.625C19.489 21 21 19.489 21 17.625V6.375C21 4.51104 19.489 3 17.625 3Z" stroke="#A80D0B" strokeWidth={2} strokeLinejoin="round" />
                          <path d="M8.625 9.89062C8.625 9.19164 9.19164 8.625 9.89062 8.625H14.1094C14.8084 8.625 15.375 9.19164 15.375 9.89062V14.1094C15.375 14.8084 14.8084 15.375 14.1094 15.375H9.89062C9.19164 15.375 8.625 14.8084 8.625 14.1094V9.89062Z" stroke="#A80D0B" strokeWidth={2} strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, color: "var(--Foundation-error-red-700, #A80D0B)", whiteSpace: "nowrap" }}>
                          Pause plan
                        </span>
                      </div>

                      {/* Deactivate */}
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", cursor: "pointer", width: "100%", boxSizing: "border-box", borderRadius: 8 }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#F3F4F6"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        onClick={() => handleDeactivate(company)}
                      >
                        <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                            <path d="M1 4.17647H17M7 14.7647V8.41177M11 14.7647V8.41177M13 19H5C3.89543 19 3 18.0519 3 16.8824V5.23529C3 4.65052 3.44772 4.17647 4 4.17647H14C14.5523 4.17647 15 4.65052 15 5.23529V16.8824C15 18.0519 14.1046 19 13 19ZM7 4.17647H11C11.5523 4.17647 12 3.70242 12 3.11765V2.05882C12 1.47405 11.5523 1 11 1H7C6.44772 1 6 1.47405 6 2.05882V3.11765C6 3.70242 6.44772 4.17647 7 4.17647Z" stroke="#A80D0B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, color: "var(--Foundation-error-red-700, #A80D0B)", whiteSpace: "nowrap" }}>
                          Deactivate
                        </span>
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* ── Create Modal ── */}
      {isCreateOpen && (
        <ModalOverlay onClose={() => setIsCreateOpen(false)}>
          <CreateCompany
            onClose={() => setIsCreateOpen(false)}
            onSubmit={() => {
              setIsCreateOpen(false);
              toast.success("Company created successfully!");
            }}
          />
        </ModalOverlay>
      )}

      {/* ── Plan Settings Modal ── */}
      {isEditOpen && editingCompany && (
        <ModalOverlay onClose={() => setIsEditOpen(false)}>
          <PlanSetting
            company={editingCompany}
            onClose={() => setIsEditOpen(false)}
            onSave={(updatedCompany) => {
              setCompanies(prev => prev.map(c => c.id === updatedCompany.id ? updatedCompany : c));
              setIsEditOpen(false);
              toast.success("Plan settings updated successfully!");
            }}
          />
        </ModalOverlay>
      )}

      {/* ── Send Notification Modal ── */}
      {isSendNotificationOpen && notifiedCompany && (
        <ModalOverlay onClose={() => setIsSendNotificationOpen(false)}>
          <SendNotification
            company={notifiedCompany}
            onClose={() => setIsSendNotificationOpen(false)}
            onSubmit={(title) => {
              toast.success(`Notification "${title}" sent to ${notifiedCompany.owner}!`);
              setIsSendNotificationOpen(false);
            }}
          />
        </ModalOverlay>
      )}

      {/* ── Pause Plan Modal ── */}
      {isPauseOpen && pausingCompany && (
        <ModalOverlay onClose={() => setIsPauseOpen(false)}>
          <PauseCompany
            company={pausingCompany}
            onClose={() => setIsPauseOpen(false)}
            onConfirm={handleConfirmPausePlan}
          />
        </ModalOverlay>
      )}

      {/* ── Deactivate Modal ── */}
      {isDeactivateOpen && deactivatingCompany && (
        <ModalOverlay onClose={() => setIsDeactivateOpen(false)}>
          <Deactivate
            company={deactivatingCompany}
            onClose={() => setIsDeactivateOpen(false)}
            onConfirm={handleConfirmDeactivate}
          />
        </ModalOverlay>
      )}

      {/* ── Plan Info Modal ── */}
      {isPlanInfoOpen && selectedPlanForInfo && (
        <ModalOverlay onClose={() => setIsPlanInfoOpen(false)}>
          <PlanInfo
            planName={selectedPlanForInfo}
            onClose={() => setIsPlanInfoOpen(false)}
          />
        </ModalOverlay>
      )}
    </div>
  );
};

export default Companies;
