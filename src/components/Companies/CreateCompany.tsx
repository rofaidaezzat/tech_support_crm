import React, { useState, useRef, useEffect } from "react";
import '../../styles/company-modal-mobile.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface CreateCompanyProps {
  onClose?: () => void;
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  // Step 1 – Owner Info
  ownerFirstName: string;
  ownerLastName: string;
  email: string;
  gender: string;
  password: string;
  // Step 2 – Company Info
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  companyWebsite: string;
  industry: string;
  companySize: string;
  address: string;
  description: string;
  // Step 3 – Subscription
  plan: string;
  accountsNumber: string;
  aiUsage: string;
  price: string;
}

const GENDER_OPTIONS = ["Male", "Female", "Prefer not to say"];
const INDUSTRY_OPTIONS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Other",
];
const COMPANY_SIZE_OPTIONS = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "500+",
];
const PLAN_OPTIONS = ["Plan 1", "Plan 2", "Custom plan"];

const AI_USAGE_OPTIONS = [
  { label: "Low AI Usage", description: "50 lead searches + 100 generated questions" },
  { label: "Medium AI Usage", description: "50 lead searches + 100 generated questions" },
  { label: "High AI Usage", description: "50 lead searches + 100 generated questions" },
  { label: "Extra high AI Usage", description: "50 lead searches + 100 generated questions" },
];

// ─── Progress bar colour helper ───────────────────────────────────────────────
// step index is 0-based; currentStep is 1-based
function barColor(barIndex: number, currentStep: number): string {
  if (barIndex < currentStep - 1) return "#00236F";           // completed
  if (barIndex === currentStep - 1) return "#8A9ABD";         // active
  return "#D4D5D8";                                            // upcoming
}

// ─── Shared input style ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "40px",
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #D4D5D8",
  background: "#FFF",
  fontSize: "14px",
  fontFamily: "Inter, sans-serif",
  color: "#1A1A2E",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "36px",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "Inter, sans-serif",
  color: "#1A1A2E",
  lineHeight: "1.4",
};

const requiredStar: React.CSSProperties = {
  color: "#00236F",
  marginLeft: "2px",
};

const fieldColStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  alignSelf: "stretch",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #D4D5D8",
  background: "#FFF",
  fontSize: "14px",
  fontFamily: "Inter, sans-serif",
  color: "#1A1A2E",
  outline: "none",
  boxSizing: "border-box",
  resize: "none",
  lineHeight: "1.5",
};

