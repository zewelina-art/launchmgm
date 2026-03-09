import React from 'react';

export const HeroGraphic: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-paper">
      <img
        src="/Montgomery.jpg"
        alt="Montgomery skyline"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-paper/45 via-transparent to-transparent" />
    </div>
  );
};
