import React, { useState, useEffect } from 'react';
import { Check, Copy, Loader2, PiggyBank, Clock, ShieldCheck, Zap } from 'lucide-react';
import Toast, { ToastType } from './ui/Toast';
import Modal from './ui/Modal';

const AGENTS = [
  "01. Agent Avatar Builder",
  "02. Agent Brand Voice",
  "03. Agent HVCO Creator",
  "04. Agent Hero Mechanism",
  "05. Agent Offer Architect",
  "06. Agent Ad Copy Machine",
  "07. Agent vsl Scriptwriter",
  "08. Agent Funnel Strategist",
  "09. Agent Email Closer",
  "10. Agent Sales Call Script",
  "11. Agent Follow-Up Engine",
  "12. Agent Money Model"
];

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
};

// Tắt browser Pixel khi URL có `?nofb=1` — dùng khi test khỏi dính metric production.
const isFbPixelEnabled = () => {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).get('nofb') !== '1';
  } catch {
    return true;
  }
};

export default function PackageForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    discountCode: '',
    package: 'basic',
  });

  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'expired'>('idle');
  const [orderData, setOrderData] = useState<any>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const requiredAgents = formData.package === 'basic' ? 3 : formData.package === 'pro' ? 7 : 12;
  const isAgentCountValid = selectedAgents.length === requiredAgents;

  useEffect(() => {
    if (formData.package === 'vvip') {
      setSelectedAgents(AGENTS);
    } else if (formData.package === 'basic') {
      setSelectedAgents(prev => prev.slice(0, 3));
    } else if (formData.package === 'pro') {
      setSelectedAgents(prev => prev.slice(0, 7));
    }
  }, [formData.package]);

  useEffect(() => {
    if (paymentStatus !== 'pending') return;

    setSecondsLeft(300);
    const tick = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(tick);
          setPaymentStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [paymentStatus]);

  useEffect(() => {
    if (paymentStatus !== 'pending' || !orderData?.order?.id) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;
    const orderId = orderData.order.id;

    const poll = async () => {
      if (cancelled) return;
      try {
        const baseUrl = (window as any).SEPAY_CONFIG?.apiBaseUrl || '';
        const response = await fetch(
          `${baseUrl}/wp-json/sepay/v1/check-status/${orderId}?t=${Date.now()}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        if (cancelled) return;

        if (data.payment_status === 'paid') {
          // Browser Purchase event — cùng event_id với server CAPI để Meta dedup.
          // event_id = orderData.sepay.transfer_content = <PREFIX><order_id+100000>.
          const fbq = (window as any).fbq;
          if (fbq && orderData?.sepay?.transfer_content && isFbPixelEnabled()) {
            fbq('track', 'Purchase', {
              value: orderData.sepay?.amount || 0,
              currency: 'VND',
              content_type: 'product',
              order_id: String(orderId),
            }, {
              eventID: orderData.sepay.transfer_content,
            });
          }
          setPaymentStatus('success');
          setSuccessOpen(true);
          return;
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
      if (!cancelled) {
        timeoutId = setTimeout(poll, 3000);
      }
    };

    const onFocus = () => {
      if (cancelled) return;
      if (timeoutId) clearTimeout(timeoutId);
      poll();
    };

    document.addEventListener('visibilitychange', onFocus);
    window.addEventListener('focus', onFocus);
    window.addEventListener('pageshow', onFocus);

    poll();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('pageshow', onFocus);
    };
  }, [paymentStatus, orderData]);

  const handleAgentToggle = (agent: string) => {
    if (formData.package === 'vvip') return;

    setSelectedAgents(prev => {
      if (prev.includes(agent)) {
        return prev.filter(a => a !== agent);
      } else {
        const maxAllowed = formData.package === 'basic' ? 3 : 7;
        if (prev.length >= maxAllowed) {
          setToast({
            message: `Gói ${formData.package === 'basic' ? 'Cơ bản' : 'Pro'} chỉ được chọn tối đa ${maxAllowed} Agent.`,
            type: 'warning',
          });
          return prev;
        }
        return [...prev, agent];
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast({ message: `Đã copy: ${text}`, type: 'success' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!isAgentCountValid) {
      setToast({
        message: `Gói ${formData.package === 'basic' ? 'Cơ Bản' : formData.package === 'pro' ? 'Pro' : 'VVIP'} yêu cầu chọn đúng ${requiredAgents} Agent.`,
        type: 'warning',
      });
      return;
    }

    const config = (window as any).SEPAY_CONFIG || {};
    const productId = config.packageProductIds?.[formData.package];
    if (!productId) {
      setToast({ message: 'Cấu hình sản phẩm chưa được thiết lập. Vui lòng liên hệ admin.', type: 'error' });
      return;
    }

    const trimmedName = formData.fullName.trim().replace(/\s+/g, ' ');
    const nameParts = trimmedName.split(' ');
    const firstName = nameParts[0] || trimmedName;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : firstName;

    setIsSubmitting(true);

    try {
      const baseUrl = config.apiBaseUrl || '';
      const response = await fetch(`${baseUrl}/wp-json/sepay/v1/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone,
          items: [{ product_id: productId, quantity: 1 }],
          selected_agents: selectedAgents,
          selected_package: formData.package,
          coupon_code: formData.discountCode || '',
          refer_url: window.location.href,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        }),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        setToast({ message: data.message || 'Có lỗi xảy ra, vui lòng thử lại.', type: 'error' });
        setIsSubmitting(false);
        return;
      }

      // Browser InitiateCheckout event — cùng event_id server dùng cho dedup.
      const fbq = (window as any).fbq;
      if (fbq && data?.sepay?.transfer_content && isFbPixelEnabled()) {
        fbq('track', 'InitiateCheckout', {
          value: data.sepay?.amount || 0,
          currency: 'VND',
          content_type: 'product',
          content_ids: [productId],
          order_id: String(data.order?.id || ''),
        }, {
          eventID: data.sepay.transfer_content,
        });
      }

      setOrderData(data);
      setPaymentStatus('pending');
    } catch (error) {
      console.error('Network Error:', error);
      setToast({ message: 'Lỗi kết nối, vui lòng thử lại.', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-[50px] md:py-24 overflow-hidden" id="dang-ky-goi">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={`${import.meta.env.BASE_URL}0_Blackhole_Astrophysics_1920x1080.mp4`} type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-4xl mx-auto px-3 md:px-8">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 md:p-10 border border-gray-100">
          <div className="text-center mb-3 md:mb-5">
            <h2 className="text-[30px] md:text-[60px] font-display uppercase text-black mb-[8px] leading-tight">ĐĂNG KÝ SỞ HỮU HỆ THỐNG AI AGENT</h2>
          </div>

          {paymentStatus === 'idle' && (
          <>
            {/* ─── Hero Value Card: Cost Comparison + Benefits ─── */}
            <div className="mb-6 md:mb-10 space-y-4 md:space-y-5">
              <p className="!font-sans text-center text-sm md:text-base text-black max-w-2xl mx-auto leading-snug">
                Bạn định trả bao nhiêu lương cho bộ máy cồng kềnh này mỗi tháng?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-3 md:gap-4 items-stretch">
                {/* LEFT: Salary breakdown */}
                <div className="bg-[#f9f5ff] border border-[#6500b9]/15 rounded-xl p-4 md:p-6">
                  <p className="!font-sans font-bold text-sm md:text-base text-black mb-3 md:mb-4">
                    Thuê người làm 12 đầu việc
                  </p>
                  <ul className="space-y-2 text-xs md:text-sm text-black">
                    {[
                      { role: 'Market Research & Brand', cost: '12.500.000đ' },
                      { role: 'Product & Offer Creator', cost: '20.000.000đ' },
                      { role: 'Ads Copy & VSL Video', cost: '25.000.000đ' },
                      { role: 'Funnel & Sales Specialist', cost: '25.000.000đ' },
                      { role: 'CRM & Profit Growth', cost: '15.000.000đ' },
                    ].map((item) => (
                      <li key={item.role} className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold leading-snug">{item.role}</span>
                        <span className="font-semibold whitespace-nowrap">{item.cost}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 md:mt-4 pt-3 border-t border-[#6500b9]/15 flex items-baseline justify-between">
                    <span className="!font-sans text-xs md:text-sm font-bold text-black">Tổng mỗi tháng</span>
                    <span className="text-lg md:text-xl font-bold text-black line-through">97.500.000đ</span>
                  </div>
                </div>

                {/* RIGHT: Offer pitch */}
                <div className="bg-gradient-to-br from-[#6500b9] to-[#4b0082] text-white rounded-xl p-5 md:p-6 flex flex-col justify-center gap-3 md:gap-4">
                  <p className="!font-sans font-bold text-sm md:text-base text-white">
                    Hôm nay chỉ đầu tư 1 lần
                  </p>

                  <div className="flex items-baseline gap-x-3 gap-y-[14px] flex-wrap">
                    <span className="!font-sans text-3xl md:text-[40px] font-bold text-white leading-none">2.999.000đ</span>
                    <span className="!font-sans text-sm md:text-base text-white line-through">9.999.000đ</span>
                  </div>

                  <div className="pt-3 border-t border-white/25 space-y-2">
                    {['Dùng trọn đời', 'Không trả lương', 'Không quản lý', 'Chỉ có 200 suất với giá khuyến mãi này'].map((item) => (
                      <p key={item} className="!font-sans text-xs md:text-sm font-semibold text-white leading-snug flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={3} />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits — 4 columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { Icon: PiggyBank, title: 'Tiết kiệm 99%', desc: 'Cắt bỏ quỹ lương hàng tháng' },
                  { Icon: Clock, title: 'Làm việc 24/7', desc: 'Không nghỉ, không ốm, không tăng lương' },
                  { Icon: ShieldCheck, title: 'Bảo mật tuyệt đối', desc: 'Không lộ bí mật kinh doanh' },
                  { Icon: Zap, title: 'Hiệu suất tức thì', desc: 'Xử lý trong vài phút' },
                ].map((b) => (
                  <div key={b.title} className="bg-white border border-black/10 rounded-xl p-3 md:p-4 flex flex-col items-center text-center">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#f9f5ff] text-[#6500b9] flex items-center justify-center mb-2">
                      <b.Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.2} />
                    </div>
                    <p className="!font-sans font-bold text-xs md:text-sm text-black leading-snug">{b.title}</p>
                    <p className="!font-sans text-[11px] md:text-xs text-black leading-snug mt-1">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── FORM ─── */}
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Step 1 — Contact */}
              <div className="space-y-3 md:space-y-4">
                <p className="!font-sans text-base md:text-lg font-bold text-black">
                  Bước 1 — Thông tin liên hệ
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="!font-sans text-xs md:text-sm font-semibold text-black">Họ và Tên *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#f6f6f6] border-0 text-[#000000] text-[15px] rounded-xl py-3 px-4 focus:ring-1 focus:ring-[#6500b9] outline-none transition-all disabled:opacity-60"
                      placeholder="Nhập Họ & Tên của bạn"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="!font-sans text-xs md:text-sm font-semibold text-black">Số điện thoại (Telegram/Zalo) *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#f6f6f6] border-0 text-[15px] rounded-xl py-3 px-4 focus:ring-1 focus:ring-[#6500b9] outline-none transition-all disabled:opacity-60"
                      placeholder="Nhập SĐT của bạn"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="!font-sans text-xs md:text-sm font-semibold text-black">Địa chỉ Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#f6f6f6] border-0 text-[15px] rounded-xl py-3 px-4 focus:ring-1 focus:ring-[#6500b9] outline-none transition-all disabled:opacity-60"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="discountCode" className="!font-sans text-xs md:text-sm font-semibold text-black">Mã giảm giá</label>
                    <input
                      type="text"
                      id="discountCode"
                      name="discountCode"
                      value={formData.discountCode}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full bg-[#f6f6f6] border-0 text-[15px] rounded-xl py-3 px-4 focus:ring-1 focus:ring-[#6500b9] outline-none transition-all disabled:opacity-60"
                      placeholder="Nhập mã giảm giá (nếu có)"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2 — Package */}
              <div className="space-y-3 md:space-y-4">
                <p className="!font-sans text-base md:text-lg font-bold text-black">
                  Bước 2 — Chọn gói Agent
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 pt-3">
                  {[
                    { id: 'basic', name: 'Gói Cơ Bản', desc: 'Chọn 3 Agent', price: '999.000đ' },
                    { id: 'pro', name: 'Gói Pro', desc: 'Chọn 7 Agent', price: '1.999.000đ' },
                    { id: 'vvip', name: 'Gói VVIP Pro', desc: 'Trọn bộ 12 Agent', price: '2.999.000đ', popular: true }
                  ].map((pkg) => {
                    const isSelected = formData.package === pkg.id;
                    return (
                      <label
                        key={pkg.id}
                        className={`relative flex flex-col p-5 md:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-[#6500b9] border-[#6500b9] ring-4 ring-[#6500b9]/20'
                            : 'bg-white border-black/10 hover:border-black/30'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="!font-sans absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6500b9] text-white text-[11px] md:text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                            Phổ biến nhất
                          </span>
                        )}
                        <input
                          type="radio"
                          name="package"
                          value={pkg.id}
                          checked={isSelected}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex justify-between items-start mb-2">
                          <span className={`!font-sans text-lg md:text-xl font-bold leading-snug ${isSelected ? 'text-white' : 'text-black'}`}>
                            {pkg.name}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-[#6500b9]" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <span className={`!font-sans text-sm md:text-base mb-4 ${isSelected ? 'text-white' : 'text-black'}`}>
                          {pkg.desc}
                        </span>
                        <span className={`!font-sans text-2xl md:text-3xl font-bold mt-auto ${isSelected ? 'text-white' : 'text-black'}`}>
                          {pkg.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Step 3 — Agents */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center gap-3 flex-wrap">
                  <p className="!font-sans text-base md:text-lg font-bold text-black">
                    Bước 3 — Chọn Agent
                  </p>
                  <span className="!font-sans text-xs md:text-sm font-semibold text-black bg-[#f9f5ff] px-3 py-1 rounded-full">
                    {selectedAgents.length} / {requiredAgents} đã chọn
                  </span>
                </div>

                <div className="bg-[#fafafa] border border-gray-200 rounded-xl p-3 md:p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {AGENTS.map((agent, idx) => {
                      const isChecked = selectedAgents.includes(agent);
                      const isDisabled = formData.package === 'vvip';

                      return (
                        <label
                          key={idx}
                          className={`flex items-start gap-3 p-2.5 md:p-3 rounded-lg transition-all ${
                            isChecked ? 'bg-white shadow-sm' : 'bg-white/60 hover:bg-white'
                          } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center h-5 mt-0.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleAgentToggle(agent)}
                              readOnly={isDisabled}
                              className="w-4 h-4 accent-[#6500b9] text-[#6500b9] border-gray-300 rounded focus:ring-[#6500b9]"
                            />
                          </div>
                          <span className="!font-sans text-sm font-medium text-black">
                            {agent}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !isAgentCountValid}
                  className="w-full inline-flex items-center justify-center font-display uppercase tracking-wider transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 pt-[20px] md:pt-[32px] px-6 pb-3 md:pb-4 bg-[#6500b9] text-white disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-[24px] md:text-[60px]">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      ĐANG XỬ LÝ...
                    </span>
                  ) : !isAgentCountValid ? (
                    <span className="text-[18px] md:text-[44px]">
                      CHỌN ĐỦ {requiredAgents} AGENT ĐỂ TIẾP TỤC
                    </span>
                  ) : (
                    <span className="text-[22px] md:text-[48px]">THAY THẾ NHÂN SỰ BẰNG AI NGAY</span>
                  )}
                </button>
                <p className="!font-sans text-center text-xs md:text-sm text-black italic mt-3 md:mt-4">
                  Điền thông tin để sở hữu ngay!
                </p>
              </div>
            </form>
          </>
          )}

          {paymentStatus === 'pending' && orderData && (
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <h3 className="text-2xl font-bold text-black">Thanh toán đơn hàng</h3>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <img src={orderData.sepay?.qr_url} alt="QR Code" className="w-64 h-64 mx-auto" />
              </div>

              <div className="w-full max-w-md bg-gray-50 p-4 md:p-6 rounded-xl text-left space-y-3 md:space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                  <span className="text-xs md:text-sm text-gray-500">Ngân hàng:</span>
                  <span className="font-bold text-black text-sm md:text-base">{orderData.sepay_bank_info?.bank_id}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                  <span className="text-xs md:text-sm text-gray-500">Chủ tài khoản:</span>
                  <span className="font-bold text-black text-sm md:text-base">{orderData.sepay_bank_info?.account_name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                  <span className="text-xs md:text-sm text-gray-500">Số tài khoản:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black text-sm md:text-base">{orderData.sepay_bank_info?.account_number}</span>
                    <button type="button" onClick={() => handleCopy(orderData.sepay_bank_info?.account_number)} className="text-gray-400 hover:text-black">
                      <Copy className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 md:pb-3">
                  <span className="text-xs md:text-sm text-gray-500">Số tiền:</span>
                  <span className="font-bold text-[#6500b9] text-lg md:text-xl">{orderData.sepay?.amount?.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-500">Nội dung CK:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black text-sm md:text-base">{orderData.sepay?.transfer_content}</span>
                    <button type="button" onClick={() => handleCopy(orderData.sepay?.transfer_content)} className="text-gray-400 hover:text-black">
                      <Copy className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 mt-4">
                <div className="flex items-center gap-2 text-[#6500b9] font-medium">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang chờ chuyển khoản...</span>
                </div>
                <div className="text-sm md:text-base font-bold text-black tabular-nums">
                  QR hết hạn sau: {String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:{String(secondsLeft % 60).padStart(2, '0')}
                </div>
                <p className="text-[11px] md:text-xs text-gray-500 italic max-w-xs">
                  Nội dung CK cần khớp với mã đơn hàng để hệ thống xác nhận thanh toán tự động.
                </p>
              </div>
            </div>
          )}

          {paymentStatus === 'expired' && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">Mã QR đã hết hạn</h3>
              <p className="text-base md:text-lg text-gray-600 max-w-md">
                Đơn hàng đã quá 5 phút chưa nhận được thanh toán. Vui lòng tạo lại đơn để tiếp tục.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderData(null);
                  setPaymentStatus('idle');
                  setSecondsLeft(0);
                }}
                className="px-6 py-3 bg-[#6500b9] text-white font-bold rounded-xl hover:bg-[#530096] transition-all"
              >
                Tạo lại đơn hàng
              </button>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="flex flex-col items-center justify-center text-center space-y-5 md:space-y-6 py-6 md:py-10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">Đã đăng ký thành công!</h3>
              <p className="text-base md:text-lg text-gray-600 max-w-md">
                Dưới đây là <strong>{selectedAgents.length} Agent</strong> bạn đã sở hữu. Link truy cập Google Drive đã được gửi về email của bạn.
              </p>

              <div className="w-full max-w-md bg-[#f9f5ff] border border-[#6500b9]/20 rounded-xl p-4 md:p-5 text-left">
                <ul className="space-y-2">
                  {selectedAgents.map((agent) => (
                    <li key={agent} className="flex items-start gap-2 text-sm md:text-base text-black">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-[#6500b9] mt-0.5 flex-shrink-0" strokeWidth={3} />
                      <span>{agent}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs md:text-sm text-gray-500 italic max-w-md">
                Không thấy email? Kiểm tra hộp <strong>Spam</strong> / <strong>Quảng cáo</strong>. Nếu sau 5 phút vẫn chưa nhận, reply ngay email này để đội ngũ hỗ trợ.
              </p>
            </div>
          )}
        </div>
      </div>

      <Toast
        message={toast?.message ?? null}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Thanh toán thành công!"
        message="Chúng tôi đã gửi email chứa link các Agent bạn đã chọn. Kiểm tra hộp thư (cả mục spam) trong vài phút tới."
        type="success"
        okLabel="Đã hiểu"
      />
    </section>
  );
}
