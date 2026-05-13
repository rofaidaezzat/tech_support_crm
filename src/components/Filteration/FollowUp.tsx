import React, { useState } from 'react';

interface FollowUpProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: {
    filterType: string;
    startDate: string;
    endDate: string;
  }) => void;
  defaultFilter?: string;
  defaultStartDate?: string;
  defaultEndDate?: string;
}

const followUpOptions = [
  { value: 'today', label: 'Today', count: 200 },
  { value: 'tomorrow', label: 'Tomorrow', count: 200 },
  { value: 'this-week', label: 'This week', count: 200 },
  { value: 'next-week', label: 'Next week', count: 200 },
  { value: 'no-followup', label: 'No followup', count: 200 },
  { value: 'missed', label: 'Missed', count: 200 },
];

export const FollowUp: React.FC<FollowUpProps> = ({
  isOpen,
  onClose,
  onApply,
  defaultFilter = 'today',
  defaultStartDate = '',
  defaultEndDate = '',
}) => {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleApply = () => {
    onApply({
      filterType: selectedFilter,
      startDate,
      endDate,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedFilter(defaultFilter);
    setStartDate('');
    setEndDate('');
  };

  const clearStartDate = () => setStartDate('');
  const clearEndDate = () => setEndDate('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="bg-white w-[525px] h-[376px] rounded-3xl shadow-[0_2px_4px_rgba(0,0,0,0.17)] 
                   p-4 flex flex-col"
      >
        <div className="flex gap-4 flex-1">
          {/* Left Side - Radio Options */}
          <div className="w-[192px] flex flex-col">
            {followUpOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl cursor-pointer"
              >
                <input
                  type="radio"
                  name="followup"
                  value={option.value}
                  checked={selectedFilter === option.value}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-5 h-5 accent-[#00236f]"
                />
                <div className="flex-1 text-[16px]">
                  {option.label}{' '}
                  <span className="text-gray-500">({option.count})</span>
                </div>
              </label>
            ))}
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-gray-100 my-2" />

          {/* Right Side - Date Filters */}
          <div className="flex-1 flex flex-col gap-6 pt-1">
            {/* Start Date */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[15px] text-gray-700">Start date</label>
                <button
                  onClick={clearStartDate}
                  className="text-[#00236f] text-sm font-medium hover:underline"
                >
                  Clear
                </button>
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-2xl text-base focus:outline-none focus:border-[#00236f]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  📅
                </div>
              </div>
            </div>

            {/* End Date */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[15px] text-gray-700">End date</label>
                <button
                  onClick={clearEndDate}
                  className="text-[#00236f] text-sm font-medium hover:underline"
                >
                  Clear
                </button>
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-2xl text-base focus:outline-none focus:border-[#00236f]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  📅
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-auto">
          <button
            onClick={handleClear}
            className="w-[161px] h-12 text-[#00236f] font-medium rounded-3xl hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="w-[92px] h-12 bg-[#00236f] text-white font-medium rounded-3xl hover:bg-[#001d5c] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};