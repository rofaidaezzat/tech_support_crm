import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ManageConnectedDevicesProps {
  onClose: () => void;
}

const DeviceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19.2"
    height="15.6"
    viewBox="0 0 22 18"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <path
      d="M18 12.4C18 12.9523 18.4477 13.4 19 13.4C19.5523 13.4 20 12.9523 20 12.4H19H18ZM1.2 12.4C1.2 12.9523 1.64772 13.4 2.2 13.4C2.75228 13.4 3.2 12.9523 3.2 12.4H2.2H1.2ZM4.3 1V2H16.9V1V0H4.3V1ZM19 3.03077H18V12.4H19H20V3.03077H19ZM2.2 12.4H3.2V3.03077H2.2H1.2V12.4H2.2ZM16.9 1V2C17.5394 2 18 2.49282 18 3.03077H19H20C20 1.32559 18.5802 0 16.9 0V1ZM4.3 1V0C2.61978 0 1.2 1.32559 1.2 3.03077H2.2H3.2C3.2 2.49282 3.66062 2 4.3 2V1ZM2.2 13V14H19V13V12H2.2V13ZM20.2 14.2H19.2V15.4H20.2H21.2V14.2H20.2ZM19 16.6V15.6H2.2V16.6V17.6H19V16.6ZM1 15.4H2V14.2H1H0V15.4H1ZM2.2 16.6V15.6C2.08954 15.6 2 15.5105 2 15.4H1H0C0 16.615 0.984974 17.6 2.2 17.6V16.6ZM20.2 15.4H19.2C19.2 15.5105 19.1105 15.6 19 15.6V16.6V17.6C20.215 17.6 21.2 16.615 21.2 15.4H20.2ZM19 13V14C19.1105 14 19.2 14.0895 19.2 14.2H20.2H21.2C21.2 12.985 20.215 12 19 12V13ZM2.2 13V12C0.984974 12 0 12.985 0 14.2H1H2C2 14.0895 2.08954 14 2.2 14V13Z"
      fill="#464646"
    />
  </svg>
);

const Manage_Connected_Devive: React.FC<ManageConnectedDevicesProps> = ({ onClose }) => {
  const [otherDevices, setOtherDevices] = useState([
    { id: "device id", lastActive: "Sat" }
  ]);

  const handleTerminateAll = () => {
    toast.success("All other sessions terminated successfully!");
    setOtherDevices([]);
  };

  const handleTerminateOne = (id: string) => {
    toast.success("Session terminated successfully!");
    setOtherDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        width: 462,
        height: 428,
        flexDirection: "column",
        alignItems: "flex-start",
        background: "rgba(245, 246, 250, 1)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          borderPadding: "20px",
          borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
          background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
          display: "flex",
          width: 462,
          padding: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#141414",
            lineHeight: "100%",
          }}
        >
          Manage Connected Devices
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid rgba(212, 213, 216, 1)",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          <X size={16} color="#464646" />
        </button>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          flex: 1,
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Section 1: This Device */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <span
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "#141414",
            }}
          >
            This device
          </span>

          <div
            style={{
              borderRadius: 12,
              border: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
              display: "flex",
              padding: 12,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 20,
              alignSelf: "stretch",
              background: "#FFF",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#EDEFF2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <DeviceIcon />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontWeight: 500, fontSize: 14, color: "#141414" }}>
                  device id
                </span>
                <span style={{ fontSize: 12, color: "#747474" }}>online</span>
              </div>
            </div>

            {otherDevices.length > 0 && (
              <button
                onClick={handleTerminateAll}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#E03131",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "center",
                  padding: 0,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Terminate all other sessions
              </button>
            )}
          </div>

          <span style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
            Logs out all devices except for this one.
          </span>
        </div>

        {/* Section 2: Other Devices */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <span
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "#141414",
            }}
          >
            Other devices
          </span>

          <div
            style={{
              borderRadius: 12,
              border: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
              display: "flex",
              padding: 12,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 16,
              alignSelf: "stretch",
              background: "#FFF",
              boxSizing: "border-box",
            }}
          >
            {otherDevices.length === 0 ? (
              <span style={{ fontSize: 13, color: "#6B7280", fontStyle: "italic", alignSelf: "center", padding: "8px 0" }}>
                No other connected devices.
              </span>
            ) : (
              otherDevices.map((device) => (
                <div
                  key={device.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#EDEFF2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <DeviceIcon />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontWeight: 500, fontSize: 14, color: "#141414" }}>
                        {device.id}
                      </span>
                      <span style={{ fontSize: 12, color: "#747474" }}>{device.lastActive}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTerminateOne(device.id)}
                    aria-label="Terminate session"
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Trash2 size={18} color="#A80D0B" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage_Connected_Devive;
