import React from 'react';

type UseCase = {
  num: string;
  title: string;
  oldWay: string;
  agentName: string;
  newWay: string;
  result: string;
};

const USE_CASES: UseCase[] = [
  {
    num: '01',
    title: 'Nghiên Cứu Khách Hàng',
    oldWay: 'Bạn lập form khảo sát Google. Phỏng vấn 10-20 khách. Đọc ngàn comment Facebook. Mất 1-2 tuần để rút ra insight cơ bản. Mà nhiều khi chỉ là cảm tính.',
    agentName: 'AGENT AVATAR BUILDER',
    newWay: 'Bạn nhập tên sản phẩm + ngách. Agent trả lời sau 5 phút: 5 nỗi đau sâu nhất của khách hàng · 3 mong muốn thầm kín · 7 câu hỏi khách hỏi lúc 3h sáng · 4 câu phản đối thường gặp + cách xử lý.',
    result: 'Bạn có toàn bộ insight để viết content trúng tâm lý — sau 1 ly cà phê.',
  },
  {
    num: '02',
    title: 'Viết Quảng Cáo',
    oldWay: 'Bạn cắn bút 2 tiếng để viết 1 caption Facebook Ads. Đăng lên — không hiệu quả. Sửa lại. Đăng lại. Thuê freelancer 5tr/tháng — chất lượng không ổn định.',
    agentName: 'AGENT AD COPY MACHINE',
    newWay: 'Bạn nhập sản phẩm + insight khách. Agent tạo ra <mark class="bg-[#FFF700] text-black px-2 font-bold">5-10 mẫu quảng cáo khác nhau</mark> trong 2 phút — mỗi mẫu khai thác một góc tâm lý khác (tò mò, tham vọng, bằng chứng, sợ mất, nhu cầu hiện tại).',
    result: 'Bạn có 5-10 ad creative để A/B test — chứ không phải đoán mò.',
  },
  {
    num: '03',
    title: 'Xây Hệ Thống Phễu',
    oldWay: 'Bạn thuê agency 20-30 triệu để vẽ funnel. Đợi 1 tháng. Nhận về một sơ đồ Miro phức tạp. Không biết bắt đầu từ đâu.',
    agentName: 'AGENT FUNNEL STRATEGIST',
    newWay: 'Bạn nhập offer + tệp khách. Agent vạch ra trong 15 phút: Sơ đồ funnel A-Z (từ traffic lạnh đến khách trung thành) · Mồi nhử nào phù hợp · Trang đích viết theo cấu trúc nào · Upsell, downsell, cross-sell ở đâu · Email nurture mấy bước.',
    result: 'Bạn có blueprint sẵn sàng triển khai — không cần thuê agency.',
  },
  {
    num: '04',
    title: 'Viết Email Chăm Sóc',
    oldWay: 'Sau khi khách opt-in, bạn không biết viết gì. Mở Mailchimp ra... rồi đóng lại. Không có email = không có chuyển đổi tăng thêm.',
    agentName: 'AGENT EMAIL CLOSER',
    newWay: 'Bạn nhập tệp khách + offer. Agent viết trong 5 phút: Chuỗi 7 email chăm sóc sau opt-in · Email onboarding sau khi mua · Email upsell sản phẩm cao cấp hơn · Email re-engage tệp đã ngủ quên.',
    result: 'Toàn bộ viết theo phong cách kể chuyện — không phải newsletter công ty cứng nhắc.',
  },
  {
    num: '05',
    title: 'Viết Kịch Bản Video Bán Hàng (VSL)',
    oldWay: 'Bạn thuê copywriter 5-10 triệu/script. Đợi 1 tuần. Sửa qua sửa lại. Đôi khi vẫn không hiệu quả.',
    agentName: 'AGENT VSL SCRIPTWRITER',
    newWay: 'Bạn nhập offer + thông tin khách. Agent viết kịch bản VSL chuẩn <mark class="bg-[#FFF700] text-black px-2 font-bold">1.500 từ</mark> trong 10 phút — có timestamp, có gợi ý hình ảnh, có cấu trúc tâm lý chuẩn.',
    result: 'Bạn chỉ việc đứng trước camera đọc.',
  },
  {
    num: '06',
    title: 'Phân Tích Đối Thủ + Định Vị',
    oldWay: 'Bạn lướt Facebook đối thủ 1 buổi. Cảm tính ghi chép. Không biết làm sao để khác biệt.',
    agentName: 'AGENT HERO MECHANISM',
    newWay: 'Bạn nhập sản phẩm + 3 đối thủ. Agent phân tích và đặt tên cho <mark class="bg-[#FFF700] text-black px-2 font-bold">Cơ Chế Độc Quyền</mark> của bạn — một phương pháp mà đối thủ không thể sao chép.',
    result: 'Bạn không còn so sánh giá nữa — bạn so sánh giá trị độc nhất.',
  },
];

