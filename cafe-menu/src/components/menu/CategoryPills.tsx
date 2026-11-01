'use client';

import React from 'react';
import { Filter } from 'lucide-react';

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
  return (
    <div className="sticky top-[102px] z-30 w-full glass-panel border-b border-black/5 py-2.5 transition-all">
      <div className="max-w-2xl mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {/* Veg Only quick toggle pill */}
        <button
          onClick={onToggleVegOnly}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            vegOnly
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
              : 'bg-[var(--theme-surface)] border-black/10 text-[var(--theme-text)] hover:bg-black/5'
          }`}
          title="Filter Vegetarian Only"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 border border-white" />
          <span>Veg Only</span>
        </button>

        <div className="h-5 w-[1px] bg-black/10 flex-shrink-0" />

        {/* All category */}
        <button
          onClick={() => onSelectCategory('All')}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeCategory === 'All'
              ? 'bg-[var(--theme-primary)] text-white shadow-xs'
              : 'bg-[var(--theme-pill-bg)] text-[var(--theme-pill-text)] hover:opacity-80'
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
              onClick={() => onSelectCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[var(--theme-primary)] text-white shadow-xs'
                  : 'bg-[var(--theme-pill-bg)] text-[var(--theme-pill-text)] hover:opacity-85'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
