import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const Plans = () => {
  const { t } = useTranslation();

  const plan1Features = [
    t("plans.unlimitedLeads"),
    t("plans.salesAccounts5"),
    t("plans.companyAccount"),
    t("plans.fullMobileAccess"),
    t("plans.whatsappIntegration"),
    t("plans.higherAiLimits")
  ];

  const plan2Features = [
    t("plans.unlimitedLeads"),
    t("plans.salesAccounts5"),
    t("plans.companyAccount"),
    t("plans.fullMobileAccess"),
    t("plans.whatsappIntegration"),
    t("plans.higherAiLimits")
  ];

  const customPlanFeatures = [
    t("plans.unlimitedLeads"),
    t("plans.customSalesAccounts"),
    t("plans.companyAccount"),
    t("plans.fullMobileAccess"),
    t("plans.whatsappIntegration"),
    t("plans.customAiLimits")
  ];

  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        
        {/* ── Header ── */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 33,
            lineHeight: "normal",
            color: "var(--Foundation-brand-brand-500, #00236F)",
            marginBottom: 24,
          }}
        >
          {t("plans.title")}
        </div>

        {/* ── Three Pricing Cards ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            alignSelf: "stretch",
            width: "100%",
            marginBottom: 24,
          }}
        >
          {/* Card 1: Plan 1 */}
          <div
            style={{
              flex: 1,
              height: 421,
              borderRadius: 12,
              background: "var(--Foundation-neutral-white, #FFF)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
              padding: "32px 21px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 32,
              boxSizing: "border-box",
            }}
          >
            <div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#747474", display: "block", marginBottom: 8 }}>
                {t("plans.plan1")}
              </span>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{
                  color: "var(--Foundation-neutral-neutral-950, #141414)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 23,
                  fontWeight: 700,
                  lineHeight: "normal",
                }}>
                  10,000 EGP
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474", marginLeft: 4 }}>/yr</span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#747474", display: "block", marginTop: 4 }}>
                {t("plans.billedPerYear")}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414" }}>
                {t("plans.features")}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plan1Features.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4121 3 14.7482 3.32519 15.9375 3.90476M19.3125 6.375L11.4375 14.25L9.1875 12" stroke="#00236F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Plan 2 */}
          <div
            style={{
              flex: 1,
              height: 421,
              borderRadius: 12,
              background: "var(--Foundation-neutral-white, #FFF)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
              padding: "32px 21px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 32,
              boxSizing: "border-box",
            }}
          >
            <div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#747474", display: "block", marginBottom: 8 }}>
                {t("plans.plan2")}
              </span>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{
                  color: "var(--Foundation-neutral-neutral-950, #141414)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 23,
                  fontWeight: 700,
                  lineHeight: "normal",
                }}>
                  10,000 EGP
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474", marginLeft: 4 }}>/yr</span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#747474", display: "block", marginTop: 4 }}>
                {t("plans.billedPerYear")}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414" }}>
                {t("plans.features")}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {plan2Features.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4121 3 14.7482 3.32519 15.9375 3.90476M19.3125 6.375L11.4375 14.25L9.1875 12" stroke="#00236F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Custom Plan */}
          <div
            style={{
              flex: 1,
              height: 421,
              borderRadius: 12,
              background: "var(--Foundation-neutral-white, #FFF)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
              padding: "32px 21px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 32,
              boxSizing: "border-box",
            }}
          >
            <div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#747474", display: "block", marginBottom: 8 }}>
                {t("plans.customPlan")}
              </span>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{
                  color: "var(--Foundation-neutral-neutral-950, #141414)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 23,
                  fontWeight: 700,
                  lineHeight: "normal",
                }}>
                  ??? EGP
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#747474", marginLeft: 4 }}>/yr</span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#747474", display: "block", marginTop: 4 }}>
                {t("plans.billedPerYear")}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414" }}>
                {t("plans.features")}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {customPlanFeatures.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.4121 3 14.7482 3.32519 15.9375 3.90476M19.3125 6.375L11.4375 14.25L9.1875 12" stroke="#00236F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Plans;
