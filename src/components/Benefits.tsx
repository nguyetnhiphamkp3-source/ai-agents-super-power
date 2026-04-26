import React from 'react';
import FeedbackInline from './FeedbackInline';

export default function Benefits() {
  return (
    <section id="benefits" className="bg-white relative overflow-hidden pt-[50px] md:pt-[120px] pb-[50px] md:pb-[120px]">
      <div className="max-w-7xl mx-auto container-padding relative z-10">

        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16 px-3 md:px-0">
          <h2 className="section-title font-display leading-tight mb-8 md:mb-12">
            TẠI SAO CHÚNG LẠI THÔNG MINH ĐẾN THẾ?
          </h2>
          <div className="text-center mb-[34px]">
            <img
              src={`${import.meta.env.BASE_URL}naoai2.webp`}
              alt="AI Brain"
              className="w-[380px] h-auto mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="content-width mx-auto">
          <div className="space-y-6 md:space-y-10 text-base md:text-[27px] leading-relaxed">
            <p>
              Có lẽ bạn đã từng thử dùng <span className="italic">ChatGPT, Gemini, Grok,...</span> nhưng kết quả nhận về chỉ là những <span className="underline underline-offset-4 font-semibold">đoạn văn chung chung, sáo rỗng và khô khan như robot trả bài</span>. Những đoạn text đó có thể đọc được, nhưng <mark className="bg-[#FFF700] text-black px-2 font-bold">tuyệt đối không thể khiến khách hàng "mở ví"</mark>.
            </p>

            <p>
              Vậy điều gì khiến <mark className="bg-[#FFF700] text-black px-2 font-bold">12 Agent AI của chúng tôi</mark> trở thành những <mark className="bg-[#FFF700] text-black px-2 font-bold">Siêu chiến binh thực chiến</mark>, khác biệt hoàn toàn với những công cụ AI thông thường?
            </p>

            <p>
              Câu trả lời nằm ở <mark className="bg-[#FFF700] text-black px-2 font-bold">"Hệ thống tư duy chuẩn Marketing"</mark>. Thay vì để AI tự do nói nhảm, chúng tôi đã <span className="underline underline-offset-4 font-semibold">đóng gói sẵn kinh nghiệm từ những bộ óc kinh doanh hàng đầu thế giới</span> vào từng câu lệnh. Mỗi Đặc vụ đều được lập trình để suy nghĩ theo cấu trúc tâm lý khách hàng: <span className="underline underline-offset-4 font-semibold">Khơi gợi nỗi đau ➔ Thấu hiểu vấn đề ➔ Đưa ra giải pháp ➔ Chứng minh hiệu quả ➔ Thúc đẩy hành động.</span>
            </p>

            <p>
              Đó là lý do nội dung mà hệ thống KP3 tạo ra luôn mang đậm <mark className="bg-[#FFF700] text-black px-2 font-bold">"hơi thở con người"</mark>, tinh tế và <mark className="bg-[#FFF700] text-black px-2 font-bold">chạm đúng tử huyệt cảm xúc</mark> của khách hàng.
            </p>

            <div className="text-center mb-6 md:mb-10">
              <img
                src={`${import.meta.env.BASE_URL}lungkinhai.webp`}
                alt="AI Agent Illustration"
                className="w-[380px] h-auto mx-auto rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="font-bold text-primary text-center">
              1 AGENT = 1 KỸ NĂNG CHUYÊN SÂU (Skill) = <mark className="bg-[#FFF700] text-black px-2 font-bold">HIỆU SUẤT CỦA 5-10 CON NGƯỜI CỘNG LẠI</mark>.
            </p>

            <FeedbackInline image="fb22.webp" />

            <p>
              Bạn không cần phải <span className="underline underline-offset-4 font-semibold">mất thời gian học cách viết "Prompt" (câu lệnh) phức tạp</span> hay <span className="underline underline-offset-4 font-semibold">đau đầu dạy dỗ con máy mỗi ngày</span>. Chúng tôi đã <mark className="bg-[#FFF700] text-black px-2 font-bold">huấn luyện sẵn những "lính tinh nhuệ"</mark> này cho bạn. Việc duy nhất bạn cần làm là <mark className="bg-[#FFF700] text-black px-2 font-bold uppercase">kích hoạt và sử dụng ngay lập tức!</mark>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
