import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

export default function Logo({ className = "h-10 md:h-12 w-auto", variant = 'default' }: LogoProps) {
  if (variant === 'white') {
    return (
      <div className={`relative flex items-center ${className}`}>
        <img 
          src="/images/logos/movin-logo-2026-horizontal-1c-pos.png" 
          alt="MOVIN Logo" 
          className="h-full w-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <img 
        src="/images/logos/movin-logo-2026-horizontal-rgb-gradient.png" 
        alt="MOVIN Logo" 
        className="h-full w-auto object-contain dark:hidden"
        referrerPolicy="no-referrer"
      />
      <img 
        src="/images/logos/movin-logo-2026-horizontal-1c-pos.png" 
        alt="MOVIN Logo" 
        className="h-full w-auto object-contain hidden dark:block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
