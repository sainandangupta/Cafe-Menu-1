'use client';

import React from 'react';
import { SECTIONS, CAFE_SETTINGS } from '@/data/mockMenu';
import { Search, QrCode, Sparkles, Coffee } from 'lucide-react';

interface StickyNavProps {
  activeSection: 'food' | 'drinks' | 'desserts' | 'coffee_tea';
  onSelectSection: (section: 'food' | 'drinks' | 'desserts' | 'coffee_tea') => void;
  onOpenSearch: () => void;
  onOpenPayQR: () => void;
  onOpenImport?: () => void;
  onGoHome?: () => void;
}

export const StickyNav: React.FC<StickyNavProps> = ({
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenPayQR,
  onOpenImport,
  onGoHome
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-black/5 shadow-sm transition-colors duration-300">
      {/* Top row: Cafe branding + actions */}
      <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 text-left group focus:outline-none"
          title="Back to Welcome Landing"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--theme-primary)] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            ☕
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base leading-tight tracking-tight text-[var(--theme-text)]">
              {CAFE_SETTINGS.name}
            </h1>
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--theme-text-secondary)] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Digital Menu</span>
              <span>•</span>
              <span className="text-[10px] bg-black/5 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                Scan & Browse
              </span>
            </div>
          </div>
        </button>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-[var(--theme-pill-bg)] text-[var(--theme-text)] flex items-center justify-center hover:opacity-80 active:scale-95 transition-all shadow-xs"
            aria-label="Search Menu"
            title="Search dishes, ingredients..."
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPayQR}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--theme-primary)] text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
            aria-label="Pay Now via QR"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Pay QR</span>
            <span className="xs:hidden">Pay</span>
          </button>

          {onOpenImport && (
            <button
              onClick={onOpenImport}
              className="text-[10px] text-[var(--theme-text-secondary)] px-2 py-1 rounded bg-black/5 hover:bg-black/10 font-medium"
              title="Upload / Map Excel Menu Sheet"
            >
              Excel
            </button>
          )}
        </div>
      </div>

      {/* Second row: The 4 Main Sections Tabs [ FOOD ] [ DRINKS ] [ WAFFLES ] [ ☕ COFFEE & TEA ] */}
      <div className="max-w-2xl mx-auto px-2 pb-2">
        <nav className="flex items-center gap-1 p-1 bg-black/5 rounded-2xl relative overflow-x-auto no-scrollbar" aria-label="Menu Sections">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`flex-1 min-w-[70px] flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold transition-all duration-300 relative select-none whitespace-nowrap ${
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
      </div>
    </header>
  );
};
