import React from 'react';
import { X } from 'lucide-react';
import mailIcon from '../../../../../assets/mail-04.svg';

const LeadsMessages = () => {
  return (
    <div className="w-[462px] h-[528px] opacity-100 flex flex-col">
      {/* the first part */}
      <div className="w-[462px] h-[91px] flex justify-between items-start opacity-100 rounded-tl-[12px] rounded-tr-[12px] p-[20px] bg-[rgba(245,246,250,1)] border-b-[1px] border-solid border-[rgba(212,213,216,1)]">
        <div className="flex gap-[12px]">
          <img src={mailIcon} alt="Mail" className="w-[24px] h-[24px]" />
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-bold text-[#111827] leading-none">Lead Messages</h2>
            <span className="text-[14px] text-[#6B7280]">for "leads name"</span>
          </div>
        </div>
        <button className="w-[32px] h-[32px] bg-white border border-[#D4D5D8] rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <X className="w-[16px] h-[16px] text-[#111827]" />
        </button>
      </div>

      {/* second */}
      <div className="w-[462px] h-[437px] opacity-100 rounded-br-[12px] rounded-bl-[12px] bg-[rgba(245,246,250,1)] relative">
        {/* the card message */}
        <div className="w-[422px] h-[124px] flex gap-[12px] opacity-100 p-[12px] absolute top-[32px] left-[20px] rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] bg-[rgba(255,255,255,1)]">
          {/* Property 1="default" */}
        </div>
      </div>
    </div>
  );
};

export default LeadsMessages;
