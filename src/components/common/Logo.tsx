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
          src="https://movin-freiburg.de/wp-content/uploads/2026/04/RZ_Movin_Logo_2026_Bild_Wort_Claim_Horizontal_1C_pos.png" 
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
        src="https://movin-freiburg.de/wp-content/uploads/2026/04/RZ_Movin_Logo_2026_Bild_Wort_Claim_Horizontal_RGB_gradient.png" 
        alt="MOVIN Logo" 
        className="h-full w-auto object-contain dark:hidden"
        referrerPolicy="no-referrer"
      />
      <img 
        src="https://movin-freiburg.de/wp-content/uploads/2026/04/RZ_Movin_Logo_2026_Bild_Wort_Claim_Horizontal_1C_pos.png" 
        alt="MOVIN Logo" 
        className="h-full w-auto object-contain hidden dark:block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
