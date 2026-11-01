'use client';

import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

interface CategoryPillsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  vegOnly: boolean;
  onToggleVegOnly: () => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  vegOnly,
  onToggleVegOnly
}) => {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollProgress,
    isDragging,
    scrollLeft,
    scrollRight,
    dragProps
  } = useHorizontalScroll();

  // Auto-scroll active category into view
  useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory, containerRef]);

  return (
    <div className="sticky top-[92px] sm:top-[102px] z-30 w-full max-w-full overflow-hidden glass-panel border-b border-black/5 py-2 transition-all select-none">
      <div className="max-w-5xl mx-auto px-3 relative flex items-center gap-2">
        {/* Left Pinned: Veg Only Quick Toggle Dock */}
        <div className="flex-shrink-0 flex items-center pr-2 border-r border-black/10 dark:border-white/10">
          <button
            onClick={onToggleVegOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              vegOnly
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs scale-[1.02]'
                : 'bg-[var(--theme-surface)] border-black/10 text-[var(--theme-text)] hover:bg-black/5'
            }`}
            title="Filter Vegetarian Only"
          >
            <span
              className={`w-2 h-2 rounded-full border border-white transition-colors ${
                vegOnly ? 'bg-white' : 'bg-emerald-500'
              }`}
            />
            <span>Veg Only</span>
          </button>
        </div>

        {/* Scrollable Category Track with Glass Floating Arrows */}
        <div className="relative flex-1 min-w-0 flex items-center">
          {/* Left Scroll Navigation Button & Soft Gradient Fade */}
          <div
            className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pr-8 bg-gradient-to-r from-[var(--theme-surface)] via-[var(--theme-surface)]/85 to-transparent transition-all duration-300 pointer-events-none ${
              canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}
          >
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll categories left"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md shadow-md border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--theme-text)] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Category Container */}
          <div
            ref={containerRef}
            {...dragProps}
            className={`w-full flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth px-1 py-0.5 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ touchAction: 'pan-x pan-y' }}
          >
            {/* All category */}
            <button
              data-active={activeCategory === 'All'}
              onClick={() => onSelectCategory('All')}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'All'
                  ? 'bg-[var(--theme-primary)] text-white shadow-md shadow-[var(--theme-primary)]/25 scale-[1.02]'
                  : 'bg-[var(--theme-pill-bg)] text-[var(--theme-pill-text)] hover:opacity-85'
              }`}
            >
              All Items
            </button>

            {/* Category list */}
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  data-active={isActive}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--theme-primary)] text-white shadow-md shadow-[var(--theme-primary)]/25 font-bold scale-[1.02]'
                      : 'bg-[var(--theme-pill-bg)] text-[var(--theme-pill-text)] hover:opacity-85'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Scroll Navigation Button & Soft Gradient Fade */}
          <div
            className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pl-8 bg-gradient-to-l from-[var(--theme-surface)] via-[var(--theme-surface)]/85 to-transparent transition-all duration-300 pointer-events-none ${
              canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll categories right"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md shadow-md border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--theme-text)] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Micro-Progress Track Indicator */}
      {(canScrollLeft || canScrollRight) && (
        <div className="max-w-2xl mx-auto px-4 mt-1.5 flex justify-center">
          <div className="w-20 sm:w-28 h-[2px] bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--theme-primary)] rounded-full transition-all duration-150"
              style={{
                width: `${Math.max(16, scrollProgress)}%`,
                transform: `translateX(${(scrollProgress / 100) * 10}%)`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
