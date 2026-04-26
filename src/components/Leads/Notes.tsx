import React from 'react';
import { X } from 'lucide-react';
import chevronRight from '../../../../../assets/chevron-right.svg';
import messageIcon from '../../../../../assets/message-text-02.svg';

const Notes = () => {
  return (
    <div className="w-[462px] h-[528px] opacity-100 flex flex-col">
      {/* the first part */}
      <div className="w-[462px] h-[91px] flex justify-between items-start opacity-100 rounded-tl-[12px] rounded-tr-[12px] p-[20px] bg-[rgba(245,246,250,1)] border-b-[1px] border-solid border-[rgba(212,213,216,1)]">
        <div className="flex gap-[12px]">
          <img src={messageIcon} alt="Notes" className="w-[24px] h-[24px]" />
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-bold text-[#111827] leading-none">Notes</h2>
            <span className="text-[14px] text-[#6B7280]">for "leads name"</span>
          </div>
        </div>
        <button className="w-[32px] h-[32px] bg-white border border-[#D4D5D8] rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <X className="w-[16px] h-[16px] text-[#111827]" />
        </button>
      </div>

      {/* second part */}
      <div className="w-[462px] h-[437px] opacity-100 rounded-br-[12px] rounded-bl-[12px] bg-[rgba(245,246,250,1)] relative">
        
        {/* lasr input */}
        <div className="w-[422px] h-[85px] flex gap-[8px] opacity-100 absolute top-[332px] left-[20px] bg-white border border-[rgba(212,213,216,1)] rounded-[12px] focus-within:border-[rgba(0,35,111,1)] p-[12px] transition-colors">
          <textarea 
            className="flex-1 h-full resize-none outline-none bg-transparent"
            placeholder="Type your note..."
          />
          
          {/* the button */}
          <button className="w-[36px] h-[36px] opacity-100 rounded-[12px] bg-[rgba(0,35,111,1)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.11)] flex items-center justify-center self-end shrink-0">
            <img src={chevronRight} alt="Submit" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Notes;