export default function UseCaseCompare() {
  return (
    <section className="bg-[#f7f5fb] section-padding" id="use-cases">
      <div className="max-w-[1400px] mx-auto container-padding">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="section-title font-display leading-tight text-black mb-5 md:mb-8">
            HÌNH DUNG SỰ KHÁC BIỆT CỤ THỂ —<br className="hidden md:inline" /> TRƯỚC VÀ SAU KHI CÓ 12 AGENT
          </h2>
          <p className="content-width mx-auto text-base md:text-[27px] leading-relaxed text-black">
            Đây là 6 use case thực tế. So sánh thẳng cách làm hiện tại của bạn với cách làm khi có 12 AI Agent.
          </p>
        </div>

        <div className="content-width mx-auto space-y-8 md:space-y-12">
          {USE_CASES.map((uc) => (
            <div key={uc.num} className="bg-white rounded-2xl p-[28px] shadow-sm">
              <div className="flex items-center gap-2.5 md:gap-3 mb-6 md:mb-8">
                <span
                  aria-hidden="true"
                  className="relative inline-flex items-center justify-center shrink-0 w-6 h-6 md:w-8 md:h-8"
                >
                  <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring-soft pointer-events-none" />
                  <span
                    className="absolute inset-0 rounded-full bg-primary animate-pulse-ring-soft pointer-events-none"
                    style={{ animationDelay: '1.2s' }}
                  />
                  <span className="absolute inset-0 rounded-full bg-primary/20" />
                  <span className="relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary" />
                </span>
                <h3
                  className="!font-sans !normal-case text-left font-bold text-xl md:text-[27px] text-primary tracking-tight leading-tight"
                  style={{ wordSpacing: '-0.05em' }}
                >
                  {uc.title}
                </h3>
              </div>

              <div className="flex flex-col gap-4 md:gap-5">
                <div>
                  <p
                    className="!font-sans !normal-case font-bold text-xl md:text-[27px] text-black mb-1 tracking-tight"
                    style={{ wordSpacing: '-0.05em' }}
                  >
                    Cách cũ
                  </p>
                  <p className="!font-sans text-base md:text-[27px] leading-relaxed text-black tracking-normal">
                    {uc.oldWay}
                  </p>
                </div>
                <div className="border-2 border-primary rounded-2xl p-6 bg-white">
                  <p
                    className="!font-sans !normal-case font-bold text-xl md:text-[27px] text-black mb-1 tracking-tight"
                    style={{ wordSpacing: '-0.05em' }}
                  >
                    Với <span className="uppercase">{uc.agentName}</span>
                  </p>
                  <p
                    className="!font-sans text-base md:text-[27px] leading-relaxed text-black tracking-normal"
                    dangerouslySetInnerHTML={{ __html: uc.newWay }}
                  />
                </div>
              </div>

              <p className="!font-sans !normal-case text-center text-base md:text-[27px] font-medium text-black mt-6 md:mt-8 leading-relaxed tracking-normal [text-wrap:balance]">
                → {uc.result}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
