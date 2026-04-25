import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { smoothScrollTo } from '../lib/lenis';

const SECTIONS: { id: string; label: string }[] = [
  { id: '__top', label: 'Đầu trang' },
  { id: 'feedback', label: 'Nghe những feedback nói thật về KP3' },
  { id: 'problem', label: 'Hãy thẳng thắn nhìn vào cái vòng lặp tồi tệ' },
  { id: 'journey', label: 'DỪNG NGAY VIỆC ĐỐT TIỀN CHO NHÂN SỰ LƯỜI BIẾNG VÀ QUẢNG CÁO VÔ NGHĨA!' },
  { id: 'not-what-it-is', label: 'TRƯỚC KHI ĐỌC TIẾP — HÃY HIỂU RÕ HỆ THỐNG NÀY KHÔNG PHẢI LÀ GÌ' },
  { id: 'use-cases', label: 'HÌNH DUNG SỰ KHÁC BIỆT CỤ THỂ — TRƯỚC VÀ SAU KHI CÓ 12 AGENT' },
  { id: 'benefits', label: 'TẠI SAO CHÚNG LẠI THÔNG MINH ĐẾN THẾ?' },
  { id: 'instructor', label: 'HÃY TƯỞNG TƯỢNG SÁNG NGÀY MAI KHI BẠN THỨC DẬY...' },
  { id: 'godfather-offer', label: 'THE GODFATHER OFFER: SỨC MẠNH CỦA ĐỘI QUÂN 12 AGENT' },
  { id: 'who-is-this-for', label: 'HỆ THỐNG NÀY DÀNH CHO AI?' },
  { id: 'rejection', label: 'BỘ AI AGENT SUPER POWER NÀY KHÔNG DÀNH CHO AI' },
  { id: 'video-testimonials', label: 'Lời khách hàng' },
  { id: 'pricing', label: 'GIỜ G ĐÃ ĐẾN. HÃY CHỌN "TRỢ LÝ" PHÙ HỢP VỚI BẠN' },
  { id: 'final-warning', label: 'RỦI RO LỚN NHẤT CỦA BẠN CHÍNH LÀ SỰ TRÌ HOÃN "ĐỂ MAI TÍNH"' },
  { id: 'dang-ky-goi', label: 'ĐĂNG KÝ SỞ HỮU HỆ THỐNG AI AGENT' },
  { id: 'roadmap-3-days', label: 'LỘ TRÌNH 3 NGÀY ĐỂ HỆ THỐNG VẬN HÀNH' },
  { id: 'news', label: 'Góc báo chí' },
  { id: 'faq', label: 'GIẢI ĐÁP NHỮNG THẮC MẮC TRƯỚC KHI BẠN BẮT ĐẦU' },
  { id: 'founder-message', label: 'LỰA CHỌN CUỐI CÙNG: ĐẦU TƯ CHO TƯƠNG LAI HAY GIỮ LẠI SỰ TRÌ HOÃN?' },
];

export default function SectionNav() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('__top');
  const hoverCloseTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = SECTIONS.filter((s) => s.id !== '__top').map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const visibleRatios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visibleRatios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        let bestId = '';
        let bestRatio = 0;
        visibleRatios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        });
        if (bestRatio > 0 && bestId) {
          setActiveId(bestId);
        } else if (window.scrollY < 200) {
          setActiveId('__top');
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    if (id === '__top') {
      smoothScrollTo(0);
    } else {
      smoothScrollTo(`#${id}`);
    }
    setHovered(false);
    setMobileOpen(false);
  };

  const openHover = () => {
    if (hoverCloseTimer.current) {
      window.clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
    setHovered(true);
  };

  const closeHover = () => {
    if (hoverCloseTimer.current) window.clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = window.setTimeout(() => setHovered(false), 120);
  };

  const handleClick = () => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) {
      setMobileOpen(true);
    } else {
      smoothScrollTo(0);
    }
  };

  return (
    <>
      <div
        className={`fixed right-4 md:right-6 bottom-[152px] md:bottom-[96px] z-[90] transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onMouseEnter={openHover}
        onMouseLeave={closeHover}
      >
        <div
          className={`hidden md:block absolute right-0 bottom-full mb-3 bg-white rounded-xl shadow-2xl ring-1 ring-black/10 min-w-[280px] max-h-[70vh] overflow-y-auto transition-all duration-200 ${
            hovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-3 pb-2 border-b border-gray-100">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-black/50">
              Mục lục
            </p>
          </div>
          <ul className="py-1">
            {SECTIONS.map((s) => {
              const isActive = activeId === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-4 py-2 text-[14px] transition cursor-pointer ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-black hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          aria-label="Điều hướng nhanh"
          onClick={handleClick}
          className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary text-white shadow-xl hover:shadow-2xl hover:brightness-110 transition cursor-pointer"
        >
          <ArrowUp className="h-6 w-6 md:h-7 md:w-7" />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end"
          onClick={() => setMobileOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-display text-[20px] text-black">Mục lục</h3>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Đóng"
                className="p-1 text-black/60 hover:text-black transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="py-2 pb-8">
              {SECTIONS.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(s.id)}
                      className={`w-full text-left px-5 py-3 text-[16px] border-b border-gray-50 cursor-pointer ${
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-black active:bg-primary/10'
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
