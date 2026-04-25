import React from 'react';
import { PlayCircle, ShieldCheck, Zap, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-white pt-0 pb-[50px] md:pt-0 md:pb-[120px] overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={`${import.meta.env.BASE_URL}6701931_Sky_Night_1920x1080.mp4`} type="video/mp4" />
      </video>

      <div className="max-w-7xl mx-auto container-padding relative z-10 text-center pt-[60px] md:pt-[80px]">
        {/* Logo */}
        <div className="flex justify-center mb-[20px] mt-[4px]">
          <img
            src={`${import.meta.env.BASE_URL}fluentcom-logo.webp`}
            alt="Fluentcom Logo"
            className="w-[120px] h-[34px] object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Badge */}
        <div className="mb-[20px] md:mb-8 mt-0 ml-0 text-[12px] md:text-[20px]">
          <span className="text-[10px] md:text-[20px] italic font-semibold tracking-wider text-white uppercase">
            DÀNH CHO: CHỦ DOANH NGHIỆP, FREELANCER, CHUYÊN GIA EXPERT VÀ SOLO ENTREPRENEUR <br className="hidden md:block" /> KHAO KHÁT X10 DOANH SỐ — MÀ KHÔNG BỊ PHÌNH QUỸ LƯƠNG NHÂN SỰ.
          </span>
        </div>

        <h1 className="text-[36px] md:text-[96px] font-display mb-6 md:mb-8 leading-[1.1] tracking-tight mx-auto w-full max-w-[1100px] text-white drop-shadow-md">
          BẠN RẤT GIỎI NGHỀ CỦA MÌNH... NHƯNG TÀI KHOẢN NGÂN HÀNG LẠI ĐANG "PHẢN BỘI" NĂNG LỰC ĐÓ?
        </h1>
        
        <div className="text-base md:text-[26px] font-normal mb-[22px] md:mb-[40px] w-full max-w-[940px] mx-auto leading-relaxed text-[#ffffff] space-y-4 md:space-y-6">
          <p className="w-full md:w-[940px] text-[#ffffff] text-base md:text-[26px] text-center leading-relaxed font-normal">
            <span className="font-bold">Tiết lộ lời giải từ The KP3:</span> Một Hệ thống làm việc bằng AI Agent. Sức mạnh tương đương cả một biệt đội Marketing tinh nhuệ gộp lại — nằm gọn trong tay bạn, với khoản đầu tư chưa bằng một chầu nhậu cuối tuần.
          </p>
          <p className="w-full md:w-[940px] text-[#ffffff] text-base md:text-[26px] leading-relaxed font-normal">
            Đã đến lúc dùng 12 "Nhân Sự AI" chuyên biệt này để cào Lead, tạo Mồi Nhử, viết Quảng Cáo, dọn sẵn Funnel và tư vấn chốt khách thay bạn. Chúng làm việc ngày đêm với tốc độ gấp 10 lần sức người, dựa trên Framework tỷ đô đã được kiểm chứng!
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <a href="#dang-ky-goi" className="btn-primary w-full md:w-auto shadow-[0_0_20px_rgba(0,0,0,0.3)] md:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:!bg-dark hover:-translate-y-2 transition-transform duration-300 !pt-[12px] !pb-[12px] md:!pt-[36px] md:!pb-[28px] md:!px-[40px] !px-[10px] !rounded-[11px] md:!rounded-[20px] border-0 italic">
            <span className="text-[22px] md:text-[56px] leading-tight md:leading-[58px] uppercase not-italic text-center md:w-[902px] md:h-auto block tracking-normal md:tracking-[-1px] font-bold">
              MỞ KHOÁ TRỌN BỘ 12 <br className="md:hidden" />ĐẶC VỤ AI AGENTS NGAY
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
