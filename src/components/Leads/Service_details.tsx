import React, { useState } from "react";
import closeIcon from "../../../../assets/Icon (2).svg";

interface ServiceDetailsProps {
  onClose?: () => void;
  onSave?: (details: string) => void;
  leadsName?: string;
  initialDetails?: string;
}

const Service_details: React.FC<ServiceDetailsProps> = ({
  onClose,
  onSave,
  leadsName = "leads name",
  initialDetails = "Lorem ipsum dolor sit amet consectetur. Curabitur arcu nibh mi urna. Volutpat quis pellentesque elementum bibendum eu ipsum egestas tempus feugiat. Orci vestibulum commodo consequat et arcu urna risus. Odio nulla sed tellus sit sem accumsan mauris purus ac. Est nibh tortor amet tincidunt. Consequat sit ut magna orci enim. Dui urna et vitae ornare amet consectetur augue pretium.",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState(initialDetails);

  const handleSave = () => {
    if (onSave) {
      onSave(details);
    }
    setIsEditing(false);
  };

  const savedTextareaStyle: React.CSSProperties = {
    width: 422,
    height: 152,
    resize: "none",
    border: "none",
    borderRadius: 8,
    padding: "16px 14px",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "#6B7280", // Slightly muted text in read-only state based on screenshot
    background: "rgba(212, 213, 216, 0.4)", // Light grey background
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.25s ease",
    cursor: "default",
  };

  const editTextareaStyle: React.CSSProperties = {
    width: 422,
    height: 152,
    resize: "none",
    border: "1px solid #3B5BDB", // Blue border in edit mode
    borderRadius: 8,
    padding: "16px 14px",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "#141414",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.25s",
  };

  return (
    <div
      style={{
        width: 462,
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)",
        background: "rgba(245, 246, 250, 1)", // same as others
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          width: 462,
          height: 91,
          background: "rgba(245, 246, 250, 1)",
          borderBottom: "1px solid rgba(212, 213, 216, 1)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#141414",
              lineHeight: "24px",
            }}
          >
            Service Details
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#6B7280",
              lineHeight: "18px",
            }}
          >
            for &quot;{leadsName}&quot;
          </span>
        </div>
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
          }}
        >
          <img src={closeIcon} alt="Close" width={14} height={14} />
        </button>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          width: 462,
          background: "rgba(245, 246, 250, 1)",
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          padding: "24px 20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Text Area */}
        <textarea
          value={details}
          onChange={(e) => isEditing && setDetails(e.target.value)}
          readOnly={!isEditing}
          style={isEditing ? editTextareaStyle : savedTextareaStyle}
        />

        {/* Action Button */}
        <div style={{ marginTop: 16 }}>
          {!isEditing ? (
            // Edit Button (Secondary)
            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: 422,
                height: 48,
                borderRadius: 12,
                border: "1.5px solid rgba(0, 35, 111, 1)",
                background: "#fff",
                color: "rgba(0, 35, 111, 1)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "8px 24px",
                boxSizing: "border-box",
              }}
            >
              {/* Pencil Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="rgba(0, 35, 111, 1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                  stroke="rgba(0, 35, 111, 1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit
            </button>
          ) : (
            // Save Button (Primary)
            <button
              onClick={handleSave}
              style={{
                width: 422,
                height: 48,
                borderRadius: 12,
                border: "none",
                background: "rgba(0, 35, 111, 1)",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "8px 24px",
                boxSizing: "border-box",
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Service_details;
