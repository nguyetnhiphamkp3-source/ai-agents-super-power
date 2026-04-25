import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to 10 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <div className="mt-[20px] flex justify-center gap-[12px]">
      {timeBlocks.map((block, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center justify-center w-[70px] h-[70px] md:w-[110px] md:h-[110px] rounded-2xl bg-transparent backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden"
          style={{
            boxShadow: 'inset 0 1.5px 1px rgba(255, 255, 255, 0.9), inset 0 -1.5px 1px rgba(255, 255, 255, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15)'
          }}
        >
          <span className="text-[30px] md:text-[62px] leading-tight md:leading-[42px] font-normal text-white font-display tracking-wider drop-shadow-md relative z-10">
            {block.value.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-sm text-white/90 uppercase tracking-widest mt-[-2px] leading-tight md:leading-[20px] font-bold relative z-10">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
