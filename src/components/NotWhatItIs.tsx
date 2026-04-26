import React from 'react';

const NOT_LIST: string[] = [
  'KHÔNG PHẢI là một chatbot mà bạn phải chat hỏi đáp đi hỏi đáp lại mỗi lần.',
  'KHÔNG PHẢI là một khoá học với 40-50 video bạn phải dành 3-6 tháng mới xem hết.',
  'KHÔNG PHẢI là phần mềm đòi hỏi kiến thức code hay prompt engineering.',
  'KHÔNG PHẢI là "AI tự nghĩ" — đây là 12 khung tư duy đã được đóng gói sẵn theo công thức marketing đã kiểm chứng.',
  'KHÔNG PHẢI là gói subscription — bạn trả 1 lần và sử dụng trọn đời.',
];

export default function NotWhatItIs() {
  return (
    <section className="bg-white section-padding" id="not-what-it-is">
      <div className="max-w-[1400px] mx-auto container-padding">
        <h2 className="section-title font-display leading-tight text-black text-center mb-5 md:mb-8">
          TRƯỚC KHI ĐỌC TIẾP — HÃY HIỂU RÕ<br className="hidden md:inline" /> HỆ THỐNG NÀY KHÔNG PHẢI LÀ GÌ
        </h2>

        <div className="text-center mb-8 md:mb-12">
          <img
            src={`${import.meta.env.BASE_URL}lung-may-sayno.webp`}
            alt="Say no"
            className="w-full max-w-[860px] h-auto mx-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="content-width mx-auto">
          <p className="text-base md:text-[27px] leading-relaxed text-black mb-8 md:mb-12 text-center">
            Để bạn không có kỳ vọng sai, tôi muốn nói thẳng:
          </p>

          <ul className="space-y-5 md:space-y-7 mb-10 md:mb-14">
            {NOT_LIST.map((item, i) => (
              <li key={i} className="flex items-start gap-3 md:gap-4 text-base md:text-[27px] leading-relaxed text-black">
                <span className="flex-shrink-0 inline-flex items-center justify-center h-[26px] md:h-[44px] text-base md:text-xl leading-none">❌</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/KHÔNG PHẢI/g, '<strong>KHÔNG PHẢI</strong>') }} />
              </li>
            ))}
          </ul>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="!font-sans !normal-case font-bold text-xl md:text-[32px] text-center text-[#6500b9] mb-6 md:mb-8 tracking-normal">
              Vậy đây là gì?
            </h3>

            <div className="mb-6 md:mb-8">
              <img
                src={`${import.meta.env.BASE_URL}12-file.webp`}
                alt="12 file markdown"
                className="w-full h-auto mx-auto rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-5 md:space-y-7 text-base md:text-[27px] leading-relaxed text-black text-left">
              <p>
                Đây là <mark className="bg-[#FFF700] text-black px-2 font-bold">12 file .md (markdown)</mark> chứa cấu trúc tư duy chuyên sâu — bạn chỉ cần upload vào ChatGPT/Claude của mình, gõ yêu cầu → AI sẽ làm việc theo đúng quy trình của một chuyên gia marketing đã có <mark className="bg-[#FFF700] text-black px-2 font-bold">13 năm kinh nghiệm thực chiến</mark>.
              </p>
              <p className="font-bold">
                Cắm là chạy. Không cần học cách viết prompt phức tạp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
