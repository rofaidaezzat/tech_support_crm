import React, { useState, useRef, useEffect } from 'react';
import { Plus, Filter, Sparkles, ChevronDown, ArrowDownUp } from 'lucide-react';
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
import Notes from '../components/Deals/Notes';
import Leads_messages from '../components/Leads/Leads_messages';

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

const STATUS_OPTIONS = [
  "Fresh",
  "Follow up",
  "Interested",
  "Not interested",
  "Meeting",
  "After meeting followup",
  "Wrong number",
  "No answer",
];

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

const COL_HEADERS = ["Date", "Lead info", "Status", "Phone number", "Message", "Priority", "Lead Source", "Next Followup", "Actions"];

const Leads = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [filterStatusOpen, setFilterStatusOpen] = useState(false);
  const [filterDraftStatus, setFilterDraftStatus] = useState<string[]>([]);
  const [sortStatus, setSortStatus] = useState<"asc" | "desc">("asc");

  // Modal States
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isEditLeadOpen, setIsEditLeadOpen] = useState(false);
  const [isConvertToDealOpen, setIsConvertToDealOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filterStatusRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown !== null) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleStatusChange = (leadIndex: number, newStatus: string) => {
    setLeads((prev) =>
      prev.map((lead, i) => (i === leadIndex ? { ...lead, status: newStatus } : lead))
    );
    setOpenDropdown(null);
  };

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
          Leads
        </div>

        <button
          onClick={() => setIsAddLeadOpen(true)}
          style={{
            background: "rgba(0, 35, 111, 1)",
            width: 154,
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
          Add Lead
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
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
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
           <img src={starsIcon} alt="stars" width={24} height={24} />
          </div>


          {["Date"].map((label) => (
            <button
              key={label}
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
              }}
            >
              {label}
              <ChevronDown size={16} color="#4B5563" />
            </button>
          ))}

          {/* Status filter button + modal */}
          <div ref={filterStatusRef} style={{ position: "relative" }}>
            <button
              onClick={() => setFilterStatusOpen((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                gap: 8,
                background: filterStatusOpen ? "rgba(0, 35, 111, 0.06)" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
              }}
            >
              Status
              <ChevronDown size={16} color="#4B5563" />
            </button>

            {filterStatusOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: 322,
                  height: 384,
                  zIndex: 500,
                  background: "rgba(255, 255, 255, 1)",
                  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.17)",
                  borderRadius: 12,
                  paddingTop: 12,
                  paddingRight: 16,
                  paddingBottom: 12,
                  paddingLeft: 16,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Status items */}
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
                  {STATUS_OPTIONS.map((option) => {
                    const isChecked = filterDraftStatus.includes(option);
                    return (
                      <div
                        key={option}
                        onClick={() =>
                          setFilterDraftStatus((prev) =>
                            isChecked ? prev.filter((s) => s !== option) : [...prev, option]
                          )
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "8px 4px",
                          cursor: "pointer",
                          borderRadius: 8,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(237, 239, 242, 1)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        }}
                      >
                        {/* Checkbox square */}
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 2,
                            border: isChecked
                              ? "2px solid rgba(0, 35, 111, 1)"
                              : "2px solid rgba(128, 128, 128, 1)",
                            boxSizing: "border-box",
                            background: isChecked ? "rgba(0, 35, 111, 1)" : "#fff",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 3,
                            marginLeft: 3,
                          }}
                        >
                          {isChecked && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 14,
                            fontWeight: 400,
                            color: "rgba(70, 70, 70, 1)",
                            flex: 1,
                          }}
                        >
                          {option}
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 13,
                            color: "rgba(160, 160, 160, 1)",
                          }}
                        >
                          (200)
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Apply & Cancel buttons */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 12,
                    width: 160,
                    height: 32,
                    alignSelf: "flex-end",
                  }}
                >
                  <button
                    onClick={() => {
                      setFilterDraftStatus([]);
                      setFilterStatusOpen(false);
                    }}
                    style={{
                      width: 72,
                      height: 32,
                      borderRadius: 12,
                      padding: "8px 16px",
                      border: "none",
                      background: "transparent",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(70, 70, 70, 1)",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(237, 239, 242, 1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setFilterStatusOpen(false)}
                    style={{
                      width: 76,
                      height: 32,
                      borderRadius: 12,
                      padding: "8px 16px",
                      border: "none",
                      background: "rgba(0, 35, 111, 1)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#fff",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Priority, Source, Followup buttons */}
          {["Priority", "Source", "Followup"].map((label) => (
            <button
              key={label}
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
              }}
            >
              {label}
              <ChevronDown size={16} color="#4B5563" />
            </button>
          ))}
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(212, 213, 216, 1)",
            borderRadius: 12,
            padding: "0 12px",
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
            padding: "0 24px",
            boxSizing: "border-box",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            gap: 8,
          }}
        >
          {COL_HEADERS.map((col) => (
            <div
              key={col}
              style={{
                flex: col === "Lead info" ? 2 : col === "Actions" ? 1.8 : col === "Status" ? 1.6 : 1,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#141414",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div style={{ width: "100%", background: "#fff" }}>
          {leads.map((lead, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                boxSizing: "border-box",
                height: 72,
                borderBottom: i < leads.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
                gap: 8,
              }}
            >
              {/* Date */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                {lead.date}
              </div>
              {/* Lead info */}
              <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>
                  {lead.name}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>
                  {lead.company}
                </span>
              </div>

              {/* Status with dropdown */}
              <div
                style={{ flex: 1.6, position: "relative" }}
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
                    padding: "4px 8px",
                    width: 152,
                    height: 26,
                    boxSizing: "border-box",
                    cursor: "pointer",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      lineHeight: "140%",
                      color: "rgba(70, 70, 70, 1)",
                      width: 144,
                      height: 18,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
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
                      top: "calc(100% + 4px)",
                      left: 0,
                      zIndex: 100,
                      background: "rgba(255, 255, 255, 1)",
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.17)",
                      borderRadius: 12,
                      padding: "12px 0",
                      minWidth: 260,
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
                          padding: "10px 20px",
                          cursor: "pointer",
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
                              : "2px solid rgba(180, 180, 180, 1)",
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
                            color: "rgba(70, 70, 70, 1)",
                            flex: 1,
                          }}
                        >
                          {option}
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 13,
                            color: "rgba(160, 160, 160, 1)",
                          }}
                        >
                          (200)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                {lead.phone}
              </div>

              {/* Message icon */}
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <img src={mail04Icon} alt="Message" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsMessagesOpen(true)} />
              </div>
              {/* Priority */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(140, 106, 4, 1)",
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
                    color: "rgba(140, 106, 4, 1)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {lead.priority}
                </span>
              </div>

              {/* Lead Source */}
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(231, 253, 253, 1)",
                    width: 58,
                    height: 24,
                    borderRadius: 12,
                    padding: 4,
                    gap: 8,
                    boxSizing: "border-box",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#0E7490",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {lead.source}
                </span>
              </div>

              {/* Next Followup */}
              <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>
                {lead.followup}
              </div>

              {/* Actions */}
              <div style={{ flex: 1.8, display: "flex", alignItems: "center", gap: 10 }}>
                <img src={whatsappIcon} alt="WhatsApp" width={24} height={24} style={{ cursor: "pointer" }} />
                <img src={mailIcon} alt="Email" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsNotesOpen(true)} />
                <img src={filePlusIcon} alt="Add File" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsLeadFormOpen(true)} />
                <img src={coinIcon} alt="Deal" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsConvertToDealOpen(true)} />
                <img src={editIcon} alt="Edit" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsEditLeadOpen(true)} />
                
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
      {isAddLeadOpen && (
        <ModalOverlay onClose={() => setIsAddLeadOpen(false)}>
          <Add_new_lead onClose={() => setIsAddLeadOpen(false)} />
        </ModalOverlay>
      )}
      {isEditLeadOpen && (
        <ModalOverlay onClose={() => setIsEditLeadOpen(false)}>
          <Edit_lead_info onClose={() => setIsEditLeadOpen(false)} />
        </ModalOverlay>
      )}
      {isConvertToDealOpen && (
        <ModalOverlay onClose={() => setIsConvertToDealOpen(false)}>
          <Convert_to_deal onClose={() => setIsConvertToDealOpen(false)} />
        </ModalOverlay>
      )}
      {isLeadFormOpen && (
        <ModalOverlay onClose={() => setIsLeadFormOpen(false)}>
          <Lead_form onClose={() => setIsLeadFormOpen(false)} />
        </ModalOverlay>
      )}
      {isNotesOpen && (
        <ModalOverlay onClose={() => setIsNotesOpen(false)}>
          <Notes onClose={() => setIsNotesOpen(false)} />
        </ModalOverlay>
      )}
      {isMessagesOpen && (
        <ModalOverlay onClose={() => setIsMessagesOpen(false)}>
          <Leads_messages onClose={() => setIsMessagesOpen(false)} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default Leads;