import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Info } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'info';
  okLabel?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  message,
  type = 'info',
  okLabel = 'Đồng ý',
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const iconBg = type === 'success' ? 'bg-green-100 text-green-600' : 'bg-[#f1e7ff] text-[#6500b9]';
  const Icon = type === 'success' ? CheckCircle2 : Info;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 md:p-8 text-center animate-[popIn_0.25s_ease-out]"
        role="dialog"
        aria-modal="true"
      >
        <div className={`w-16 h-16 md:w-20 md:h-20 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-5`}>
          <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-black mb-2">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-[#6500b9] hover:bg-[#7b1ad0] text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-xl transition-all uppercase tracking-wider"
        >
          {okLabel}
        </button>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>,
    document.body
  );
}
