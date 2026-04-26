import React from 'react';
import FeedbackInline from './FeedbackInline';

export default function Journey() {
  return (
    <section className="bg-[#F8F4FF] section-padding" id="journey">
      <div className="max-w-7xl mx-auto container-padding">
        <h2 className="section-title font-display text-center title-spacing mx-auto mb-0 mx-3 md:mx-auto max-w-[980px]">
          DỪNG NGAY VIỆC ĐỐT TIỀN CHO NHÂN SỰ LƯỜI BIẾNG VÀ QUẢNG CÁO VÔ NGHĨA!
        </h2>

        <div className="content-width mt-6 md:mt-12">
          <div className="space-y-6 md:space-y-10 text-base md:text-[27px] leading-relaxed text-justify">
            <p>
              Tôi — Dương Trọng Nghĩa — hoàn toàn thấu hiểu cái cảm giác <span className="highlight">bất lực đến phát điên</span> khi bạn đang đứng nhìn <span className="underline underline-offset-4 font-semibold">dòng tiền của mình bốc hơi mỗi ngày</span>. Tại sao? Vì chính tôi đã từng bị nhấn chìm trong cái <span className="highlight">vũng lầy lừa bịp</span> đó suốt <span className="font-bold">13 năm trời "ăn hành" từ trường đời</span>!
            </p>
            <p>
              Năm 2012, tôi làm một việc mà ai cũng bảo là điên rồ: Rời bỏ giảng đường đại học để lao vào nền tảng Affiliate Network đầu tiên tại Việt Nam. Đó là nơi tôi nếm những cái tát đầu đời và học được bài học mà không một giáo sư nào dạy bạn: <mark className="bg-[#FFF700] text-black px-2 font-bold">Nếu không tạo ra chuyển đổi, bạn sẽ chết đói</mark>.
            </p>
            <img
              src={`${import.meta.env.BASE_URL}kp3-1.webp`}
              alt="KP3"
              className="w-full max-w-[560px] h-auto mx-auto block"
            />
            <p>
              Tôi không ngồi một chỗ chỉ để nói. Tôi đã <span className="font-bold">trực tiếp nhúng tay vào sự khốc liệt nhất của thị trường</span>:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-[27px] leading-relaxed">Từ việc đồng sáng lập thương hiệu thời trang thể thao với hệ thống cửa hàng đa chi nhánh liên tỉnh.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-[27px] leading-relaxed">Đến việc tư vấn chiến lược thực chiến cho hơn 32 ngành nghề tại 4 quốc gia.</p>
              </li>
            </ul>
            <a
              href="https://blog.ladipage.vn/gap-go-duong-trong-nghia-nguoi-thich-ca-khia-hang-dau-viet-nam-voi-muc-thu-nhap-khung-voi-mot-keyword-duy-nhat-la-landing-page"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-[560px] mx-auto transition-transform duration-300 hover:-translate-y-2"
            >
              <img
                src={`${import.meta.env.BASE_URL}ladipage-2017.webp`}
                alt="Đối tác chiến lược LadiPage từ năm 2017"
                className="w-full h-auto block"
              />
            </a>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-[27px] leading-relaxed">Tôi là Founder của <span className="highlight">The KP3 — đơn vị tiên phong về Landing Page</span>, <span className="underline underline-offset-4 font-semibold">đối tác chiến lược của LadiPage từ năm 2017</span>.</p>
              </li>
            </ul>
            <p>
              Thậm chí, uy tín của tôi đã được khẳng định trên sóng <span className="font-bold">VTV2 "Khởi Nghiệp Kiến Quốc"</span>. Tôi không xuất hiện ở đó để nói đạo lý, tôi ở đó để nói về sự thật — cái sự thật "thẳng và thật" về cách <mark className="bg-[#FFF700] text-black px-2 font-bold">công nghệ phải đẻ ra tiền</mark>.
            </p>
            <video
              src={`${import.meta.env.BASE_URL}kp3-vtv2.mp4`}
              className="w-full max-w-[560px] h-auto rounded-xl md:rounded-2xl shadow-sm mx-auto block"
              autoPlay
              muted
              loop
              playsInline
            />
            <p>
              Nhưng để có được vị thế ngày hôm nay, tôi đã phải trả giá bằng <span className="highlight">hơn 20 lần thất bại đau đớn</span> và hàng đống tiền <span className="underline underline-offset-4 font-semibold">quăng qua cửa sổ</span> cho những cuộc "thử nghiệm Ads" và tuyển nhân sự mới vô định. Tôi đã từng phát điên khi nhìn các nhân sự Marketing công ty mình ngồi ngáp ngắn ngáp dài, trong khi mình phải <mark className="bg-[#FFF700] text-black px-2 font-bold">tự "cắt máu" gánh lỗ</mark>.
            </p>
            <FeedbackInline image="fb28.webp" />
            <p className="italic font-semibold">Một thời gian sau…</p>
            <p>
              Tôi không xây dựng một đội ngũ làm thuê — tôi xây dựng một <span className="font-bold">HỆ THỐNG TỰ VẬN HÀNH</span>.
            </p>
            <p>
              Bí mật nằm ở đây: Tôi đã thay thế những quy trình cũ kỹ bằng các <mark className="bg-[#FFF700] text-black px-2 font-bold">AI Agent tự hành</mark>. Kết quả? Một bộ máy tinh gọn dưới 10 người nhưng tạo ra <span className="highlight">doanh thu triệu đô</span>. Tôi có thể tự do đi chơi khắp thế giới — từ Nga, Trung Quốc đến Singapore — trong khi ở nhà, <span className="italic font-semibold">bot vẫn báo ting ting tiền về liên tục</span>.
            </p>
            <p>
              Chân lý của tôi cực kỳ đơn giản:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-[27px] leading-relaxed"><span className="font-bold">Content là Lưỡi Dao:</span> Nó phải moi được ví khách hàng ngay lập tức (Direct-Response).</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 md:mt-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary"></div>
                </div>
                <p className="text-base md:text-[27px] leading-relaxed"><span className="font-bold">Hệ thống là Định mệnh:</span> Tuyệt đối không giao sinh mệnh doanh nghiệp cho cảm xúc thất thường của con người.</p>
              </li>
            </ul>
            <p>
              Giờ đây, tôi mang tất cả những bài học xương máu từ các dự án triệu đô đó gói gọn vào giải pháp này cho bạn. Bạn muốn tiếp tục làm "nô lệ" cho chính công ty mình, hay muốn sở hữu một hệ thống AI Agent tự hành giúp bạn <mark className="bg-[#FFF700] text-black px-2 font-bold">giải phóng hoàn toàn sức lao động</mark>?
            </p>
            <FeedbackInline image="fb25.webp" />
          </div>
        </div>

        <div className="content-width mt-8 md:mt-12">
          <div className="space-y-6 md:space-y-10 text-base md:text-[27px] leading-relaxed text-justify">
            <p>
              Đã đến lúc bạn ngừng việc <span className="underline underline-offset-4 font-semibold">"vắt kiệt sức" để đổi lấy vài đồng bạc lẻ</span>.
            </p>

            <p>
              Bí mật nằm ở đây: Đừng dùng AI để "Chat". Hãy dùng <mark className="bg-[#FFF700] text-black px-2 font-bold">AI AGENT</mark>.
            </p>

            <p>
              Ở The KP3, chúng tôi không dùng AI để hỏi đáp lặt vặt. Chúng tôi đã "train" (huấn luyện) ra một hệ thống gồm <mark className="bg-[#FFF700] text-black px-2 font-bold">12 SIÊU ĐẶC VỤ AI Agent</mark>.
            </p>

            <p>
              Các Agent không phải là phần mềm thông thường. Các Agent là một <span className="underline underline-offset-4 font-semibold">Biệt Đội Marketing Tinh Nhuệ</span>, được nạp sẵn hàng ngàn giờ kinh nghiệm thực chiến từ những bộ óc xuất sắc nhất, sẵn sàng phục vụ bạn 24/7.
            </p>

            <p>
              Tụi nó <span className="underline underline-offset-4 font-semibold">không đòi tăng lương. Không xin nghỉ phép. Không cãi sếp. Không có drama công sở.</span>
            </p>

            <p>
              Và tốc độ làm việc của các Agent... <mark className="bg-[#FFF700] text-black px-2 font-bold">gấp 10 lần</mark> một nhân sự xuất sắc nhất mà bạn từng biết.
            </p>

            <p>
              Bạn chỉ cần ném cho các Agent 1 cái ý tưởng. Dưới 10 phút, <span className="underline underline-offset-4 font-semibold">toàn bộ phễu Marketing của bạn đã sẵn sàng hoạt động!</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
