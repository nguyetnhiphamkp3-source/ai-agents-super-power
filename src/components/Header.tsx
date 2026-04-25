import React from 'react';

export default function Header() {
  return (
    <header className="relative z-50 bg-[#38085F] py-4 md:py-6 flex items-center">
      <div className="w-full max-w-7xl mx-auto container-padding flex justify-center items-center">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <a href="#">
            <img 
              src="https://cdn.theallinplan.com/fluentcom-a94a2c0f52ecf5104925e68dd66aa4e2-fluentcom-logo-theallinplan-darkmode.webp" 
              alt="The All In Plan" 
              className="h-10 md:h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
