import React, { useState } from "react";

interface Ticket {
    date: string;
    ticketId: string;
    company: string;
    reporter: string;
    agent: string;
    phone: string;
    status: string;
}

interface TicketMessageProps {
    ticket: Ticket | null;
    onClose: () => void;
}

const TicketMessage: React.FC<TicketMessageProps> = ({ ticket, onClose }) => {
    const [inputText, setInputText] = useState("");

    if (!ticket) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
            onClick={onClose}
        >
            {/* Modal Dialog Card */}
            <div
                style={{
                    width: "462px",
                    borderRadius: "12px",
                    background: "var(--Foundation-neutral-white, #FFF)",
                    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Inter, sans-serif",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header (First Part) */}
                <div
                    style={{
                        borderRadius: "12px 12px 0 0",
                        borderBottom: "1px solid var(--Foundation-neutral-neutral-100, #D4D5D8)",
                        background: "var(--Foundation-neutral-neutral-25, #F5F6FA)",
                        display: "flex",
                        padding: "20px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Left Title Group */}
                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ width: "24px", height: "24px", flexShrink: 0 }}
                        >
                            <path
                                d="M4.5 10.5H3V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V10.5H19.5M4.5 10.5L12 15L19.5 10.5M4.5 10.5V6C4.5 4.34315 5.84315 3 7.5 3H16.5C18.1569 3 19.5 4.34315 19.5 6V10.5"
                                stroke="#141414"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                                style={{
                                    color: "var(--Foundation-neutral-neutral-950, #141414)",
                                    fontFamily: "Inter",
                                    fontSize: "19px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: "normal",
                                }}
                            >
                                Ticket Messages
                            </span>
                            <span
                                style={{
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    color: "#747474",
                                    marginTop: "2px",
                                }}
                            >
                                {ticket.ticketId}
                            </span>
                        </div>
                    </div>

                    {/* Close button */}
                    <div
                        onClick={onClose}
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "1px solid #D4D5D8",
                            background: "#FFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6B7280"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                </div>

                {/* Message chat body wrapper */}
                <div
                    style={{
                        padding: "24px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        maxHeight: "380px",
                        overflowY: "auto",
                        background: "#F8F9FA",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Card of Message (Received) */}
                    <div
                        style={{
                            borderRadius: "12px",
                            background: "var(--Foundation-neutral-white, #FFF)",
                            boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.06)",
                            display: "flex",
                            width: "387px",
                            height: "156px",
                            padding: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: "12px",
                            boxSizing: "border-box",
                        }}
                    >
                        <span style={{ fontSize: "13px", color: "#747474" }}>25/03/2026 , 07:22</span>
                        <span style={{ fontSize: "14px", color: "#141414", lineHeight: "1.4" }}>
                            Lorem ipsum dolor sit amet consectetur. Nec enim morbi tristique amet urna. Commodo venenatis libero in id aliquet morbi purus. Interdum commodo at amet eget. Tempor morbi tristique dapibus a dolor blandit.
                        </span>
                        <span style={{ fontSize: "13px", color: "#747474" }}>{ticket.reporter}</span>
                    </div>

                    {/* Response in Message (Sent) */}
                    <div
                        style={{
                            borderRadius: "12px",
                            background: "var(--Foundation-brand-brand-50, #E6E9F1)",
                            boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.06)",
                            display: "flex",
                            width: "377px",
                            height: "156px",
                            padding: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: "12px",
                            alignSelf: "flex-end",
                            boxSizing: "border-box",
                        }}
                    >
                        <span style={{ fontSize: "13px", color: "#747474" }}>25/03/2026 , 07:22</span>
                        <span style={{ fontSize: "14px", color: "#141414", lineHeight: "1.4" }}>
                            Lorem ipsum dolor sit amet consectetur. Nec enim morbi tristique amet urna. Commodo venenatis libero in id aliquet morbi purus. Interdum commodo at amet eget. Tempor morbi tristique dapibus a dolor blandit.
                        </span>
                        <span style={{ fontSize: "13px", color: "#747474" }}>You</span>
                    </div>
                </div>

                {/* Input section at bottom */}
                <div
                    style={{
                        padding: "20px",
                        background: "#F8F9FA",
                        display: "flex",
                        justifyContent: "center",
                        boxSizing: "border-box",
                    }}
                >
                    {/* Textarea container card */}
                    <div
                        style={{
                            display: "flex",
                            width: "422px",
                            height: "85px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "8px",
                            flexShrink: 0,
                            borderRadius: "12px",
                            border: "1px solid #D4D5D8",
                            background: "#FFF",
                            padding: "12px",
                            position: "relative",
                            boxSizing: "border-box",
                        }}
                    >
                        <textarea
                            placeholder="Input text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            style={{
                                width: "calc(100% - 48px)",
                                height: "100%",
                                border: "none",
                                background: "transparent",
                                resize: "none",
                                outline: "none",
                                fontFamily: "Inter, sans-serif",
                                fontSize: "14px",
                                color: "#141414",
                                padding: 0,
                                boxSizing: "border-box",
                            }}
                        />

                        {/* Button inside the input */}
                        <button
                            onClick={() => {
                                if (inputText.trim()) {
                                    setInputText("");
                                }
                            }}
                            style={{
                                borderRadius: "12px",
                                background: "var(--Foundation-brand-brand-500, #00236F)",
                                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.11)",
                                display: "flex",
                                width: "36px",
                                height: "36px",
                                padding: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                                aspectRatio: "1/1",
                                position: "absolute",
                                top: "50%",
                                right: "12px",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                border: "none",
                                boxSizing: "border-box",
                            }}
                        >
                            {/* Chevron icon inside button */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ flexShrink: 0 }}
                            >
                                <path
                                    d="M10 7L15 12L10 17"
                                    stroke="#F5F6FA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketMessage;
