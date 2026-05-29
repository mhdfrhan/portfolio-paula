import React from 'react';

// Cute inline SVG Y2K stars that match the scrapbook visual references
export const Y2KStar: React.FC<{ 
  className?: string; 
  size?: number; 
  color?: string;
  angle?: number;
}> = ({ className = '', size = 32, color = '#e3125e', angle = 0 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke={color} 
    strokeWidth="6" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ transform: `rotate(${angle}deg)` }}
    className={`inline-block ${className}`}
  >
    {/* Clean four-pointed hand-drawn style Y2K star outline */}
    <path d="M50 5 C50 35, 35 50, 5 50 C35 50, 50 65, 50 95 C50 65, 65 50, 95 50 C65 50, 50 35, 50 5 Z" />
  </svg>
);

export const GinghamTape: React.FC<{ 
  className?: string; 
  angle?: number; 
  text?: string; 
}> = ({ className = '', angle = -4, text }) => (
  <div 
    style={{ transform: `rotate(${angle}deg)` }} 
    className={`gingham-pattern h-8 border border-pink-300 shadow-sm relative overflow-hidden flex items-center justify-center px-4 py-1 text-xs font-mono select-none font-bold text-pink-700 tracking-wider ${className}`}
  >
    <div className="absolute inset-0 bg-pink-100/30 mix-blend-multiply pointer-events-none" />
    {text && <span className="relative z-10">{text}</span>}
  </div>
);

export const PolaroidFrame: React.FC<{
  children: React.ReactNode;
  caption?: string;
  className?: string;
  angle?: number;
  hasPaperclip?: boolean;
}> = ({ children, caption, className = '', angle = 2, hasPaperclip = true }) => {
  return (
    <div 
      style={{ transform: `rotate(${angle}deg)` }}
      className={`bg-white p-3 pb-8 shadow-md border border-neutral-200/50 relative ${className}`}
    >
      {/* Paperclip decoration */}
      {hasPaperclip && (
        <div className="absolute -top-7 left-12 z-20 pointer-events-none transform -rotate-12">
          {/* Custom vector paperclip */}
          <svg width="24" height="48" viewBox="0 0 24 48" fill="none" className="drop-shadow-sm">
            <path 
              d="M12 40 C7 40, 4 37, 4 31 L4 12 C4 7, 7 4, 11 4 C15 4, 18 7, 18 12 L18 31 C18 34, 16 36, 13 36 C10 36, 8 34, 8 31 L8 14 C8 13, 9 12, 10 12 C11 12, 12 13, 12 14 L12 30 C12 31, 13 31, 13 31 C13.5 31, 14 31, 14 30 L14 12 C14 10, 12.5 8, 11 8 C9.5 8, 8 10, 8 12 L8 31 C8 34.5, 10.5 37, 13 37 C15.5 37, 20 34.5, 20 31 L20 12 C20 6, 16 2, 11 2 C6 2, 2 6, 2 12 L2 31 C2 38, 6 42, 12 42 C18 42, 22 38, 22 31 L22 14 C22 13, 23 12, 24 12 C24 13, 22 14, 22 14" 
              stroke="#cbd5e1" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              fill="#f1f5f9"
            />
            {/* Pink highlights overlay */}
            <path 
              d="M12 40 C7 40, 4 37, 4 31 L4 12 C4 7, 7 4, 11 4" 
              stroke="#f472b6" 
              strokeWidth="1" 
              strokeLinecap="round" 
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      )}
      
      {/* Tape decoration */}
      <div className="absolute -top-3 right-6 bg-yellow-200/50 backdrop-blur-[1px] border border-yellow-300 w-16 h-5 opacity-80 transform rotate-12 z-10 shadow-sm" />
      
      {/* Content slot */}
      <div className="bg-neutral-50 overflow-hidden border border-neutral-100 aspect-video relative">
        {children}
      </div>
      
      {/* Handwritten caption */}
      {caption && (
        <div className="mt-3 text-center font-mono text-charcoal font-semibold text-xs tracking-wide">
          {caption}
        </div>
      )}
    </div>
  );
};

export const HandheldPointer: React.FC = () => {
  return (
    <div className="pointer-events-none absolute z-50 flex items-center gap-1 text-pink-600 bg-white/95 border border-pink-400 px-2 py-1 rounded-full shadow-lg font-mono text-2xs uppercase tracking-widest font-extrabold select-none">
      <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
      <span>QA LASER</span>
    </div>
  );
};
