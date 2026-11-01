'use client';

import React from 'react';
import { SECTIONS, CAFE_SETTINGS } from '@/data/mockMenu';
import { Sparkles, ChevronRight, QrCode, Search, Wifi, Music } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

interface LandingCardsProps {
  onSelectSection: (section: 'food' | 'drinks' | 'desserts' | 'coffee_tea') => void;
  onOpenSearch: () => void;
  onOpenPayQR: () => void;
  onOpenWifiQR: () => void;
}

export const LandingCards: React.FC<LandingCardsProps> = ({
  onSelectSection,
  onOpenSearch,
  onOpenPayQR,
  onOpenWifiQR
}) => {
  const { isPlaying, openPlayerModal } = useMusic();

  return (
    <div className="min-h-screen w-full bg-[#FAF5EF] flex flex-col justify-between p-4 sm:p-6 overflow-x-clip">
      {/* Top Header branding */}
      <div className="max-w-3xl w-full mx-auto pt-2 pb-3 text-center">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive QR Menu</span>
          </div>

          <button
            onClick={openPlayerModal}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm animate-pulse'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
            }`}
            title="Lounge Music"
          >
            <Music className="w-3.5 h-3.5" />
            <span>{isPlaying ? 'Playing Music' : '🎵 Music'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
          {CAFE_SETTINGS.name}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xs mx-auto">
          {CAFE_SETTINGS.tagline}
        </p>
      </div>

      {/* FOUR PROMINENT INTERACTIVE SECTION CARDS */}
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 flex-1 my-auto py-2">
        {SECTIONS.map((sec) => (
          <div
            key={sec.id}
            onClick={() => onSelectSection(sec.id)}
            className="group relative h-28 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform active:scale-[0.98] border border-white/20"
          >
            {/* Background Cover Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sec.coverImage}
              alt={sec.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
            />

            {/* Gradient Overlays tailored to section identity */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                sec.id === 'food'
                  ? 'from-orange-950/90 via-amber-900/70 to-transparent'
                  : sec.id === 'drinks'
                  ? 'from-teal-950/90 via-cyan-900/70 to-transparent'
                  : sec.id === 'desserts'
                  ? 'from-amber-950/95 via-stone-900/80 to-transparent'
                  : 'from-[#231713]/95 via-[#3B2922]/80 to-transparent'
              }`}
            />

            {/* Content Inside Card */}
            <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-white/20 backdrop-blur-md">
                  <span>{sec.badge}</span>
                </span>

                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl sm:text-3xl filter drop-shadow-md">{sec.icon}</span>
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-white drop-shadow-sm">
                    {sec.name}
                  </h2>
                </div>
                <p className="text-xs text-white/80 line-clamp-1">
                  {sec.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Quick Utilities Bar */}
      <div className="max-w-3xl w-full mx-auto pt-3 pb-2 flex items-center justify-between gap-2 border-t border-black/5">
        <button
          onClick={onOpenSearch}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-white shadow-xs border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 active:scale-95 transition-all"
        >
          <Search className="w-4 h-4 text-zinc-500" />
          <span>Search Menu</span>
        </button>

        <button
          onClick={onOpenPayQR}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-emerald-600 text-white shadow-sm text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <QrCode className="w-4 h-4" />
          <span>Pay at Counter</span>
        </button>

        <button
          onClick={onOpenWifiQR}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-blue-500 text-white shadow-sm text-xs font-bold hover:bg-blue-600 active:scale-95 transition-all"
          title="Scan QR for Free WiFi"
        >
          <Wifi className="w-4 h-4" />
          <span>Free WiFi</span>
        </button>
      </div>
    </div>
  );
};
