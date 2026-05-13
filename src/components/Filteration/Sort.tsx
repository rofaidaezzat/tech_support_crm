import React, { useState } from 'react';

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'A to Z' },
  { value: 'z-a', label: 'Z to A' },
];

interface SortProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedValue: string) => void;
  defaultValue?: string;
}

export const Sort: React.FC<SortProps> = ({
  isOpen,
  onClose,
  onApply,
  defaultValue = 'newest',
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  const handleClear = () => {
    setSelected(defaultValue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="bg-white w-[322px] h-[268px] rounded-3xl shadow-[0_2px_4px_rgba(0,0,0,0.17)] 
                   p-4 flex flex-col gap-3"
      >
        {/* Radio Options */}
        <div className="flex flex-col gap-1 flex-1">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 py-2.5 px-1 cursor-pointer hover:bg-gray-50 rounded-xl"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={selected === option.value}
                onChange={(e) => setSelected(e.target.value)}
                className="w-5 h-5 accent-[#00236f]"
              />
              <span className="text-[16px] text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleClear}
            className="w-[161px] h-12 text-[#00236f] font-medium rounded-3xl hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>

          <button
            onClick={handleApply}
            className="w-[92px] h-12 bg-[#00236f] text-white font-medium rounded-3xl 
                     hover:bg-[#001d5c] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};