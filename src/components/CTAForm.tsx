import React, { useState, useEffect } from 'react';
import { Calendar, Mail, MapPin, ShieldCheck, Check, Copy, Loader2 } from 'lucide-react';
import Toast, { ToastType } from './ui/Toast';

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
};

export default function CTAForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    discountCode: '',
    package: 'basic',
    committed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success'>('idle');
  const [orderData, setOrderData] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2024-04-01T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (paymentStatus === 'pending' && orderData?.order_code) {
      const checkStatus = async () => {
        try {
          const baseUrl = (window as any).SEPAY_CONFIG?.apiBaseUrl || '';
          const response = await fetch(`${baseUrl}/wp-json/sepay/v1/check-status?order_code=${orderData.order_code}`);
          const data = await response.json();

          if (data.success && data.status === 'paid') {
            setPaymentStatus('success');
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      };

      interval = setInterval(checkStatus, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentStatus, orderData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast({ message: `Đã copy: ${text}`, type: 'success' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isExpired || isSubmitting) return;
    
    if (!formData.committed) {
      setToast({ message: 'Vui lòng tích chọn cam kết trước khi tiếp tục.', type: 'warning' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const baseUrl = (window as any).SEPAY_CONFIG?.apiBaseUrl || '';
      const response = await fetch(`${baseUrl}/wp-json/sepay/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          plan: '21dchallenge',
          custom_fields: {
            coupon: formData.discountCode,
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc')
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setToast({ message: data.message || 'Có lỗi xảy ra, vui lòng thử lại.', type: 'error' });
        setIsSubmitting(false);
        return;
      }

      if (data.status === 'paid') {
        setPaymentStatus('success');
      } else {
        setOrderData(data);
        setPaymentStatus('pending');
      }
    } catch (error) {
      console.error("Network Error:", error);
      setToast({ message: 'Lỗi kết nối, vui lòng thử lại.', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#0a0a0a] pt-[20px] pb-[20px] md:pt-[80px] md:pb-[80px]" id="dang-ky">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            {/* Left Side: Info Summary */}
            <div className="w-full lg:w-[40%] bg-[#f1f1f1] p-6 md:p-12 text-black flex flex-col justify-between">
              <div>
                <div className="flex justify-center lg:inline-flex items-center gap-2 bg-black/10 text-black px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  Workshop Thông Tin
                </div>
                
                <h3 className="text-[28px] md:text-[50px] font-display mb-4 leading-tight text-black text-left uppercase">
                  Chỉ có 20 Ghế Trống Cho Tháng 4.
                </h3>
                
                <p className="text-base md:text-[27px] text-[#000000] mb-8 leading-relaxed font-normal">
                  Tại sao chỉ 20? Vì đội ngũ của chúng tôi cần thời gian để xem xét, chấm bài và sửa trực tiếp kịch bản Phễu/AI cho từng doanh nghiệp một. Chúng tôi không thể nhận nhiều hơn.<br/><br/>
                  Khi đồng hồ đếm ngược kết thúc, hoặc khi 20 người đã hoàn tất đặt cọc, nút đăng ký này sẽ bị khóa.
                </p>

                {/* Countdown Timer */}
                <div className="flex gap-2 md:gap-4 justify-center lg:justify-start">
                  <div className="flex flex-col items-center bg-white p-2 md:p-3 rounded-xl shadow-sm min-w-[60px] md:min-w-[70px]">
                    <span className="text-2xl md:text-3xl font-sans font-bold text-[#6B00D7]">{timeLeft.days}</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase text-black/60" style={{ color: '#000000' }}>Ngày</span>
                  </div>
                  <div className="flex flex-col items-center bg-white p-2 md:p-3 rounded-xl shadow-sm min-w-[60px] md:min-w-[70px]">
                    <span className="text-2xl md:text-3xl font-sans font-bold text-[#6B00D7]">{timeLeft.hours}</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase text-black/60" style={{ color: '#000000' }}>Giờ</span>
                  </div>
                  <div className="flex flex-col items-center bg-white p-2 md:p-3 rounded-xl shadow-sm min-w-[60px] md:min-w-[70px]">
                    <span className="text-2xl md:text-3xl font-sans font-bold text-[#6B00D7]">{timeLeft.minutes}</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase text-black/60" style={{ color: '#000000' }}>Phút</span>
                  </div>
                  <div className="flex flex-col items-center bg-white p-2 md:p-3 rounded-xl shadow-sm min-w-[60px] md:min-w-[70px]">
                    <span className="text-2xl md:text-3xl font-sans font-bold text-[#6B00D7]">{timeLeft.seconds}</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase text-black/60" style={{ color: '#000000' }}>Giây</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Form or Payment */}
            <div className="w-full lg:w-[60%] p-6 md:p-16">
              {paymentStatus === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" style={{ marginBottom: '10px' }}>
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm md:text-lg font-semibold text-black">Họ và Tên *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={isExpired || isSubmitting}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 md:py-4 px-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-base md:text-lg disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Nhập Họ & Tên của bạn"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm md:text-lg font-semibold text-black">Số điện thoại (Zalo) *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isExpired || isSubmitting}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 md:py-4 px-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-base md:text-lg disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Nhập SĐT của bạn (có zalo)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" style={{ marginBottom: '0px' }}>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm md:text-lg font-semibold text-black">Địa chỉ Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isExpired || isSubmitting}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 md:py-4 px-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-base md:text-lg disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Nhập email của bạn"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="discountCode" className="text-sm md:text-lg font-semibold text-black">Mã giảm giá</label>
                      <input
                        type="text"
                        id="discountCode"
                        name="discountCode"
                        value={formData.discountCode}
                        onChange={handleChange}
                        disabled={isExpired || isSubmitting}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 md:py-4 px-4 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-base md:text-lg disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="NHAPMA"
                      />
                    </div>
                  </div>

                  {/* Pricing Blocks */}
                  <div className="space-y-4 pt-4 pb-2" style={{ marginBottom: '10px' }}>
                    <div className="rounded-2xl p-4 border-2 border-[#6B00D7] bg-[#6B00D7] text-white shadow-md text-left flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-[12px] font-bold uppercase text-white">
                          Mức phí cọc duy nhất
                        </div>
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                      </div>
                      <div className="text-[22px] font-sans font-bold leading-tight text-white">
                        25.000.000đ
                      </div>
                    </div>
                  </div>

                  {/* Commitment Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <div className="flex items-center h-6">
                      <input
                        id="committed"
                        name="committed"
                        type="checkbox"
                        required
                        checked={formData.committed}
                        onChange={handleChange}
                        className="w-5 h-5 text-[#6B00D7] border-gray-300 rounded focus:ring-[#6B00D7] cursor-pointer"
                      />
                    </div>
                    <label htmlFor="committed" className="text-sm md:text-base text-black font-medium leading-tight cursor-pointer">
                      Tôi <span className="text-[#6B00D7] font-bold">CAM KẾT</span> hoàn thành đủ bài tập và để lại video feedback — hoặc chấp nhận mất tiền cọc.
                    </label>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      disabled={isExpired || isSubmitting}
                      className={`w-full inline-flex items-center justify-center font-display uppercase tracking-wider transition-all duration-300 rounded-xl italic shadow-[0_0_20px_rgba(0,0,0,0.2)] md:shadow-[0_0_30px_rgba(0,0,0,0.2)] text-[22px] md:text-[32px] px-[12px] pt-[18px] pb-[13px] ${isExpired || isSubmitting ? 'bg-gray-400 text-gray-200 cursor-not-allowed hover:shadow-none' : 'bg-dark text-light hover:bg-primary hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]'}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          ĐANG XỬ LÝ...
                        </span>
                      ) : isExpired ? 'ĐÃ HẾT HẠN ĐĂNG KÝ' : (
                        <>
                          ĐẶT CỌC GIỮ CHỖ NGAY <br className="md:hidden" /> - TÔI MUỐN THAM GIA
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-xs md:text-base font-normal text-[#000000]">
                      Hệ thống sẽ gửi email tự động ngay sau 30s thanh toán
                    </p>
                  </div>

                  {/* Benefits List (Moved below button) */}
                  <div className="pt-0 mt-6">
                    <div className="flex items-center justify-center gap-2 mb-[10px]" style={{ marginRight: '0px', marginLeft: '-10px' }}>
                      <p className="text-[16px] md:text-[18px] font-bold text-black text-left">Thực chất bạn học với chi phí 0đ — nếu hoàn thành 21 bài tập</p>
                    </div>

                    <div className="text-left max-w-lg space-y-2 text-base md:text-[27px] text-[#000000] ml-[6px] mr-0 mb-0 leading-relaxed font-normal">
                      <div className="flex items-start gap-4">
                        <span className="w-6 h-6 rounded-full bg-[#6B00D7] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontSize: '18px' }}>
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </span>
                        <span>21 ngày · 21 bài tập thực chiến có hướng dẫn</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="w-6 h-6 rounded-full bg-[#6B00D7] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </span>
                        <span>Cộng đồng học cùng + hỗ trợ trong suốt khóa</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="w-6 h-6 rounded-full bg-[#6B00D7] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </span>
                        <span>Kỹ năng prompt AI thực tế, dùng được ngay</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="w-6 h-6 rounded-full bg-[#6B00D7] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </span>
                        <span>Hoàn 100% tiền cọc khi hoàn thành đủ bài</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="w-6 h-6 rounded-full bg-[#6B00D7] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </span>
                        <span>Hỗ trợ tiếp tục nếu chưa hoàn thành</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="w-6 h-6 rounded-full bg-[#6B00D7] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </span>
                        <span>Khai giảng 2/4/2024 · Giới hạn số suất 🔒</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {paymentStatus === 'pending' && orderData && (
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <h3 className="text-2xl font-bold text-black">Thanh toán đơn hàng</h3>
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                    <img src={orderData.qr_url} alt="QR Code" className="w-64 h-64 mx-auto" />
                  </div>
                  
                  <div className="w-full max-w-md bg-gray-50 p-4 md:p-6 rounded-xl text-left space-y-3 md:space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                      <span className="text-xs md:text-sm text-gray-500">Ngân hàng:</span>
                      <span className="font-bold text-black text-sm md:text-base">{orderData.bank_info?.bank}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                      <span className="text-xs md:text-sm text-gray-500">Chủ tài khoản:</span>
                      <span className="font-bold text-black text-sm md:text-base">{orderData.bank_info?.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                      <span className="text-xs md:text-sm text-gray-500">Số tài khoản:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black text-sm md:text-base">{orderData.bank_info?.acc}</span>
                        <button onClick={() => handleCopy(orderData.bank_info?.acc)} className="text-gray-400 hover:text-black">
                          <Copy className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                      <span className="text-xs md:text-sm text-gray-500">Số tiền:</span>
                      <span className="font-bold text-[#6B00D7] text-lg md:text-xl">{orderData.amount?.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-gray-500">Nội dung CK:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black text-sm md:text-base">{orderData.order_code}</span>
                        <button onClick={() => handleCopy(orderData.order_code)} className="text-gray-400 hover:text-black">
                          <Copy className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 mt-4">
                    <div className="flex items-center gap-2 text-[#6B00D7] font-medium">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang chờ chuyển khoản...</span>
                    </div>
                    <p className="text-[11px] md:text-xs text-gray-500 italic max-w-xs">
                      Nội dung CK cần khớp với mã đơn hàng để hệ thống xác nhận thanh toán tự động.
                    </p>
                  </div>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-10 h-10" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black">Đã đăng kí thành công!</h3>
                  <p className="text-lg text-gray-600 max-w-md">
                    Vui lòng kiểm tra email (kể cả hộp thư spam/quảng cáo) và làm theo hướng dẫn.
                  </p>
                  <a 
                    href="https://t.me/+KXzGP8AV2-hjMmNl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-center bg-[#229ED9] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#1c88ba] transition-colors shadow-lg"
                  >
                    Tham gia nhóm Telegram ngay
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toast?.message ?? null}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </section>
  );
}
