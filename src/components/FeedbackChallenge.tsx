import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react';

type FeedbackRow =
  | { type: 'single'; image: string; raw?: boolean }
  | { type: 'narrow'; image: string; raw?: boolean }
  | { type: 'pair'; images: [string, string]; raw?: boolean };

interface Props {
  rows: FeedbackRow[];
  bgClass?: string;
  initialVisible?: number;
}

export default function FeedbackChallenge({ rows, bgClass = 'bg-white', initialVisible = 4 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const canCollapse = rows.length > initialVisible;
  const visibleRows = expanded || !canCollapse ? rows : rows.slice(0, initialVisible);

  const resolveSrc = (image: string, raw?: boolean) =>
    `${import.meta.env.BASE_URL}${raw ? '' : 'feedback/'}${image}`;

  const flatSources: string[] = [];
  visibleRows.forEach((row) => {
    if (row.type === 'pair') {
      flatSources.push(resolveSrc(row.images[0], row.raw));
      flatSources.push(resolveSrc(row.images[1], row.raw));
    } else {
      flatSources.push(resolveSrc(row.image, row.raw));
    }
  });
  const total = flatSources.length;

  useEffect(() => {
    if (lightboxIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      else if (e.key === 'ArrowLeft') setLightboxIdx((i) => (i === null ? null : (i - 1 + total) % total));
      else if (e.key === 'ArrowRight') setLightboxIdx((i) => (i === null ? null : (i + 1) % total));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIdx, total]);

  const goPrev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + total) % total));
  const goNext = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % total));

  const renderImageButton = (src: string, idx: number, wrapperClass: string, key: string) => (
    <button
      key={key}
      type="button"
      onClick={() => setLightboxIdx(idx)}
      className={`block p-0 border-0 bg-transparent cursor-zoom-in transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl rounded-xl md:rounded-2xl ${wrapperClass}`}
      aria-label="Mở ảnh"
    >
      <img
        src={src}
        alt="Feedback Challenge 21 Day"
        className="w-full h-auto rounded-xl md:rounded-2xl shadow-sm pointer-events-none"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </button>
  );

  let runningIdx = 0;
  const renderRow = (row: FeedbackRow, i: number) => {
    if (row.type === 'pair') {
      const elements = row.images.map((img, j) => {
        const idx = runningIdx++;
        return renderImageButton(resolveSrc(img, row.raw), idx, 'w-1/2', `${i}-${j}-${img}`);
      });
      return (
        <div key={i} className="flex gap-3 md:gap-4 w-full max-w-[900px] justify-center">
          {elements}
        </div>
      );
    }
    if (row.type === 'narrow') {
      const idx = runningIdx++;
      return renderImageButton(resolveSrc(row.image, row.raw), idx, 'w-full max-w-[440px]', String(i));
    }
    const idx = runningIdx++;
    return renderImageButton(resolveSrc(row.image, row.raw), idx, 'w-full max-w-[900px]', String(i));
  };

  return (
    <section className={`${bgClass} py-12 md:py-20`}>
      <div className="max-w-4xl mx-auto container-padding">
        <h3 className="font-display text-center text-[28px] md:text-[54px] leading-tight text-black mb-8 md:mb-12 max-w-4xl mx-auto [text-wrap:balance]">
          Hơn 190 người tham gia đã "Wow" vì concept học tập mới lạ độc đáo với AI Agent.
        </h3>

        <div className="relative">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            {visibleRows.map(renderRow)}
          </div>

          {canCollapse && !expanded && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {canCollapse && (
          <div className="flex justify-center mt-8 md:mt-10">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="!font-sans inline-flex items-center gap-2 bg-[#6500b9] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(101,0,185,0.25)] hover:shadow-[0_6px_30px_rgba(101,0,185,0.4)] hover:-translate-y-0.5 transition-all"
            >
              {expanded ? (
                <>
                  Thu gọn
                  <ChevronUp className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                </>
              ) : (
                <>
                  Xem thêm {rows.length - initialVisible} feedback nữa
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightboxIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
            aria-label="Đóng"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Ảnh trước"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer z-10"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Ảnh sau"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer z-10"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <img
            src={flatSources[lightboxIdx]}
            alt="Phóng to"
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </section>
  );
}
