import React from 'react';
import FeedbackInline from './FeedbackInline';
import VideoPlayer from './VideoPlayer';

export default function Problem() {
  return (
    <section className="bg-white section-padding !pt-[40px] md:!pt-[80px]" id="problem">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="content-width mt-6 md:mt-12">
          <div className="space-y-6 md:space-y-10 text-base md:text-[27px] leading-relaxed mb-8 md:mb-12">
            <p>
              Hãy thẳng thắn nhìn vào cái <span className="underline decoration-primary decoration-2 underline-offset-4">vòng lặp tồi tệ</span> mà bạn đang mắc kẹt mỗi ngày.
            </p>

            <p>
              Bạn là một chuyên gia. Bạn có thể là một bác sĩ mở phòng khám, một chủ spa tâm huyết, một founder startup, hay một freelancer cứng cựa.
            </p>

            <p>
              Sản phẩm của bạn rất ngon. Tay nghề của bạn không phải bàn cãi. Khách hàng nào làm việc với bạn xong cũng khen nức nở.
            </p>

            <p className="font-bold">
              Nhưng... sự thật tàn nhẫn là: <span className="highlight">KHÔNG MỘT AI BIẾT TỚI BẠN CẢ!</span>
            </p>

            <p>
              Mỗi sáng thức dậy, thay vì tập trung vào chuyên môn, bạn lại phải bóp trán với câu hỏi ám ảnh: <span className="italic underline decoration-primary decoration-2 underline-offset-4">"Khách hàng tiếp theo sẽ đến từ đâu?"</span>
            </p>
          </div>

          <ul className="space-y-3 md:space-y-8 mb-8 md:mb-12">
            <li className="flex items-start gap-4 text-base md:text-[27px] text-[#000000] leading-relaxed">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
              </div>
              <div>
                Bạn lóc cóc lên mạng học viết content. Cắn bút cả buổi sáng viết được một bài, đăng lên <span className="underline decoration-primary decoration-2 underline-offset-4">lèo tèo vài cái like</span> của người nhà.
              </div>
            </li>
            <li className="flex items-start gap-4 text-base md:text-[27px] text-[#000000] leading-relaxed">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
              </div>
              <div>
                Bạn cắn răng nạp tiền chạy Facebook Ads. Đốt vài triệu, kết quả trả về là một <span className="underline decoration-primary decoration-2 underline-offset-4">đống tin nhắn rác</span>, hỏi giá xong "seen" rồi biến mất.
              </div>
            </li>
            <li className="flex items-start gap-4 text-base md:text-[27px] text-[#000000] leading-relaxed">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
              </div>
              <div>
                Bạn mò mẫm tự làm phễu, tự làm website, tự nhắn tin CSKH.
              </div>
            </li>
          </ul>

          <FeedbackInline image="fb38.png" />

          <div className="space-y-6 md:space-y-10 text-base md:text-[27px] leading-relaxed">
            <p>
              Cuối cùng, bạn <span className="highlight">ôm đồm cả núi việc tay chân</span>. Bạn làm 14 tiếng/ngày. Bạn kiệt sức. Bạn không còn là Chủ doanh nghiệp nữa, bạn <span className="highlight">tự biến mình thành "nô lệ"</span> cho chính cái cơ ngơi của mình.
            </p>

            <p>
              Đến lúc này, bạn bắt đầu nghĩ đến việc <span className="underline decoration-primary decoration-2 underline-offset-4">đi thuê người</span>.
            </p>
            
            <p>
              Bạn <span className="underline decoration-primary decoration-2 underline-offset-4">thuê ngoài với kỳ vọng được "cứu"</span>. Nhận lại những báo cáo đầy thuật ngữ đẹp đẽ: Reach, Impression, Awareness...
            </p>

            <p>
              Nhưng câu hỏi duy nhất bạn cần lời đáp — <span className="font-bold highlight">"Tháng này tôi bán được bao nhiêu đơn?"</span> — thì lại không có số cụ thể. Hoặc nhận về câu trả lời quen thuộc: <span className="underline decoration-primary decoration-2 underline-offset-4">"do thuật toán"</span>, "do sản phẩm"... → câu trả lời trở nên mơ hồ.
            </p>

            <p className="font-bold text-primary">
              Đủ rồi. Dừng lại đi!
            </p>

            <FeedbackInline image="fb30.jpeg" />

            <p>
              Marketing không tạo ra tiền tươi thóc thật thì chỉ là <span className="underline decoration-primary decoration-2 underline-offset-4">trò đốt tiền mua vui</span>.
            </p>

            <p>
              Rồi bạn nghe thiên hạ đồn về "AI". Bạn cũng tải ChatGPT về. Bạn lưu hàng rổ "Bí kíp 1000 prompt thần thánh" trên mạng.
            </p>

            <p>
              Nhưng khi bạn gõ lệnh, AI nhả ra một đống <span className="underline decoration-primary decoration-2 underline-offset-4">"văn mẫu" sáo rỗng</span>, đọc cứng ngắc như robot trả bài. Bạn lại phải xắn tay áo lên sửa lại từ đầu. Thà tự viết cho nhanh!
            </p>

            <p>
              Sự thật là: <span className="font-bold highlight">Bạn đang chơi một trò chơi mà luật lệ đã thay đổi từ lâu.</span>
            </p>

            <p>
              Trong khi bạn đang làm việc bằng cơm, và lóng ngóng dùng AI như một món đồ chơi hỏi đáp... thì ngoài kia, đối thủ của bạn đang dùng AI để <span className="underline decoration-primary decoration-2 underline-offset-4">tự động hóa toàn bộ quy trình</span> và <span className="underline decoration-primary decoration-2 underline-offset-4">chiếm lĩnh thị phần của bạn</span>.
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-14 max-w-[840px] mx-auto w-full">
          <VideoPlayer id="7WvKgSXHs18" />
        </div>
      </div>
    </section>
  );
}
