
import React from 'react';

interface VisualAidProps {
  count: number;
  itemEmoji: string;
  colorClass: string;
}

const VisualAid: React.FC<VisualAidProps> = ({ count, itemEmoji, colorClass }) => {
  if (count === 0) return null;

  // Limit displayed items for very small screens if count is high, though 10 is max.
  const displayCount = count; // Math.min(count, window.innerWidth < 380 && count > 5 ? 5 : count);


  return (
    <div className={`flex flex-wrap justify-center items-center gap-0.5 p-1 rounded-md ${colorClass} bg-opacity-20 max-w-[100px] xs:max-w-[120px] sm:max-w-[150px]`}>
      {Array.from({ length: displayCount }).map((_, index) => (
        <span key={index} className="text-xl xs:text-2xl sm:text-3xl transition-transform duration-300 hover:scale-125">
          {itemEmoji}
        </span>
      ))}
    </div>
  );
};

export default VisualAid;