// ─── Component ────────────────────────────────────────────────────────────────
const CreateCompany: React.FC<CreateCompanyProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [planOpen, setPlanOpen] = useState(false);
  const planDropdownRef = useRef<HTMLDivElement>(null);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const aiDropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    ownerFirstName: "",
    ownerLastName: "",
    email: "",
    gender: "",
    password: "",
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    address: "",
    description: "",
    plan: "",
    accountsNumber: "",
    aiUsage: "",
    price: "",
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        planDropdownRef.current &&
        !planDropdownRef.current.contains(e.target as Node)
      ) {
        setPlanOpen(false);
      }
      if (
        aiDropdownRef.current &&
        !aiDropdownRef.current.contains(e.target as Node)
      ) {
        setAiDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Validation helpers
  const step1Valid =
    form.ownerFirstName.trim() &&
    form.ownerLastName.trim() &&
    form.email.trim() &&
    form.gender &&
    form.password.trim();

  const step2Valid =
    form.companyName.trim() &&
    form.companyEmail.trim() &&
    form.phoneNumber.trim() &&
    form.industry &&
    form.companySize &&
    form.address.trim() &&
    form.description.trim();

  const step3Valid =
    form.plan &&
    (form.plan !== "Custom plan" ||
      (form.accountsNumber.trim() !== "" &&
        form.aiUsage !== "" &&
        form.price.trim() !== ""));

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  const handleCreate = () => onSubmit?.(form);

  // ── Styles ──────────────────────────────────────────────────────────────────
  const s = styles;

  return (
    <div style={s.wrapper} className="create-company-modal">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={s.header}>
        <div style={s.headerTitle}>
          <span style={s.plusIcon}>+</span>
          <span style={s.titleText}>Create Company</span>
        </div>
        <button style={s.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div style={s.body} className="create-company-body">

        {/* Progress bars */}
        <div style={s.progressRow}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                ...s.progressBar,
                background: barColor(i, step),
              }}
            />
          ))}
        </div>

        {/* ────────── STEP 1 – Owner Info ─────────────────────────────────── */}
        {step === 1 && (
          <div style={s.formArea} className="create-company-form-area">
            <p style={s.sectionTitle}>Owner Info</p>

            {/* First name + Last name row */}
            <div style={s.nameRow} className="create-company-name-row">
              {/* Owner First Name */}
              <div style={{ ...fieldColStyle, flex: 1, height: "75px" }} className="create-company-field-col">
                <label style={labelStyle}>
                  Owner First Name<span style={requiredStar}>*</span>
                </label>
                <input
                  style={inputStyle}
                  placeholder="Input text"
                  value={form.ownerFirstName}
                  onChange={set("ownerFirstName")}
                />
              </div>
              {/* Owner Last Name */}
              <div style={{ ...fieldColStyle, flex: 1, height: "75px" }} className="create-company-field-col">
                <label style={labelStyle}>
                  Owner Last Name<span style={requiredStar}>*</span>
                </label>
                <input
                  style={inputStyle}
                  placeholder="Input text"
                  value={form.ownerLastName}
                  onChange={set("ownerLastName")}
                />
              </div>
            </div>

            {/* Email Address */}
            <div style={{ ...fieldColStyle, height: "75px" }} className="create-company-field-col">
              <label style={labelStyle}>
                Email Address<span style={requiredStar}>*</span>
              </label>
              <input
                style={inputStyle}
                type="email"
                placeholder="Input text"
                value={form.email}
                onChange={set("email")}
              />
            </div>

            {/* Gender */}
            <div style={{ ...fieldColStyle }} className="create-company-field-col">
              <label style={labelStyle}>
                Gender<span style={requiredStar}>*</span>
              </label>
              <div style={{ position: "relative", width: "100%" }}>
                <select
                  style={{ ...selectStyle, width: "100%" }}
                  value={form.gender}
                  onChange={set("gender")}
                >
                  <option value="" disabled>Select gender</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div style={{ ...fieldColStyle, height: "75px" }} className="create-company-field-col">
              <label style={labelStyle}>
                Password<span style={requiredStar}>*</span>
              </label>
              <input
                style={inputStyle}
                type="password"
                placeholder="Input text"
                value={form.password}
                onChange={set("password")}
              />
            </div>
          </div>
        )}

        {/* ────────── STEP 2 – Company Info ───────────────────────────────── */}
        {step === 2 && (
          <div style={{ ...s.formArea, overflowY: "auto", maxHeight: "460px" }} className="create-company-form-area step2-form-area">
            <p style={s.sectionTitle}>Company Info</p>

            {/* Company Name */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Company Name<span style={requiredStar}>*</span>
              </label>
              <input style={inputStyle} placeholder="Input text" value={form.companyName} onChange={set("companyName")} />
            </div>

            {/* Company Email */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Company Email<span style={requiredStar}>*</span>
              </label>
              <input style={inputStyle} type="email" placeholder="Input text" value={form.companyEmail} onChange={set("companyEmail")} />
            </div>

            {/* Phone Number */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Phone Number<span style={requiredStar}>*</span>
              </label>
              <input style={inputStyle} type="tel" placeholder="Input text" value={form.phoneNumber} onChange={set("phoneNumber")} />
            </div>

            {/* Company Website */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>Company Website</label>
              <input style={inputStyle} placeholder="Input text" value={form.companyWebsite} onChange={set("companyWebsite")} />
            </div>

            {/* Industry */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Industry<span style={requiredStar}>*</span>
              </label>
              <select style={{ ...selectStyle, width: "100%" }} value={form.industry} onChange={set("industry")}>
                <option value="" disabled>Select business sector</option>
                {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* Company Size */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Company Size<span style={requiredStar}>*</span>
              </label>
              <select style={{ ...selectStyle, width: "100%" }} value={form.companySize} onChange={set("companySize")}>
                <option value="" disabled>Select number of workers</option>
                {COMPANY_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* Address */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Address<span style={requiredStar}>*</span>
              </label>
              <textarea
                style={{ ...textareaStyle, height: "80px" }}
                placeholder="placeholder text"
                value={form.address}
                onChange={set("address")}
              />
            </div>

            {/* Description */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Description<span style={requiredStar}>*</span>
              </label>
              <textarea
                style={{ ...textareaStyle, height: "110px" }}
                placeholder="Enter a brief about the company..."
                value={form.description}
                onChange={set("description")}
              />
            </div>
          </div>
        )}

        {/* ────────── STEP 3 – Subscription ───────────────────────────────── */}
        {step === 3 && (
          <div style={{ ...s.formArea, overflowY: "auto", maxHeight: "460px", paddingRight: "4px" }} className="create-company-form-area step3-form-area">
            <p style={s.sectionTitle}>Subscription</p>

            {/* Plan field */}
            <div style={fieldColStyle} className="create-company-field-col">
              <label style={labelStyle}>
                Plan<span style={requiredStar}>*</span>
              </label>

              {/* Custom plan dropdown */}
              <div
                ref={planDropdownRef}
                style={{ position: "relative", width: "100%" }}
              >
                {/* Trigger */}
                <div
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    color: form.plan ? "#1A1A2E" : "#9CA3AF",
                  }}
                  onClick={() => setPlanOpen((o) => !o)}
                >
                  <span>{form.plan || "Select Plan"}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* Dropdown panel */}
                {planOpen && (
                  <div style={s.planDropdown} className="create-company-plan-dropdown">
                    {PLAN_OPTIONS.map((plan) => {
                      const isSelected = form.plan === plan;
                      return (
                        <div
                          key={plan}
                          style={{
                            ...s.planRow,
                            ...(isSelected ? s.planRowSelected : {}),
                          }}
                          className="create-company-plan-row"
                          onClick={() => {
                            setForm((prev) => ({ ...prev, plan, accountsNumber: "", aiUsage: "", price: "" }));
                            setPlanOpen(false);
                          }}
                        >
                          {/* Radio */}
                          <div style={{
                            ...s.radioOuter,
                            borderColor: isSelected ? "var(--Foundation-brand-brand-500, #00236F)" : "#8B909A"
                          }}>
                            {isSelected && <div style={s.radioInner} />}
                          </div>
                          <span style={s.planLabel}>{plan}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Extra custom plan inputs */}
            {form.plan === "Custom plan" && (
              <>
                {/* Accounts Number */}
                <div
                  style={{
                    display: "flex",
                    height: "75px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                    alignSelf: "stretch",
                  }}
                  className="create-company-field-col"
                >
                  <label style={labelStyle}>
                    Accounts Number<span style={requiredStar}>*</span>
                  </label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={form.accountsNumber}
                    onChange={set("accountsNumber")}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span style={{ fontSize: "12px", fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
                      Maximum allowed: 100 accounts.
                    </span>
                  </div>
                </div>

                {/* AI Usage */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "8px",
                    alignSelf: "stretch",
                  }}
                  className="create-company-field-col"
                >
                  <label style={labelStyle}>
                    AI Usage<span style={requiredStar}>*</span>
                  </label>
                  <div
                    ref={aiDropdownRef}
                    style={{ position: "relative", width: "100%" }}
                  >
                    {/* Trigger */}
                    <div
                      style={{
                        ...inputStyle,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        color: form.aiUsage ? "#1A1A2E" : "#9CA3AF",
                      }}
                      onClick={() => setAiDropdownOpen((o) => !o)}
                    >
                      <span>{form.aiUsage || "Select AI usage limit"}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    {/* Dropdown panel */}
                    {aiDropdownOpen && (
                      <div style={s.aiDropdown} className="create-company-ai-dropdown">
                        {AI_USAGE_OPTIONS.map((option) => {
                          const isSelected = form.aiUsage === option.label;
                          return (
                            <div
                              key={option.label}
                              style={{
                                display: "flex",
                                width: "472px",
                                padding: "8px",
                                borderRadius: "8px",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "12px",
                                cursor: "pointer",
                                boxSizing: "border-box",
                                background: isSelected ? "var(--Foundation-brand-brand-50, #E6E9F1)" : "transparent",
                              }}
                              className="create-company-ai-row"
                              onClick={() => {
                                setForm((prev) => ({ ...prev, aiUsage: option.label }));
                                setAiDropdownOpen(false);
                              }}
                            >
                              {/* Radio */}
                              <div style={s.radioOuter}>
                                {isSelected && <div style={s.radioInner} />}
                              </div>
                              {/* Text stack */}
                              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{ fontSize: "14px", fontWeight: 500, fontFamily: "Inter, sans-serif", color: "#1A1A2E" }}>
                                  {option.label}
                                </span>
                                <span style={{ fontSize: "12px", fontFamily: "Inter, sans-serif", color: "#6B7280" }}>
                                  {option.description}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    height: "75px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                    alignSelf: "stretch",
                  }}
                  className="create-company-field-col"
                >
                  <label style={labelStyle}>
                    Price<span style={requiredStar}>*</span>
                  </label>
                  <div style={{ position: "relative", width: "100%" }}>
                    <input
                      style={{ ...inputStyle, paddingRight: "45px" }}
                      placeholder="Recommended 10,000"
                      value={form.price}
                      onChange={set("price")}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "14px",
                        color: "#6B7280",
                        fontFamily: "Inter, sans-serif",
                        pointerEvents: "none",
                      }}
                    >
                      / yr
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Footer buttons ───────────────────────────────────────────────── */}
        <div style={s.buttonsRow}>
          {step === 1 ? (
            <button style={s.cancelBtn} onClick={onClose}>Cancel</button>
          ) : (
            <button style={s.cancelBtn} onClick={handleBack}>Back</button>
          )}

          {step < 3 ? (
            <button
              style={{
                ...s.nextBtn,
                background: (step === 1 ? step1Valid : step2Valid)
                  ? "#00236F"
                  : "#D4D5D8",
                cursor: (step === 1 ? step1Valid : step2Valid) ? "pointer" : "not-allowed",
              }}
              onClick={handleNext}
              disabled={step === 1 ? !step1Valid : !step2Valid}
            >
              Next
            </button>
          ) : (
            <button
              style={{
                ...s.nextBtn,
                background: step3Valid ? "#00236F" : "#D4D5D8",
                cursor: step3Valid ? "pointer" : "not-allowed",
              }}
              onClick={handleCreate}
              disabled={!step3Valid}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    width: "536px",
    height: "631px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
  },

  // Header
  header: {
    borderRadius: "12px 12px 0 0",
    borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    display: "flex",
    padding: "20px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    boxSizing: "border-box",
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  plusIcon: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#1A1A2E",
  },
  titleText: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1A1A2E",
    lineHeight: "1.4",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#6B7280",
    padding: "4px",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Body
  body: {
    borderRadius: "0 0 12px 12px",
    background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
    display: "flex",
    padding: "24px 20px",
    alignItems: "flex-start",
    gap: "12px",
    flex: "1 0 0",
    alignSelf: "stretch",
    flexDirection: "column",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  // Progress bar row
  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    alignSelf: "stretch",
  },
  progressBar: {
    borderRadius: "12px",
    height: "8px",
    flex: "1 0 0",
    transition: "background 0.3s ease",
  },

  // Form area
  formArea: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignSelf: "stretch",
    flex: 1,
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1A1A2E",
    margin: 0,
    lineHeight: "1.4",
  },

  // Owner name row
  nameRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    alignSelf: "stretch",
  },

  // Footer buttons
  buttonsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    alignSelf: "stretch",
    marginTop: "auto",
  },
  cancelBtn: {
    flex: 1,
    height: "48px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--Foundation-brand-brand-500, #00236F)",
    fontFamily: "Inter, sans-serif",
  },
  nextBtn: {
    flex: 1,
    height: "48px",
    borderRadius: "12px",
    background: "var(--Foundation-neutral-neutral-100, #D4D5D8)",
    border: "none",
    fontSize: "14px",
    fontWeight: 600,
    color: "#FFF",
    fontFamily: "Inter, sans-serif",
    transition: "opacity 0.2s ease",
  },

  // Plan dropdown
  aiDropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 100,
    borderRadius: "12px",
    background: "var(--Foundation-neutral-white, #FFF)",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.17)",
    display: "flex",
    width: "496px",
    padding: "12px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
    boxSizing: "border-box",
  },
  planDropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 100,
    borderRadius: "12px",
    background: "var(--Foundation-neutral-white, #FFF)",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.17)",
    display: "flex",
    width: "496px",
    padding: "12px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
    boxSizing: "border-box",
  },
  planRow: {
    display: "flex",
    width: "472px",
    height: "40px",
    padding: "8px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    boxSizing: "border-box",
    transition: "background 0.15s ease",
  },
  planRowSelected: {
    background: "var(--Foundation-brand-brand-50, #E6E9F1)",
  },
  radioOuter: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#8B909A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
  },
  radioInner: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "var(--Foundation-brand-brand-500, #00236F)",
  },
  planLabel: {
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: "#1A1A2E",
    fontWeight: 400,
    userSelect: "none",
  },
};

export default CreateCompany;
