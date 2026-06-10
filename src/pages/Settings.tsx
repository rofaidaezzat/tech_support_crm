import React, { useState } from 'react';
import { ChevronRight, Laptop } from 'lucide-react';
import Edit_Profile from '../components/Setting/Edit_Profile';
import Change_password from '../components/Setting/Change_password';
import Manage_Connected_Devive from '../components/Setting/Manage_Connected_Devive';
import { toast } from 'sonner';
import '../styles/settings-mobile.css';

// Icons
import languageIcon from '../assets/language.svg';
import lockOpen03Icon from '../assets/lock-open-03.svg';
import phoneIcon from '../assets/phone.svg';
import userProfileCircleIcon from '../assets/user-profile-circle.svg';
import emailIcon from '../assets/email.svg';
import edit03Icon from '../assets/edit-03.svg';
import mahmoudAvatar from '../assets/mahmoud_avatar.png';

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
  const [fullName, setFullName] = useState("Mahmoud Eldawly");
  const [phoneNumber, setPhoneNumber] = useState("01122334455");
  const [email] = useState("Mahmouadeldawly@email.com");
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isManageDevicesOpen, setIsManageDevicesOpen] = useState(false);

  const handleManageDevices = () => {
    setIsManageDevicesOpen(true);
  };

  return (
    <div style={{ width: "100%", paddingBottom: 24, paddingTop: 8, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 730, display: "flex", flexDirection: "column" }}>
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

        {/* Main Stack Container */}
        <div className="settings-main-container" style={{ display: "flex", flexDirection: "column", width: "100%", gap: 24 }}>
          
          {/* ── Profile Card ── */}
          <div className="settings-left-card" style={{ borderRadius: 12, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div
              style={{
                background: "rgba(237, 239, 242, 1)",
                width: "100%",
                height: 72,
                paddingLeft: 32,
                paddingRight: 32,
                boxSizing: "border-box",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderTopWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(212, 213, 216, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <img src={userProfileCircleIcon} alt="Profile" style={{ width: 24, height: 24 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>Profile</span>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 1)", width: "100%", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column" }}>
              <div className="settings-profile-info" style={{ width: "100%", boxSizing: "border-box", padding: 32, display: "flex", alignItems: "center", gap: 24 }}>
                {/* Avatar */}
                <img 
                  src={mahmoudAvatar} 
                  alt="Mahmoud Eldawly" 
                  style={{ 
                    width: 96, 
                    height: 96, 
                    borderRadius: "50%", 
                    objectFit: "cover", 
                    flexShrink: 0,
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
                  }} 
                />
                
                {/* Details Column */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: "#141414" }}>{fullName}</span>
                    <div 
                      style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "rgba(0, 35, 111, 1)" }} 
                      onClick={() => setIsEditProfileOpen(true)}
                    >
                      <img src={edit03Icon} alt="Edit" style={{ width: 16, height: 16 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500 }}>Edit Profile</span>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <img src={emailIcon} alt="Email" style={{ width: 16, height: 16 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B7280" }}>{email}</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <img src={phoneIcon} alt="Phone" style={{ width: 16, height: 16 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6B7280" }}>{phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Devices Card ── */}
          <div style={{ width: "100%", borderRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 1)", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                background: "rgba(237, 239, 242, 1)",
                width: "100%",
                height: 72,
                paddingLeft: 32,
                paddingRight: 32,
                boxSizing: "border-box",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderTopWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(212, 213, 216, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Laptop size={24} color="#4B5563" />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>Devices</span>
            </div>
            <div
              style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              onClick={handleManageDevices}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "rgba(20, 20, 20, 1)" }}>Manage Connected Devices</span>
              <ChevronRight size={20} color="#6B7280" />
            </div>
          </div>

          {/* ── Security Card ── */}
          <div style={{ width: "100%", borderRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 1)", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                background: "rgba(237, 239, 242, 1)",
                width: "100%",
                height: 72,
                paddingLeft: 32,
                paddingRight: 32,
                boxSizing: "border-box",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderTopWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(212, 213, 216, 0.5)",
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

          {/* ── Language Card ── */}
          <div style={{ width: "100%", borderRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", background: "rgba(255, 255, 255, 1)", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                background: "rgba(237, 239, 242, 1)",
                width: "100%",
                height: 72,
                paddingLeft: 32,
                paddingRight: 32,
                boxSizing: "border-box",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderTopWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(212, 213, 216, 0.5)",
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
                  padding: "24px 32px", background: language === 'English' ? "rgba(234, 239, 251, 0.5)" : "#fff",
                  borderBottom: "1px solid rgba(237, 239, 242, 1)", cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>English</span>
                {language === 'English' ? (
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "2px solid rgba(0, 35, 111, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    background: "#fff"
                  }}>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(0, 35, 111, 1)"
                    }} />
                  </div>
                ) : (
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid rgba(212, 213, 216, 1)",
                    boxSizing: "border-box",
                    background: "#fff"
                  }} />
                )}
              </div>
              <div
                onClick={() => setLanguage('Arabic')}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "24px 32px", background: language === 'Arabic' ? "rgba(234, 239, 251, 0.5)" : "#fff",
                  cursor: "pointer", borderBottomLeftRadius: 12, borderBottomRightRadius: 12
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>Arabic</span>
                {language === 'Arabic' ? (
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "2px solid rgba(0, 35, 111, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    background: "#fff"
                  }}>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "rgba(0, 35, 111, 1)"
                    }} />
                  </div>
                ) : (
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid rgba(212, 213, 216, 1)",
                    boxSizing: "border-box",
                    background: "#fff"
                  }} />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      {isEditProfileOpen && (
        <ModalOverlay onClose={() => setIsEditProfileOpen(false)}>
          <Edit_Profile 
            onClose={() => setIsEditProfileOpen(false)} 
            onSave={(data) => {
              setFullName(data.fullName);
              setPhoneNumber(data.phoneNumber);
              setIsEditProfileOpen(false);
            }}
          />
        </ModalOverlay>
      )}
      {isChangePasswordOpen && (
        <ModalOverlay onClose={() => setIsChangePasswordOpen(false)}>
          <Change_password onClose={() => setIsChangePasswordOpen(false)} />
        </ModalOverlay>
      )}
      {isManageDevicesOpen && (
        <ModalOverlay onClose={() => setIsManageDevicesOpen(false)}>
          <Manage_Connected_Devive onClose={() => setIsManageDevicesOpen(false)} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default Settings;
