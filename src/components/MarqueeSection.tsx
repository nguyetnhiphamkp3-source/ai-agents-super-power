import React from 'react';

function MarqueeItem({
  text,
  itemBg,
  itemColor,
}: {
  text: string;
  itemBg: string;
  itemColor: string;
}) {
  return (
    <div
      className={`${itemBg} ${itemColor} font-display text-[24px] md:text-[60px] p-[10px] md:p-[15px] skew-x-[-12deg] mx-2 whitespace-nowrap inline-block tracking-[-0.05em]`}
    >
      <span className="skew-x-[12deg] block italic">{text}</span>
    </div>
  );
}

const MarqueeRow = ({
  reverse = false,
  speed = '60s',
  itemBg,
  itemColor,
}: {
  reverse?: boolean;
  speed?: string;
  itemBg: string;
  itemColor: string;
}) => {
  const items = [
    'THE ALL IN PLAN',
    'AI AGENT SUPER POWER',
    'AI FIRST',
    'THE ALL IN PLAN',
    'AI AGENT SUPER POWER',
    'AI FIRST',
    'THE ALL IN PLAN',
    'AI AGENT SUPER POWER',
    'AI FIRST',
  ];

  return (
    <div className="flex overflow-hidden py-0">
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: speed }}
      >
        {items.map((item, i) => (
          <MarqueeItem key={i} text={item} itemBg={itemBg} itemColor={itemColor} />
        ))}
      </div>
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        aria-hidden="true"
        style={{ animationDuration: speed }}
      >
        {items.map((item, i) => (
          <MarqueeItem key={i} text={item} itemBg={itemBg} itemColor={itemColor} />
        ))}
      </div>
    </div>
  );
};

export default function MarqueeSection({
  bgColor = 'bg-[#f7f7f7]',
  rows = 3,
  itemBg = 'bg-primary',
  itemColor = 'text-white',
}: {
  bgColor?: string;
  rows?: number;
  itemBg?: string;
  itemColor?: string;
}) {
  const rowConfigs = [
    { speed: '50s', reverse: false },
    { speed: '70s', reverse: true },
    { speed: '60s', reverse: false },
  ].slice(0, rows);

  return (
    <section className={`${bgColor} py-8 md:py-12 overflow-hidden relative`}>
      <div className="flex flex-col gap-4 -rotate-1 scale-105">
        {rowConfigs.map((cfg, i) => (
          <MarqueeRow
            key={i}
            speed={cfg.speed}
            reverse={cfg.reverse}
            itemBg={itemBg}
            itemColor={itemColor}
          />
        ))}
      </div>
    </section>
  );
}
