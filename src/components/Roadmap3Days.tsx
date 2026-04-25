import React from 'react';

type Day = {
  day: string;
  overlay: string;
  styleNote: string;
  imagePlaceholder: string;
  image?: string;
  title: string;
  intro: string;
  agents: { name: string; desc: string }[];
  outcome: string;
};

const DAYS: Day[] = [
  {
    day: 'Ngày 1',
    overlay: 'TINH GỌN TƯ DUY',
    styleNote: 'warm sunset / morning vibe',
    imagePlaceholder: 'Hình founder ngồi suy ngẫm bên biển hoặc cửa sổ',
    image: 'hieu-khach-hang-nhu-hieu-minh.png',
    title: 'Hiểu Khách Hàng Như Hiểu Mình',
    intro: 'Bạn sẽ kích hoạt 2 agent đầu tiên:',
    agents: [
      { name: 'Agent Avatar Builder', desc: 'phân tích sâu tệp khách hàng mục tiêu' },
      { name: 'Agent Brand Voice', desc: 'định hình giọng văn của riêng bạn' },
    ],
    outcome:
      'Cuối ngày 1: Bạn có toàn bộ insight về khách hàng + phong cách riêng — sẵn sàng cho mọi chiến dịch sau này.',
  },
  {
    day: 'Ngày 2',
    overlay: 'THIẾT KẾ HỆ THỐNG',
    styleNote: 'focused workspace / desk',
    imagePlaceholder: 'Hình founder vẽ sơ đồ trên giấy / ngồi trước laptop',
    image: 'thiet-ke-offer-va-pheu-ban-hang.png',
    title: 'Thiết Kế Offer Và Phễu Bán Hàng',
    intro: 'Bạn kích hoạt thêm 4 agent:',
    agents: [
      { name: 'Agent Hero Mechanism', desc: 'tạo cơ chế độc quyền' },
      { name: 'Agent Offer Architect', desc: 'đóng gói sản phẩm hấp dẫn' },
      { name: 'Agent HVCO Creator', desc: 'thiết kế mồi nhử miễn phí' },
      { name: 'Agent Funnel Strategist', desc: 'vạch sơ đồ phễu A-Z' },
    ],
    outcome:
      'Cuối ngày 2: Bạn có offer mạnh + funnel rõ ràng — đã sẵn sàng để chạy Ads.',
  },
  {
    day: 'Ngày 3',
    overlay: 'CHẠY THỰC CHIẾN',
    styleNote: 'dynamic / energy / conference',
    imagePlaceholder: 'Hình founder thuyết trình hoặc ngồi trước dashboard có biểu đồ',
    image: 'van-hanh-va-do-luong.png',
    title: 'Vận Hành Và Đo Lường',
    intro: 'Bạn kích hoạt 6 agent còn lại:',
    agents: [
      { name: 'Agent Ad Copy Machine', desc: 'viết 5-10 mẫu quảng cáo' },
      { name: 'Agent VSL Scriptwriter', desc: 'kịch bản video bán hàng' },
      { name: 'Agent Email Closer', desc: 'chuỗi 7 email nurture' },
      { name: 'Agent Sales Call Script', desc: 'kịch bản chốt đơn' },
      { name: 'Agent Follow-Up Engine', desc: 're-engage tệp lạnh' },
      { name: 'Agent Money Model', desc: 'tối ưu lợi nhuận lâu dài' },
    ],
    outcome:
      'Cuối ngày 3: Toàn bộ hệ thống đã chạy. Bạn ngồi quan sát số liệu — không phải ngồi làm.',
  },
];

export default function Roadmap3Days() {
  return (
    <section className="bg-[#f4f4f4] section-padding" id="roadmap-3-days">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-[920px] mx-auto text-center mb-10 md:mb-14">
          <h2 className="section-title font-display leading-tight text-black mb-5 md:mb-8">
            LỘ TRÌNH 3 NGÀY ĐỂ HỆ THỐNG VẬN HÀNH
          </h2>
          <p className="text-base md:text-[27px] leading-relaxed text-black">
            Sau khi đăng ký, đây là những gì bạn sẽ làm trong 3 ngày tới:
          </p>
        </div>

        <div className="max-w-[840px] mx-auto space-y-10 md:space-y-14">
          {DAYS.map((d) => (
            <div key={d.day} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative aspect-[16/9] bg-neutral-200 overflow-hidden">
                {d.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${d.image}`}
                    alt={d.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-center px-5 md:px-8">
                    <p className="!font-sans text-[11px] md:text-xs font-bold tracking-[0.25em] uppercase text-neutral-500 mb-3">
                      📷 Ảnh sẽ được cập nhật
                    </p>
                    <p className="!font-sans !normal-case text-sm md:text-base text-neutral-600 mb-1 tracking-normal">
                      {d.imagePlaceholder}
                    </p>
                    <p className="!font-sans !normal-case text-xs md:text-sm text-neutral-500 italic mb-4 tracking-normal">
                      Style: {d.styleNote}
                    </p>
                  </div>
                )}
                <div className="absolute left-1/2 bottom-4 md:bottom-6 -translate-x-1/2 bg-black/80 text-white px-5 py-2 rounded-md font-display uppercase text-base md:text-2xl tracking-wider whitespace-nowrap">
                  {d.overlay}
                </div>
              </div>

              <div className="p-6 md:p-10">
                <h3 className="!font-sans !normal-case font-bold text-[22px] md:text-[30px] text-black leading-tight mb-5 md:mb-6 tracking-normal">
                  <span className="text-[#6500b9]">{d.day}:</span> {d.title}
                </h3>

                <p className="!font-sans !normal-case text-base md:text-[27px] leading-relaxed text-black mb-4 md:mb-5 tracking-normal">
                  {d.intro}
                </p>

                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {d.agents.map((a) => (
                    <li
                      key={a.name}
                      className="flex items-start gap-3 !font-sans !normal-case text-base md:text-[27px] leading-relaxed text-black tracking-normal"
                    >
                      <span className="flex-shrink-0 inline-flex items-center h-[26px] md:h-[44px]">
                        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#6500b9]" />
                      </span>
                      <span>
                        <strong>{a.name}</strong> — {a.desc}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#f9f5ff] border-l-4 border-[#6500b9] rounded-r-lg p-4 md:p-5">
                  <p className="!font-sans !normal-case text-base md:text-[27px] font-semibold text-black leading-relaxed tracking-normal">
                    → {d.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
