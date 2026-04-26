import React from 'react';
import closeIcon from '../../assets/x-02.svg';

const Notes = () => {
  return (
    <div
      style={{
        width: 462,
        height: 528,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)", // Default shadow for modals
        borderRadius: 12,
      }}
    >
      {/* ── First Part (Header) ── */}
      <div
        style={{
          background: "rgba(245, 246, 250, 1)",
          width: 462,
          height: 91,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottom: "1px solid rgba(212, 213, 216, 1)",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600, color: "#141414" }}>Notes</span>

        {/* Close Button */}
        <div
          style={{
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.11)",
            background: "rgba(255, 255, 255, 1)",
            width: 36,
            height: 36,
            borderRadius: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img src={closeIcon} alt="close" width={20} height={20} />
        </div>
      </div>

      {/* ── Second Section (Body) ── */}
      <div
        style={{
          background: "rgba(245, 246, 250, 1)",
          width: 462,
          height: 437,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          paddingTop: 32,
          paddingLeft: 20,
        }}
      >
        {/* Message Card */}
        <div
          style={{
            boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.06)",
            background: "rgba(255, 255, 255, 1)",
            width: 422,
            height: 124,
            borderRadius: 12,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          {/* Text Content */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              lineHeight: "140%",
              color: "rgba(70, 70, 70, 1)",
              width: 398,
              height: 72,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Nec enim morbi tristique amet urna. Commodo venenatis libero in id aliquet morbi purus. Interdum commodo at amet eget. Tempor morbi tristique dapibus a dolor blandit.
          </div>
        </div>
      </div>

    </div>
  );
};

export default Notes;