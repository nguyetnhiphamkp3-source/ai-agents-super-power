import React from 'react';
import { smoothScrollTo } from '../lib/lenis';

type TocItem = { label: string; id: string };

const TOC_PROBLEM_SOLUTION: TocItem[] = [
  { label: 'Vòng lặp tồi tệ bạn đang mắc kẹt', id: 'problem' },
  { label: 'Đốt tiền cho nhân sự & quảng cáo vô nghĩa', id: 'journey' },
  { label: 'Hệ thống này KHÔNG phải là gì', id: 'not-what-it-is' },
  { label: '6 use case: trước & sau khi có 12 Agent', id: 'use-cases' },
  { label: 'Cơ chế thông minh của 12 Agent', id: 'benefits' },
];

const TOC_AGENT_ARMY: TocItem[] = [
  { label: 'Buổi sáng cùng đội quân AI', id: 'instructor' },
  { label: 'The Godfather Offer: 12 Agent', id: 'godfather-offer' },
  { label: 'Hệ thống dành cho ai', id: 'who-is-this-for' },
  { label: 'Đối tượng không phù hợp', id: 'rejection' },
  { label: 'Lời khách hàng', id: 'video-testimonials' },
];

const TOC_REGISTER_SUPPORT: TocItem[] = [
  { label: 'Chọn gói trợ lý phù hợp', id: 'pricing' },
  { label: 'Rủi ro của sự trì hoãn', id: 'final-warning' },
  { label: 'Đăng ký sở hữu hệ thống', id: 'dang-ky-goi' },
  { label: 'Lộ trình 3 ngày triển khai', id: 'roadmap-3-days' },
  { label: 'Báo chí nói gì', id: 'news' },
  { label: 'Câu hỏi thường gặp', id: 'faq' },
  { label: 'Lựa chọn cuối cùng', id: 'founder-message' },
];

function TocColumn({ title, items }: { title: string; items: TocItem[] }) {
  return (
    <div>
      <div className="font-sans font-bold text-base text-white mb-5 normal-case tracking-normal">
        {title}
      </div>
      <ul className="space-y-5 text-sm text-white/70">
        {items.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => smoothScrollTo(`#${it.id}`)}
              className="text-left font-sans hover:text-white transition-colors cursor-pointer"
            >
              {it.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1480px] mx-auto container-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10">
          <div className="md:col-span-3">
            <img
              src={`${import.meta.env.BASE_URL}fluentcom-logo.webp`}
              alt="Fluentcom Logo"
              className="h-8 md:h-10 w-auto object-contain mb-5"
              referrerPolicy="no-referrer"
            />
            <p className="text-sm leading-relaxed text-white/70 mb-5">
              Phát triển một doanh nghiệp là một cuộc chiến đầy cam go. Vì vậy, chúng tôi ở đây làm cho mọi thứ trở nên dễ dàng hơn, dễ đoán hơn, ít căng thẳng hơn và thú vị hơn.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <span className="text-white/90">Trụ sở:</span> Tầng 9, toà nhà VNO, Số 124 Điện Biên Phủ, Phường Tân Định, Thành Phố Hồ Chí Minh
              </li>
              <li>
                <span className="text-white/90">Head Office:</span> Penthouse Camelia Lumiere, Vinhomes Grand Park | Nguyễn Xiển, Phường Long Bình, HCM
              </li>
              <li>
                <span className="text-white/90">Số điện thoại:</span> 0338823300
              </li>
              <li>
                <span className="text-white/90">Email:</span> hi@kp3.tech
              </li>
              <li>
                <span className="text-white/90">MST:</span> 0315165206
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <TocColumn title="Vấn đề & Giải pháp" items={TOC_PROBLEM_SOLUTION} />
          </div>
          <div className="md:col-span-3">
            <TocColumn title="Đội quân 12 Agent" items={TOC_AGENT_ARMY} />
          </div>
          <div className="md:col-span-3">
            <TocColumn title="Đăng ký & Hỗ trợ" items={TOC_REGISTER_SUPPORT} />
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex justify-center items-center gap-5 md:gap-6">
          <a
            href="https://www.facebook.com/duongtrongnghia.theKP3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook — Dương Trọng Nghĩa"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-1 ring-white/25 bg-white/[0.04] flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.6c0-.9.2-1.5 1.5-1.5H17V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.1v2.1H8v3h2.5V21h3z" />
            </svg>
          </a>
          <a
            href="https://duongtrongnghia.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="duongtrongnghia.com"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-1 ring-white/25 bg-white/[0.04] flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 md:w-6 md:h-6">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a13.5 13.5 0 010 18M12 3a13.5 13.5 0 000 18" />
            </svg>
          </a>
          <a
            href="https://kp3.tech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="kp3.tech"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-1 ring-white/25 bg-white/[0.04] flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 md:w-6 md:h-6">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a13.5 13.5 0 010 18M12 3a13.5 13.5 0 000 18" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1480px] mx-auto container-padding py-5 text-center">
          <p className="text-xs md:text-sm tracking-[0.15em] uppercase text-white/60">
            COPYRIGHT © 2026 KP3® | DIRECT RESPONSE DIGITAL MARKETING
          </p>
        </div>
      </div>
    </footer>
  );
}
