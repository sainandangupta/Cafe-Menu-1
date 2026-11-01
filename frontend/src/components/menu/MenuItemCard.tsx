'use client';

import React from 'react';
import { MenuItem } from '@/data/mockMenu';
import { Star, Flame, Sparkles, ChevronRight, Ban } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}

function getCategoryIcon(category: string, sectionId: string): string {
  const c = category.toLowerCase();
  if (c.includes('stick waffle')) return '🧇';
  if (c.includes('round waffle')) return '🧇';
  if (c.includes('waffle')) return '🧇';
  if (c.includes('pancake')) return '🥞';
  if (c.includes('brownie')) return '🍫';
  if (c.includes('kunafa')) return '🍮';
  if (c.includes('cake')) return '🎂';
  if (c.includes('burger')) return '🍔';
  if (c.includes('pizza')) return '🍕';
  if (c.includes('sandwich')) return '🥪';
  if (c.includes('fries') || c.includes('momo') || c.includes('snack')) return '🍟';
  if (c.includes('chinese') || c.includes('noodle')) return '🥢';
  if (c.includes('soup')) return '🍲';
  if (c.includes('khichdi') || c.includes('rice') || c.includes('pulao') || c.includes('chole')) return '🍛';
  if (c.includes('shake')) return '🥤';
  if (c.includes('mocktail')) return '🍹';
  if (c.includes('tea') || c.includes('chai') || c.includes('coffee') || sectionId === 'coffee_tea') return '☕';
  return '✨';
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative flex gap-3.5 p-3.5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] select-none ${!item.isAvailable ? 'opacity-65 grayscale-[40%]' : ''
        }`}
    >
      {/* Dish Image Container or Cozy Emblem */}
      {item.image ? (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-black/5 shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Veg / Non-Veg Indicator on image */}
          <div className="absolute top-1.5 left-1.5 p-0.5 rounded-sm bg-white/90 shadow-xs backdrop-blur-xs flex items-center justify-center">
            <div
              className={`w-3.5 h-3.5 border flex items-center justify-center rounded-[2px] ${item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
              />
            </div>
          </div>

          {/* Unavailable overlay */}
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-center p-1">
              <Ban className="w-5 h-5 text-rose-400 mb-0.5" />
              <span className="text-[10px] font-bold leading-tight uppercase">Unavailable</span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-orange-500/10 border border-amber-500/20 flex flex-col items-center justify-center shadow-2xs select-none group-hover:scale-105 transition-transform duration-300">
          <span className="text-3xl sm:text-4xl filter drop-shadow-xs">
            {getCategoryIcon(item.category, item.sectionId)}
          </span>
          <div className="absolute top-1.5 left-1.5 p-0.5 rounded-sm bg-white/90 shadow-xs backdrop-blur-xs flex items-center justify-center">
            <div
              className={`w-3 h-3 border flex items-center justify-center rounded-[2px] ${item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
              />
            </div>
          </div>
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-center p-1 rounded-2xl">
              <Ban className="w-4 h-4 text-rose-400" />
            </div>
          )}
        </div>
      )}

      {/* Item Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Badges row */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            {item.badge && (
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${item.badge === 'Bestseller'
                    ? 'bg-amber-500 text-white'
                    : item.badge === 'Chef Special'
                      ? 'bg-purple-600 text-white'
                      : item.badge === 'Spicy'
                        ? 'bg-rose-600 text-white'
                        : 'bg-[var(--theme-primary)] text-white'
                  }`}
              >
                {item.badge === 'Spicy' && <Flame className="w-2.5 h-2.5" />}
                {item.badge === 'Chef Special' && <Sparkles className="w-2.5 h-2.5" />}
                <span>{item.badge}</span>
              </span>
            )}

            {item.hasIceCreamAddon && (
              <span className="text-[10px] font-medium text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded-full">
                🍦 +Ice Cream
              </span>
            )}
          </div>

          {/* Dish Name */}
          <h3 className="font-bold text-sm sm:text-base text-[var(--theme-text)] leading-snug line-clamp-1 group-hover:text-[var(--theme-primary)] transition-colors">
            {item.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2 mt-0.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom row: Price, Rating, & CTA */}
        <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-black/5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-[var(--theme-primary)]">
              ₹{item.price}
            </span>
            {item.servingSize && (
              <span className="text-[11px] text-[var(--theme-text-secondary)] hidden xs:inline">
                ({item.servingSize})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Rating */}
            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-black/5 text-[var(--theme-text)]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-[10px] opacity-60">({item.ratingCount})</span>
            </div>

            <span className="text-[var(--theme-primary)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
