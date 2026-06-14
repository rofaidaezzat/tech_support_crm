import React, { useState, useRef, useEffect } from "react";

interface NewAgentProps {
  onClose: () => void;
  onSave: (agent: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    gender: string;
  }) => void;
}

const COUNTRIES = ["United States", "Egypt", "Saudi Arabia", "United Kingdom"];
const CITIES: Record<string, string[]> = {
  "United States": ["New York", "Los Angeles", "San Francisco"],
  "Egypt": ["Cairo", "Alexandria", "Giza"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam"],
  "United Kingdom": ["London", "Manchester", "Birmingham"],
};
const GENDERS = ["Male", "Female"];

const NewAgent: React.FC<NewAgentProps> = ({ onClose, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  // Dropdown states
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

  // Refs for click outside handling
  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (countryRef.current && !countryRef.current.contains(target)) {
        setCountryOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(target)) {
        setCityOpen(false);
      }
      if (genderRef.current && !genderRef.current.contains(target)) {
        setGenderOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    country !== "" &&
    city !== "" &&
    gender !== "" &&
    password.trim() !== "";

  const handleNext = () => {
    if (!isFormValid) return;
    onSave({
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      gender,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "462px",
          borderRadius: "12px",
          background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, sans-serif",
          boxSizing: "border-box",
          overflow: "visible",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            borderRadius: "12px 12px 0 0",
            borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
            background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
            display: "flex",
            padding: "20px",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            boxSizing: "border-box",
          }}
        >
          {/* Left Title Group */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ width: "24px", height: "24px", flexShrink: 0 }}
            >
              <path
                d="M12 6L12 18M18 12L6 12"
                stroke="#141414"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                color: "var(--Foundation-neutral-neutral-950, #141414)",
                fontFamily: "Inter",
                fontSize: "19px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
              }}
            >
              New Agent
            </span>
          </div>

          {/* Close Button */}
          <button
            style={{
              borderRadius: "50%",
              background: "#FFFFFF",
              border: "1px solid #D4D5D8",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
              color: "#6B7280",
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body (Form Scroll Area) */}
        <div
          style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxHeight: "60vh",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* First Name & Last Name */}
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={styles.label}>
                First Name<span style={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                placeholder="Input text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={styles.label}>
                Last Name<span style={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                placeholder="Input text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Email Address */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={styles.label}>
              Email Address<span style={styles.requiredStar}>*</span>
            </label>
            <input
              type="email"
              placeholder="Input text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Phone Number */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={styles.label}>
              Phone Number<span style={styles.requiredStar}>*</span>
            </label>
            <input
              type="tel"
              placeholder="Input text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Country & City Dropdowns */}
          <div style={{ display: "flex", gap: "16px", overflow: "visible" }}>
            {/* Country */}
            <div
              ref={countryRef}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", position: "relative" }}
            >
              <label style={styles.label}>
                Country<span style={styles.requiredStar}>*</span>
              </label>
              <div
                style={styles.selectTrigger}
                onClick={() => setCountryOpen((o) => !o)}
              >
                <span style={{ color: country ? "#141414" : "#9B9C9E" }}>
                  {country || "Select country"}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="2"
                  style={{ transform: countryOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {countryOpen && (
                <div style={styles.dropdown}>
                  {COUNTRIES.map((c) => (
                    <div
                      key={c}
                      style={styles.dropdownOption}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                      onClick={() => {
                        setCountry(c);
                        setCity(""); // Reset city when country changes
                        setCountryOpen(false);
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* City */}
            <div
              ref={cityRef}
              style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", position: "relative" }}
            >
              <label style={styles.label}>
                City<span style={styles.requiredStar}>*</span>
              </label>
              <div
                style={{
                  ...styles.selectTrigger,
                  cursor: country ? "pointer" : "not-allowed",
                  background: country ? "#FFFFFF" : "#F5F6FA",
                }}
                onClick={() => country && setCityOpen((o) => !o)}
              >
                <span style={{ color: city ? "#141414" : "#9B9C9E" }}>
                  {city || "Select city"}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="2"
                  style={{ transform: cityOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {cityOpen && country && (
                <div style={styles.dropdown}>
                  {(CITIES[country] || []).map((cty) => (
                    <div
                      key={cty}
                      style={styles.dropdownOption}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                      onClick={() => {
                        setCity(cty);
                        setCityOpen(false);
                      }}
                    >
                      {cty}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Gender */}
          <div
            ref={genderRef}
            style={{ display: "flex", flexDirection: "column", gap: "6px", position: "relative", overflow: "visible" }}
          >
            <label style={styles.label}>
              Gender<span style={styles.requiredStar}>*</span>
            </label>
            <div
              style={styles.selectTrigger}
              onClick={() => setGenderOpen((o) => !o)}
            >
              <span style={{ color: gender ? "#141414" : "#9B9C9E" }}>
                {gender || "Select gender"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                style={{ transform: genderOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {genderOpen && (
              <div style={styles.dropdown}>
                {GENDERS.map((g) => (
                  <div
                    key={g}
                    style={styles.dropdownOption}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                    onClick={() => {
                      setGender(g);
                      setGenderOpen(false);
                    }}
                  >
                    {g}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={styles.label}>
              Password<span style={styles.requiredStar}>*</span>
            </label>
            <input
              type="password"
              placeholder="Input text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div
          style={{
            borderRadius: "0 0 12px 12px",
            background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
            display: "flex",
            padding: "24px 20px",
            alignItems: "flex-start",
            gap: "12px",
            alignSelf: "stretch",
            boxSizing: "border-box",
          }}
        >
          <button
            style={styles.cancelBtn}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={!isFormValid}
            style={{
              ...styles.nextBtn,
              background: isFormValid ? "var(--Foundation-brand-brand-500, #00236F)" : "#D4D5D8",
              color: isFormValid ? "#FFFFFF" : "#9B9C9E",
              cursor: isFormValid ? "pointer" : "default",
            }}
            onMouseEnter={(e) => {
              if (isFormValid) {
                e.currentTarget.style.background = "#001B54";
              }
            }}
            onMouseLeave={(e) => {
              if (isFormValid) {
                e.currentTarget.style.background = "var(--Foundation-brand-brand-500, #00236F)";
              }
            }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  label: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    color: "#374151",
  },
  requiredStar: {
    color: "#00236F",
    marginLeft: "2px",
  },
  input: {
    height: "40px",
    borderRadius: "8px",
    border: "1px solid #D4D5D8",
    background: "#FFFFFF",
    padding: "8px 12px",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    color: "#141414",
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
  },
  selectTrigger: {
    height: "40px",
    borderRadius: "8px",
    border: "1px solid #D4D5D8",
    background: "#FFFFFF",
    padding: "8px 12px",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    color: "#141414",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    boxSizing: "border-box",
    width: "100%",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    zIndex: 10000,
    borderRadius: "8px",
    background: "#FFFFFF",
    border: "1px solid #D4D5D8",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "4px 0",
    maxHeight: "150px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  dropdownOption: {
    padding: "8px 12px",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    color: "#141414",
    cursor: "pointer",
    transition: "background 0.15s ease",
  },
  cancelBtn: {
    borderRadius: "12px",
    background: "transparent",
    color: "var(--Foundation-brand-brand-500, #00236F)",
    border: "none",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    flex: "1 0 0",
    transition: "background-color 0.2s ease",
  },
  nextBtn: {
    borderRadius: "12px",
    border: "none",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    flex: "1 0 0",
    transition: "background-color 0.2s ease",
  },
};

export default NewAgent;
