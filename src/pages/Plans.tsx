import React from 'react';

const Plans = () => {

  const plan1Features = [
    "Unlimited leads.",
    "Up to 5 sales account.",
    "Company account.",
    "Full access to the mobile application.",
    "Whats-app integration",
    "Higher AI features usage limits."
  ];

  const plan2Features = [
    "Unlimited leads.",
    "Up to 5 sales account.",
    "Company account.",
    "Full access to the mobile application.",
    "Whats-app integration",
    "Higher AI features usage limits."
  ];

  const customPlanFeatures = [
    "Unlimited leads.",
    "Custom sales account number.",
    "Company account.",
    "Full access to the mobile application.",
    "Whats-app integration",
    "Custom AI features usage limits."
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
          Plans
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
                Plan 1
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
                Billed per year
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414" }}>
                Features
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
                Plan 2
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
                Billed per year
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414" }}>
                Features
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
                Custom Plan
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
                Billed per year
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414" }}>
                Features
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
