import React from "react";

interface PlanInfoProps {
    planName: string;
    onClose: () => void;
}

const getPlanDetails = (planName: string) => {
    const name = planName || "Plan 1";
    if (name.toLowerCase() === "plan 2") {
        return {
            title: "Plan 2",
            price: "20,000 EGP",
            billedText: "Billed per year",
            features: [
                "Unlimited leads.",
                "Up to 10 sales account.",
                "Company account.",
                "Full access to the mobile application.",
                "Whats-app integration",
                "Advanced analytics dashboard.",
            ],
        };
    }
    if (name.toLowerCase() === "custom plan") {
        return {
            title: "Custom plan",
            price: "Custom pricing",
            billedText: "Billed per year",
            features: [
                "Unlimited leads.",
                "Custom sales accounts.",
                "Company account.",
                "Dedicated support manager.",
                "Custom integrations",
                "SLA guarantees.",
            ],
        };
    }
    return {
        title: "Super Plan",
        price: "10,000 EGP",
        billedText: "Billed per year",
        features: [
            "Unlimited leads.",
            "Up to 5 sales account.",
            "Company account.",
            "Full access to the mobile application.",
            "Whats-app integration",
            "Higher AI features usage limits.",
        ],
    };
};

const PlanInfo: React.FC<PlanInfoProps> = ({ planName, onClose }) => {
    const details = getPlanDetails(planName);

    return (
        <div style={styles.container}>
            {/* Header with Title and Close Icon */}
            <div style={styles.header}>
                <span style={styles.planTitle}>{details.title}</span>
                <button style={styles.closeBtn} onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#464646"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Price section */}
            <div style={styles.priceContainer}>
                <div style={styles.priceRow}>
                    <span style={styles.priceText}>{details.price}</span>
                    <span style={styles.periodText}>/yr</span>
                </div>
                <span style={styles.billedText}>{details.billedText}</span>
            </div>

            {/* Features section */}
            <div style={styles.featuresSection}>
                <span style={styles.featuresHeader}>Features</span>
                <div style={styles.featuresList}>
                    {details.features.map((feature, index) => (
                        <div key={index} style={styles.featureItem}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ flexShrink: 0 }}
                            >
                                <path
                                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4121 3 14.7482 3.32519 15.9375 3.90476M19.3125 6.375L11.4375 14.25L9.1875 12"
                                    stroke="#00236F"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span style={styles.featureText}>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        borderRadius: "12px",
        background: "var(--Foundation-neutral-white, #FFF)",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
        display: "flex",
        width: "417px",
        height: "421px",
        padding: "32px 21px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "20px",
        boxSizing: "border-box",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
    },
    planTitle: {
        fontFamily: "Inter",
        fontSize: "24px",
        fontWeight: 500,
        color: "var(--Foundation-neutral-neutral-950, #141414)",
    },
    closeBtn: {
        border: "1px solid #EDEFF2",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        outline: "none",
    },
    priceContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: "4px",
    },
    priceRow: {
        display: "flex",
        alignItems: "baseline",
        gap: "8px",
        alignSelf: "stretch",
    },
    priceText: {
        fontFamily: "Inter",
        fontSize: "28px",
        fontWeight: 700,
        color: "var(--Foundation-neutral-neutral-950, #141414)",
    },
    periodText: {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 400,
        color: "#747474",
    },
    billedText: {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 400,
        color: "#747474",
    },
    featuresSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
    },
    featuresHeader: {
        color: "var(--Foundation-neutral-neutral-950, #141414)",
        fontFamily: "Inter",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
        width: "375px",
    },
    featuresList: {
        display: "flex",
        width: "375px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "12px",
    },
    featureItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        alignSelf: "stretch",
    },
    featureText: {
        fontFamily: "Inter",
        fontSize: "15px",
        fontWeight: 400,
        color: "#464646",
    },
};

export default PlanInfo;
