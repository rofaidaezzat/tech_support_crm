import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import Change_password from '../components/Setting/Change_password';
import { toast } from 'sonner';
import '../styles/settings-mobile.css';
import {
  useGetProfileDetailsQuery,
  useUpdateProfileInfoMutation,
  useUploadProfilePictureMutation,
} from '../app/service/crudsetting';
import { useTranslation } from '../context/LanguageContext';
import { useAuthenticatedImage } from '../hooks/useAuthenticatedImage';
// Icons
import languageIcon from '../assets/language.svg';
import lockOpen03Icon from '../assets/lock-open-03.svg';
import userProfileCircleIcon from '../assets/user-profile-circle.svg';

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
  const { data: profileResp } = useGetProfileDetailsQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileInfoMutation();
  const [uploadPhoto, { isLoading: isUploading }] = useUploadProfilePictureMutation();
  const { t, changeLanguage, language: currentLangCtx } = useTranslation();

  const profile = profileResp?.data?.profile;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const displayImageSrc = useAuthenticatedImage(avatarPreview);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFullName(`${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "");
      setPhoneNumber(profile.phone || "");
      setEmail(profile.email || "");
      setAddress(profile.address || "");
      setAvatarPreview(profile.avatar || null);
      setLanguage(profile.language === 'AR' ? 'Arabic' : 'English');
      // Only sync language from profile if the user hasn't manually chosen one yet
      const storedLang = localStorage.getItem('language');
      if (!storedLang) {
        changeLanguage(profile.language === 'AR' ? 'ar' : 'en');
      }
    }
  }, [profile]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview feedback
    setAvatarPreview(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("photo", file);
      await uploadPhoto(formData).unwrap();
      toast.success(t('settings.profilePictureUpdated') || "Profile picture updated successfully!");
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        (Array.isArray(err?.data?.message) ? err.data.message.join(", ") : null) ||
        "Failed to upload profile picture.";
      toast.error(msg);
      // Revert preview back to database path
      setAvatarPreview(profile?.avatar || null);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }
    const parts = fullName.trim().split(/\s+/);
    const first_name = parts[0] || "";
    const last_name = parts.slice(1).join(" ") || "";

    try {
      // Update profile info
      await updateProfile({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        address: address.trim() || null,
      }).unwrap();

      toast.success(t('settings.profileUpdated') || "Profile updated successfully!");
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        (Array.isArray(err?.data?.message) ? err.data.message.join(", ") : null) ||
        "Failed to update profile.";
      toast.error(msg);
    }
  };

  const getInitials = () => {
    if (!profile) return "?";
    const f = (profile.first_name || "").charAt(0);
    const l = (profile.last_name || "").charAt(0);
    return (f + l).toUpperCase() || "?";
  };

  const isBusy = isUpdating || isUploading;

  // Determine current language for radio buttons
  const currentLang = language === 'Arabic' ? 'ar' : 'en';

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 48,
    border: "1px solid rgba(212, 213, 216, 1)",
    borderRadius: 8,
    padding: "0 14px",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "#141414",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const disabledInputStyle: React.CSSProperties = {
    ...inputStyle,
    background: "rgba(237, 239, 242, 1)",
    color: "#6B7280",
    cursor: "not-allowed",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 6,
    display: "block",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#3B5BDB";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(212, 213, 216, 1)";
  };

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
          {t('settings.title')}
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
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>{t('settings.profileSection')}</span>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 1)", width: "100%", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column", padding: 32, boxSizing: "border-box" }}>

              {/* ── Profile Picture Section ── */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 16, color: "#141414", marginBottom: 4 }}>
                  {t('settings.profilePictureTitle')}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
                  {t('settings.profilePictureDesc')}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  {/* Avatar */}
                  {displayImageSrc ? (
                    <img
                      src={displayImageSrc}
                      alt={fullName}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "#8FA0C0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 26,
                        flexShrink: 0,
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
                      }}
                    >
                      {getInitials()}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                    />
                    <button
                      onClick={handleUploadClick}
                      style={{
                        height: 36,
                        padding: "0 20px",
                        borderRadius: 8,
                        border: "none",
                        background: "rgba(0, 35, 111, 1)",
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                    >
                      {t('settings.uploadPicture')}
                    </button>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF" }}>
                      PNG or JPEG
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Basic Profile Details Section ── */}
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 16, color: "#141414", marginBottom: 4 }}>
                  {t('settings.basicProfileTitle')}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", marginBottom: 20 }}>
                  {t('settings.basicProfileDesc')}
                </div>

                {/* Two-column form grid */}
                <div className="settings-profile-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
                  {/* Full name */}
                  <div>
                    <label style={labelStyle}>
                      {t('settings.fullNameLabel')}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  {/* Email address (read-only) */}
                  <div>
                    <label style={labelStyle}>
                      {t('settings.emailLabel')}
                    </label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      style={disabledInputStyle}
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <label style={labelStyle}>
                      {t('settings.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  {/* Address (read-only) */}
                  <div>
                    <label style={labelStyle}>
                      {t('settings.addressLabel')}
                    </label>
                    <input
                      type="text"
                      value={address}
                      readOnly
                      style={disabledInputStyle}
                    />
                  </div>
                </div>

                {/* Save button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                  <button
                    onClick={handleSave}
                    disabled={isBusy}
                    style={{
                      height: 44,
                      padding: "0 32px",
                      borderRadius: 10,
                      border: "none",
                      background: isBusy ? "rgba(212, 213, 216, 1)" : "rgba(0, 35, 111, 1)",
                      color: isBusy ? "#808080" : "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      cursor: isBusy ? "not-allowed" : "pointer",
                      transition: "background 0.2s, opacity 0.2s",
                    }}
                    onMouseEnter={e => { if (!isBusy) e.currentTarget.style.opacity = '0.9'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                  >
                    {isBusy ? (t('settings.saving') || "Saving...") : (t('settings.saveButton') || "Save")}
                  </button>
                </div>
              </div>
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
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>{t('settings.securitySection')}</span>
            </div>
            <div
              style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              onClick={() => setIsChangePasswordOpen(true)}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "rgba(20, 20, 20, 1)" }}>{t('settings.changePassword')}</span>
              <ChevronRight size={20} color="#6B7280" style={{ transform: currentLang === 'ar' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
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
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#4B5563" }}>{t('settings.languageSection')}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                onClick={async () => {
                  setLanguage('English');
                  changeLanguage('en');
                  try {
                    await updateProfile({ language: 'EN' }).unwrap();
                    toast.success("Language updated to English!");
                  } catch (err) {
                    toast.error("Failed to update language.");
                  }
                }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "24px 32px", background: language === 'English' ? "rgba(234, 239, 251, 0.5)" : "#fff",
                  borderBottom: "1px solid rgba(237, 239, 242, 1)", cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>{t('settings.english')}</span>
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
                onClick={async () => {
                  setLanguage('Arabic');
                  changeLanguage('ar');
                  try {
                    await updateProfile({ language: 'AR' }).unwrap();
                    toast.success("Language updated to Arabic!");
                  } catch (err) {
                    toast.error("Failed to update language.");
                  }
                }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "24px 32px", background: language === 'Arabic' ? "rgba(234, 239, 251, 0.5)" : "#fff",
                  cursor: "pointer", borderBottomLeftRadius: 12, borderBottomRightRadius: 12
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141414" }}>{t('settings.arabic')}</span>
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
      {isChangePasswordOpen && (
        <ModalOverlay onClose={() => setIsChangePasswordOpen(false)}>
          <Change_password
            onClose={() => setIsChangePasswordOpen(false)}
          />
        </ModalOverlay>
      )}
    </div>
  );
};

export default Settings;
