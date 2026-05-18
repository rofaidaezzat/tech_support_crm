import React, { useState } from 'react';
import { Plus, ChevronDown, ArrowDownUp } from 'lucide-react';
import '../styles/tables-mobile.css';
import filterIcon from '../assets/filter.svg';
import starsIcon from '../assets/stars.svg';
import whatsappIcon from '../assets/ic_baseline-whatsapp.svg';
import mailIcon from '../assets/message-text-02 (1).svg';
import editPenIcon from '../assets/edit-04.svg';
import Pagination from '../components/Pagination';
import Add_new_deal from '../components/Deals/Add_new_deal';
import Notes from '../components/Deals/Notes';
import Service_details from '../components/Deals/Service_details';
import EditDealValue from '../components/Deals/EditDealValue';
import Value from '../components/Filteration/Value';
import DateFilter from '../components/Filteration/Date';
import { Sort } from '../components/Filteration/Sort';

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

const Deals = () => {
  const [activeFilter, setActiveFilter] = useState<'date' | 'value' | 'sort' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);
  const [isEditDealValueOpen, setIsEditDealValueOpen] = useState(false);

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
          Deals
        </div>

        <button
          onClick={() => setIsAddDealOpen(true)}
          style={{
            background: "rgba(0, 35, 111, 1)",
            width: 149,
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
          Add Deal
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
              onClick={() => setActiveFilter(activeFilter === 'date' ? null : 'date')}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                gap: 8,
                background: activeFilter === 'date' ? "rgba(0, 35, 111, 0.06)" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Date
              <ChevronDown size={16} color="#4B5563" />
            </button>
            {activeFilter === 'date' && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 500, marginTop: 4 }}>
                <DateFilter onClose={() => setActiveFilter(null)} onApply={() => setActiveFilter(null)} />
              </div>
            )}
          </div>

          {/* Value dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setActiveFilter(activeFilter === 'value' ? null : 'value')}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(212, 213, 216, 1)",
                borderRadius: 12,
                padding: "0 12px",
                height: 40,
                gap: 8,
                background: activeFilter === 'value' ? "rgba(0, 35, 111, 0.06)" : "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#4B5563",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              Value
              <ChevronDown size={16} color="#4B5563" />
            </button>
            {activeFilter === 'value' && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 500, marginTop: 4 }}>
                <Value onApply={() => setActiveFilter(null)} onClear={() => setActiveFilter(null)} />
              </div>
            )}
          </div>
        </div>

        {/* Sort by button (Right group) */}
        <div className="filter-bar-right" style={{ position: "relative" }}>
          <button
            onClick={() => setActiveFilter(activeFilter === 'sort' ? null : 'sort')}
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
              background: activeFilter === 'sort' ? "rgba(0, 35, 111, 0.06)" : "transparent",
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
            <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 500, marginTop: 4 }}>
              <Sort isOpen={true} onClose={() => setActiveFilter(null)} onApply={() => setActiveFilter(null)} />
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
            padding: "0 12px",
            boxSizing: "border-box",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            justifyContent: "space-between",
          }}
        >
          {[
            { label: "Date",          width: 70   },
            { label: "Customer Info", width: 146  },
            { label: "Phone number",  width: 99   },
            { label: "City",          width: 99   },
            { label: "Deal details",  width: 152  },
            { label: "Value (EGP)",   width: 108  },
            { label: "Actions",       width: 66   },
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
                display: label === "Actions" ? "flex" : "block",
                justifyContent: label === "Actions" ? "center" : "flex-start",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div style={{ width: "100%", background: "#fff" }}>
          {[
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
            { date: "04/11/2026", name: "John Dorghamasadsad", company: "Elshayeeb inc.", phone: "+20112170891", city: "Alexandria", value: "120,000,000" },
          ].map((deal, i, arr) => (
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
                borderBottom: i < arr.length - 1 ? "1px solid rgba(237, 239, 242, 1)" : "none",
                justifyContent: "space-between",
              }}
            >
              {/* Date */}
              <div
                style={{
                  width: 70,
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: "140%",
                  letterSpacing: 0,
                  color: "#4B5563",
                }}
              >
                {deal.date}
              </div>

              {/* Customer Info */}
              <div style={{ width: 146, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "140%",
                    letterSpacing: 0,
                    color: "#141414",
                  }}
                >
                  {deal.name}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "140%",
                    letterSpacing: 0,
                    color: "#6B7280",
                  }}
                >
                  {deal.company}
                </span>
              </div>

              {/* Phone number */}
              <div
                style={{
                  width: 99,
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: "140%",
                  letterSpacing: 0,
                  color: "var(--Foundation-neutral-neutral-800, #464646)",
                }}
              >
                {"*******" + deal.phone.slice(-4)}
              </div>

              {/* City */}
              <div
                style={{
                  width: 99,
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: "140%",
                  letterSpacing: 0,
                  color: "#4B5563",
                }}
              >
                {deal.city}
              </div>

              {/* Deal details */}
              <div style={{ width: 152, flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "140%",
                    letterSpacing: 0,
                    color: "rgba(0, 35, 111, 1)",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsServiceDetailsOpen(true)}
                >
                  View Details
                </span>
              </div>

              {/* Value (EGP) */}
              <div style={{ width: 108, flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "140%",
                    letterSpacing: 0,
                    color: "#141414",
                  }}
                >
                  {deal.value}
                </span>
                <img onClick={() => setIsEditDealValueOpen(true)} src={editPenIcon} alt="edit value" width={16} height={16} style={{ cursor: "pointer", opacity: 0.55 }} />
              </div>

              {/* Actions */}
              <div style={{ width: 66, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <img src={whatsappIcon} alt="WhatsApp" width={24} height={24} style={{ cursor: "pointer" }} />
                <img src={mailIcon} alt="Email" width={24} height={24} style={{ cursor: "pointer" }} onClick={() => setIsNotesOpen(true)} />
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
      {isAddDealOpen && (
        <ModalOverlay onClose={() => setIsAddDealOpen(false)}>
          <Add_new_deal onClose={() => setIsAddDealOpen(false)} />
        </ModalOverlay>
      )}
      {isNotesOpen && (
        <ModalOverlay onClose={() => setIsNotesOpen(false)}>
          <Notes onClose={() => setIsNotesOpen(false)} />
        </ModalOverlay>
      )}
      {isServiceDetailsOpen && (
        <ModalOverlay onClose={() => setIsServiceDetailsOpen(false)}>
          <Service_details onClose={() => setIsServiceDetailsOpen(false)} />
        </ModalOverlay>
      )}
      {isEditDealValueOpen && (
        <ModalOverlay onClose={() => setIsEditDealValueOpen(false)}>
          <EditDealValue onClose={() => setIsEditDealValueOpen(false)} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default Deals;
