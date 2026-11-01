'use client';

import React, { useState } from 'react';
import { CAFE_SETTINGS } from '@/data/mockMenu';
import { X, Copy, Check, QrCode, ShieldCheck } from 'lucide-react';
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
        className="relative z-10 w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-zinc-200 overflow-hidden flex flex-col p-6 text-center animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors"
          aria-label="Close Payment QR"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 leading-snug">
            Pay at Counter
          </h3>
          <p className="text-xs text-zinc-500">
            {CAFE_SETTINGS.name}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="relative mx-auto p-3 rounded-2xl bg-white border-2 border-dashed border-zinc-300 shadow-inner my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CAFE_SETTINGS.qrImage}
            alt="Payment QR Code"
            className="w-52 h-52 object-contain mx-auto"
          />
        </div>

        {/* Scan instruction badge */}
        <div className="mt-2 text-xs font-semibold text-zinc-600 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Scan with Google Pay, PhonePe, Paytm or BHIM</span>
        </div>

        {/* UPI ID with copy action */}
        <div className="mt-4 p-2.5 rounded-xl bg-zinc-100 flex items-center justify-between gap-2 border border-zinc-200">
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
            className="px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1 hover:bg-zinc-900 active:scale-95 transition-all flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <p className="text-[11px] text-zinc-400 mt-4 leading-normal">
          Show transaction confirmation to the cafe steward or counter staff upon payment.
        </p>
      </div>
    </div>
  );
};
