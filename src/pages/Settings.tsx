import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Edit_Profile from '../components/Setting/Edit_Profile';
import Change_password from '../components/Setting/Change_password';
import '../styles/settings-mobile.css';

// Icons
import badgeIcon from '../assets/Badge.svg';
import partnershipIcon from '../assets/Partnership.svg';
import callIcon from '../assets/Call.svg';
import badge1Icon from '../assets/Badge (1).svg';
import languageIcon from '../assets/language.svg';
import lockOpen03Icon from '../assets/lock-open-03.svg';
import phoneIcon from '../assets/phone.svg';
import userProfileCircleIcon from '../assets/user-profile-circle.svg';
import emailIcon from '../assets/email.svg';
import locationIcon from '../assets/boxicons_location.svg';
import edit03Icon from '../assets/edit-03.svg';
import bellIcon from '../assets/bell-ringing-04.svg';

// Reusable overlay for modals
const ModalOverlay = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div
    style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

const Settings = () => {
  const [taskReminder, setTaskReminder] = useState(true);
  const [followupReminder, setFollowupReminder] = useState(true);
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8 }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* ── Header ── */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 33,
            lineHeight: "100%",
            color: "rgba(0, 35, 111, 1)",
            marginBottom: 24,
          }}
        >
          Settings
        </div>

        {/* Main Container */}
        <div className="settings-main-container" style={{ display: "flex", width: "100%", gap: 24 }}>
          
          {/* ── Left Card ── */}
          <div className="settings-left-card" style={{ flex: 1.3, height: 756, borderRadius: 12, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div
              style={{
                background: "rgba(237, 239, 242, 1)",
                width: "100%",
                height: 72,
                paddingTop: 24,
                paddingRight: 32,
                paddingBottom: 24,
                paddingLeft: 32,
                boxSizing: "border-box",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderTopWidth: 1,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <img src={userProfileCircleIcon} alt="Profile" style={{ width: 24, height: 24 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>Profile</span>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 1)", width: "100%", height: 684, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column" }}>
              {/* The part of info */}
              <div className="settings-profile-info" style={{ width: "100%", height: 154, boxSizing: "border-box", padding: 24, display: "flex", gap: 16 }}>
                {/* Avatar */}
                <div style={{ width: 106, height: 106, borderRadius: "50%", background: "rgba(138, 154, 189, 1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 32, fontWeight: 700, flexShrink: 0 }}>
                  ME
                </div>
                
                {/* Right content (2 columns) */}
                <div className="settings-profile-columns" style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  
                  {/* Left Column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>Mahmoud Eldawly</span>
                    
                    <div style={{ background: "#E6E9F1", padding: "4px 8px", borderRadius: 12, display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 8, fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4B5563", alignSelf: "flex-start" }}>
                      Sales manager
                    </div>
                    
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <img src={locationIcon} alt="Location" style={{ width: 16, height: 16 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>Alexandria, Egypt</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setIsEditProfileOpen(true)}>
                      <img src={edit03Icon} alt="Edit" style={{ width: 16, height: 16 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(0, 35, 111, 1)" }}>Edit Profile</span>
                    </div>
                    
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <img src={emailIcon} alt="Email" style={{ width: 16, height: 16 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>Mahmouadeldawly@email.com</span>
                    </div>
                    
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <img src={phoneIcon} alt="Phone" style={{ width: 16, height: 16 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563" }}>01122334455</span>
                    </div>
                  </div>
    
                </div>
              </div>

              {/* Monthly Performance Rank */}
              <div style={{ width: "100%", height: 239, boxSizing: "border-box", padding: 24, display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid rgba(237, 239, 242, 1)" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414", marginBottom: 16 }}>Monthly Performance Rank</div>
                <div className="settings-rank-container" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  <div style={{ position: "relative", width: 108, height: 108, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 92 96" fill="none" style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
                      <path d="M38.9434 3.57452C42.1082 -1.19165 49.1076 -1.19165 52.2724 3.57452L53.8795 5.99466C55.9351 9.09042 59.8519 10.3631 63.3345 9.0668L66.0572 8.05345C71.4191 6.05777 77.0817 10.1719 76.8406 15.8881L76.7182 18.7906C76.5616 22.5034 78.9823 25.8352 82.5618 26.8336L85.3601 27.6141C90.8709 29.1512 93.0339 35.808 89.479 40.2908L87.6739 42.567C85.3649 45.4787 85.3649 49.597 87.6739 52.5087L89.479 54.7849C93.0339 59.2677 90.8709 65.9245 85.3601 67.4616L82.5618 68.2421C78.9823 69.2405 76.5616 72.5723 76.7182 76.2851L76.8406 79.1876C77.0817 84.9037 71.4191 89.0179 66.0572 87.0222L63.3346 86.0089C59.8519 84.7126 55.9351 85.9853 53.8795 89.081L52.2724 91.5012C49.1076 96.2673 42.1082 96.2673 38.9434 91.5012L37.3364 89.081C35.2807 85.9853 31.364 84.7126 27.8813 86.0089L25.1586 87.0222C19.7968 89.0179 14.1341 84.9037 14.3752 79.1876L14.4976 76.2851C14.6542 72.5723 12.2335 69.2405 8.65404 68.2421L5.85576 67.4616C0.344879 65.9245 -1.81806 59.2677 1.73685 54.7849L3.54195 52.5087C5.85096 49.597 5.85096 45.4787 3.54194 42.567L1.73685 40.2908C-1.81806 35.808 0.344883 29.1512 5.85576 27.6141L8.65404 26.8336C12.2335 25.8352 14.6542 22.5034 14.4976 18.7906L14.3752 15.8881C14.1341 10.1719 19.7968 6.05778 25.1586 8.05345L27.8813 9.0668C31.364 10.3631 35.2807 9.09042 37.3364 5.99466L38.9434 3.57452Z" fill="#F1EEE6"/>
                    </svg>
                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4B5563", textAlign: "center", lineHeight: "120%" }}>Current<br/>Rank</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 19, fontWeight: 500, color: "#141414", textAlign: "center", lineHeight: "100%" }}>1st</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                    {[{ rank: "1st", name: "Mahmoud Eldawly", target: "80%", width: "80%", active: true },
                      { rank: "2nd", name: "Mahmoud Eldawly", target: "70%", width: "70%", active: false },
                      { rank: "3rd", name: "Mahmoud Eldawly", target: "60%", width: "60%", active: false }].map((item, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px", background: item.active ? "#F1EEE6" : "transparent", borderRadius: 8 }}>
                        
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ width: 120, fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: item.active ? 600 : 400, color: item.active ? "#141414" : "#4B5563" }}>{item.rank}</span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: item.active ? 600 : 400, color: item.active ? "#141414" : "#4B5563" }}>{item.name}</span>
                        </div>

                        {/* the part of target */}
                        <div style={{ width: 114, height: 36, display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4B5563" }}>Target</span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#141414" }}>{item.target}</span>
                          </div>
                          {/* the progress */}
                          <div style={{ width: 114, height: 10, background: "rgba(216, 216, 216, 1)", borderRadius: 4, position: "relative" }}>
                            <div style={{ width: item.width, height: 10, background: "rgba(0, 35, 111, 1)", borderRadius: 4, position: "absolute", left: 0, top: 0 }}></div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievement Badges */}
              <div style={{ width: "100%", height: 291, boxSizing: "border-box", padding: 24, display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid rgba(237, 239, 242, 1)" }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, color: "#141414" }}>Achievement Badges</div>
                <div className="settings-badges-container" style={{ width: "100%", height: 208, display: "flex", gap: 24 }}>
                  {[{ icon: badgeIcon, title: "Streak Master", desc: "Completed 3 months target streak" },
                    { icon: partnershipIcon, title: "Deal Breaker", desc: "Completed 50 deals this month" },
                    { icon: callIcon, title: "Call Hunter", desc: "Completed 3000 call this month" },
                    { icon: badge1Icon, title: "Top Performer", desc: "Ending the month with 1st rank" }].map((item, index) => (
                    <div key={index} style={{ flex: 1, background: "rgba(249, 250, 251, 1)", border: "1px solid rgba(237, 239, 242, 1)", borderRadius: 12, padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                      <img src={item.icon} alt={item.title} style={{ width: 48, height: 48 }} />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141414" }}>{item.title}</span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Card Column ── */}
          <div className="settings-right-card" style={{ flex: 1, height: 702, display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Notifications */}
            <div style={{ width: "100%", height: 294, borderRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 1)", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  background: "rgba(237, 239, 242, 1)",
                  width: "100%",
                  height: 72,
                  paddingTop: 24,
                  paddingRight: 32,
                  paddingBottom: 24,
                  paddingLeft: 32,
                  boxSizing: "border-box",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderTopWidth: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <img src={bellIcon} alt="Notifications" style={{ width: 24, height: 24 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>Notifications</span>
              </div>
              <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid rgba(237, 239, 242, 1)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "80%" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>Task Reminder</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280", lineHeight: "140%" }}>
                      Receive Alerts when a scheduled task is approaching its deadline.
                    </span>
                  </div>
                  <div
                    onClick={() => setTaskReminder(!taskReminder)}
                    style={{
                      width: 44,
                      height: 24,
                      background: taskReminder ? "rgba(0, 35, 111, 1)" : "rgba(212, 213, 216, 1)",
                      borderRadius: 12,
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ width: 20, height: 20, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: taskReminder ? 22 : 2, transition: "all 0.2s" }} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "80%" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>Followup Reminder</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280", lineHeight: "140%" }}>
                      Receive Alerts for neglected leads approaching their followup time.
                    </span>
                  </div>
                  <div
                    onClick={() => setFollowupReminder(!followupReminder)}
                    style={{
                      width: 44,
                      height: 24,
                      background: followupReminder ? "rgba(0, 35, 111, 1)" : "rgba(212, 213, 216, 1)",
                      borderRadius: 12,
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ width: 20, height: 20, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: followupReminder ? 22 : 2, transition: "all 0.2s" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div style={{ width: "100%", height: 144, borderRadius: 12, boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)", background: "rgba(255, 255, 255, 1)", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  background: "rgba(237, 239, 242, 1)",
                  width: "100%",
                  height: 72,
                  paddingTop: 24,
                  paddingRight: 32,
                  paddingBottom: 24,
                  paddingLeft: 32,
                  boxSizing: "border-box",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderTopWidth: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <img src={lockOpen03Icon} alt="Security" style={{ width: 24, height: 24 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>Security</span>
              </div>
              <div
                style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={() => setIsChangePasswordOpen(true)}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "rgba(20, 20, 20, 1)" }}>Change Password</span>
                <ChevronRight size={20} color="#6B7280" />
              </div>
            </div>

            {/* Language */}
            <div style={{ width: "100%", height: 216, borderRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 1)", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  background: "rgba(237, 239, 242, 1)",
                  width: "100%",
                  height: 72,
                  paddingTop: 24,
                  paddingRight: 32,
                  paddingBottom: 24,
                  paddingLeft: 32,
                  boxSizing: "border-box",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderTopWidth: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <img src={languageIcon} alt="Language" style={{ width: 24, height: 24 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>Language</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  onClick={() => setLanguage('English')}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "24px 32px", background: language === 'English' ? "rgba(237, 239, 242, 0.5)" : "#fff",
                    borderBottom: "1px solid rgba(237, 239, 242, 1)", cursor: "pointer",
                  }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>English</span>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: language === 'English' ? "6px solid rgba(0, 35, 111, 1)" : "1px solid rgba(212, 213, 216, 1)", boxSizing: "border-box" }} />
                </div>
                <div
                  onClick={() => setLanguage('Arabic')}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "24px 32px", background: language === 'Arabic' ? "rgba(237, 239, 242, 0.5)" : "#fff",
                    cursor: "pointer", borderBottomLeftRadius: 12, borderBottomRightRadius: 12
                  }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>Arabic</span>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: language === 'Arabic' ? "6px solid rgba(0, 35, 111, 1)" : "1px solid rgba(212, 213, 216, 1)", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditProfileOpen && (
        <ModalOverlay onClose={() => setIsEditProfileOpen(false)}>
          <Edit_Profile onClose={() => setIsEditProfileOpen(false)} />
        </ModalOverlay>
      )}
      {isChangePasswordOpen && (
        <ModalOverlay onClose={() => setIsChangePasswordOpen(false)}>
          <Change_password onClose={() => setIsChangePasswordOpen(false)} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default Settings;
