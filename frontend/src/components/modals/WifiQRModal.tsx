'use client';

import React, { useEffect } from 'react';
import { X, Wifi, Smartphone } from 'lucide-react';

interface WifiQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WifiQRModal: React.FC<WifiQRModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-zinc-700" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-6 pt-6 pb-5 text-white text-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3">
            <Wifi className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-black tracking-tight">
            Free WiFi
          </h2>
          <p className="text-xs text-white/80 mt-1">
            Scan QR to connect instantly
          </p>
        </div>

        {/* QR Code */}
        <div className="px-6 py-6 flex flex-col items-center">
          <div className="w-full max-w-[260px] aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center p-4 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wifi-qr.jpg"
              alt="WiFi QR Code - Airtel_TASTY SQUARE"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          {/* WiFi Network Name */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <Wifi className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">Airtel_TASTY SQUARE</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 w-full space-y-2">
            <div className="flex items-start gap-3 text-xs text-zinc-600 bg-zinc-50 rounded-xl p-3">
              <Smartphone className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-800">How to connect:</span>
                <p className="mt-0.5 leading-relaxed">
                  Open your phone camera, point it at the QR code, and tap the notification to connect to WiFi automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
