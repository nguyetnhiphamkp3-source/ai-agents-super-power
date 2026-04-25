import React from 'react';
import { Coins } from 'lucide-react';
import FeedbackInline from './FeedbackInline';

interface Agent {
  id: string;
  title: string;
  value: string;
  desc: string;
  extra?: string;
  image?: string;
}

export default function GodfatherOffer() {
  const agents: Agent[] = [
    {
      id: "01",
      title: "Agent Avatar Builder",
      value: "7.500.000 VNĐ",
      desc: "Chấm dứt việc đoán mò sở thích khách hàng. Chỉ cần ném tên sản phẩm, nó sẽ <span class=\"font-bold underline\">bóc tách mọi nỗi đau, khao khát thầm kín nhất</span> của thị trường. Nó thấu hiểu điều gì khiến khách hàng trăn trở lúc 3h sáng để đưa ra thông điệp chạm đúng <span class=\"font-bold underline\">\"điểm G\" cảm xúc</span>.",
      image: "Agent Avatar Builder.png"
    },
    {
      id: "02",
      title: "Agent Brand Voice",
      value: "5.000.000 VNĐ",
      desc: "Biến AI thành <span class=\"font-bold underline\">bản sao hoàn hảo</span> của chính bạn. Không còn những câu chữ vô hồn, Agent này sẽ học chính xác <span class=\"font-bold underline\">phong cách hành văn đặc trưng</span> của bạn — từ gai góc, sâu sắc đến hóm hỉnh.",
      image: "Agent Brand Voice.png"
    },
    {
      id: "03",
      title: "Agent HVCO Creator",
      value: "7.500.000 VNĐ",
      desc: "Thiết kế những <span class=\"font-bold underline\">\"lời chào hàng không thể từ chối\"</span> (High Value Offer) để thu hút khách hàng tiềm năng nộp data. Phễu bán hàng của bạn sẽ luôn <span class=\"font-bold underline\">tràn ngập những số điện thoại nóng hổi</span>.",
      image: "Agent HVCO Creator.png"
    },
    {
      id: "04",
      title: "Agent Hero Mechanism",
      value: "10.000.000 VNĐ",
      desc: "Biến một sản phẩm đại trà thành một <span class=\"font-bold underline\">\"Cơ Chế Độc Quyền\"</span>. Nó giúp bạn khoác lên sản phẩm một <span class=\"font-bold underline\">phương pháp độc nhất vô nhị</span> mà đối thủ không thể sao chép hay bắt chước.",
      image: "Agent Hero Mechanism.png"
    },
    {
      id: "05",
      title: "Agent Offer Architect",
      value: "12.500.000 VNĐ",
      desc: "Xây dựng cấu trúc Offer <span class=\"font-bold underline\">lấn át mọi rào cản</span>. Cách sắp xếp quà tặng và giá trị bổ sung khéo léo khiến khách hàng cảm thấy mình đang nhận được một <span class=\"font-bold underline\">món hời quá lớn</span> và sẽ thật tiếc nuối nếu bỏ qua.",
      image: "Agent Offer Architect.png"
    },
    {
      id: "06",
      title: "Agent Ad Copy Machine",
      value: "10.000.000 VNĐ",
      desc: "Tự động tạo ra <span class=\"font-bold underline\">5-10 biến thể quảng cáo chuyên nghiệp</span> cho Google/Facebook chỉ trong 2 phút. Nó xoáy sâu vào các <span class=\"font-bold underline\">tử huyệt tâm lý</span>: Tò mò, Tham vọng, Bằng chứng... đè bẹp hiệu suất của cả một đội ngũ viết lách truyền thống.",
      image: "Agent Ad Copy Machine.png"
    },
    {
      id: "07",
      title: "Agent VSL Scriptwriter",
      value: "15.000.000 VNĐ",
      desc: "Chuẩn hóa hơn 1.500 từ cho kịch bản <span class=\"font-bold underline\">Video chuyển đổi (VSL)</span>. Tỷ lệ chốt đơn qua Video của Agent này <span class=\"font-bold underline\">cao gấp nhiều lần</span> so với bài viết thông thường. Bạn chỉ việc đứng trước máy và đọc theo là xong!",
      image: "Agent VSL Scriptwriter-.png"
    },
    {
      id: "08",
      title: "Agent Funnel Strategist",
      value: "12.500.000 VNĐ",
      desc: "Khách vào bài quảng cáo xong đi đâu? Con Agent này sẽ bày sẵn cho bạn cấu trúc của một <span class=\"font-bold underline\">hệ thống Phễu (Funnel) từ A-Z</span>. Mồi nhử là gì, trang đích viết sao, Upsell thế nào để hút sạch data và <span class=\"font-bold underline\">tối đa hóa vòng đời khách hàng (LTV)</span>.",
      image: "Agent Funnel Strategist.png"
    },
    {
      id: "09",
      title: "Agent Email Closer",
      value: "7.500.000 VNĐ",
      desc: "Chưa đầy 1 phút để tạo ra <span class=\"font-bold underline\">chuỗi 7 Email chăm sóc khách hàng chuyên sâu</span>. Biến những người đăng ký mới còn đang đắn đo thành những khách hàng <span class=\"font-bold underline\">sẵn sàng quẹt thẻ</span>.",
      image: "Agent Email Closer.png"
    },
    {
      id: "10",
      title: "Agent Sales Call Script",
      value: "7.500.000 VNĐ",
      desc: "Có lead rồi nhưng Sale chốt xịt? Đặc vụ này sẽ phân tích sản phẩm của bạn và đẻ ra một <span class=\"font-bold underline\">bộ kịch bản chốt Sale, kịch bản xử lý từ chối, kịch bản Telesale sắc lẹm</span> để team Sales của bạn chỉ việc đọc theo là khách quẹt thẻ.",
      image: "Agent Sales Call Script.png"
    },
    {
      id: "11",
      title: "Agent Follow-Up Engine",
      value: "10.000.000 VNĐ",
      desc: "Hâm nóng lại tệp khách hàng cũ đã \"ngủ quên\". Với <span class=\"font-bold underline\">kịch bản Zalo/SMS được cá nhân hóa</span>, Agent này sẽ mang về những lượt <span class=\"font-bold underline\">chốt cọc bất ngờ</span> từ những dữ liệu mà bạn tưởng chừng đã bỏ đi.",
      image: "Agent Follow-Up Engine.png"
    },
    {
      id: "12",
      title: "Agent Money Model",
      value: "12.500.000 VNĐ",
      desc: "Thay đổi tư duy thu tiền một lần cũ kỹ. Agent này thiết kế <span class=\"font-bold underline\">vòng lặp lợi nhuận</span> và các gói sản phẩm theo mô hình mới, giúp <span class=\"font-bold underline\">biên độ lợi nhuận của bạn tăng trưởng bền vững</span>.",
      image: "Agent Money Model.png"
    }
  ];

  return (
    <section className="bg-white section-padding font-sans text-[#000000]" id="godfather-offer">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-10">
          <h2 className="section-title font-display leading-tight mb-5 md:mb-8 uppercase text-[#000000]">
            THE GODFATHER OFFER: SỨC MẠNH CỦA ĐỘI QUÂN 12 AGENT
          </h2>
          
          <div className="max-w-[690px] mx-auto text-base md:text-[27px] leading-relaxed space-y-8 md:space-y-10 text-left tracking-wide">
            <p>
              Không nói suông. Hãy nhìn thẳng vào những gì <mark className="bg-[#FFF700] text-black px-2 font-bold">Đội Quân 12 Nhân Sự AI</mark> này sẽ cày cuốc cho bạn mỗi ngày. Hãy tưởng tượng bạn phải trả bao nhiêu tiền lương để thuê được những con người này ngoài đời thực.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12 md:mb-16">
          <img 
            src={`${import.meta.env.BASE_URL}full-12-agent.png`}
            alt="12 AI Agent" 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-[690px] mx-auto mb-10">
          <h3 
            className="text-xl md:text-[54px] font-display uppercase text-center mb-0 text-black tracking-wide"
            style={{ lineHeight: '1.2' }}
          >
            Đây là trọn bộ kho vũ khí bạn sẽ sở hữu để đạt mức <span className="underline decoration-[#6500b9] decoration-4 underline-offset-4">hiệu suất x10</span> trong <span className="underline decoration-[#6500b9] decoration-4 underline-offset-4">dưới 10 phút</span> làm việc:
          </h3>
        </div>

        <div className="space-y-6 md:space-y-8 max-w-[690px] mx-auto">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`text-left bg-white rounded-[14px] md:rounded-[18px] pt-0 px-4 md:px-6 pb-4 md:pb-6 shadow-sm border-2 border-primary overflow-hidden ${agent.id === '12' ? 'mb-[40px]' : ''}`}
              >
                <div className="mb-4 md:mb-5 -mx-4 md:-mx-6">
                  {agent.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${encodeURI(agent.image)}`}
                      alt={agent.title}
                      className="aspect-[4/3] w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="aspect-[4/3] w-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 !font-sans text-sm md:text-base font-semibold tracking-wide">
                        Ảnh demo 4:3
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4 md:mb-5 text-center">
                  <span className="text-base md:text-[27px] font-normal !font-sans tracking-wide">
                    <span className="bg-[#FFF700] px-2 py-0.5 font-bold whitespace-nowrap">Trị giá: {agent.value}</span>
                  </span>
                </div>
                <div className="space-y-5 text-base md:text-[27px] leading-relaxed !font-sans tracking-wide">
                  <p dangerouslySetInnerHTML={{ __html: agent.desc }}></p>
                  {agent.extra && <p className="italic">{agent.extra}</p>}
                </div>
              </div>
            ))}
          </div>

        <FeedbackInline image="fb17.jpeg" />

        <div className="max-w-[690px] mx-auto mb-10 p-6 md:p-10 rounded-none bg-[#f6edff] text-center">
          <div className="mb-6">
            <h3 className="text-[24px] md:text-[44px] font-display uppercase leading-tight tracking-tight text-black">
              Hệ thống này được thiết lập để làm một việc duy nhất: <span className="text-[#6500b9]">ĐẺ RA TIỀN CHO BẠN.</span>
            </h3>
          </div>
          
          <div className="pt-4 border-0">
            <p className="text-[20px] md:text-[28px] font-bold leading-tight !font-sans uppercase tracking-wide text-black">
              TỔNG GIÁ TRỊ THỰC TẾ BẠN SỞ HỮU:
            </p>
            <p className="text-[29px] md:text-[62px] font-display uppercase leading-tight md:leading-[80px] text-black pt-[10px] tracking-tighter md:tracking-normal border-0">
              LÊN ĐẾN <span className="underline decoration-black decoration-[6px] md:decoration-[#6500b9] md:decoration-4 underline-offset-8">HƠN 122 TRIỆU VNĐ</span>
            </p>
          </div>
        </div>

        <div className="max-w-[690px] mx-auto space-y-8 md:space-y-10 text-base md:text-[27px] leading-relaxed text-left !font-sans tracking-wide">
          <p>Bây giờ, hãy làm một bài toán thực tế của người làm kinh doanh nhé.</p>
          <p>
            Nếu bạn ra ngoài kia, đăng tin tuyển dụng để ráp một team 12 người làm chừng này việc. Bạn sẽ mất bao nhiêu?
          </p>
          <p>
            Lương trung bình 15 triệu/người. Thấp nhất bạn cũng phải gánh <mark className="bg-[#FFF700] text-black px-2 font-bold">150 triệu mỗi tháng</mark> tiền lương. Đó là chưa cộng tiền thuê mặt bằng, tiền mua máy tính, bảo hiểm, và cái rủi ro nhân sự <span className="underline underline-offset-4 font-semibold">làm việc dở tệ rồi nghỉ ngang</span>.
          </p>
          <p>
            Kể cả với báo giá rẻ nhất của một Agency, bạn cũng đang chi <mark className="bg-[#FFF700] text-black px-2 font-bold">20 - 30 triệu/tháng</mark> cho một vài bài post — chưa tính hiệu quả.
          </p>
          <p className="font-normal py-2 mb-[10px] text-center">
            Nhưng hôm nay, bạn <span className="underline decoration-[#d8b4fe] decoration-4 underline-offset-4 font-semibold">không phải trả 150 triệu.</span> <br />
            Bạn cũng <span className="underline decoration-[#d8b4fe] decoration-4 underline-offset-4 font-semibold">không phải trả 30 triệu.</span> <br />
            Bạn thậm chí <span className="underline decoration-[#d8b4fe] decoration-4 underline-offset-4 font-semibold">không phải trả 10 triệu.</span>
          </p>
          
          <div className="bg-[#6500b9] text-white pt-[30px] pb-[30px] px-5 md:px-[48px] rounded-none text-center">
            <p className="font-bold text-lg md:text-[24px] leading-snug md:leading-[32px] mb-[26px]">
              Để sở hữu trọn đời đội quân 12 agent ai tinh nhuệ này, khoản đầu tư duy nhất của bạn chỉ là:
            </p>
            <div className="space-y-0">
              <div className="text-[48px] md:text-[114px] font-display uppercase tracking-tighter leading-tight md:leading-[110.6px] mb-0">
                2.999.000 vnđ
              </div>
              <p className="text-[16px] md:text-[20px] font-normal opacity-90 text-white">
                (Đúng, hai-triệu-chín-trăm-chín-mươi-chín-nghìn-đồng. Không có phí ẩn. Không thu phí duy trì hàng tháng).
              </p>
            </div>
          </div>

          <div className="space-y-5 md:space-y-8">
            <p>
              Khoản tiền này chỉ bằng <span className="underline underline-offset-4 font-semibold">một chầu nhậu cuối tuần</span> của bạn. Nó chưa bằng một nửa số tiền bạn lỡ tay set nhầm cắm Camp Facebook Ads dở tệ tuần qua.
            </p>
            <p className="font-bold">
              Nhưng 2.999K này sẽ mua lại cho bạn <mark className="bg-[#FFF700] text-black px-2 font-bold">hàng ngàn giờ làm việc tự do</mark>, và có thể mang về cho bạn <mark className="bg-[#FFF700] text-black px-2 font-bold">hàng trăm triệu doanh thu</mark> trong những tháng tới.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 space-y-4 md:space-y-5 shadow-sm">
            <p className="font-bold">Flow 3 bước đơn giản cho người mới:</p>
            <img
              src={`${import.meta.env.BASE_URL}flow-3step.png`}
              alt="Flow 3 bước đơn giản cho người mới"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

