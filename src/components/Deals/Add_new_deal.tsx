import React, { useState } from "react";
import { useCreateDealMutation } from "../../app/service/cruddeals";
import { toast } from "sonner";
import plusIcon from "../../assets/plus-02.svg";
import closeIcon from "../../assets/x-02.svg";
import "../../styles/leads-modal-mobile.css";

interface AddNewDealProps {
  onClose?: () => void;
  onSave?: (data: any) => void;
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

const errorTextStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 12,
  color: "#E03131",
  marginTop: 4,
  lineHeight: "1.4",
};

const SOURCE_OPTIONS = [
  { label: "Ads",       value: "ADS" },
  { label: "Website",   value: "WEBSITE" },
  { label: "Organic",   value: "ORGANIC" },
  { label: "Referral",  value: "REFERRAL" },
  { label: "Farmer",    value: "FARMER" },
  { label: "Facebook",  value: "FACEBOOK" },
  { label: "TikTok",    value: "TIKTOK" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "WhatsApp",  value: "WHATSAPP" },
  { label: "Telegram",  value: "TELEGRAM" },
  { label: "LinkedIn",  value: "LINKEDIN" },
  { label: "Twitter",   value: "TWITTER" },
  { label: "YouTube",   value: "YOUTUBE" },
];

const CITY_OPTIONS = [
  { label: "Cairo", value: "CAIRO" },
  { label: "Alexandria", value: "ALEXANDRIA" },
  { label: "Giza", value: "GIZA" },
  { label: "Other", value: "OTHER" },
];

const PHONE_REGEX = /^[+\d][\d\s\-().]{5,19}$/;

