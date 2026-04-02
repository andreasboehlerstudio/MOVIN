import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

export default function Logo({ className = "h-10 md:h-12 w-auto", variant = 'default' }: LogoProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <img 
        src={variant === 'white' ? "/logo-white.png" : "/logo.png"} 
        alt="MOVIN Logo" 
        className="h-full w-auto object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if logo-white.png doesn't exist yet
          if (variant === 'white') {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('logo.png')) {
              target.src = '/logo.png';
              target.classList.add('brightness-0', 'invert');
            }
          }
        }}
      />
    </div>
  );
}
