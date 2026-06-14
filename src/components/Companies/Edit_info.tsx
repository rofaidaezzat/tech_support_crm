import React, { useState, useEffect } from "react";

interface EditInfoProps {
    company: any;
    onClose: () => void;
    onSave: (updatedCompany: any) => void;
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

const EditInfo: React.FC<EditInfoProps> = ({ company, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState<"owner" | "company">("owner");

    // Owner Info States
    const [ownerFirstName, setOwnerFirstName] = useState("");
    const [ownerLastName, setOwnerLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");

    // Company Info States
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [industry, setIndustry] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (company) {
            const parts = (company.owner || "").split(" ");
            setOwnerFirstName(parts[0] || "");
            setOwnerLastName(parts.slice(1).join(" ") || "");
            setEmail(company.email || "");
            setGender(company.gender || "");
            setPassword(company.password || "");
            setCompanyName(company.name || "");
            setCompanyEmail(company.companyEmail || "");
            setPhoneNumber(company.phoneNumber || "");
            setCompanyWebsite(company.companyWebsite || "");
            setIndustry(company.industry || company.sector || "");
            setCompanySize(company.companySize || "");
            setAddress(company.address || "");
            setDescription(company.description || "");
        }
    }, [company]);

    const handleSave = () => {
        const updatedCompany = {
            ...company,
            name: companyName,
            owner: `${ownerFirstName} ${ownerLastName}`.trim(),
            email,
            gender,
            password,
            companyName,
            companyEmail,
            phoneNumber,
            companyWebsite,
            sector: industry,
            industry,
            companySize,
            address,
            description,
        };
        onSave(updatedCompany);
    };

    const isFormValid =
        ownerFirstName.trim() !== "" &&
        ownerLastName.trim() !== "" &&
        email.trim() !== "" &&
        gender !== "" &&
        password.trim() !== "" &&
        companyName.trim() !== "" &&
        companyEmail.trim() !== "" &&
        phoneNumber.trim() !== "" &&
        industry !== "" &&
        companySize !== "" &&
        address.trim() !== "" &&
        description.trim() !== "";

    const s = styles;

    return (
        <div style={s.wrapper}>
            {/* ── Header ── */}
            <div style={s.header}>
                <div style={s.headerTitle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M12 6L12 18M18 12L6 12" stroke="#141414" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <span style={s.titleText}>Edit info</span>
                </div>
                <button style={s.closeBtn} onClick={onClose} aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15M5 5L15 15" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* ── Tab Bar ── */}
            <div style={s.tabBar}>
                <button
                    type="button"
                    onClick={() => setActiveTab("owner")}
                    style={{
                        ...s.tabButton,
                        color: activeTab === "owner" ? "var(--Foundation-brand-brand-500, #00236F)" : "var(--Foundation-neutral-neutral-800, #464646)",
                        borderBottom: activeTab === "owner" ? "2px solid var(--Foundation-brand-brand-500, #00236F)" : "2px solid transparent",
                        fontWeight: activeTab === "owner" ? 500 : 400,
                    }}
                >
                    Owner Info
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("company")}
                    style={{
                        ...s.tabButton,
                        color: activeTab === "company" ? "var(--Foundation-brand-brand-500, #00236F)" : "var(--Foundation-neutral-neutral-800, #464646)",
                        borderBottom: activeTab === "company" ? "2px solid var(--Foundation-brand-brand-500, #00236F)" : "2px solid transparent",
                        fontWeight: activeTab === "company" ? 500 : 400,
                    }}
                >
                    Company Info
                </button>
            </div>

            {/* ── Body ── */}
            <div style={s.body}>
                {activeTab === "owner" && (
                    <div style={s.formArea}>
                        {/* First name + Last name row */}
                        <div style={s.nameRow}>
                            <div style={{ ...s.fieldCol, flex: 1 }}>
                                <label style={s.label}>
                                    Owner First Name<span style={s.requiredStar}>*</span>
                                </label>
                                <input
                                    style={{
                                        ...s.input,
                                        background: ownerFirstName ? "#FFF" : "transparent",
                                    }}
                                    placeholder="Input text"
                                    value={ownerFirstName}
                                    onChange={(e) => setOwnerFirstName(e.target.value)}
                                />
                            </div>
                            <div style={{ ...s.fieldCol, flex: 1 }}>
                                <label style={s.label}>
                                    Owner Last Name<span style={s.requiredStar}>*</span>
                                </label>
                                <input
                                    style={{
                                        ...s.input,
                                        background: ownerLastName ? "#FFF" : "transparent",
                                    }}
                                    placeholder="Input text"
                                    value={ownerLastName}
                                    onChange={(e) => setOwnerLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Email Address<span style={s.requiredStar}>*</span>
                            </label>
                            <input
                                style={{
                                    ...s.input,
                                    background: email ? "#FFF" : "transparent",
                                }}
                                type="email"
                                placeholder="Input text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Gender */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Gender<span style={s.requiredStar}>*</span>
                            </label>
                            <div style={{ position: "relative", width: "100%" }}>
                                <select
                                    style={{
                                        ...s.select,
                                        background: gender ? "#FFF" : "transparent",
                                    }}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled>Select gender</option>
                                    {GENDER_OPTIONS.map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Password<span style={s.requiredStar}>*</span>
                            </label>
                            <input
                                style={{
                                    ...s.input,
                                    background: password ? "#FFF" : "transparent",
                                }}
                                type="password"
                                placeholder="Input text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {activeTab === "company" && (
                    <div style={{ ...s.formArea, overflowY: "auto", maxHeight: "360px", paddingRight: "4px" }}>
                        {/* Company Name */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Company Name<span style={s.requiredStar}>*</span>
                            </label>
                            <input
                                style={{
                                    ...s.input,
                                    background: companyName ? "#FFF" : "transparent",
                                }}
                                placeholder="Input text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        {/* Company Email */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Company Email<span style={s.requiredStar}>*</span>
                            </label>
                            <input
                                style={{
                                    ...s.input,
                                    background: companyEmail ? "#FFF" : "transparent",
                                }}
                                type="email"
                                placeholder="Input text"
                                value={companyEmail}
                                onChange={(e) => setCompanyEmail(e.target.value)}
                            />
                        </div>

                        {/* Phone Number */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Phone Number<span style={s.requiredStar}>*</span>
                            </label>
                            <input
                                style={{
                                    ...s.input,
                                    background: phoneNumber ? "#FFF" : "transparent",
                                }}
                                type="tel"
                                placeholder="Input text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {/* Company Website */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>Company Website</label>
                            <input
                                style={{
                                    ...s.input,
                                    background: companyWebsite ? "#FFF" : "transparent",
                                }}
                                placeholder="Input text"
                                value={companyWebsite}
                                onChange={(e) => setCompanyWebsite(e.target.value)}
                            />
                        </div>

                        {/* Industry */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Industry<span style={s.requiredStar}>*</span>
                            </label>
                            <select
                                style={{
                                    ...s.select,
                                    background: industry ? "#FFF" : "transparent",
                                }}
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            >
                                <option value="" disabled>Select business sector</option>
                                {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>

                        {/* Company Size */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Company Size<span style={s.requiredStar}>*</span>
                            </label>
                            <select
                                style={{
                                    ...s.select,
                                    background: companySize ? "#FFF" : "transparent",
                                }}
                                value={companySize}
                                onChange={(e) => setCompanySize(e.target.value)}
                            >
                                <option value="" disabled>Select number of workers</option>
                                {COMPANY_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>

                        {/* Address */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Address<span style={s.requiredStar}>*</span>
                            </label>
                            <textarea
                                style={{
                                    ...s.customTextarea,
                                    background: address ? "#FFF" : "transparent",
                                }}
                                placeholder="Input text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div style={s.fieldCol}>
                            <label style={s.label}>
                                Description<span style={s.requiredStar}>*</span>
                            </label>
                            <textarea
                                style={{
                                    ...s.customTextarea,
                                    background: description ? "#FFF" : "transparent",
                                    height: "110px",
                                }}
                                placeholder="Input text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* ── Footer ── */}
                <div style={s.buttonsRow}>
                    <button type="button" style={s.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        style={{
                            ...s.saveBtn,
                            background: isFormValid ? "var(--Foundation-brand-brand-500, #00236F)" : "#D4D5D8",
                            cursor: isFormValid ? "pointer" : "not-allowed",
                        }}
                        onClick={handleSave}
                        disabled={!isFormValid}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        display: "flex",
        width: "536px",
        height: "631px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderRadius: "12px",
        background: "#FFF",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
    },
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
    titleText: {
        color: "var(--Foundation-neutral-neutral-950, #141414)",
        fontFamily: "Inter, sans-serif",
        fontSize: "19px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "normal",
    },
    closeBtn: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    tabBar: {
        borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        boxSizing: "border-box",
        height: "48px",
        background: "#FFF",
    },
    tabButton: {
        flex: 1,
        height: "100%",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        boxSizing: "border-box",
    },
    body: {
        borderRadius: "0 0 12px 12px",
        background: "#FFF",
        display: "flex",
        padding: "24px 20px",
        alignItems: "flex-start",
        gap: "16px",
        flex: "1 0 0",
        alignSelf: "stretch",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
    },
    formArea: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignSelf: "stretch",
        flex: 1,
    },
    nameRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
    },
    fieldCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        alignSelf: "stretch",
    },
    label: {
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "Inter, sans-serif",
        color: "#141414",
        lineHeight: "1.4",
    },
    requiredStar: {
        color: "#00236F",
        marginLeft: "2px",
    },
    input: {
        width: "100%",
        height: "40px",
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #D4D5D8",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        color: "#141414",
        outline: "none",
        boxSizing: "border-box",
    },
    select: {
        width: "100%",
        height: "40px",
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #D4D5D8",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        color: "#141414",
        outline: "none",
        boxSizing: "border-box",
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
        cursor: "pointer",
    },
    customTextarea: {
        borderRadius: "8px",
        border: "1px solid var(--Foundation-neutral-neutral-500, #808080)",
        display: "flex",
        padding: "12px",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        height: "80px",
        alignSelf: "stretch",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        outline: "none",
        resize: "none",
        boxSizing: "border-box",
        color: "#141414",
    },
    buttonsRow: {
        display: "flex",
        alignItems: "center",
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
    saveBtn: {
        flex: 1,
        height: "48px",
        borderRadius: "12px",
        border: "none",
        color: "#FFF",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "Inter, sans-serif",
        transition: "background 0.3s ease",
    },
};

export default EditInfo;
