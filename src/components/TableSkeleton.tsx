import React from 'react';

interface TableSkeletonProps {
  rowCount?: number;
  columnCount?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rowCount = 5, columnCount = 5 }) => {
  return (
    <div style={{ width: "100%", background: "#fff" }}>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "16px 12px",
            boxSizing: "border-box",
            height: 72,
            borderBottom: "1px solid rgba(237, 239, 242, 1)",
            justifyContent: "space-between",
          }}
        >
          {Array.from({ length: columnCount }).map((_, colIndex) => {
            // Generate some random width percentages for the skeleton bars to look organic
            const widths = ["40%", "60%", "75%", "50%", "70%", "85%"];
            const width = widths[(rowIndex + colIndex) % widths.length];
            return (
              <div
                key={colIndex}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingRight: 12,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    height: 16,
                    width: width,
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%)",
                    backgroundSize: "200% 100%",
                    animation: "skeletonPulse 1.5s infinite ease-in-out",
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
      <style>{`
        @keyframes skeletonPulse {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TableSkeleton;
