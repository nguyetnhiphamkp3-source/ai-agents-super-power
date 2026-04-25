import React, { useEffect, useState } from 'react';
import { Play, Volume2, VolumeX, X } from 'lucide-react';

const VTV_VIDEO_ID = 'i40x4trvxy';
const VTV_VIDEO_TITLE = 'Chương trình: Giải mã E-learning - Chìa khóa chuyển đổi số giáo dục Việt Nam';

export default function VtvButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      setMuted(true);
    }
  }, [open]);

  const wistiaParams = new URLSearchParams({
    autoPlay: 'true',
    muted: muted ? 'true' : 'false',
    playButton: playing ? 'true' : 'false',
    smallPlayButton: 'false',
    controlsVisibleOnLoad: playing ? 'true' : 'false',
    playbar: playing ? 'true' : 'false',
    volumeControl: playing ? 'true' : 'false',
    fullscreenButton: playing ? 'true' : 'false',
    settingsControl: 'false',
    endVideoBehavior: 'loop',
    playsinline: 'true',
  });
  const embedSrc = VTV_VIDEO_ID
    ? `https://fast.wistia.net/embed/iframe/${VTV_VIDEO_ID}?${wistiaParams.toString()}`
    : '';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="KP3 trên VTV2"
        className={`fixed right-4 md:right-6 bottom-24 md:bottom-8 z-[90] flex items-center gap-2 md:gap-3 pl-4 md:pl-5 pr-3 md:pr-4 py-2 md:py-2.5 rounded-full bg-[#e03e2c] hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="font-sans font-bold text-[14px] md:text-[16px] tracking-wide text-white whitespace-nowrap uppercase">
          KP3 trên
        </span>
        <img
          src={`${import.meta.env.BASE_URL}logo-vtv2.webp`}
          alt="VTV2"
          className="h-6 md:h-7 w-auto"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-[840px] bg-white rounded-[10px] md:rounded-[14px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-3 md:py-4 border-b border-black/10">
              <h3 className="!font-sans !normal-case font-normal text-base md:text-lg text-black leading-snug tracking-normal line-clamp-2">
                {VTV_VIDEO_TITLE}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
                className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#e03e2c] hover:brightness-110 text-white flex items-center justify-center transition"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              {VTV_VIDEO_ID ? (
                <iframe
                  key={`${playing}-${muted}`}
                  className={`absolute inset-0 h-full w-full ${!playing ? 'pointer-events-none' : ''}`}
                  src={embedSrc}
                  title={VTV_VIDEO_TITLE}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/60 !font-sans text-sm md:text-base px-6 text-center">
                  Video sẽ được cập nhật sau — gán YouTube ID vào hằng số <code className="mx-1 px-2 py-0.5 bg-white/10 rounded">VTV_VIDEO_ID</code> trong VtvButton.tsx
                </div>
              )}

              {VTV_VIDEO_ID && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMuted((m) => !m);
                    if (muted) setPlaying(true);
                  }}
                  aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/70 text-white hover:bg-black/85 transition"
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5 md:h-6 md:w-6" />
                  ) : (
                    <Volume2 className="h-5 w-5 md:h-6 md:w-6" />
                  )}
                </button>
              )}

              {VTV_VIDEO_ID && !playing && (
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(true);
                    setMuted(false);
                  }}
                  aria-label="Phát video"
                  className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                >
                  <span className="flex items-center justify-center px-5 py-3 md:px-7 md:py-4 rounded-xl md:rounded-2xl bg-black/60 hover:bg-black/75 shadow-lg transition">
                    <Play className="h-7 w-7 md:h-10 md:w-10 text-white fill-white" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
