import React, { useState } from 'react';
import { X } from 'lucide-react';
import mailIcon from '../../assets/mail-04.svg';
import '../../styles/leads-modal-mobile.css';
import { useGetMessagesForLeadQuery } from '../../app/service/message_Lead';
import Pagination from '../Pagination';

interface LeadsMessagesProps {
  leadId: string;
  leadName?: string;
  onClose?: () => void;
}

const LeadsMessages: React.FC<LeadsMessagesProps> = ({ leadId, leadName = 'leads name', onClose }) => {
  const [page, setPage] = useState(1);
  const limit = 2; // Keep a small limit like 2 so pagination is easily usable in this height

  const { data, isLoading, error } = useGetMessagesForLeadQuery(
    { leadId, page, limit, sort: '-created_at' },
    { skip: !leadId, refetchOnMountOrArgChange: true }
  );

  const messages = data?.data || [];

  const formatMessageDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} , ${hours}:${minutes}`;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="leads-tw-modal w-[462px] h-[528px] opacity-100 flex flex-col">
      {/* the first part */}
      <div className="leads-tw-modal-header w-[462px] h-[91px] flex justify-between items-start opacity-100 rounded-tl-[12px] rounded-tr-[12px] p-[20px] bg-[rgba(245,246,250,1)] border-b-[1px] border-solid border-[rgba(212,213,216,1)]">
        <div className="flex gap-[12px]">
          <img src={mailIcon} alt="Mail" className="w-[24px] h-[24px]" />
          <div className="flex flex-col gap-1">
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 19,
                color: "#141414",
                lineHeight: "100%",
                margin: 0,
              }}
            >
              Lead Messages
            </h2>
            <span className="text-[14px] text-[#6B7280]">for "{leadName}"</span>
          </div>
        </div>
        <button onClick={onClose} className="w-[32px] h-[32px] bg-white border border-[#D4D5D8] rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <X className="w-[16px] h-[16px] text-[#111827]" />
        </button>
      </div>

      {/* second */}
      <div 
        className="leads-tw-modal-body w-[462px] h-[437px] opacity-100 rounded-br-[12px] rounded-bl-[12px] bg-[rgba(245,246,250,1)] relative"
        style={{ minHeight: 437 }}
      >
        {isLoading ? (
          <div 
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }} 
            className="flex items-center justify-center h-[340px]"
          >
            Loading messages...
          </div>
        ) : error ? (
          <div 
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#EF4444' }} 
            className="flex items-center justify-center h-[340px]"
          >
            Failed to load messages.
          </div>
        ) : messages.length === 0 ? (
          <div 
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }} 
            className="flex items-center justify-center h-[340px]"
          >
            No messages found.
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[350px] w-full flex flex-col gap-[16px] pb-[10px]">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className="leads-modal-inner w-[calc(100%-40px)] flex flex-col gap-[12px] opacity-100 p-[12px] mx-auto rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] bg-[rgba(255,255,255,1)]"
                style={{
                  marginTop: idx === 0 ? 32 : 0,
                  minHeight: 124,
                }}
              >
                {/* Date */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "140%",
                    width: 119,
                    height: 18,
                    color: "#6B7280",
                  }}
                >
                  {formatMessageDate(msg.created_at)}
                </div>

                {/* Paragraph */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "140%",
                    color: "rgba(70, 70, 70, 1)",
                    width: "100%",
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="absolute bottom-[20px] left-0 right-0 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={data.pagination.totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsMessages;
