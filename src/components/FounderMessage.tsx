import React from 'react';
import FeedbackInline from './FeedbackInline';

export default function FounderMessage() {
  return (
    <section className="bg-[#f4f4f4] section-padding font-sans text-[#000000]" id="founder-message">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-[690px] mx-auto">
          <h2 className="section-title font-display leading-tight mb-[18px] md:mb-12 uppercase text-center">
            LỰA CHỌN CUỐI CÙNG: ĐẦU TƯ CHO TƯƠNG LAI HAY GIỮ LẠI SỰ TRÌ HOÃN?
          </h2>

          <div className="text-base md:text-[27px] leading-relaxed space-y-8 md:space-y-10 text-left tracking-wide">
            <p>
              Bạn đang đứng trước hai ngã rẽ và quyết định hoàn toàn thuộc về bạn:
            </p>
            
            <div className="space-y-4">
              <p>
                <strong className="font-bold">🔴 NGÃ RẼ SỐ 1: Bạn bấm nút [X] và thoát khỏi trang web này.</strong> Bạn ôm khư khư nhiều nhất 2.999K trong túi. Bạn giữ lại được số tiền đó.
              </p>
              <p>
                Nhưng sự thật là: Sáng mai thức dậy, doanh nghiệp của bạn vẫn không có gì thay đổi. Bạn lại tiếp tục quay cuồng trong <span className="highlight">mớ bòng bong công việc tay chân</span>. Bạn tiếp tục bóp trán vì không có khách. Và bạn ngậm ngùi đứng nhìn dòng tiền đổ hết vào tay những <span className="highlight">đối thủ biết dùng công nghệ nhanh hơn bạn</span>. Bạn chọn sự "tiết kiệm 2.999k" để đổi lấy sự <span className="highlight">giậm chân tại chỗ mãi mãi</span>.
              </p>
            </div>

            <div className="space-y-4">
              <p>
                <strong className="font-bold">🟢 NGÃ RẼ SỐ 2: Trao cho bạn một tương lai hoàn toàn khác.</strong>
              </p>
              <p>
                Bạn bỏ ra một khoản đầu tư nhỏ nhoi, đổi lại, bạn nhận ngay lập tức <span className="highlight">12 bộ não AI đỉnh cao</span> về làm lính đánh thuê cho mình.
              </p>
              <p>
                Hãy nghĩ xem: Nếu hệ thống này chỉ giúp bạn kiếm về thêm <span className="highlight">ĐÚNG 1 KHÁCH HÀNG MỚI</span> trong tuần tới thôi, nó đã dư sức hoàn vốn gấp cả chục, cả trăm lần rồi!
              </p>
              <p>
                Làm kinh doanh là làm bài toán đầu tư. Người sành sỏi <span className="highlight">đo lường giá trị sinh lời</span>, không ai đo lường chi phí nhặt nhạnh.
              </p>
              <p>
                Đừng đứng mãi ở ngã ba đường để nhìn cơ hội trôi đi. Đội quân AI đã được nạp đạn đầy đủ.
              </p>
              <p>
                Bọn nó chỉ đang chờ một <span className="highlight">mệnh lệnh duy nhất</span> từ ngón tay của bạn.
              </p>
            </div>

            <FeedbackInline image="fb34.webp" />

            <div className="pt-0 flex justify-center">
              <a
                href="#dang-ky-goi"
                className="btn-primary w-full text-center !text-[18px] md:!text-[32px] !pt-[20px] !pb-[18px] !px-[10px] !rounded-xl md:!rounded-[20px] border-0 not-italic leading-tight"
              >
                BẮT ĐẦU NGAY – <br className="md:hidden" />KÍCH HOẠT HỆ THỐNG 12 AI AGENT!
              </a>
            </div>

            <div className="pt-0 md:pt-[20px] italic text-black">
              <p className="text-base md:text-[27px] leading-relaxed">
                <strong className="font-bold not-italic">P.S.</strong> Đằng nào bạn cũng phải học cách làm chủ AI. Hoặc là bạn bắt đầu ngay bây giờ để dẫn đầu thị trường với chi phí chưa tới 3 triệu đồng. Hoặc là chờ thêm một năm nữa, khi đối thủ đã dùng AI chiếm hết khách hàng, lúc đó bạn mới bắt đầu tìm hiểu thì đã quá muộn!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
