import React from 'react';
import FeedbackInline from './FeedbackInline';

export default function Rejection() {
  return (
    <section id="rejection" className="bg-[#201D23] section-padding font-sans text-[#ffffff]">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-[690px] mx-auto">
          <h2 className="section-title font-display leading-tight mb-[22px] md:mb-8 uppercase text-center">
            BỘ AI AGENT SUPER POWER NÀY KHÔNG DÀNH CHO AI
          </h2>

          <div className="text-base md:text-[27px] leading-relaxed space-y-6 md:space-y-8 text-left tracking-wide mt-6 md:mt-10">
            <div className="space-y-4 md:space-y-6">
              <p>
                <span className="text-red-500 font-bold mr-2 text-xl">❌</span>
                <strong>Người muốn làm giàu nhanh mà không làm gì:</strong> AI chỉ là công cụ giúp bạn làm việc nhanh hơn <mark className="bg-[#FFF700] text-black px-2 font-bold">gấp 10 lần</mark>, nó không phải là phép màu thay thế hoàn toàn sức lao động và tư duy kinh doanh của bạn.
              </p>
              <p>
                <span className="text-red-500 font-bold mr-2 text-xl">❌</span>
                <strong>Kinh doanh sản phẩm kém chất lượng hoặc vi phạm pháp luật:</strong> Tôi từ chối cung cấp công cụ chốt đơn mạnh mẽ này cho những <mark className="bg-[#FFF700] text-black px-2 font-bold">mô hình kinh doanh thiếu tử tế</mark>.
              </p>
              <p>
                <span className="text-red-500 font-bold mr-2 text-xl">❌</span>
                <strong>Người thích quản lý kiểu cũ, cồng kềnh:</strong> Nếu bạn vẫn muốn duy trì bộ máy nhân sự đông đúc, họp hành phức tạp thay vì sự <mark className="bg-[#FFF700] text-black px-2 font-bold">tinh gọn và tự động hóa</mark> — hệ thống này không phù hợp với bạn.
              </p>
            </div>

            <p className="pt-4">
              <strong>Hệ thống này chỉ dành cho:</strong> Những <mark className="bg-[#FFF700] text-black px-2 font-bold">chủ doanh nghiệp, Founder, chuyên gia expert, solo entrepreneur và Freelancer thực chiến</mark>, những người đang cần một giải pháp công nghệ mạnh mẽ để tối ưu lợi nhuận và giải phóng sức lao động.
            </p>
          </div>

          <FeedbackInline image="fb9.webp" />
        </div>
      </div>
    </section>
  );
}
