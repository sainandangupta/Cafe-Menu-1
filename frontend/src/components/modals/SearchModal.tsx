'use client';

import React, { useState, useMemo } from 'react';
import { MenuItem } from '@/data/mockMenu';
import { Search, X, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem
}) => {
  const [query, setQuery] = useState('');
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterBestseller, setFilterBestseller] = useState(false);

  const {
    containerRef: filterRef,
    canScrollLeft,
    canScrollRight,
    isDragging,
    scrollLeft,
    scrollRight,
    dragProps
  } = useHorizontalScroll();

  const filteredResults = useMemo(() => {
    if (!query.trim() && !filterVeg && !filterBestseller) return [];

    const lowerQuery = query.toLowerCase().trim();

    return items.filter((item) => {
      if (filterVeg && !item.isVeg) return false;
      if (filterBestseller && item.badge !== 'Bestseller') return false;

      if (!lowerQuery) return true;

      const nameMatch = item.name.toLowerCase().includes(lowerQuery);
      const descMatch = item.description.toLowerCase().includes(lowerQuery);
      const catMatch = item.category.toLowerCase().includes(lowerQuery);
      const ingMatch = item.ingredients?.some((ing) =>
        ing.toLowerCase().includes(lowerQuery)
      ) ?? false;
      const badgeMatch = item.badge?.toLowerCase().includes(lowerQuery);

      return nameMatch || descMatch || catMatch || ingMatch || badgeMatch;
    });
  }, [items, query, filterVeg, filterBestseller]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md animate-fadeIn">
      {/* Top Search Bar */}
      <div className="p-4 border-b border-zinc-200 max-w-2xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, ingredients, shakes, waffles..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 px-2 py-1"
          >
            Cancel
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="relative flex items-center mt-3">
          {canScrollLeft && (
            <button
              type="button"
              onClick={scrollLeft}
              className="absolute left-0 z-10 w-6 h-6 rounded-full bg-white shadow-md border border-zinc-200 flex items-center justify-center text-zinc-700"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <div
            ref={filterRef}
            {...dragProps}
            className={`flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider flex-shrink-0">
              Filter:
            </span>
            <button
              onClick={() => setFilterVeg(!filterVeg)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                filterVeg
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-700'
              }`}
            >
              🟢 Veg Only
            </button>

            <button
              onClick={() => setFilterBestseller(!filterBestseller)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                filterBestseller
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-700'
              }`}
            >
              🏆 Bestsellers
            </button>
          </div>

          {canScrollRight && (
            <button
              type="button"
              onClick={scrollRight}
              className="absolute right-0 z-10 w-6 h-6 rounded-full bg-white shadow-md border border-zinc-200 flex items-center justify-center text-zinc-700"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto max-w-2xl w-full mx-auto p-4 space-y-3">
        {filteredResults.length === 0 ? (
          <div className="text-center py-16 text-zinc-400">
            <Search className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">
              {query ? `No items found matching "${query}"` : 'Type anything to search the menu'}
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Try searching &ldquo;chocolate&rdquo;, &ldquo;burger&rdquo;, &ldquo;mojito&rdquo;, &ldquo;waffle&rdquo;, or &ldquo;cheese&rdquo;
            </p>
          </div>
        ) : (
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Found {filteredResults.length} {filteredResults.length === 1 ? 'item' : 'items'}
            </div>

            <div className="space-y-2">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  {/* Item Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">
                        {item.sectionId === 'food' ? '🍔' : item.sectionId === 'drinks' ? '🥤' : item.sectionId === 'desserts' ? '🧇' : '☕'}
                      </span>
                      <h4 className="font-bold text-sm text-zinc-900 truncate">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-extrabold text-zinc-900">
                        ₹{item.price}
                      </span>
                      <span className="text-[11px] text-zinc-400">•</span>
                      <span className="text-[11px] text-zinc-500 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
