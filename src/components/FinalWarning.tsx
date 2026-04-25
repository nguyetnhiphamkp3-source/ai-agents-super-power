import React from 'react';
import FeedbackInline from './FeedbackInline';

export default function FinalWarning() {
  return (
    <section className="bg-white section-padding" id="final-warning">
      <div className="max-w-7xl mx-auto container-padding">
        <h2 className="section-title font-display text-center title-spacing mx-auto mb-0 md:mx-auto max-w-[980px]">
          RỦI RO LỚN NHẤT CỦA BẠN CHÍNH LÀ SỰ TRÌ HOÃN <br className="hidden md:block" /> "ĐỂ MAI TÍNH"
        </h2>

        <div className="content-width mt-8 md:mt-12">
          <div className="space-y-6 md:space-y-10 text-base md:text-[27px] leading-relaxed text-black">
            <p>
              Quyền quyết định đột phá doanh thu chưa bao giờ thuộc về <span className="underline underline-offset-4 font-semibold">số đông hay do dự!</span>
            </p>
            <p>
              Hãy thực tế một chút: Khoản đầu tư <mark className="bg-[#FFF700] text-black px-2 font-bold">chưa đến 3 triệu đồng</mark> — thậm chí chưa bằng một bữa tiệc đãi khách — sẽ không làm bạn nghèo đi. Nhưng cái giá của sự chần chừ chính là việc bạn đang đứng nhìn <span className="underline underline-offset-4 font-semibold">hàng trăm khách hàng tiềm năng</span> rơi thẳng vào tay đối thủ ngay trong đêm nay.
            </p>
            <p>
              Mỗi ngày trôi qua mà không có hệ thống tự động, là thêm một ngày bạn phải:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>Tự mình xoay sở với đống công việc không tên thay vì tập trung vào chiến lược.</li>
              <li>Mệt mỏi vì phải viết nội dung mỗi ngày mà không biết có hiệu quả hay không.</li>
              <li>Gánh nặng chi phí vận hành khi hiệu suất không tỷ lệ thuận với chi phí.</li>
            </ul>
            <p>
              Đừng để doanh nghiệp của mình bị tụt lại phía sau trong khi đối thủ đã bắt đầu sử dụng AI để <mark className="bg-[#FFF700] text-black px-2 font-bold">chiếm lĩnh thị trường</mark>.
            </p>
            <FeedbackInline image="fb36.png" />
            <p className="font-bold">
              Cơ hội để sở hữu hệ thống với mức giá ưu đãi đang khép lại rất nhanh. Hãy quyết định ngay bây giờ để giải phóng sức lao động và tối ưu dòng tiền của bạn!
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mt-12 md:mt-16">
          <a href="#dang-ky-goi" className="btn-primary w-full max-w-[680px] shadow-[0_0_20px_rgba(0,0,0,0.3)] md:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:!bg-dark hover:-translate-y-2 transition-transform duration-300 !pt-[12px] !pb-[12px] md:!pt-[42px] md:!pb-[28px] md:!px-[40px] !px-[10px] !rounded-[16px] md:!rounded-[20px] border-0 !bg-[#6500b9] italic">
            <span className="text-[22px] md:text-[58px] leading-tight md:leading-[58px] uppercase not-italic text-center w-full block tracking-normal md:tracking-[-1px] font-bold">
              BẤM VÀO ĐÂY ĐỂ SỞ HỮU <br className="md:hidden" />HỆ THỐNG <br className="hidden md:block" /> AI AGENT SUPER POWER!
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
