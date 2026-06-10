import React from 'react';
import { ChevronDown } from 'lucide-react';

const ChartBackground = ({ children, yTicks, xTicks }: { children: React.ReactNode; yTicks: number[]; xTicks: string[] }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: 290, marginTop: 16 }}>
      {/* Y Axis Labels */}
      <div style={{ position: "absolute", left: 0, top: 6, bottom: 33, width: 30, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8 }}>
        {yTicks.map(tick => (
          <span key={tick} style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>{tick}</span>
        ))}
      </div>

      {/* Grid and Chart Area */}
      <div style={{
        marginLeft: 30,
        height: 251,
        position: "relative",
        borderLeft: "1px solid #EDEFF2",
        borderBottom: "1px solid #EDEFF2",
        padding: "6px 1px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }}>
        {/* Horizontal Grid lines */}
        {yTicks.slice(1, -1).map((tick, idx) => {
          const topPercent = (idx + 1) * (100 / (yTicks.length - 1));
          return (
            <div
              key={tick}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${topPercent}%`,
                borderTop: "1px dashed #EDEFF2",
              }}
            />
          );
        })}

        {/* Chart Lines (SVGs) */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 6, bottom: 6 }}>
          {children}
        </div>
      </div>

      {/* X Axis Labels */}
      <div style={{ position: "absolute", left: 30, right: 0, bottom: 0, height: 20, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4, boxSizing: "border-box" }}>
        {xTicks.map(tick => (
          <span key={tick} style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>{tick}</span>
        ))}
      </div>
    </div>
  );
};

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

        {/* ── Two Graph Cards ── */}
        <div
          style={{
            display: "flex",
            gap: 24,
            width: "100%",
          }}
        >
          {/* Card 1: Plan Subscription Trend */}
          <div
            style={{
              flex: 1,
              height: 400,
              borderRadius: 12,
              background: "var(--Foundation-neutral-white, #FFF)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              boxSizing: "border-box",
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 12 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
                Plan Subscription Trend
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* Legends */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00236F" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Plan 1</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EC130F" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Plan 2</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#4BA832" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474" }}>Plan 3</span>
                  </div>
                </div>

                {/* Dropdown */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "1px solid #D4D5D8",
                  borderRadius: 8,
                  padding: "4px 12px",
                  cursor: "pointer",
                }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4B5563" }}>All plans</span>
                  <ChevronDown size={14} color="#4B5563" />
                </div>
              </div>
            </div>

            {/* Overlapping graph paths */}
            <ChartBackground yTicks={[8, 6, 4, 2, 0]} xTicks={["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep"]}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* Blue Line (Plan 1) */}
                <svg viewBox="0 0 509 149" width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
                  <path d="M0.34082 148.625L63.7853 89.375L127.23 30.125L190.674 59.75H254.119L317.563 89.375L381.007 0.5H444.452L507.896 59.75" stroke="#00236F" strokeWidth="2" fill="none" />
                  <circle cx="0.341" cy="148.625" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="63.785" cy="89.375" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="127.23" cy="30.125" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="190.674" cy="59.75" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="254.119" cy="59.75" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="317.563" cy="89.375" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="381.007" cy="0.5" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="444.452" cy="0.5" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                  <circle cx="507.896" cy="59.75" r="4" fill="#fff" stroke="#00236F" strokeWidth="2" />
                </svg>

                {/* Red Line (Plan 2) */}
                <svg viewBox="0 0 509 120" width="100%" height="80%" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: "20%", overflow: "visible" }}>
                  <path d="M0.211914 89.6842L63.6564 119.309L127.101 0.809204L190.545 60.0592H253.99H317.434L380.879 0.809204H444.323L507.767 89.6842" stroke="#EC130F" strokeWidth="2" fill="none" />
                  <circle cx="0.212" cy="89.684" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="63.656" cy="119.309" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="127.101" cy="0.809" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="190.545" cy="60.059" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="253.99" cy="60.059" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="317.434" cy="60.059" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="380.879" cy="0.809" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="444.323" cy="0.809" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                  <circle cx="507.767" cy="89.684" r="4" fill="#fff" stroke="#EC130F" strokeWidth="2" />
                </svg>

                {/* Green Line (Plan 3) */}
                <svg viewBox="0 0 508 120" width="100%" height="80%" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: "20%", overflow: "visible" }}>
                  <path d="M0 30.125H63.4444L126.889 119L190.333 0.5H253.778H317.222H380.667L444.111 30.125L507.556 0.5" stroke="#4BA832" strokeWidth="2" fill="none" />
                  <circle cx="0" cy="30.125" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="63.444" cy="30.125" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="126.889" cy="119" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="190.333" cy="0.5" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="253.778" cy="0.5" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="317.222" cy="0.5" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="380.667" cy="0.5" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="444.111" cy="30.125" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                  <circle cx="507.556" cy="0.5" r="4" fill="#fff" stroke="#4BA832" strokeWidth="2" />
                </svg>
              </div>
            </ChartBackground>
          </div>

          {/* Card 2: Plan Performance */}
          <div
            style={{
              flex: 1,
              height: 400,
              borderRadius: 12,
              background: "var(--Foundation-neutral-white, #FFF)",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              boxSizing: "border-box",
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 12 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>
                Plan Performance
              </span>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: "1px solid #D4D5D8",
                borderRadius: 8,
                padding: "4px 12px",
                cursor: "pointer",
              }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4B5563" }}>This month</span>
                <ChevronDown size={14} color="#4B5563" />
              </div>
            </div>

            {/* Donut and Legend row */}
            <div style={{ display: "flex", width: "100%", flex: 1, alignItems: "center", justifyContent: "space-around" }}>
              {/* Donut chart SVG */}
              <div style={{ position: "relative", width: 292.444, height: 291.652 }}>
                <svg width="292.444" height="291.652" viewBox="0 0 292.444 291.652" style={{ transform: "rotate(-90deg)" }}>
                  {/* Segment 1: Plan 1 (Dark Blue, 30%, circumference 596.9) */}
                  <circle
                    cx="146"
                    cy="146"
                    r="95"
                    fill="none"
                    stroke="#00236F"
                    strokeWidth="85"
                    strokeDasharray="179.1 596.9"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Plan 2 (Medium Blue, 40%) */}
                  <circle
                    cx="146"
                    cy="146"
                    r="95"
                    fill="none"
                    stroke="#546C9F"
                    strokeWidth="85"
                    strokeDasharray="238.8 596.9"
                    strokeDashoffset="-179.1"
                  />
                  {/* Segment 3: Plan 3 (Light Blue, 30%) */}
                  <circle
                    cx="146"
                    cy="146"
                    r="95"
                    fill="none"
                    stroke="#8A9ABD"
                    strokeWidth="85"
                    strokeDasharray="179.1 596.9"
                    strokeDashoffset="-417.9"
                  />

                  {/* Sector label: Plan 1 inside Dark Blue (angle approx -36deg, rotated back +90deg to read properly) */}
                  <text
                    x="223"
                    y="90"
                    transform="rotate(90 223 90)"
                    fill="#fff"
                    fontSize="13"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    Plan 1
                  </text>
                  {/* Sector label: Plan 2 inside Medium Blue (angle approx 90deg, rotated back +90deg) */}
                  <text
                    x="146"
                    y="241"
                    transform="rotate(90 146 241)"
                    fill="#fff"
                    fontSize="13"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    Plan 2
                  </text>
                  {/* Sector label: Plan 3 inside Light Blue (angle approx 216deg, rotated back +90deg) */}
                  <text
                    x="69"
                    y="90"
                    transform="rotate(90 69 90)"
                    fill="#fff"
                    fontSize="13"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    Plan 3
                  </text>
                </svg>

                {/* Inner hole labels */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 104,
                  height: 104,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                }}>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--Foundation-neutral-neutral-800, #464646)",
                    lineHeight: "normal",
                    alignSelf: "stretch",
                    textAlign: "center"
                  }}>
                    Subscriptions
                  </span>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "var(--Foundation-neutral-neutral-950, #141414)",
                    textAlign: "center",
                    lineHeight: "normal",
                    alignSelf: "stretch",
                    marginTop: 4
                  }}>
                    26
                  </span>
                </div>
              </div>

              {/* Revenue breakdown panel */}
              <div style={{
                border: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
                borderRadius: 12,
                display: "flex",
                width: 276,
                padding: 8,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 16,
                background: "#FFF",
                boxSizing: "border-box",
              }}>
                <div style={{ paddingLeft: 8, paddingTop: 4 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#747474", display: "block" }}>
                    Revenue (EGP)
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 700, color: "#141414", display: "block", marginTop: 2 }}>
                    300,000
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch", padding: "0 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00236F" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>Plan 1</span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>
                      100,000
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch", padding: "0 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#546C9F" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>Plan 2</span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>
                      100,000
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch", padding: "0 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#8A9ABD" }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#4B5563" }}>Plan 3</span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#141414" }}>
                      100,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Plans;
