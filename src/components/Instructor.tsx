import React from 'react';
import { Clock } from 'lucide-react';
import FeedbackInline from './FeedbackInline';

export default function Instructor() {
  const timeline: { time: string; html: string }[] = [
    {
      time: "8:00 sáng",
      html: 'Bạn thong thả <mark class="bg-[#FFF700] text-black px-2 font-bold">nhâm nhi ly cà phê đầu ngày</mark>. Thay vì đối mặt với những cuộc họp căng thẳng hay thúc giục team Marketing, bạn chỉ cần <mark class="bg-[#FFF700] text-black px-2 font-bold">mở hệ thống AI Agent lên</mark>.'
    },
    {
      time: "8:04 sáng",
      html: 'Bạn ra lệnh cho <strong>Agent Avatar Builder</strong> phân tích tâm lý khách hàng cho sản phẩm bạn đang kinh doanh. Trong nháy mắt, hệ thống trả về chính xác những <mark class="bg-[#FFF700] text-black px-2 font-bold">trăn trở sâu kín</mark>, những điều khách hàng quan tâm nhất — điều mà nhân viên thông thường <mark class="bg-[#FFF700] text-black px-2 font-bold">phải mất cả tuần</mark> để tìm hiểu.'
    },
    {
      time: "8:07 sáng",
      html: 'Bạn chuyển dữ liệu đó sang <strong>Agent Ad Copy Machine</strong>. Chỉ với <mark class="bg-[#FFF700] text-black px-2 font-bold">2 cú click</mark>, 5-10 mẫu quảng cáo phù hợp đúng tâm lý khách đã sẵn sàng.'
    },
    {
      time: "8:09 sáng",
      html: 'Bạn gửi bộ kịch bản từ <strong>Agent Sales Call Script</strong> cho nhân viên tư vấn, dặn:<br/><span class="italic">"Cứ bám sát quy trình này, <mark class="bg-[#FFF700] text-black px-2 font-bold">tỉ lệ chốt đơn sẽ tăng rõ rệt</mark>."</span>'
    },
    {
      time: "8:12 sáng",
      html: 'Ly cà phê vẫn còn nóng, nhưng <mark class="bg-[#FFF700] text-black px-2 font-bold">toàn bộ hệ thống bán hàng</mark> của công ty bạn đã vào guồng vận hành.'
    }
  ];

  return (
    <section id="instructor" className="bg-white pt-[50px] pb-[50px] md:pt-[100px] md:pb-[120px]">
      <div className="max-w-7xl mx-auto container-padding">
        <h2 className="section-title font-display text-center mb-[6px] md:mb-4 max-w-5xl mx-auto leading-tight uppercase">
          HÃY TƯỞNG TƯỢNG SÁNG NGÀY MAI KHI BẠN THỨC DẬY...
        </h2>
        <p className="text-center text-base md:text-[27px] font-normal mb-8 md:mb-12 text-black max-w-[600px] mx-auto">
          Hãy hình dung Hệ thống Agent thực chiến này hoạt động vào sáng sớm mai thế này.
        </p>

        <div className="max-w-4xl mx-auto mb-10 md:mb-16">
          <img 
            src={`${import.meta.env.BASE_URL}12agenthuman.webp`}
            alt="AI Agent with Human" 
            className="w-full h-auto rounded-2xl shadow-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="content-width mx-auto space-y-6 md:space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-4 md:gap-6 group">
              <div className="flex-shrink-0 mt-1 md:mt-2">
                <span className="text-primary font-bold text-xl md:text-3xl">✓</span>
              </div>
              <div className="text-base md:text-[27px] leading-relaxed text-black">
                <span className="font-bold">{item.time}:</span> <span dangerouslySetInnerHTML={{ __html: item.html }} />
              </div>
            </div>
          ))}
        </div>

        <div className="content-width mx-auto mt-12 md:mt-20">
          <p className="text-base md:text-[27px] leading-relaxed text-black italic text-center">
            Trong khi đối thủ vẫn loay hoay trong những group chat báo cáo không hồi kết, thì bạn đã hoàn thành <mark className="bg-[#FFF700] text-black px-2 font-bold not-italic">khối lượng công việc của cả một phòng ban</mark> — và sẵn sàng đón doanh thu về.
          </p>
        </div>

        <FeedbackInline image="fb33.webp" />
      </div>
    </section>
  );
}
