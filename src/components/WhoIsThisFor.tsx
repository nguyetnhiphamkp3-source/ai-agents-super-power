import React from 'react';

const QUESTIONS: string[] = [
  'Bạn đang làm việc <mark class="bg-[#FFF700] text-black px-2 font-bold">12-16 tiếng/ngày</mark> nhưng doanh thu vẫn chưa tăng tương xứng?',
  'Bạn cắn bút 2 tiếng mới viết xong 1 bài Facebook mà <strong>tương tác vẫn lèo tèo</strong>?',
  'Bạn từng <mark class="bg-[#FFF700] text-black px-2 font-bold">đốt hàng chục triệu</mark> cho Ads và agency nhưng đơn hàng không về?',
  'Bạn muốn scale nhưng e ngại thuê nhân sự vì <strong>khó quản lý và chi phí cao</strong>?',
  'Bạn đã thử dùng ChatGPT/Claude nhưng output ra <strong>văn mẫu cứng nhắc</strong>, <mark class="bg-[#FFF700] text-black px-2 font-bold">không bán được hàng</mark>?',
  'Bạn đã mua nhiều khoá học nhưng không có thời gian xem hết — và <strong>kết quả vẫn dậm chân tại chỗ</strong>?',
  'Bạn muốn có một <strong>"đội marketing riêng"</strong> với <mark class="bg-[#FFF700] text-black px-2 font-bold">ngân sách dưới 10 triệu/tháng</mark>?',
  'Bạn tin rằng năm 2026 không dùng AI sẽ <mark class="bg-[#FFF700] text-black px-2 font-bold">bị bỏ lại phía sau</mark>, nhưng chưa biết bắt đầu từ đâu?',
  'Bạn đang muốn dành nhiều thời gian hơn cho <strong>gia đình, sức khoẻ</strong>, hoặc các dự án lớn hơn — thay vì <mark class="bg-[#FFF700] text-black px-2 font-bold">sa lầy vào việc nhỏ hàng ngày</mark>?',
];

export default function WhoIsThisFor() {
  return (
    <section className="bg-white section-padding" id="who-is-this-for">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="content-width mx-auto text-center mb-6">
          <h2 className="section-title font-display leading-tight text-black mb-3">
            HỆ THỐNG NÀY DÀNH CHO AI?
          </h2>
          <p className="text-base md:text-[27px] leading-relaxed text-black text-balance">
            Nếu bạn gật đầu với bất kỳ câu hỏi nào dưới đây — thì <mark className="bg-[#FFF700] text-black px-2 font-bold">12 AI Agent</mark> là lựa chọn hoàn hảo dành cho bạn.
          </p>
        </div>

        <ul className="content-width mx-auto space-y-5 md:space-y-7 mb-10 md:mb-14">
          {QUESTIONS.map((q, i) => (
            <li
              key={i}
              className="flex items-start gap-3 md:gap-4 text-base md:text-[27px] leading-relaxed text-black"
            >
              <span className="flex-shrink-0 inline-flex items-center justify-center h-[26px] md:h-[44px]">
                <span className="inline-flex items-center justify-center w-5 h-5 md:w-7 md:h-7 rounded-full bg-primary/20">
                  <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary" />
                </span>
              </span>
              <span dangerouslySetInnerHTML={{ __html: q }} />
            </li>
          ))}
        </ul>

        <p className="content-width mx-auto text-center text-base md:text-[27px] leading-relaxed text-black font-bold">
          Nếu bạn nói "ĐÚNG" với <mark className="bg-[#FFF700] text-black px-2 font-bold">3 câu trở lên</mark> — thì đây là giải pháp dành cho bạn.
        </p>
      </div>
    </section>
  );
}
