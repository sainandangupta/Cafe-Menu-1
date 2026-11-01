'use client';

import React, { useState } from 'react';
import { CAFE_SETTINGS } from '@/data/mockMenu';
import { X, Copy, Check, QrCode, ShieldCheck, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentQRModal: React.FC<PaymentQRModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(CAFE_SETTINGS.upiId);
    setCopied(true);
    toast.success('UPI ID copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-zinc-200 overflow-hidden flex flex-col p-5 sm:p-6 text-center animate-scaleUp max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors z-20"
          aria-label="Close Payment QR"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Badges */}
        <div className="flex flex-col items-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-[11px] font-bold uppercase tracking-wider mb-2 border border-sky-200">
            <span>PayZapp • HDFC Bank</span>
          </div>
          <h3 className="text-xl font-black text-zinc-900 tracking-tight">
            Scan & Pay
          </h3>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            {CAFE_SETTINGS.name}
          </p>
        </div>

        {/* QR Code Frame */}
        <div className="relative mx-auto w-full max-w-[260px] aspect-square rounded-2xl bg-white border-2 border-dashed border-sky-300 p-3 shadow-inner flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/payment-qr.jpg"
            alt="Payment QR Code - Scan with UPI"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* Supported Payment Apps Bar */}
        <div className="mt-3 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>GPay • PhonePe • Paytm • BHIM • Cred</span>
        </div>

        {/* UPI ID with Quick Copy */}
        <div className="mt-3 p-2.5 rounded-xl bg-zinc-50 flex items-center justify-between gap-2 border border-zinc-200">
          <div className="text-left overflow-hidden">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">
              UPI ID
            </span>
            <span className="text-xs font-mono font-bold text-zinc-800 truncate block">
              {CAFE_SETTINGS.upiId}
            </span>
          </div>

          <button
            onClick={handleCopyUPI}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold flex items-center gap-1 hover:bg-black active:scale-95 transition-all flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <p className="text-[11px] text-zinc-400 mt-3 leading-normal">
          Scan with any UPI app & show payment confirmation to the counter staff.
        </p>
      </div>
    </div>
  );
};
