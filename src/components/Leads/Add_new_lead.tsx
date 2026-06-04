import React, { useState } from "react";
import { useCreateLeadMutation } from "../../app/service/crudleads";
import { toast } from "sonner";
import plusIcon from "../../assets/plus-02.svg";
import closeIcon from "../../assets/x-02.svg";
import "../../styles/leads-modal-mobile.css";


interface AddNewLeadProps {
  onClose?: () => void;
  onSave?: (data: {
    leadName: string;
    companyName: string;
    phoneNumber: string;
    leadSource: string;
  }) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  border: "1px solid var(--Foundation-brand-brand-500, #D4D5D8)",
  borderRadius: 8,
  padding: "0 14px",
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "#141414",
  background: "transparent",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, background 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: 13,
  color: "#141414",
  marginBottom: 6,
  display: "block",
};

const SOURCE_OPTIONS: { label: string; value: string }[] = [
  { label: "Organic",   value: "ORGANIC" },
  { label: "Referral",  value: "REFERRAL" },
  { label: "Ads",       value: "ADS" },
  { label: "Website",   value: "WEBSITE" },
  { label: "Farmer",    value: "FARMER" },
];

// Phone: 7–20 digits, allows +, spaces, hyphens, parentheses
const PHONE_REGEX = /^[+\d][\d\s\-().]{5,19}$/;

const Add_new_lead: React.FC<AddNewLeadProps> = ({ onClose, onSave }) => {
  const [leadName, setLeadName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; source?: string }>({});

  const [createLead, { isLoading }] = useCreateLeadMutation();

  const isSaveEnabled =
    leadName.trim() !== "" &&
    companyName.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    leadSource.trim() !== "" &&
    !isLoading;

  const validate = () => {
    const errors: { name?: string; phone?: string; source?: string } = {};
    if (!leadName.trim()) errors.name = "Lead name is required.";
    if (!phoneNumber.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(phoneNumber.trim())) {
      errors.phone = "Phone must be 7–20 digits and may include +, spaces, hyphens, or parentheses.";
    }
    if (!leadSource) errors.source = "Please choose a lead source.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (isLoading) return;
    if (!validate()) return;

    try {
      await createLead({
        name: leadName,
        company_name: companyName,
        phone: phoneNumber,
        source: leadSource,
      }).unwrap();

      toast.success("Lead created successfully!");

      if (onSave) {
        onSave({ leadName, companyName, phoneNumber, leadSource });
      }
      if (onClose) onClose();
    } catch (err: any) {
      console.error("Failed to create lead:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to create lead.";
      toast.error(errMsg);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--Foundation-brand-brand-500, #00236F)";
    e.currentTarget.style.background = "#fff";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--Foundation-brand-brand-500, #00236F)";
    e.currentTarget.style.background = "#fff";
  };

  const errorTextStyle: React.CSSProperties = {
    fontFamily: "Cairo, sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "100%",
    color: "var(--Foundation-error-red-700, #A80D0B)",
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
  };

  const errorIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="13.333" height="13.333" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7.66667 5V7.66667M7.66667 10.3333H7.67333M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z" stroke="var(--Foundation-error-red-700, #A80D0B)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div
      className="leads-modal-root"
      style={{
        width: 462,
        height: 580,
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
        style={{
          width: 462,
          height: 72,
          background: "rgba(245, 246, 250, 1)",
          borderBottom: "1px solid rgba(212, 213, 216, 1)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        {/* Left: icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={plusIcon} alt="Add New Lead" width={24} height={24} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 19,
              color: "#141414",
              lineHeight: "100%",
            }}
          >
            Add New Lead
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
          flex: 1,
          background: "rgba(245, 246, 250, 1)",
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          padding: "24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
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
            onChange={(e) => { setLeadName(e.target.value); setFormErrors(prev => ({ ...prev, name: undefined })); }}
            style={{ ...inputStyle, borderColor: formErrors.name ? "#E03131" : undefined }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {formErrors.name && <span style={errorTextStyle}>{errorIcon}{formErrors.name}</span>}
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
            placeholder="e.g. +20 123 456 7890"
            onChange={(e) => { setPhoneNumber(e.target.value); setFormErrors(prev => ({ ...prev, phone: undefined })); }}
            style={{ ...inputStyle, borderColor: formErrors.phone ? "#E03131" : undefined }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {formErrors.phone && <span style={errorTextStyle}>{errorIcon}{formErrors.phone}</span>}
        </div>

        {/* Lead Source */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>
            Lead Source<span style={{ color: "var(--Foundation-brand-brand-500, #00236F)" }}>*</span>
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            {/* Custom Select Box */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                ...inputStyle,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: leadSource ? "#141414" : "#6B7280",
                cursor: "pointer",
                userSelect: "none",
                borderColor: "var(--Foundation-brand-brand-500, #00236F)",
              }}
            >
              <span>{SOURCE_OPTIONS.find(o => o.value === leadSource)?.label || "Choose a lead source"}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              >
                <path d="M6 9L12 15L18 9" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  marginTop: 8,
                  background: "#fff",
                  border: "1px solid rgba(212, 213, 216, 1)",
                  borderRadius: 8,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  zIndex: 10,
                  padding: "8px 0",
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: 240,
                  overflowY: "auto",
                }}
              >
                {SOURCE_OPTIONS.map(({ label, value }) => (
                  <div
                    key={value}
                    onClick={() => {
                      setLeadSource(value);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                      background: leadSource === value ? "rgba(245, 246, 250, 1)" : "#fff",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245, 246, 250, 1)")}
                    onMouseLeave={(e) => {
                      if (leadSource !== value) {
                        e.currentTarget.style.background = "#fff";
                      }
                    }}
                  >
                    {/* Radio Button */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: leadSource === value ? "5px solid #00236F" : "2px solid #8B909A",
                        boxSizing: "border-box",
                        flexShrink: 0,
                        transition: "border 0.2s",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: leadSource === value ? "#00236F" : "#141414",
                        fontWeight: leadSource === value ? 500 : 400,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {formErrors.source && <span style={errorTextStyle}>{errorIcon}{formErrors.source}</span>}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!isSaveEnabled}
          style={{
            marginTop: "auto",
            alignSelf: "center",
            width: "100%",
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
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Add_new_lead;
