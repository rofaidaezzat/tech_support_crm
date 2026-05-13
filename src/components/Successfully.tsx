import React from 'react';
interface SuccessfullyProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Successfully: React.FC<SuccessfullyProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="bg-white w-[443px] h-[347px] rounded-3xl shadow-[0_2px_4px_rgba(0,0,0,0.17)] 
                   flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Light Blue Blob Illustration */}
        <div className="absolute top-[71px] left-1/2 -translate-x-1/2 w-[258px] h-[140px]">
          <svg
            width="258"
            height="140"
            viewBox="0 0 258 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 30 70 
                 Q 30 30 80 25 
                 Q 130 15 170 45 
                 Q 220 70 200 110 
                 Q 170 135 110 125 
                 Q 50 115 30 70 Z"
              fill="#F0F4FF"
            />
          </svg>
        </div>

        {/* Success Text */}
        <div className="text-center mt-40">
          <p className="text-[19px] font-medium text-gray-800">
            Task added{' '}
            <span className="text-[#00236f] font-medium">successfully</span> !
          </p>
        </div>

        {/* Optional: Auto close button or manual close */}
        <button
          onClick={onClose}
          className="absolute bottom-8 px-8 py-3 text-[#00236f] font-medium hover:bg-gray-100 rounded-3xl transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};