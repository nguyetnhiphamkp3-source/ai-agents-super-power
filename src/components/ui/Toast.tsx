import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  message: string | null;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const STYLES: Record<ToastType, { bg: string; border: string; icon: ReactNode }> = {
  success: {
    bg: 'bg-[#0f3d24]',
    border: 'border-green-400',
    icon: <CheckCircle2 className="w-5 h-5 text-green-400" strokeWidth={2.5} />,
  },
  warning: {
    bg: 'bg-[#3d2e0f]',
    border: 'border-yellow-400',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-400" strokeWidth={2.5} />,
  },
  error: {
    bg: 'bg-[#3d0f0f]',
    border: 'border-red-400',
    icon: <XCircle className="w-5 h-5 text-red-400" strokeWidth={2.5} />,
  },
  info: {
    bg: 'bg-[#1a1033]',
    border: 'border-[#8a3dff]',
    icon: <Info className="w-5 h-5 text-[#b57bff]" strokeWidth={2.5} />,
  },
};

export default function Toast({ message, type = 'info', onClose, duration = 3500 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message || typeof document === 'undefined') return null;

  const style = STYLES[type];

  return createPortal(
    <div
      className={`fixed bottom-6 right-6 z-[9999] max-w-[92vw] md:max-w-md ${style.bg} ${style.border} border-l-4 rounded-xl shadow-2xl px-4 py-3 md:px-5 md:py-4 flex items-start gap-3 animate-[slideInRight_0.3s_ease-out]`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <p className="text-white text-sm md:text-[15px] font-medium leading-snug flex-1">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-white/50 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>,
    document.body
  );
}
