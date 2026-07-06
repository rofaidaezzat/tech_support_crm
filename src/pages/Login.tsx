import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import rightImage from '../assets/7a32fb9fa7972d76a87f5709de18f309ed2c16f1.png';
import { useLoginMutation } from '../app/service/crudauth';
import { toast } from 'sonner';
import { validateLogin } from '../validation';
import { useTranslation } from '../context/LanguageContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      let translatedErr = firstError;
      if (firstError === 'Email is required') {
        translatedErr = t('auth.emailRequired');
      } else if (firstError === 'Invalid email address') {
        translatedErr = t('auth.invalidEmail');
      } else if (firstError === 'Password is required') {
        translatedErr = t('auth.passwordRequired');
      }
      toast.error(translatedErr);
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      const userType = result?.data?.user?.user_type;
      if (userType === 'SALES_MANAGER') {
        navigate('/leads');
      } else {
        navigate('/leads');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errMsg = err?.data?.message || err?.message || t('auth.loginFailed');
      toast.error(errMsg);
    }
  };

  return (
    <div className="auth-container" style={{
      width: "100%",
      height: "100vh",
      background: "#F5F6FA",
      display: "flex",
      padding: "88px 24px",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Inter, sans-serif",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      <style>{`
        @media (max-width: 1024px) {
          .auth-container {
            height: auto !important;
            min-height: 100vh !important;
            padding: 24px 16px !important;
            overflow-y: auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .auth-inner-wrapper {
            flex-direction: column !important;
            justify-content: center !important;
            gap: 0 !important;
            height: auto !important;
          }
          .auth-left-card {
            width: 100% !important;
            height: auto !important;
            padding: 40px 16px !important;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05) !important;
            background: #FFF !important;
            border-radius: 12px !important;
          }
          .auth-content-wrapper {
            width: 100% !important;
            max-width: 380px !important;
            gap: 40px !important;
          }
          .auth-right-banner {
            display: none !important;
          }
          .auth-submit-btn {
            width: 100% !important;
          }
        }
      `}</style>
      {/* Main Container */}
      <div className="auth-inner-wrapper" style={{
        display: "flex",
        width: "100%",
        height: "100%",
        gap: 24,
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        
        {/* Left Part */}
        <div className="auth-left-card" style={{
          boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
          background: "rgba(255, 255, 255, 1)",
          flex: 1,
          height: "100%",
          borderRadius: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {/* Logo and Form Container */}
          <div className="auth-content-wrapper" style={{
            display: "flex",
            width: 380,
            flexDirection: "column",
            alignItems: "center",
            gap: 56,
            flexShrink: 0
          }}>
            
            {/* Header (Logo + Welcome back) */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                <g clipPath="url(#clip0_2268_44812)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M35.778 16.3594C33.4757 14.8211 30.7689 14 28 14V0C33.5378 0 38.9514 1.64217 43.556 4.71885C48.1606 7.79552 51.7493 12.1685 53.8686 17.2848C55.9878 22.4011 56.5424 28.0311 55.462 33.4625C54.3816 38.894 51.7149 43.8831 47.7989 47.7989C43.8831 51.7149 38.894 54.3816 33.4625 55.462C28.0311 56.5424 22.4011 55.9878 17.2848 53.8686C12.1685 51.7493 7.79552 48.1606 4.71885 43.556C1.64217 38.9514 0 33.5378 0 28H14C14 30.7689 14.8211 33.4757 16.3594 35.778C17.8977 38.0803 20.0843 39.8747 22.6425 40.9343C25.2006 41.994 28.0155 42.2712 30.7313 41.7309C33.447 41.1908 35.9415 39.8574 37.8995 37.8995C39.8574 35.9415 41.1908 33.447 41.7309 30.7313C42.2712 28.0155 41.994 25.2006 40.9343 22.6425C39.8747 20.0843 38.0803 17.8977 35.778 16.3594Z" fill="#007DFC"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14 6.06375e-06C14 1.83851 13.6379 3.65901 12.9343 5.35756C12.2308 7.05613 11.1995 8.59947 9.89948 9.8995C8.59949 11.1995 7.05613 12.2308 5.35756 12.9343C3.659 13.6379 1.83851 14 6.11954e-07 14L0 28C3.67702 28 7.31801 27.2758 10.7152 25.8686C14.1123 24.4615 17.199 22.399 19.7989 19.7989C22.399 17.199 24.4615 14.1123 25.8686 10.7151C27.2758 7.31801 28 3.677 28 0L14 6.06375e-06Z" fill="#007DFC"/>
                </g>
                <defs>
                  <clipPath id="clip0_2268_44812">
                    <rect width="56" height="56" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <h1 style={{
                margin: 0,
                color: "var(--Foundation-neutral-neutral-950, #141414)",
                fontFamily: "Inter, sans-serif",
                fontSize: "23px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal"
              }}>
                {t("auth.welcomeBack")}
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "100%", gap: 32 }}>

              {/* Inputs Wrapper */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                
                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 14, color: "#374151" }}>{t("auth.emailLabel")}<span style={{ color: "#00236F" }}>*</span></label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderRadius: 8,
                      background: "transparent",
                      border: email ? "1px solid var(--Foundation-neutral-neutral-500, #808080)" : "1px solid #D4D5D8",
                      display: "flex",
                      height: 36,
                      padding: "12px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignSelf: "stretch",
                      boxSizing: "border-box",
                      width: "100%",
                      outline: "none",
                      fontSize: 14,
                      transition: "border 0.2s ease"
                    }}
                  />
                </div>

                {/* Password */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 14, color: "#374151" }}>{t("auth.passwordLabel")}<span style={{ color: "#00236F" }}>*</span></label>
                  <div style={{ position: "relative", display: "flex", width: "100%" }}>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        borderRadius: 8,
                        background: "transparent",
                        border: password ? "1px solid var(--Foundation-neutral-neutral-500, #808080)" : "1px solid #D4D5D8",
                        display: "flex",
                        height: 36,
                        padding: language === 'ar' ? "12px 12px 12px 40px" : "12px 40px 12px 12px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                        boxSizing: "border-box",
                        width: "100%",
                        outline: "none",
                        fontSize: 14,
                        transition: "border 0.2s ease"
                      }}
                    />
                    {password && (
                      <div 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: language === 'ar' ? "auto" : 12,
                          left: language === 'ar' ? 12 : "auto",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--Foundation-neutral-neutral-800, #464646)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--Foundation-neutral-neutral-800, #464646)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                    <span 
                      onClick={() => navigate("/reset-password")}
                      style={{
                        color: "var(--Foundation-brand-brand-500, #00236F)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "140%",
                        textDecoration: "none",
                        cursor: "pointer"
                      }}
                    >
                      {t("auth.forgotPasswordLink")}
                    </span>
                  </div>
                </div>

              </div>

              {/* Login Button */}
              <button 
                className="auth-submit-btn"
                type="submit"
                disabled={isLoading}
                style={{
                  background: isLoading ? "rgba(0, 35, 111, 0.6)" : "rgba(0, 35, 111, 1)",
                  width: 380,
                  height: 48,
                  borderRadius: 12,
                  padding: "8px 24px",
                  color: "#FFF",
                  fontSize: 16,
                  fontWeight: 500,
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 0.3s ease"
                }}
              >
                {isLoading ? t("auth.loggingIn") : t("auth.loginButton")}
              </button>

            </form>

          </div>
        </div>

        {/* Right Part (Image Container) */}
        <div className="auth-right-banner" style={{
          flex: 1,
          height: "100%",
          borderRadius: 12,
          overflow: "hidden",
          background: "#081329",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <img 
            src={rightImage} 
            alt="Login banner" 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
