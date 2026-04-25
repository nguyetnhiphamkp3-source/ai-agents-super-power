import React, { useEffect, useRef, useState } from 'react';
import { Play, VolumeX, X } from 'lucide-react';

const PREVIEW_END_SECONDS = 10;

let ytApiPromise: Promise<any> | null = null;
function loadYouTubeIframeAPI(): Promise<any> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  const w = window as any;
  if (w.YT && w.YT.Player) return Promise.resolve(w.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve(w.YT);
    };
    if (!document.querySelector('script[data-yt-api]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.dataset.ytApi = 'true';
      document.head.appendChild(tag);
    }
  });
  return ytApiPromise;
}

export default function VideoPlayer({ id, className = '' }: { id: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) setShouldLoad(true);
        setInView(entry.isIntersecting);
      },
      { rootMargin: '300px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    let interval: number | null = null;
    let cancelled = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled || !YT || !iframeRef.current) return;
      const player = new YT.Player(iframeRef.current, {
        events: {
          onReady: (e: any) => {
            playerRef.current = e.target;
            try {
              e.target.mute();
            } catch {}
          },
        },
      });

      interval = window.setInterval(() => {
        try {
          const p = playerRef.current;
          if (p && typeof p.getCurrentTime === 'function') {
            const t = p.getCurrentTime();
            if (t >= PREVIEW_END_SECONDS) {
              p.seekTo(0, true);
              p.playVideo();
            }
          }
        } catch {}
      }, 500);
    });

    return () => {
      cancelled = true;
      if (interval !== null) clearInterval(interval);
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
    };
  }, [shouldLoad, id]);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (inView && !open) p.playVideo();
      else p.pauseVideo();
    } catch {}
  }, [inView, open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <div
        ref={containerRef}
        className={`relative aspect-video w-full overflow-hidden rounded-[10px] md:rounded-[14px] bg-black ring-1 ring-black/10 ${className}`}
      >
        {shouldLoad && (
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&fs=0&loop=1&playlist=${id}`}
            title="Video preview"
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/70 text-white hover:bg-black/85 transition cursor-pointer"
          aria-label="Bật âm thanh — mở video"
        >
          <VolumeX className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          aria-label="Xem video"
        >
          <span className="flex items-center justify-center px-5 py-3 md:px-7 md:py-4 rounded-xl md:rounded-2xl bg-primary/80 shadow-lg">
            <Play className="h-7 w-7 md:h-10 md:w-10 text-white fill-white" />
          </span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition"
            aria-label="Đóng"
          >
            <X className="h-8 w-8 md:h-10 md:w-10" />
          </button>
          <div
            className="relative w-full max-w-[1100px] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 h-full w-full rounded-[10px] md:rounded-[14px] shadow-2xl"
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
