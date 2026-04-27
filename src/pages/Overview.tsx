import React from 'react';
import deadlineIcon from '../assets/deadline.svg';
import callEmailIcon from '../assets/Call Email.svg';
import addUserIcon from '../assets/add user to group.svg';

import phoneCallIcon from '../assets/phone-call-01.svg';
import coinIcon from '../assets/coin-unbroken.svg';
import checkSquareIcon from '../assets/check-square-broken.svg';
import mapImage from '../assets/e05b9827c703ebae7eecb4a5cb3d31a12982d2db.png';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { name: 'Jan', Achieved: 15000, Target: 16000 },
  { name: 'Feb', Achieved: 18000, Target: 16000 },
  { name: 'Mar', Achieved: 20000, Target: 20000 },
  { name: 'Apr', Achieved: 18000, Target: 20000 },
  { name: 'May', Achieved: 17000, Target: 18000 },
  { name: 'June', Achieved: 13000, Target: 18000 },
  { name: 'July', Achieved: 17000, Target: 18000 },
  { name: 'Aug', Achieved: 20000, Target: 18000 },
  { name: 'Sep', Achieved: 17000, Target: 18000 },
];

const leadsStatusData = [
  { name: 'Fresh', value: 24, fill: '#5CBA77', count: 200, percentage: '25%' },
  { name: 'Followup', value: 20, fill: '#73A9E8', count: 200, percentage: '25%' },
  { name: 'Interested', value: 16, fill: '#9660CA', count: 200, percentage: '25%' },
  { name: 'Not interested', value: 12, fill: '#FCBE7B', count: 200, percentage: '25%' },
  { name: 'Meeting', value: 9, fill: '#62B5B7', count: 200, percentage: '25%' },
  { name: 'Wrong number', value: 6, fill: '#E26D68', count: 200, percentage: '25%' },
  { name: 'No answer', value: 7, fill: '#4B729B', count: 200, percentage: '25%' },
  { name: 'Waiting', value: 6, fill: '#F6D371', count: 200, percentage: '25%' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" fontSize={12} fontFamily="Inter, sans-serif" fontWeight={500} textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Overview = () => {
  const cards = [
    {
      title: "Followups Today",
      count: "10",
      subtitle: "pending",
      icon: deadlineIcon
    },
    {
      title: "Tasks Due Today",
      count: "10",
      subtitle: "pending",
      icon: callEmailIcon
    },
    {
      title: "New Leads",
      count: "10",
      subtitle: "freshers",
      icon: addUserIcon
    }
  ];

  return (
    <div >
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        
        {/* Left section: Summary Cards & Charts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 909 }}>
          
          {/* Row 1: Summary Cards */}
          <div style={{
            display: "flex",
            width: "100%",
            height: 127,
            gap: 24
          }}>
            {cards.map((card, index) => (
              <div key={index} style={{
                background: "rgba(255, 255, 255, 1)",
                boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
                width: 287,
                height: 127,
                borderRadius: 12,
                padding: "32px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxSizing: "border-box"
              }}>
                {/* Icon circle */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "#F4F5F7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <img src={card.icon} alt={card.title} width={40} height={40} />
                </div>
                
                {/* Text content */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ 
                    fontFamily: "Inter, sans-serif", 
                    fontSize: 16, 
                    fontWeight: 400, 
                    color: "#111827" 
                  }}>
                    {card.title}
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ 
                      fontFamily: "Inter, sans-serif", 
                      fontSize: 24, 
                      fontWeight: 600, 
                      color: "#111827",
                      lineHeight: 1
                    }}>
                      {card.count}
                    </span>
                    <span style={{ 
                      fontFamily: "Inter, sans-serif", 
                      fontSize: 14, 
                      fontWeight: 400, 
                      color: "#6B7280" 
                    }}>
                      {card.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Charts */}
          <div style={{ display: "flex", width: "100%", gap: 24 }}>
            
            {/* Column 1 (Left): Monthly Revenue & Leads Status */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Monthly Revenue Performance Graph */}
              <div style={{
                boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
                background: "rgba(255, 255, 255, 1)",
                width: 598,
                height: 383,
                borderRadius: 12,
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                boxSizing: "border-box"
              }}>
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 19,
                  fontWeight: 400,
                  color: "rgba(20, 20, 20, 1)"
                }}>
                  Monthly Revenue Performance (in EGP)
                </span>

                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                      barGap={2}
                      barSize={17}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={true} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: "#6B7280" }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: "#6B7280" }} 
                        ticks={[0, 4000, 8000, 12000, 16000, 20000]}
                        tickFormatter={(value) => value === 0 ? "0" : `${value / 1000}K`}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(244, 245, 247, 0.5)' }}
                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}
                      />
                      <Legend 
                        iconType="square"
                        iconSize={10}
                        wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
                      />
                      <Bar dataKey="Achieved" fill="#9E8CFF" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="Target" fill="#FFA39E" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Leads Status Distribution */}
              <div style={{
                boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
                background: "rgba(255, 255, 255, 1)",
                width: 598,
                height: 389,
                borderRadius: 12,
                padding: "16px 13px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                boxSizing: "border-box"
              }}>
                {/* Header */}
                <div style={{
                  width: 572,
                  height: 40,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: 18, fontWeight: 400, color: "#111827", fontFamily: "Inter, sans-serif" }}>Leads Status Distribution</span>
                  <button style={{
                    border: "1px solid rgba(212, 213, 216, 1)",
                    background: "transparent",
                    height: 40,
                    borderRadius: 12,
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "#374151"
                  }}>
                    This month
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                </div>

                {/* Content: Graph & Legend */}
                <div style={{
                  width: 572,
                  height: 280,
                  display: "flex",
                  alignItems: "center",
                  gap: 32
                }}>
                  
                  {/* Donut Chart */}
                  <div style={{
                    width: 273,
                    height: 280,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={leadsStatusData}
                          innerRadius={70}
                          outerRadius={135}
                          dataKey="value"
                          stroke="#ffffff"
                          strokeWidth={2}
                          labelLine={false}
                          label={renderCustomizedLabel}
                        >
                          {leadsStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Centered Text */}
                    <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none" }}>
                      <span style={{ fontSize: 12, color: "#6B7280", fontFamily: "Inter, sans-serif" }}>Total Leads</span>
                      <span style={{ fontSize: 24, fontWeight: 700, color: "#111827", fontFamily: "Inter, sans-serif" }}>1,248</span>
                    </div>
                  </div>

                  {/* Legend / Status List */}
                  <div style={{
                    width: 247,
                    height: 264,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    justifyContent: "center"
                  }}>
                    {leadsStatusData.map((status, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, width: 120 }}>
                          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: status.fill, flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: "#374151", fontFamily: "Inter, sans-serif" }}>{status.name}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <span style={{ fontSize: 14, color: "#374151", fontFamily: "Inter, sans-serif", width: 30, textAlign: "right" }}>{status.count}</span>
                          <span style={{ fontSize: 14, color: "#6B7280", fontFamily: "Inter, sans-serif", width: 36, textAlign: "right" }}>{status.percentage}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* Column 2 (Right): Revenue Target */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Revenue Target card */}
              <div style={{
                boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
                background: "rgba(255, 255, 255, 1)",
                width: 287,
                height: 383,
              borderRadius: 12,
              padding: "32px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxSizing: "border-box"
            }}>
              {/* Title and date */}
              <div style={{
                width: 255,
                height: 23,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ fontSize: 18, fontWeight: 400, color: "#111827", fontFamily: "Inter, sans-serif" }}>Revenue Target</span>
                <span style={{ fontSize: 14, color: "#6B7280", fontFamily: "Inter, sans-serif" }}>April 2026</span>
              </div>

              {/* Main content wrapper */}
              <div style={{
                width: 255,
                height: 286,
                display: "flex",
                flexDirection: "column",
                gap: 16
              }}>
                {/* Pricing row */}
                <div style={{
                  width: 213,
                  height: 54,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "#111827", fontFamily: "Inter, sans-serif" }}>25,000 EGP</span>
                    <span style={{ fontSize: 14, color: "#111827", fontFamily: "Inter, sans-serif" }}>/40,000 EGP</span>
                  </div>
                  <span style={{ fontSize: 14, color: "#6B7280", fontFamily: "Inter, sans-serif" }}>Only 15,000 left !</span>
                </div>

                {/* The graph */}
                <div style={{
                  width: 255,
                  height: 216,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Completed', value: 60, fill: '#00236F' },
                          { name: 'Remaining', value: 40, fill: '#B3BDD2' }
                        ]}
                        innerRadius={65}
                        outerRadius={85}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={0}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Centered text in PieChart */}
                  <div style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none"
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                      <span style={{ 
                        fontSize: 59.6, 
                        fontWeight: 700, 
                        color: "rgba(255, 255, 255, 1)", 
                        fontFamily: "'Noto Sans', sans-serif", 
                        WebkitTextStroke: "1.66px rgba(0, 0, 0, 1)" 
                      }}>60</span>
                      <span style={{ 
                        fontSize: 38.63, 
                        fontWeight: 700, 
                        color: "rgba(255, 255, 255, 1)", 
                        fontFamily: "'Noto Sans', sans-serif", 
                        WebkitTextStroke: "1.07px rgba(0, 0, 0, 1)",
                        marginLeft: 2
                      }}>%</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#00236F", fontFamily: "Inter, sans-serif", fontWeight: 500, marginTop: -4 }}>Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Snapshot card */}
            <div style={{
              boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
              background: "rgba(255, 255, 255, 1)",
              width: 287,
              height: 389,
              borderRadius: 12,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              boxSizing: "border-box"
            }}>
              {/* Header */}
              <span style={{ fontSize: 19, fontWeight: 400, color: "#141414", fontFamily: "Inter, sans-serif" }}>Monthly Snapshot</span>
              
              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {[
                  { icon: coinIcon, title: "Deals", value: "10" },
                  { icon: phoneCallIcon, title: "Calls", value: "10" },
                  { icon: checkSquareIcon, title: "Tasks finished", value: "10" }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: "#F5F6FA",
                    width: 255,
                    height: 88,
                    borderRadius: 12,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    boxSizing: "border-box"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src={item.icon} alt={item.title} width={24} height={24} />
                      <span style={{ fontSize: 16, color: "#141414", fontFamily: "Inter, sans-serif" }}>{item.title}</span>
                    </div>
                    <span style={{ fontSize: 23, fontWeight: 700, color: "#141414", fontFamily: "Inter, sans-serif", lineHeight: 1 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
        </div>
        {/* End of Left section */}

        {/* Right section: Calendar & Top Deals Location */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 341 }}>
          {/* Calendar Widget */}
          <div style={{
          boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
          background: "rgba(255, 255, 255, 1)",
          width: 341,
          height: 534,
          borderRadius: 12,
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          boxSizing: "border-box"
        }}>
          {/* Calendar Header & Days (Part 1) */}
          <div style={{ width: 293, height: 110, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 500, color: "#111827", fontFamily: "Inter, sans-serif" }}>Calender</span>
              <button style={{
                border: "1px solid rgba(212, 213, 216, 1)",
                background: "rgba(230, 233, 241, 1)",
                width: 101,
                height: 40,
                borderRadius: 12,
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#374151",
                borderWidth: 1
              }}>
                Month
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
            
            {/* Days row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ cursor: "pointer", color: "#374151", fontWeight: 600 }}>{'<'}</span>
              <div style={{ display: "flex", gap: 16, borderBottom: "1px solid transparent" }}>
                {[1, 2, 3, 4, 5].map((item, index) => {
                  const isActive = index === 0;
                  return (
                    <div key={index} style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: isActive ? "#1D4ED8" : "#6B7280",
                      borderBottom: isActive ? "2px solid #1D4ED8" : "2px solid transparent",
                      paddingBottom: 8,
                      marginBottom: -9,
                      fontFamily: "Inter, sans-serif",
                      gap: 4,
                      zIndex: isActive ? 1 : 0
                    }}>
                      <span style={{ fontSize: 12 }}>Sun</span>
                      <span style={{ fontSize: 14 }}>6</span>
                    </div>
                  );
                })}
              </div>
              <span style={{ cursor: "pointer", color: "#374151", fontWeight: 600 }}>{'>'}</span>
            </div>
            <div style={{ borderTop: "1px solid #E5E7EB", width: "100%", marginTop: -8 }}></div>
          </div>

          {/* Tasks & Followups (Part 2) */}
          <div style={{ width: 293, height: 340, display: "flex", flexDirection: "column", gap: 12 }}>
            
            {/* Tasks section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontWeight: 600, fontSize: 14, fontFamily: "Inter, sans-serif", color: "#111827" }}>Tasks</span>
              {[
                "Weekly meeting with the team.",
                "Calling yesterday low priority leads.",
                "Revise latest deals."
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#BBE5B3', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#374151', fontFamily: "Inter, sans-serif" }}>{text}</span>
                </div>
              ))}
              <span style={{ fontSize: 12, color: '#1D4ED8', textDecoration: 'underline', cursor: 'pointer', fontFamily: "Inter, sans-serif", marginTop: 4 }}>View more</span>
            </div>

            <div style={{ borderTop: "1px solid #E5E7EB", width: "100%", margin: "8px 0" }}></div>

            {/* Followups section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontWeight: 600, fontSize: 14, fontFamily: "Inter, sans-serif", color: "#111827" }}>Followups</span>
              {[
                "Followup with Raef Ahmed",
                "Followup with Raef Ahmed",
                "Followup with Raef Ahmed"
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FDE08B', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#374151', fontFamily: "Inter, sans-serif" }}>{text}</span>
                </div>
              ))}
              <span style={{ fontSize: 12, color: '#1D4ED8', textDecoration: 'underline', cursor: 'pointer', fontFamily: "Inter, sans-serif", marginTop: 4 }}>View more</span>
            </div>

          </div>
        </div>

        {/* Top Deals Location */}
        <div style={{
          boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
          background: "rgba(255, 255, 255, 1)",
          width: 341,
          height: 389,
          borderRadius: 12,
          padding: "32px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          boxSizing: "border-box"
        }}>
          <span style={{ fontSize: 19, fontWeight: 400, color: "rgba(20, 20, 20, 1)", fontFamily: "Inter, sans-serif" }}>Top Deals Location</span>
          
          <img src={mapImage} alt="Map" style={{ width: 309, height: 146, borderRadius: 12, objectFit: "cover" }} />

          <div style={{ width: 309, height: 144, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { name: "1. Cairo", percent: "25%" },
              { name: "2. Giza", percent: "25%" },
              { name: "3. Alexandria", percent: "25%" },
              { name: "4. Mansoura", percent: "25%" },
            ].map((loc, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "#374151", fontFamily: "Inter, sans-serif" }}>{loc.name}</span>
                <span style={{ fontSize: 14, color: "#111827", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{loc.percent}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Overview;