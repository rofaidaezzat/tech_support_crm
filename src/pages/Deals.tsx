import React, { useState } from 'react';
import { Plus, ChevronDown, ArrowDownUp, Trash2 } from 'lucide-react';
import '../styles/tables-mobile.css';
import filterIcon from '../assets/filter.svg';
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
import { useGetDealsQuery, useDeleteDealMutation, Deal } from '../app/service/cruddeals';
import { toast } from 'sonner';

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("-created_at");

  // Local filter states for client-side filtering
  const [valueFilter, setValueFilter] = useState<{ from: string; to: string } | null>(null);
  const [dateFilter, setDateFilter] = useState<{ startDate: string; endDate: string } | null>(null);

  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);
  const [isEditDealValueOpen, setIsEditDealValueOpen] = useState(false);
  
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // RTK Query hooks
  const { data: dealsResponse, isLoading } = useGetDealsQuery({
    page: currentPage,
    limit: 10,
    search: searchQuery || undefined,
    sort: sortQuery || undefined,
  });

  const [deleteDeal] = useDeleteDealMutation();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this deal?")) {
      return;
    }
    try {
      const res = await deleteDeal(id).unwrap();
      toast.success(res?.message || "Deal deleted successfully");
    } catch (err: any) {
      console.error("Failed to delete deal:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to delete deal.";
      toast.error(errMsg);
    }
  };

  // Extract deals data from response
  const rawDeals = dealsResponse?.data || [];
  const pagination = dealsResponse?.pagination;
  const totalPages = pagination?.totalPages || 1;

  // Apply client-side filters (Value and Date) if set
  const filteredDeals = rawDeals.filter((deal) => {
    // 1. Value Filter
    if (valueFilter) {
      const val = deal.value;
      if (valueFilter.from && val < Number(valueFilter.from)) return false;
      if (valueFilter.to && val > Number(valueFilter.to)) return false;
    }
    // 2. Date Filter
    if (dateFilter) {
      const dealDate = new Date(deal.created_at).getTime();
      if (dateFilter.startDate) {
        const start = new Date(dateFilter.startDate).setHours(0, 0, 0, 0);
        if (dealDate < start) return false;
      }
      if (dateFilter.endDate) {
        const end = new Date(dateFilter.endDate).setHours(23, 59, 59, 999);
        if (dealDate > end) return false;
      }
    }
    return true;
  });

  const handleSortApply = (sortVal: string) => {
    let apiSort = "-created_at";
    if (sortVal === "oldest") apiSort = "created_at";
    else if (sortVal === "newest") apiSort = "-created_at";
    else if (sortVal === "a-z") apiSort = "value";
    else if (sortVal === "z-a") apiSort = "-value";
    
    setSortQuery(apiSort);
    setActiveFilter(null);
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
              placeholder="Filter by details, name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                background: (activeFilter === 'date' || dateFilter) ? "rgba(0, 35, 111, 0.06)" : "transparent",
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
                <DateFilter
                  onClose={() => setActiveFilter(null)}
                  onApply={(data) => {
                    setDateFilter(data);
                    setActiveFilter(null);
                  }}
                />
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
                background: (activeFilter === 'value' || valueFilter) ? "rgba(0, 35, 111, 0.06)" : "transparent",
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
                <Value
                  onApply={(vals) => {
                    setValueFilter(vals);
                    setActiveFilter(null);
                  }}
                  onClear={() => {
                    setValueFilter(null);
                    setActiveFilter(null);
                  }}
                  onClose={() => setActiveFilter(null)}
                />
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
              <Sort
                isOpen={true}
                onClose={() => setActiveFilter(null)}
                onApply={handleSortApply}
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
            { label: "Actions",       width: 100   },
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
          {isLoading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#6B7280" }}>Loading deals...</div>
          ) : filteredDeals.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#6B7280" }}>No deals found.</div>
          ) : (
            filteredDeals.map((deal, i, arr) => {
              const formattedDate = new Date(deal.created_at).toLocaleDateString('en-GB');
              const name = deal.lead?.name || "N/A";
              const phone = deal.lead?.phone || "";
              const email = deal.lead?.email || "";
              
              return (
                <div
                  key={deal.id}
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
                    {formattedDate}
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
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {name}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        lineHeight: "140%",
                        letterSpacing: 0,
                        color: "#6B7280",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {email}
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
                    {phone ? "*******" + phone.slice(-4) : "N/A"}
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
                      onClick={() => {
                        setSelectedDeal(deal);
                        setIsServiceDetailsOpen(true);
                      }}
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
                      {deal.value.toLocaleString()}
                    </span>
                    <img
                      onClick={() => {
                        setSelectedDeal(deal);
                        setIsEditDealValueOpen(true);
                      }}
                      src={editPenIcon}
                      alt="edit value"
                      width={16}
                      height={16}
                      style={{ cursor: "pointer", opacity: 0.55 }}
                    />
                  </div>

                  {/* Actions */}
                  <div style={{ width: 100, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    {phone && (
                      <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
                        <img src={whatsappIcon} alt="WhatsApp" width={24} height={24} style={{ cursor: "pointer" }} />
                      </a>
                    )}
                    <img
                      src={mailIcon}
                      alt="Notes"
                      width={24}
                      height={24}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedDeal(deal);
                        setIsNotesOpen(true);
                      }}
                    />
                    <Trash2
                      size={20}
                      color="#A80D0B"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(deal.id)}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Pagination ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* ── Modals ── */}
      {isAddDealOpen && (
        <ModalOverlay onClose={() => setIsAddDealOpen(false)}>
          <Add_new_deal onClose={() => setIsAddDealOpen(false)} />
        </ModalOverlay>
      )}

      {isNotesOpen && selectedDeal && (
        <ModalOverlay onClose={() => { setIsNotesOpen(false); setSelectedDeal(null); }}>
          <Notes 
            leadId={selectedDeal.lead?.id || undefined}
            leadName={selectedDeal.lead?.name || undefined} 
            onClose={() => { setIsNotesOpen(false); setSelectedDeal(null); }} 
          />
        </ModalOverlay>
      )}

      {isServiceDetailsOpen && selectedDeal && (
        <ModalOverlay onClose={() => { setIsServiceDetailsOpen(false); setSelectedDeal(null); }}>
          <Service_details
            dealId={selectedDeal.id}
            leadsName={selectedDeal.lead?.name || undefined}
            initialDetails={selectedDeal.deals_details || ""}
            onClose={() => { setIsServiceDetailsOpen(false); setSelectedDeal(null); }}
          />
        </ModalOverlay>
      )}

      {isEditDealValueOpen && selectedDeal && (
        <ModalOverlay onClose={() => { setIsEditDealValueOpen(false); setSelectedDeal(null); }}>
          <EditDealValue
            dealId={selectedDeal.id}
            initialValue={selectedDeal.value}
            onClose={() => { setIsEditDealValueOpen(false); setSelectedDeal(null); }}
          />
        </ModalOverlay>
      )}
    </div>
  );
};

export default Deals;
