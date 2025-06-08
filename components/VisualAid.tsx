import React from 'react';

interface VisualAidProps {
  count: number;
  itemEmoji: string;
  colorClass: string;
}

const VisualAid: React.FC<VisualAidProps> = ({ count, itemEmoji, colorClass }) => {
  if (count === 0) return null; // Hide only if count is 0

  return (
    <div className={`flex flex-wrap justify-center items-center gap-0.5 p-1 rounded-md ${colorClass} bg-opacity-20 w-full max-w-[150px] sm:max-w-[180px]`}>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className="text-lg xs:text-xl sm:text-2xl transition-transform duration-300 hover:scale-125">
          {itemEmoji}
        </span>
      ))}
    </div>
  );
};

export default VisualAid;