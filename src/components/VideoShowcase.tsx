import React, { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';

type Item = {
  id: string;
  name: string;
  quote?: string;
};

const PLACEHOLDER_QUOTE =
  'Đặt lời chứng thực video của khách hàng ở đây. Trích đoạn 2-3 câu ngắn gọn, tập trung vào kết quả đạt được sau khi dùng hệ thống.';

const VIDEOS: Item[] = [
  { id: 'uuVTQaqhL2g', name: 'Bá Khương Trịnh', quote: PLACEHOLDER_QUOTE },
  { id: 'n4O3-0zQeUo', name: 'Nguyễn Hữu Thông', quote: PLACEHOLDER_QUOTE },
  { id: 'L4tey9LuRhk', name: 'Phan Tuan Nguyen', quote: PLACEHOLDER_QUOTE },
  { id: 'JK41K5CII9s', name: 'Quảng Đào Xuân', quote: PLACEHOLDER_QUOTE },
  { id: 'j3ESa6e84AA', name: 'Quyền Linh Đinh', quote: PLACEHOLDER_QUOTE },
  { id: '-p40I0f28kA', name: 'Thạch Phạm', quote: PLACEHOLDER_QUOTE },
  { id: '6C9SJdrhYUo', name: 'Thông Nguyễn', quote: PLACEHOLDER_QUOTE },
  { id: 'zp0xkeeg7nY', name: 'Trần Thuận Hóa', quote: PLACEHOLDER_QUOTE },
];

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function Thumb({ t, onClick, active }: { t: Item; onClick: () => void; active: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[200px] md:w-[260px] group text-left"
    >
      <div className="relative aspect-video bg-black/30 rounded-md overflow-hidden ring-1 ring-white/20">
        <img
          src={ytThumb(t.id)}
          alt={t.name}
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
          <Play size={14} className="text-white fill-white ml-0.5" />
        </div>
      </div>
      <p className="!font-sans text-center text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white mt-3">
        {t.name}
      </p>
    </button>
  );
}

export default function VideoShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const active = VIDEOS[activeIdx];

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

  const previewSrc = `https://www.youtube.com/embed/${active.id}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${active.id}&disablekb=1&iv_load_policy=3&fs=0`;

  return (
    <section className="bg-black text-white overflow-hidden" id="feedback">
      <div className="relative w-full aspect-[16/10] md:aspect-[21/9]">
        <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
          <iframe
            key={active.id}
            src={previewSrc}
            title={active.name}
            className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35]"
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-5 md:px-10 max-w-[1100px] mx-auto">
          {active.quote && (
            <blockquote className="hidden md:block !font-sans !normal-case font-normal text-lg md:text-3xl leading-snug md:leading-relaxed tracking-normal text-white max-w-[900px]">
              &ldquo;{active.quote}&rdquo;
            </blockquote>
          )}

          <p className="!font-sans text-sm md:text-lg font-bold text-white mt-6 md:mt-8">
            {active.name}
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

      <div className="bg-[#6500b9] py-5 md:py-6 overflow-hidden">
        <div className="flex w-max">
          <div
            className="flex gap-4 md:gap-6 pr-4 md:pr-6 animate-marquee flex-shrink-0"
            style={{ animationDuration: '60s' }}
          >
            {VIDEOS.map((t, i) => (
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
            {VIDEOS.map((t, i) => (
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
              src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
              title={active.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