const Add_new_deal: React.FC<AddNewDealProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [city, setCity] = useState("");
  const [value, setValue] = useState("");
  const [dealsDetails, setDealsDetails] = useState("");
  
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [createDeal, { isLoading }] = useCreateDealMutation();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "var(--Foundation-brand-brand-500, #00236F)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "#D4D5D8";
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!PHONE_REGEX.test(phone.trim())) {
      errors.phone = "Please provide a valid phone number";
    }

    if (!source) {
      errors.source = "Lead source is required";
    }

    if (!city) {
      errors.city = "City is required";
    } else if (!CITY_OPTIONS.some(o => o.value === city)) {
      errors.city = "Please select a valid Egyptian city";
    }

    if (!value.trim()) {
      errors.value = "Deal value is required";
    } else {
      const parsedVal = Number(value);
      if (isNaN(parsedVal) || parsedVal <= 0) {
        errors.value = "Please provide a valid value for the deal";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (isLoading) return;
    if (!validateForm()) return;

    try {
      const response = await createDeal({
        name,
        phone,
        source,
        city,
        value: Number(value),
        deals_details: dealsDetails || undefined,
      }).unwrap();

      toast.success(response?.message || "Deal created successfully");

      if (onSave) {
        onSave(response.data);
      }
      if (onClose) {
        onClose();
      }
    } catch (err: any) {
      console.error("Failed to create deal:", err);
      const errMsg = err?.data?.message || err?.message || "Failed to create deal.";
      toast.error(errMsg);
    }
  };

  return (
    <div
      className="leads-modal-root"
      style={{
        width: 462,
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
        position: "relative",
        background: "rgba(245, 246, 250, 1)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        className="leads-modal-header"
        style={{
          background: "rgba(245, 246, 250, 1)",
          width: 462,
          height: 76,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottom: "1px solid rgba(212, 213, 216, 1)",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={plusIcon} alt="add" width={20} height={20} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 19,
              color: "#141414",
              lineHeight: "100%",
            }}
          >
            Add New Deal
          </span>
        </div>

        {/* Close Button */}
        <div
          onClick={onClose}
          style={{
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
            background: "rgba(255, 255, 255, 1)",
            width: 36,
            height: 36,
            borderRadius: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img src={closeIcon} alt="close" width={20} height={20} />
        </div>
      </div>

      {/* ── Body ── */}
      <div
        className="leads-modal-body"
        style={{
          background: "rgba(245, 246, 250, 1)",
          width: 462,
          flex: 1,
          minHeight: 0,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Customer Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              Customer name<span style={{ color: "rgba(0, 35, 111, 1)" }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (formErrors.name) setFormErrors(prev => ({ ...prev, name: "" }));
              }}
              style={{
                ...inputStyle,
                borderColor: formErrors.name ? "#E03131" : "#D4D5D8",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formErrors.name && <span style={errorTextStyle}>{formErrors.name}</span>}
          </div>

          {/* Phone Number */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              Phone number<span style={{ color: "rgba(0, 35, 111, 1)" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="+201099998888"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: "" }));
              }}
              style={{
                ...inputStyle,
                borderColor: formErrors.phone ? "#E03131" : "#D4D5D8",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formErrors.phone && <span style={errorTextStyle}>{formErrors.phone}</span>}
          </div>

          {/* Lead Source */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              Lead Source<span style={{ color: "rgba(0, 35, 111, 1)" }}>*</span>
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <div
                onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
                style={{
                  ...inputStyle,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: source ? "#141414" : "#6B7280",
                  cursor: "pointer",
                  userSelect: "none",
                  borderColor: formErrors.source ? "#E03131" : "#D4D5D8",
                }}
              >
                <span>{SOURCE_OPTIONS.find(o => o.value === source)?.label || "Choose a lead source"}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: isSourceDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <path d="M6 9L12 15L18 9" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {isSourceDropdownOpen && (
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
                    maxHeight: 180,
                    overflowY: "auto",
                  }}
                >
                  {SOURCE_OPTIONS.map(({ label, value }) => (
                    <div
                      key={value}
                      onClick={() => {
                        setSource(value);
                        setIsSourceDropdownOpen(false);
                        if (formErrors.source) setFormErrors(prev => ({ ...prev, source: "" }));
                      }}
                      style={{
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        background: source === value ? "rgba(245, 246, 250, 1)" : "#fff",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: source === value ? "5px solid #00236F" : "2px solid #8B909A",
                          boxSizing: "border-box",
                        }}
                      />
                      <span style={{ fontSize: 14, color: source === value ? "#00236F" : "#141414" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {formErrors.source && <span style={errorTextStyle}>{formErrors.source}</span>}
          </div>

          {/* City */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              City<span style={{ color: "rgba(0, 35, 111, 1)" }}>*</span>
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <div
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                style={{
                  ...inputStyle,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: city ? "#141414" : "#6B7280",
                  cursor: "pointer",
                  userSelect: "none",
                  borderColor: formErrors.city ? "#E03131" : "#D4D5D8",
                }}
              >
                <span>{CITY_OPTIONS.find(o => o.value === city)?.label || "Choose a city"}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: isCityDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <path d="M6 9L12 15L18 9" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {isCityDropdownOpen && (
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
                  }}
                >
                  {CITY_OPTIONS.map(({ label, value }) => (
                    <div
                      key={value}
                      onClick={() => {
                        setCity(value);
                        setIsCityDropdownOpen(false);
                        if (formErrors.city) setFormErrors(prev => ({ ...prev, city: "" }));
                      }}
                      style={{
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        background: city === value ? "rgba(245, 246, 250, 1)" : "#fff",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: city === value ? "5px solid #00236F" : "2px solid #8B909A",
                          boxSizing: "border-box",
                        }}
                      />
                      <span style={{ fontSize: 14, color: city === value ? "#00236F" : "#141414" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {formErrors.city && <span style={errorTextStyle}>{formErrors.city}</span>}
          </div>

          {/* Value */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>
              Value (EGP)<span style={{ color: "rgba(0, 35, 111, 1)" }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (formErrors.value) setFormErrors(prev => ({ ...prev, value: "" }));
              }}
              style={{
                ...inputStyle,
                borderColor: formErrors.value ? "#E03131" : "#D4D5D8",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formErrors.value && <span style={errorTextStyle}>{formErrors.value}</span>}
          </div>

          {/* Service Details */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Service Details</label>
            <textarea
              value={dealsDetails}
              onChange={(e) => setDealsDetails(e.target.value)}
              style={{
                width: "100%",
                height: 96,
                borderRadius: 8,
                border: "1px solid #D4D5D8",
                padding: "12px 16px",
                outline: "none",
                fontFamily: "Inter",
                fontSize: 14,
                boxSizing: "border-box",
                resize: "none",
                background: "transparent",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: 32, paddingBottom: 16 }}>
          <button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              background: "rgba(0, 35, 111, 1)",
              width: "100%",
              height: 48,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              boxSizing: "border-box",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add_new_deal;
