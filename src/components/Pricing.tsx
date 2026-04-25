import React from 'react';
import FeedbackInline from './FeedbackInline';

export default function Pricing() {
  const plans = [
    {
      id: 'basic',
      icon: '🥉',
      name: 'GÓI CƠ BẢN',
      price: '999.000 VNĐ',
      target: 'Dành cho Start-up muốn tối ưu chi phí nhưng cần kết quả Marketing tức thì.',
      features: [
        '<span class="font-bold">Tự do chọn 3 Agent:</span> Bạn được chọn tùy ý 3 trong số 12 Agent phù hợp nhất với nhu cầu hiện tại (Ví dụ: Chuyên nghiên cứu khách hàng, viết nội dung hoặc chạy Ads).',
        '<span class="font-bold">Sử dụng không giới hạn:</span> Không giới hạn số lần chạy cho các Agent đã chọn.',
        '<span class="font-bold">Hỗ trợ trực tiếp qua Telegram:</span> Group kín dành riêng cho khách hàng ASSP, đảm bảo mọi vấn đề kỹ thuật được hỗ trợ xử lý.'
      ],
      highlight: false
    },
    {
      id: 'pro',
      icon: '🌟',
      name: 'GÓI PRO',
      price: '1.999.000 VNĐ',
      target: 'Dành cho doanh nghiệp muốn đột phá hiệu suất mà không cần tuyển thêm nhân sự.',
      features: [
        '<span class="font-bold">Tự do chọn 7 Agent:</span> Bạn được chọn 7 trong số 12 Agent để bao quát hầu hết các khâu quan trọng trong phễu bán hàng.',
        '<span class="font-bold">Sử dụng không giới hạn:</span> Khai thác tối đa công suất của các Agent để phục vụ công việc kinh doanh liên tục.',
        '<span class="font-bold">Hỗ trợ trực tiếp qua Telegram:</span> Group kín dành riêng cho khách hàng ASSP, đảm bảo mọi vấn đề kỹ thuật được hỗ trợ xử lý.'
      ],
      highlight: false
    },
    {
      id: 'vvip',
      icon: '👑',
      name: 'GÓI VVIP PRO',
      price: '2.999.000 VNĐ',
      target: 'Lựa chọn tối ưu nhất dành cho chủ doanh nghiệp muốn sở hữu trọn bộ hệ thống tự động.',
      features: [
        '<span class="font-bold">Sở hữu trọn bộ 12 Agent:</span> Bạn nhận toàn bộ "biệt đội" 12 Agent tinh nhuệ nhất, không thiếu bất kỳ khâu nào từ nghiên cứu đến chốt đơn.',
        '<span class="font-bold">Sử dụng không giới hạn:</span> Vận hành toàn bộ Hệ thống AI Agent thực chiến bán hàng 24/7 mà không tốn thêm bất kỳ chi phí gia hạn nào.',
        '<span class="font-bold">Ưu tiên hỗ trợ kỹ thuật:</span> Được đội ngũ hỗ trợ nhanh chóng qua Email/Fanpage khi có bất kỳ thắc mắc nào.',
        '<span class="font-bold">Hỗ trợ trực tiếp qua Telegram:</span> Group kín dành riêng cho khách hàng ASSP, đảm bảo mọi vấn đề kỹ thuật được hỗ trợ xử lý.'
      ],
      highlight: true
    }
  ];

  const BONUS_TEXT = '<span class="font-bold">Video hướng dẫn:</span> Tặng kèm video hướng dẫn sử dụng Agent để bạn làm chủ hệ thống nhanh nhất.';

  return (
    <section className="bg-white section-padding" id="pricing">
      <div className="max-w-7xl mx-auto container-padding text-left">
        <div className="max-w-[680px] mx-auto mb-12 md:mb-16">
          <h2 className="section-title text-center font-display leading-tight mb-6 md:mb-8 uppercase text-black">
            GIỜ G ĐÃ ĐẾN. HÃY CHỌN "TRỢ LÝ" PHÙ HỢP VỚI BẠN
          </h2>
          <div className="text-base md:text-[24px] leading-relaxed text-black text-center">
            <p>
              Đã đến lúc chấm dứt việc chi tiền cho những quy trình vận hành kém hiệu quả. Dưới đây là 3 lựa chọn để bạn bắt đầu tự động hóa doanh nghiệp ngay hôm nay. Chỉ thanh toán một lần duy nhất — Không phí duy trì — Không ràng buộc!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`flex flex-col py-8 px-5 md:py-10 md:px-[24px] border-0 rounded-[20px] ${
                plan.highlight 
                  ? 'bg-[#f9f5ff] relative' 
                  : 'bg-[#f4f4f4]'
              } transition-all duration-300`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#6500b9] text-white px-6 py-1.5 font-bold tracking-wider uppercase text-sm md:text-base whitespace-nowrap">
                  Khuyên Dùng
                </div>
              )}
              
              <div className="mb-[10px] text-center">
                <div className="text-[22px] md:text-[28px] font-display uppercase text-black mb-2 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-center leading-tight">
                  <span>{plan.name}</span>
                  <span className="hidden md:inline">—</span>
                  <span>{plan.price}</span>
                </div>
              </div>

              <div className="text-[16px] font-normal text-black mb-8 pb-6 border-b border-gray-200 min-h-[80px] text-center not-italic">
                {plan.target}
              </div>

              <ul className="space-y-5 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[16px] text-black leading-relaxed">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-1">
                      <circle cx="10" cy="10" r="10" fill="#6500b9"/>
                      <path d="M14.6666 6.5L8.24992 12.9167L5.33325 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span dangerouslySetInnerHTML={{ __html: feature }}></span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t-2 border-dashed border-[#6500b9]/30">
                <div className="inline-flex items-center gap-1.5 bg-[#FFF700] text-black text-[11px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
                  🎁 Bonus tặng kèm
                </div>
                <div className="flex items-start gap-3 text-[16px] text-black leading-relaxed">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-1">
                    <circle cx="10" cy="10" r="10" fill="#6500b9"/>
                    <path d="M14.6666 6.5L8.24992 12.9167L5.33325 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: BONUS_TEXT }}></span>
                </div>
              </div>

              <div className="mt-10">
                <a 
                  href="#dang-ky-goi" 
                  className={`block w-full text-center pt-[20px] md:pt-[26px] pb-3 md:pb-4 px-6 font-display text-[28px] md:text-[42px] uppercase tracking-wider rounded-lg leading-none shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-transform duration-300 ${
                    plan.highlight 
                      ? 'bg-[#6500b9] text-white' 
                      : 'bg-black text-white'
                  }`}
                >
                  Chọn Gói Này
                </a>
              </div>
            </div>
          ))}
        </div>

        <FeedbackInline image="fb31.jpeg" />
        <FeedbackInline image="fb32.png" />

        <div className="mt-16 max-w-[900px] mx-auto text-center text-base md:text-[20px] text-black italic">
          Lưu ý: Tất cả các gói đều là mức giá ưu đãi dành cho 200 khách hàng đầu tiên. Hãy chọn gói phù hợp và nâng cấp hiệu suất doanh nghiệp của bạn ngay bây giờ!
        </div>
      </div>
    </section>
  );
}
