'use client';

import React from 'react';
import { SECTIONS, CAFE_SETTINGS } from '@/data/mockMenu';
import { Search, QrCode, Sparkles, Coffee, Wifi, ChevronLeft, ChevronRight, Music } from 'lucide-react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useMusic } from '@/context/MusicContext';

interface StickyNavProps {
  activeSection: 'food' | 'drinks' | 'desserts' | 'coffee_tea';
  onSelectSection: (section: 'food' | 'drinks' | 'desserts' | 'coffee_tea') => void;
  onOpenSearch: () => void;
  onOpenPayQR: () => void;
  onOpenWifiQR?: () => void;
  onGoHome?: () => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenPayQR,
  onOpenWifiQR,
  onGoHome
}) => {
  const {
    containerRef: navRef,
    canScrollLeft,
    canScrollRight,
    isDragging,
    scrollLeft,
    scrollRight,
    dragProps
  } = useHorizontalScroll();

  const { isPlaying, currentSong, openPlayerModal } = useMusic();
  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden glass-panel border-b border-black/5 shadow-sm transition-colors duration-300">
      {/* Top row: Cafe branding + actions */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-1.5 sm:gap-2">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 text-left group focus:outline-none min-w-0 flex-1 mr-1 sm:mr-2"
          title="Back to Welcome Landing"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--theme-primary)] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
            ☕
          </div>
          <h1 className="font-bold text-xs xs:text-sm sm:text-base tracking-tight text-[var(--theme-text)] truncate min-w-0">
            {CAFE_SETTINGS.name}
          </h1>
        </button>

        {/* Action icons */}
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5">
          {/* Global Lounge Music Button */}
          <button
            onClick={openPlayerModal}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-xs relative cursor-pointer active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-400/50'
                : 'bg-[var(--theme-pill-bg)] text-[var(--theme-text)] hover:opacity-80'
            }`}
            aria-label="Lounge Music Player"
            title={isPlaying ? `Now Playing: ${currentSong.title}` : 'Play Cafe Lounge Music'}
          >
            <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
              </span>
            )}
          </button>

          <button
            onClick={onOpenSearch}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--theme-pill-bg)] text-[var(--theme-text)] flex items-center justify-center hover:opacity-80 active:scale-95 transition-all shadow-xs"
            aria-label="Search Menu"
            title="Search dishes, ingredients..."
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={onOpenPayQR}
            className="h-8 px-2.5 sm:h-9 sm:px-3 rounded-full bg-[var(--theme-primary)] text-white flex items-center justify-center gap-1 shadow-sm active:scale-95 hover:opacity-90 transition-all cursor-pointer"
            aria-label="Pay Now via QR"
            title="Pay Now via Counter QR"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs font-semibold">Pay</span>
          </button>

          {onOpenWifiQR && (
            <button
              onClick={onOpenWifiQR}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 active:scale-95 transition-all shadow-xs border border-blue-100"
              title="Scan QR for Free WiFi"
              aria-label="WiFi QR Code"
            >
              <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Second row: The 4 Main Sections Tabs [ FOOD ] [ DRINKS ] [ WAFFLES ] [ ☕ COFFEE & TEA ] */}
      <div className="max-w-5xl mx-auto px-2 pb-2 relative flex items-center">
        {/* Left Arrow & Soft Gradient Fade */}
        <div
          className={`absolute left-0 top-0 bottom-2 z-20 flex items-center pr-6 pl-1 bg-gradient-to-r from-[var(--theme-surface)] via-[var(--theme-surface)]/80 to-transparent transition-all duration-300 pointer-events-none ${
            canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}
        >
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll sections left"
            className="w-7 h-7 rounded-full bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md shadow-md border border-black/10 flex items-center justify-center text-[var(--theme-text)] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <nav
          ref={navRef}
          {...dragProps}
          className={`w-full flex items-center gap-1 p-1 bg-black/5 rounded-2xl relative overflow-x-auto no-scrollbar scroll-smooth select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          aria-label="Menu Sections"
        >
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`flex-1 min-w-[70px] flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-300 relative select-none whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[var(--theme-surface)] text-[var(--theme-primary)] shadow-sm scale-[1.02]'
                    : 'text-[var(--theme-text)]/70 hover:text-[var(--theme-text)] hover:bg-white/40'
                }`}
                aria-pressed={isActive}
              >
                <span className="text-sm sm:text-base leading-none">{sec.icon}</span>
                <span className="truncate">{sec.shortTitle}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-6 h-0.5 rounded-full bg-[var(--theme-nav-indicator)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Arrow & Soft Gradient Fade */}
        <div
          className={`absolute right-0 top-0 bottom-2 z-20 flex items-center pl-6 pr-1 bg-gradient-to-l from-[var(--theme-surface)] via-[var(--theme-surface)]/80 to-transparent transition-all duration-300 pointer-events-none ${
            canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll sections right"
            className="w-7 h-7 rounded-full bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md shadow-md border border-black/10 flex items-center justify-center text-[var(--theme-text)] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
