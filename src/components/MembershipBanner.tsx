import React from 'react';

export default function MembershipBanner() {
  const BannerContent = () => (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <span className="text-sm md:text-lg font-bold">
        Sở hữu 12 Nhân sự AI thực chiến - Không tăng quỹ lương
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
      <span className="text-sm md:text-lg font-medium opacity-90">
        X10 hiệu suất – Giảm nhân sự
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
      <span className="text-sm md:text-lg font-medium opacity-90">
        Trả một lần - Dùng trọn đời
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
      <span className="text-sm md:text-lg font-medium opacity-90">
        Chốt 200 suất – Đóng cổng
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
      <span className="text-sm md:text-lg font-medium opacity-90">
        Không chi phí ẩn, không phí duy trì
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
      <span className="text-sm md:text-lg font-medium opacity-90">
        Không cần nạp thêm Credit
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
      <span className="text-sm md:text-lg font-medium opacity-90">
        AI Agent Super Power
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
      <span className="text-sm md:text-lg font-medium opacity-90">
        Hiệu suất gấp 10 lần nhân sự xuất sắc
      </span>
      <span className="text-sm md:text-lg opacity-50">•</span>
    </div>
  );

  return (
    <div className="absolute top-0 left-0 w-full text-white py-3 z-[60] overflow-hidden flex bg-[#230338]/40 backdrop-blur-md">
      <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-max pr-4" style={{ animationDuration: '80s' }}>
        <BannerContent />
        <BannerContent />
        <BannerContent />
        <BannerContent />
      </div>
      <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-max pr-4" style={{ animationDuration: '80s' }} aria-hidden="true">
        <BannerContent />
        <BannerContent />
        <BannerContent />
        <BannerContent />
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
