import React, { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';

type Testimonial = {
  name: string;
  role?: string;
  quote?: string;
  wistiaId: string;
  thumb: string;
  preview: string;
  portrait?: boolean;
};

const PLACEHOLDER_QUOTE =
  'Đặt lời chứng thực video của khách hàng ở đây. Trích đoạn 2-3 câu ngắn gọn, tập trung vào kết quả đạt được sau khi dùng hệ thống.';

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Trang Cho',
    quote: PLACEHOLDER_QUOTE,
    wistiaId: 'icxjprvsj8',
    thumb: 'testimonials/trang-cho.webp',
    preview: 'testimonials/trang-cho.mp4',
  },
  {
    name: 'Hạnh Sâu Sồ',
    quote: PLACEHOLDER_QUOTE,
    wistiaId: 'fmmckzqoxg',
    thumb: 'testimonials/hanh-sau-so.webp',
    preview: 'testimonials/hanh-sau-so.mp4',
  },
  {
    name: 'Phan Bảo Long',
    quote: PLACEHOLDER_QUOTE,
    wistiaId: 'glb40dvujb',
    thumb: 'testimonials/phan-bao-long.webp',
    preview: 'testimonials/phan-bao-long.mp4',
    portrait: true,
  },
  {
    name: 'Trịnh Khôi',
    quote: PLACEHOLDER_QUOTE,
    wistiaId: 'ze83vlcsfr',
    thumb: 'testimonials/trinh-khoi.webp',
    preview: 'testimonials/trinh-khoi.mp4',
  },
  {
    name: 'Nguyễn Đức Phát',
    role: 'Co-Founder & CSO Lemon Digital',
    quote: PLACEHOLDER_QUOTE,
    wistiaId: 'la0u5uzrnm',
    thumb: 'testimonials/nguyen-duc-phat.webp',
    preview: 'testimonials/nguyen-duc-phat.mp4',
  },
];

function Thumb({ t, onClick, active }: { t: Testimonial; onClick: () => void; active: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-[200px] md:w-[260px] group text-left ${
        active ? 'opacity-100' : 'opacity-70 hover:opacity-100'
      } transition-opacity`}
    >
      <div className="relative aspect-video bg-neutral-700 rounded-md overflow-hidden ring-1 ring-white/10">
        <img
          src={`${import.meta.env.BASE_URL}${t.thumb}`}
          alt={t.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
          <Play size={14} className="text-white fill-white ml-0.5" />
        </div>
      </div>
      <p className="!font-sans text-center text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#6500b9] mt-3">
        {t.name}
      </p>
    </button>
  );
}

export default function VideoTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const active = TESTIMONIALS[activeIdx];

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [modalOpen]);

  return (
    <section className="bg-black text-white overflow-hidden" id="video-testimonials">
      <div className="relative w-full aspect-[16/10] md:aspect-[21/9]">
        <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
          {active.portrait && (
            <video
              key={`bg-${active.preview}`}
              src={`${import.meta.env.BASE_URL}${active.preview}`}
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          )}
          <video
            key={active.preview}
            src={`${import.meta.env.BASE_URL}${active.preview}`}
            poster={`${import.meta.env.BASE_URL}${active.thumb}`}
            className={`relative w-full h-full ${active.portrait ? 'object-contain' : 'object-cover'}`}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-5 md:px-10 max-w-[1100px] mx-auto">
          {active.quote && (
            <blockquote className="hidden md:block !font-sans !normal-case font-normal text-lg md:text-3xl leading-snug md:leading-relaxed tracking-normal text-white max-w-[900px]">
              &ldquo;{active.quote}&rdquo;
            </blockquote>
          )}

          <p className="!font-sans text-sm md:text-lg font-bold text-[#6500b9] mt-6 md:mt-8">
            {active.name}
            {active.role ? `, ${active.role}` : ''}
          </p>

          <div className="relative mt-8 md:mt-10 flex items-center justify-center">
            <span
              className="absolute inline-block w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#6500b9] animate-pulse-ring pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute inline-block w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#6500b9] animate-pulse-ring pointer-events-none"
              style={{ animationDelay: '1.2s' }}
              aria-hidden="true"
            />
            <button
              type="button"
              aria-label="Phát video"
              onClick={() => setModalOpen(true)}
              className="relative w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#6500b9] hover:bg-[#7d18cf] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <Play size={28} className="text-white fill-white ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#111] py-5 md:py-6 overflow-hidden">
        <div className="flex w-max">
          <div
            className="flex gap-4 md:gap-6 pr-4 md:pr-6 animate-marquee flex-shrink-0"
            style={{ animationDuration: '60s' }}
          >
            {TESTIMONIALS.map((t, i) => (
              <Thumb
                key={`a-${i}`}
                t={t}
                active={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>
          <div
            className="flex gap-4 md:gap-6 pr-4 md:pr-6 animate-marquee flex-shrink-0"
            style={{ animationDuration: '60s' }}
            aria-hidden="true"
          >
            {TESTIMONIALS.map((t, i) => (
              <Thumb
                key={`b-${i}`}
                t={t}
                active={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            aria-label="Đóng"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition"
          >
            <X className="h-8 w-8 md:h-10 md:w-10" />
          </button>
          <div
            className="relative w-full max-w-[960px] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 h-full w-full rounded-[10px] md:rounded-[14px] shadow-2xl"
              src={`https://fast.wistia.net/embed/iframe/${active.wistiaId}?autoPlay=true&playsinline=true`}
              title={active.name}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
