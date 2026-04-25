import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../lib/lenis';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePackage, setActivePackage] = useState(1); // Start at index 1 (the first real item)
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const packages = [
    {
      title: 'Bạn còn đang chờ gì nữa?',
      desc: 'AI không đợi ai. Người biết dùng AI đang tiến xa hơn mỗi ngày.'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      const formSection = document.getElementById('dang-ky');
      
      if (!heroSection || !formSection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const formTop = formSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (heroBottom < 0 && formTop > windowHeight - 100) {
        // Check if lightbox is open
        if (document.body.classList.contains('lightbox-open')) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Also listen for a custom event when lightbox state changes
    const handleLightboxChange = () => handleScroll();
    window.addEventListener('lightbox-toggled', handleLightboxChange);
    
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('lightbox-toggled', handleLightboxChange);
    };
  }, []);

  const handleNext = () => {
    if (isTransitioning || packages.length <= 1) return;
    setIsTransitioning(true);
    setActivePackage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning || packages.length <= 1) return;
    setIsTransitioning(true);
    setActivePackage(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (activePackage >= packages.length) {
      setActivePackage(0);
    } else if (activePackage < 0) {
      setActivePackage(packages.length - 1);
    }
  };

  useEffect(() => {
    if (packages.length <= 1) return;
    const interval = setInterval(() => {
      if (isMobile) {
        handleNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, activePackage, isTransitioning, packages.length]);

  return (
    <div 
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-[100] transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-t-[18px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-3 md:py-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8 border-t border-x border-gray-100/50 backdrop-blur-sm bg-white/95">
        <div className="relative flex flex-col md:flex-row gap-4 md:gap-12 items-center flex-1 w-full">
          
          {/* Mobile Navigation Arrows */}
          {isMobile && packages.length > 1 && (
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 text-black/30 hover:text-black transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="w-full overflow-hidden">
            <div 
              className={`flex md:flex-row ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: isMobile && packages.length > 1 ? `translateX(-${activePackage * 100}%)` : 'none' }}
              onTransitionEnd={handleTransitionEnd}
            >
              {isMobile ? (
                packages.map((pkg, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 text-center">
                    <h4 className="font-display text-lg font-bold tracking-tight text-black leading-none mb-0.5">
                      {pkg.title}
                    </h4>
                    <p className="text-[10px] font-normal text-black">
                      {pkg.desc}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  {/* Desktop View */}
                  <div className="w-auto flex-shrink-0 text-left">
                    <h4 className="font-display text-[26px] font-bold tracking-tight text-black leading-none mb-0.5">
                      Bạn còn đang chờ gì nữa?
                    </h4>
                    <p className="text-[14px] font-normal text-black">
                      AI không đợi ai. Người biết dùng AI đang tiến xa hơn mỗi ngày.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {isMobile && packages.length > 1 && (
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 text-black/30 hover:text-black transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        <button 
          onClick={() => smoothScrollTo('#dang-ky-goi')}
          className="w-full md:w-auto bg-black text-white font-display text-lg md:text-[26px] px-6 pb-[11px] pt-[11px] rounded-lg md:rounded-xl hover:bg-[#6B00D7] transition-all duration-300 uppercase tracking-wider italic shadow-md hover:shadow-lg active:scale-95"
        >
          ĐẶT CỌC GIỮ CHỖ NGAY <br className="md:hidden" /> - TÔI MUỐN THAM GIA
        </button>
      </div>
    </div>
  );
}
