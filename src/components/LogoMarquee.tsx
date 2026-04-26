import React from 'react';

const LOGOS: string[] = Array.from({ length: 24 }, (_, i) => `logo${i + 1}.webp`);

function LogoItem({ src }: { src: string }) {
  return (
    <div className="flex-shrink-0 mx-5 md:mx-10 flex items-center justify-center h-7 md:h-11">
      <img
        src={`${import.meta.env.BASE_URL}logo/${src}`}
        alt=""
        className="max-h-full w-auto object-contain"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  reverse = false,
  speed = '60s',
}: {
  logos: string[];
  reverse?: boolean;
  speed?: string;
}) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex flex-shrink-0 ${reverse ? 'animate-marquee-loop-reverse' : 'animate-marquee-loop'}`}
        style={{ animationDuration: speed }}
      >
        {logos.map((logo) => (
          <LogoItem key={logo} src={logo} />
        ))}
        {logos.map((logo) => (
          <LogoItem key={`dup-${logo}`} src={logo} />
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  const row1 = LOGOS.slice(0, 8);
  const row2 = LOGOS.slice(8, 16);
  const row3 = LOGOS.slice(16, 24);

  const fadeMask =
    'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)';

  return (
    <section className="bg-white py-10 md:py-16 overflow-hidden">
      <div
        className="max-w-[1000px] mx-auto flex flex-col gap-6 md:gap-10"
        style={{
          WebkitMaskImage: fadeMask,
          maskImage: fadeMask,
        }}
      >
        <MarqueeRow logos={row1} speed="55s" />
        <MarqueeRow logos={row2} speed="70s" reverse />
        <MarqueeRow logos={row3} speed="50s" />
      </div>
    </section>
  );
}
