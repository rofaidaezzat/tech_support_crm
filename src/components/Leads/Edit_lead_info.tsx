import React, { useState, useEffect, useRef } from "react";
import { useGetLeadQuery, useUpdateLeadMutation } from "../../app/service/crudleads";
import { toast } from "sonner";
import editIcon from "../../assets/edit-contained.svg";
import closeIcon from "../../assets/x-02.svg";
import calendarPlusIcon from "../../assets/calendar-plus.svg";
import "../../styles/leads-modal-mobile.css";
import { validateLead } from "../../validation";

interface EditLeadInfoProps {
  leadId: string;
  onClose?: () => void;
  onSave?: () => void;
  slot?: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  border: "1px solid rgba(212, 213, 216, 1)",
  borderRadius: 8,
  padding: "0 14px",
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "#141414",
  background: "transparent",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: 13,
  color: "#141414",
  marginBottom: 6,
  display: "block",
};

const Edit_lead_info: React.FC<EditLeadInfoProps> = ({
  leadId,
  onClose,
  onSave,
  slot = "Modified",
}) => {
  const { data: leadResponse, isLoading: isGetLoading } = useGetLeadQuery(leadId, { skip: !leadId });
  const [updateLead, { isLoading: isUpdateLoading }] = useUpdateLeadMutation();

  const [leadName, setLeadName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nextFollowup, setNextFollowup] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDatePickerClick = () => {
    try {
      dateInputRef.current?.showPicker();
    } catch (e) {
      console.warn("showPicker is not supported or failed", e);
    }
  };

  useEffect(() => {
    if (leadResponse?.data) {
      const lead = leadResponse.data;
      setLeadName(lead.name || "");
      setCompanyName(lead.company_name || "");
      setPhoneNumber(lead.phone || "");
      if (lead.next_follow_up) {
        setNextFollowup(lead.next_follow_up.substring(0, 10));
      } else {
        setNextFollowup("");
      }
    }
  }, [leadResponse]);

  const isSaveEnabled =
    leadName.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    !isUpdateLoading &&
    !isGetLoading;

  const handleSave = async () => {
    if (isUpdateLoading || isGetLoading) return;
    
    // Perform robust backend-compatible validation
    const validation = validateLead({
      name: leadName,
      phone: phoneNumber,
      source: leadResponse?.data?.source || "FACEBOOK",
      next_follow_up: nextFollowup || null,
    });

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      toast.error(firstError);
      return;
    }

    try {
      await updateLead({
        id: leadId,
        body: {
          name: leadName,
          company_name: companyName,
          phone: phoneNumber,
          next_follow_up: nextFollowup || null,
          source: leadResponse?.data?.source || "FACEBOOK",
        },
      }).unwrap();

      toast.success("Lead updated successfully!");
      if (onSave) onSave();
      if (onClose) onClose();
    } catch (err: any) {
      console.error("Failed to update lead:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to update lead.";
      toast.error(errMsg);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#3B5BDB";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(212, 213, 216, 1)";
  };

  /* Format ISO date → DD/MM/YYYY for display */
  const formatDate = (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <div
      className="leads-modal-root"
      style={{
        width: 462,
        height: 587,
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* ── Header ── */}
      <div
        className="leads-modal-header"
        slot={slot}
        style={{
          width: 462,
          height: 91,
          background: "rgba(245, 246, 250, 1)",
          borderBottom: "1px solid rgba(212, 213, 216, 1)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        {/* Left: icon + title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={editIcon} alt="Edit Lead Info" width={24} height={24} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 19,
                color: "#141414",
                lineHeight: "100%",
              }}
            >
              Edit Lead Info
            </span>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#6B7280",
              lineHeight: "18px",
              paddingLeft: 2,
            }}
          >
            for &quot;{leadResponse?.data?.name || "leads name"}&quot;
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(212, 213, 216, 1)",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <img src={closeIcon} alt="Close" width={14} height={14} />
        </button>
      </div>

      {/* ── Form Body ── */}
      <div
        className="leads-modal-body"
        style={{
          width: 462,
          height: 496,
          background: "rgba(245, 246, 250, 1)",
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          paddingTop: 32,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 24,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {isGetLoading ? (
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
            Loading lead info...
          </div>
        ) : (
          <div
            style={{
              width: 422,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Lead name */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>
                Lead name<span style={{ color: "var(--Foundation-brand-brand-500, #00236F)" }}>*</span>
              </label>
              <input
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Enter lead name"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Company name */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>
                Company name<span style={{ color: "var(--Foundation-brand-brand-500, #00236F)" }}>*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Phone number */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>
                Phone number<span style={{ color: "var(--Foundation-brand-brand-500, #00236F)" }}>*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+20xxxxxxxxxx"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Next followup */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>
                Next followup<span style={{ color: "var(--Foundation-brand-brand-500, #00236F)" }}>*</span>
              </label>
              <div 
                onClick={handleDatePickerClick}
                style={{ position: "relative", width: "100%", cursor: "pointer" }}
              >
                {/* Display formatted date as read-only overlay */}
                <input
                  type="text"
                  readOnly
                  value={formatDate(nextFollowup)}
                  placeholder="DD/MM/YYYY"
                  style={{
                    ...inputStyle,
                    paddingRight: 48,
                    caretColor: "transparent",
                    cursor: "pointer",
                  }}
                />
                {/* Hidden date picker */}
                <input
                  ref={dateInputRef}
                  type="date"
                  value={nextFollowup}
                  onChange={(e) => setNextFollowup(e.target.value)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                  }}
                />
                {/* Calendar icon */}
                <img
                  src={calendarPlusIcon}
                  alt="Pick date"
                  width={22}
                  height={22}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={!isSaveEnabled}
              style={{
                marginTop: 40,
                alignSelf: "center",
                width: 422,
                height: 48,
                borderRadius: 12,
                border: "none",
                background: isSaveEnabled
                  ? "rgba(0, 35, 111, 1)"
                  : "rgba(212, 213, 216, 1)",
                color: isSaveEnabled ? "#fff" : "#9CA3AF",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                cursor: isSaveEnabled ? "pointer" : "not-allowed",
                transition: "background 0.2s, color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 24,
                paddingRight: 24,
                boxSizing: "border-box",
              }}
            >
              {isUpdateLoading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit_lead_info;
