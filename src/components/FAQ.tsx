import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FeedbackInline from './FeedbackInline';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-6 md:py-8">
      <button
        className="flex w-full items-start justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="font-sans text-lg md:text-3xl font-bold leading-tight pr-8 group-hover:text-primary transition-colors">
          {question}
        </span>
        <span className="mt-1 md:mt-2 flex-shrink-0">
          {isOpen ? (
            <X className="w-6 h-6 md:w-10 md:h-10 text-dark" strokeWidth={3} />
          ) : (
            <Plus className="w-6 h-6 md:w-10 md:h-10 text-dark" strokeWidth={3} />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-6 md:pt-8 text-base md:text-[27px] leading-relaxed text-[#000000] space-y-4 font-normal">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Sản phẩm của tôi là ngách rất hẹp và đặc thù, AI làm sao mà hiểu được Business của tôi?",
      answer: (
        <p>
          AI không tự "đoán mò". Hệ thống Agent của chúng tôi không viết nội dung dựa trên cảm hứng, mà dựa trên <span className="highlight">Tâm lý hành vi khách hàng</span>. Dù bạn kinh doanh thiết bị y tế, phụ tùng cơ khí hay dịch vụ ngách, bộ khung (Prompt) trong file .md sẽ đặt ra các câu hỏi để khai thác dữ liệu từ chính bạn. Sau đó, máy sẽ xử lý dữ liệu đó dựa trên các quy luật tâm lý cốt lõi: <span className="highlight">Nỗi sợ - Tham vọng - Sự từ chối</span>. Phương pháp này đã thành công trong hàng chục năm qua trên mọi lĩnh vực.
        </p>
      ),
    },
    {
      question: "Tiền thanh toán chỉ vài triệu VNĐ thật sao? Chạy một thời gian rồi lại ép tôi phải nạp tiền mua thêm Lượt (Credit) đúng không?",
      answer: (
        <div className="space-y-4">
          <p className="font-bold text-primary">Chúng tôi nói KHÔNG với chi phí ẩn.</p>
          <p>
            Đây là điểm khác biệt lớn nhất: Chúng tôi cung cấp cho bạn <span className="highlight">File gốc chứa cấu trúc tư duy</span> (định dạng .md). Bạn chỉ cần nạp file này vào nền tảng AI cá nhân (như ChatGPT, Claude...). Bạn có quyền <span className="highlight">sở hữu vĩnh viễn</span> và sử dụng không giới hạn lượt bài viết trong nhiều năm tới mà không phải trả thêm bất kỳ đồng phí gia hạn nào. Sự minh bạch là tôn chỉ của The KP3.
          </p>
        </div>
      ),
    },
    {
      question: "Tôi mù tịt về công nghệ và lập trình, liệu việc thiết lập có quá sức với tôi không?",
      answer: (
        <p>
          Nếu bạn biết dùng Zalo, Facebook hay gửi Email, bạn hoàn toàn có thể vận hành hệ thống này. Cách thức cực kỳ đơn giản: Bạn up file .md lên nền tảng AI bạn đang dùng. Sau đó, bạn chỉ cần nhập nhiệm vụ bạn cần nó làm thay ứng với kỹ năng của từng agent và bấm Enter. Không cần viết code, không cần học câu lệnh phức tạp. Mọi thứ đã được tối ưu để bạn <span className="highlight">"cắm là chạy"</span>.
        </p>
      ),
    },
    {
      question: "Tôi đã mua quá nhiều khóa học Marketing và AI trước đây nhưng không có kết quả. Thứ này thì khác gì?",
      answer: (
        <p>
          Khác biệt nằm ở chỗ: Các khóa học bán cho bạn Lý thuyết (Theory), còn chúng tôi đưa cho bạn <span className="highlight">Công cụ thực thi (Done-for-you)</span>. Bạn không cần phải đi học cách viết quảng cáo hay làm phễu nữa. Khi sở hữu bộ Agent này, bạn đang sở hữu <span className="highlight">12 nhân sự làm việc hộ mình</span>. Chúng trực tiếp tạo ra kịch bản Video, viết nội dung quảng cáo để bạn sử dụng ngay, thay vì bắt bạn ngồi nghe hàng chục giờ video bài giảng.
        </p>
      ),
    },
    {
      question: "Sẽ mất bao lâu để tôi thấy được những kết quả số liệu đầu tiên sau khi mua?",
      answer: (
        <p>
          <span className="highlight">Chưa đầy 10 phút</span>. Ngay sau khi nhận file và nạp vào Agent vào nền tảng AI bạn đang dùng, bạn chỉ mất khoảng 2 phút để máy tạo ra 5-10 mẫu quảng cáo chất lượng. Bạn có thể copy và đăng ngay lên Facebook hoặc Google để bắt đầu thu hút khách hàng và thấy chỉ số thay đổi tức thì.
        </p>
      ),
    },
    {
      question: "Với cái giá hời này, nếu tất cả mọi người đều sở hữu nó thì thị trường sẽ bão hòa mất thì sao?",
      answer: (
        <>
          <p>Thị trường không bão hòa vì công cụ, nó chỉ bão hòa với những ai dùng AI hời hợt.</p>
          <p>Sự thật là: 12 bộ AI Agents 'full giáp' này không phải là mớ prompt rời rạc để lưu cho đầy máy, mà là một <span className="highlight">hệ thống vận hành thực chiến</span>. Chúng tôi giới hạn 200 suất không phải để 'làm màu', mà để lọc ra những người thực sự nghiêm túc muốn tạo ra kết quả.</p>
          <p>Trong khi đối thủ của bạn vẫn đang loay hoay với những câu hỏi vô thưởng vô phạt, bạn đã sở hữu 12 'nhân viên' làm việc chính xác theo quy trình để tối ưu lợi nhuận. Đó mới là lợi thế thực sự.</p>
          <p>Hết 200 suất này, giá sẽ tăng theo đúng giá trị thực hoặc đóng cổng để tập trung cho nhóm tinh anh.</p>
          <p><strong>Bạn chọn sở hữu lợi thế, hay đứng nhìn thị trường bị chiếm lĩnh?</strong></p>
        </>
      ),
    },
  ];

  return (
    <section className="section-padding bg-white" id="faq">
      <div className="container-padding">
        <div className="content-width">
          <h2 className="section-title text-center mb-5 md:mb-10">GIẢI ĐÁP NHỮNG THẮC MẮC TRƯỚC KHI BẠN BẮT ĐẦU</h2>
          <div className="border-t border-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          <FeedbackInline image="fb40.png" />
          <FeedbackInline image="fb37.png" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
