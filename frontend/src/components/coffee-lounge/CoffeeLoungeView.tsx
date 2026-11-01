'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MenuItem, SectionMeta } from '@/data/mockMenu';
import { Song, DEFAULT_PLAYLIST, getStoredPlaylist, saveStoredPlaylist } from '@/data/playlist';
import { LoungeMusicPlayer } from './LoungeMusicPlayer';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useMusic } from '@/context/MusicContext';
import {
  Sparkles,
  Leaf,
  Compass,
  ChevronLeft,
  ChevronRight,
  Clock,
  CloudRain,
  Sun,
  Moon,
  Coffee,
  Heart,
  Music
} from 'lucide-react';

interface CoffeeLoungeViewProps {
  items: MenuItem[];
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectItem: (item: MenuItem) => void;
  sectionMeta: SectionMeta;
  vegOnly: boolean;
  onToggleVegOnly: () => void;
}

export const CoffeeLoungeView: React.FC<CoffeeLoungeViewProps> = ({
  items,
  categories,
  activeCategory,
  onSelectCategory,
  onSelectItem,
  sectionMeta,
  vegOnly,
  onToggleVegOnly
}) => {
  const {
    currentSong,
    isPlaying: isPlayingMusic,
    togglePlay: handleTogglePlay,
    openPlayerModal
  } = useMusic();

  const [currentTimeStr, setCurrentTimeStr] = useState('7:42 PM');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Horizontal scroll hook for lounge category buttons
  const {
    containerRef: loungeCatsRef,
    canScrollLeft: canScrollCatsLeft,
    canScrollRight: canScrollCatsRight,
    isDragging: isDraggingCats,
    scrollLeft: scrollCatsLeft,
    scrollRight: scrollCatsRight,
    dragProps: catsDragProps
  } = useHorizontalScroll();

  // Auto-scroll active category into view
  useEffect(() => {
    if (!loungeCatsRef.current) return;
    const activeBtn = loungeCatsRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory, loungeCatsRef]);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const scrollToMusicPlayer = () => {
    const el = document.getElementById('lounge-music-player');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter items by category, veg, and mood
  const coffeeLoungeItems = useMemo(() => {
    return items.filter((item) => {
      if (item.sectionId !== 'coffee_tea') return false;
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (vegOnly && !item.isVeg) return false;

      // Mood quick filter
      if (selectedMood === 'energy') {
        return item.caffeineLevel === 'High' || item.caffeineLevel === 'Energy Boost';
      }
      if (selectedMood === 'calm') {
        return item.caffeineLevel === 'Decaf' || item.caffeineLevel === 'Low' || item.category.includes('Teas');
      }
      if (selectedMood === 'artisan') {
        return item.brewMethod?.includes('Pour') || item.brewMethod?.includes('Single') || item.badge === 'Single Origin' || item.badge === 'Artisan Pick' || item.badge === 'Signature Brew' || item.badge === 'Bold Energy';
      }
      if (selectedMood === 'sweet') {
        return item.tastingNotes?.some(t => ['Caramel', 'Vanilla', 'Sweet', 'Berry', 'Cream', 'Dulce', 'Chocolate', 'Fudge'].some(k => t.includes(k)));
      }

      return true;
    });
  }, [items, activeCategory, vegOnly, selectedMood]);

  // Subsections for categorized display
  const espressoAndManual = coffeeLoungeItems.filter(i =>
    i.category.includes('Espresso') || i.category.includes('Manual')
  );
  const artisanTeas = coffeeLoungeItems.filter(i =>
    i.category.includes('Teas') || i.category.includes('Matcha')
  );
  const coldBrewReserve = coffeeLoungeItems.filter(i =>
    i.category.includes('Cold')
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-3 pb-16 space-y-6 relative">
      {/* ─── MUSIC-REACTIVE AMBIENT GLOW OVERLAY ─── */}
      {isPlayingMusic && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#D9B98C]/10 via-[#87927A]/10 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {/* ─── 1. COFFEE & TEA HERO BANNER ─── */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#D9B98C]/60 bg-gradient-to-br from-[#3B2922] via-[#2D1F1A] to-[#1F140E] text-[#F7F0E5] p-5 sm:p-6">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#D9B98C]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#87927A]/20 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9B98C]/20 border border-[#D9B98C]/40 text-[#D9B98C] text-xs font-bold tracking-wide backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9B98C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9B98C]" />
            </span>
            <span>Slow Brew Sanctuary</span>
          </div>

          {/* Quick jump to music player */}
          <button
            onClick={scrollToMusicPlayer}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all backdrop-blur-md border ${
              isPlayingMusic
                ? 'bg-[#87927A] text-white border-[#87927A] shadow-md animate-pulse'
                : 'bg-white/10 text-[#F7F0E5] hover:bg-white/20 border-white/15'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-[#D9B98C]" />
            <span>{isPlayingMusic ? `Playing: ${currentSong.title}` : '🎵 Cafe Music'}</span>
          </button>
        </div>

        <div className="mt-4 relative z-10 space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl filter drop-shadow-md">☕</span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F7F0E5]">
              Coffee & Tea Lounge
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#D9B98C] font-medium leading-relaxed max-w-lg">
            Good coffee. Slow mornings. Hand-poured single origins & whole-leaf mountain teas. Sit down, put on some music, and stay a while.
          </p>
        </div>
      </div>

      {/* ─── 2. LIVE TIME + WEATHER AMBIENCE BAR ─── */}
      <div className="rounded-2xl p-3.5 bg-[#FAF4EB] border border-[#D9B98C]/60 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#3B2922]">
        <div className="flex items-center gap-3 font-semibold">
          <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-xl border border-[#E5D5C0]">
            <Clock className="w-3.5 h-3.5 text-[#87927A]" />
            <span className="font-mono font-bold">{currentTimeStr}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-xl border border-[#E5D5C0]">
            <CloudRain className="w-3.5 h-3.5 text-sky-600" />
            <span>☔ 22°C · Rainy & Cozy</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#634F46] font-medium">
          <Sparkles className="w-3 h-3 text-[#D9B98C]" />
          <span>Vibe Suggestion:</span>
          <span
            onClick={scrollToMusicPlayer}
            className="font-bold text-[#3B2922] underline cursor-pointer hover:text-amber-900"
          >
            &ldquo;{currentSong.title}&rdquo; by {currentSong.artist}
          </span>
        </div>
      </div>

      {/* ─── 3. ATMOSPHERIC PHOTOGRAPHY & QUOTE STRIP ─── */}
      <div className="relative h-28 sm:h-32 rounded-3xl overflow-hidden shadow-sm border border-[#D9B98C]/40 flex items-center justify-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80"
          alt="Coffee Beans & Steam"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-center text-[#F7F0E5] space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9B98C]">
            Artisan Roastery & Tasting Room
          </span>
          <p className="text-sm sm:text-base font-serif italic text-white/95">
            &ldquo;There is nothing quite like the ritual of a slow pour-over and a song that speaks to you.&rdquo;
          </p>
        </div>
      </div>

      {/* ─── 4. "SELECT YOUR MOOD / RITUAL" SELECTOR ─── */}
      <div className="bg-[#FAF4EB] border border-[#D9B98C]/50 rounded-2xl p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <span className="text-xs font-bold text-[#3B2922] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#87927A]" />
            <span>Select Your Mood / Ritual:</span>
          </span>
          {selectedMood && (
            <button
              onClick={() => setSelectedMood(null)}
              className="text-[11px] font-semibold text-[#87927A] hover:underline"
            >
              Clear mood
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
          {[
            { id: 'energy', label: 'Bold Energy', icon: '⚡', desc: 'Espressos & Cold Brew' },
            { id: 'calm', label: 'Calm & Cozy', icon: '🧘', desc: 'Herbal Teas & Kahwa' },
            { id: 'artisan', label: 'Single Origin', icon: '🌱', desc: 'V60 & Pour-Overs' },
            { id: 'sweet', label: 'Velvet Sweet', icon: '🍯', desc: 'Caramel & Affogato' },
          ].map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(isSelected ? null : m.id)}
                className={`p-2 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3B2922] text-[#F7F0E5] border-[#3B2922] shadow-sm scale-[1.02]'
                    : 'bg-[#FFFFFF] text-[#3B2922] border-[#E5D5C0] hover:border-[#D9B98C]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{m.icon}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D9B98C]" />}
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">{m.label}</div>
                  <div className={`text-[9px] truncate ${isSelected ? 'text-[#D9B98C]' : 'text-[#634F46]'}`}>
                    {m.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 5. CATEGORY FILTER PILLS ─── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#634F46]">
            Filter Lounge Collection
          </span>

          <button
            onClick={onToggleVegOnly}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border ${
              vegOnly
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                : 'bg-white text-zinc-700 border-[#E5D5C0] hover:bg-[#FAF4EB]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-emerald-600'}`} />
            <span>Veg / Vegan Only</span>
          </button>
        </div>

        <div className="relative flex items-center">
          {/* Left Arrow Button */}
          <div
            className={`absolute left-0 top-0 bottom-0 z-10 flex items-center pr-4 bg-gradient-to-r from-[#FAF4EB] via-[#FAF4EB]/80 to-transparent transition-opacity duration-200 pointer-events-none ${
              canScrollCatsLeft ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              type="button"
              onClick={scrollCatsLeft}
              aria-label="Scroll left"
              className="w-7 h-7 rounded-full bg-white shadow-md border border-[#D9B98C] flex items-center justify-center text-[#3B2922] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={loungeCatsRef}
            {...catsDragProps}
            className={`w-full flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5 select-none scroll-smooth ${
              isDraggingCats ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            <button
              data-active={activeCategory === 'All'}
              onClick={() => onSelectCategory('All')}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                activeCategory === 'All'
                  ? 'bg-[#3B2922] text-[#F7F0E5] border-[#3B2922] shadow-sm'
                  : 'bg-white text-[#3B2922] border-[#E5D5C0] hover:border-[#D9B98C]'
              }`}
            >
              ✨ All Lounge Drinks ({items.filter(i => i.sectionId === 'coffee_tea').length})
            </button>

            {categories.map((cat) => {
              const isCatActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  data-active={isCatActive}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                    isCatActive
                      ? 'bg-[#3B2922] text-[#F7F0E5] border-[#3B2922] shadow-sm'
                      : 'bg-white text-[#3B2922] border-[#E5D5C0] hover:border-[#D9B98C]'
                  }`}
                >
                  {cat.includes('Espresso') && '☕ '}
                  {cat.includes('Manual') && '🧪 '}
                  {cat.includes('Cold') && '🧊 '}
                  {cat.includes('Teas') && '🍵 '}
                  {cat.includes('Matcha') && '🌿 '}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <div
            className={`absolute right-0 top-0 bottom-0 z-10 flex items-center pl-4 bg-gradient-to-l from-[#FAF4EB] via-[#FAF4EB]/80 to-transparent transition-opacity duration-200 pointer-events-none ${
              canScrollCatsRight ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              type="button"
              onClick={scrollCatsRight}
              aria-label="Scroll right"
              className="w-7 h-7 rounded-full bg-white shadow-md border border-[#D9B98C] flex items-center justify-center text-[#3B2922] hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── 6. CURATED MENU SECTIONS (COFFEE, TEA, COLD BREW) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coffeeLoungeItems.length === 0 ? (
          <div className="col-span-full text-center py-14 rounded-3xl bg-white border border-[#D9B98C]/60 p-6 my-2 shadow-sm">
            <span className="text-4xl mb-3 block">☕</span>
            <h3 className="font-bold text-base text-[#3B2922]">No drinks found for this selection</h3>
            <p className="text-xs text-[#634F46] mt-1 max-w-sm mx-auto">
              Try choosing &ldquo;All Lounge Drinks&rdquo; or clearing your mood filter.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setSelectedMood(null);
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#3B2922] text-[#F7F0E5] text-xs font-bold shadow-sm hover:bg-[#231713]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          coffeeLoungeItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group relative rounded-3xl bg-[#FFFFFF] border border-[#E5D5C0] hover:border-[#D9B98C] p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.99] select-none overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D9B98C] via-[#87927A] to-[#3B2922] opacity-75" />

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-36 h-40 sm:h-36 flex-shrink-0 rounded-2xl overflow-hidden bg-[#FAF4EB] shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#231713]/80 backdrop-blur-md text-[10px] font-bold text-[#F7F0E5]">
                    {item.tempPreference === 'Iced' ? '🧊 Chilled' : item.tempPreference === 'Both' ? '☕ Hot / Iced' : '♨️ Piping Hot'}
                  </div>

                  {item.roastLevel && (
                    <div className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-xs text-[10px] font-semibold text-[#D9B98C] text-center truncate">
                      {item.roastLevel}
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-[#87927A] tracking-wider uppercase">
                        {item.category}
                      </span>

                      {item.badge && (
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            item.badge === 'Signature Brew'
                              ? 'bg-[#3B2922] text-[#D9B98C] border border-[#D9B98C]/40'
                              : item.badge === 'Single Origin'
                              ? 'bg-[#87927A] text-white'
                              : item.badge === 'Bestseller'
                              ? 'bg-amber-600 text-white'
                              : 'bg-[#D9B98C] text-[#3B2922]'
                          }`}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{item.badge}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-black text-base sm:text-lg text-[#231713] leading-snug group-hover:text-[#3B2922] transition-colors">
                      {item.name}
                    </h3>

                    {item.origin && (
                      <div className="flex items-center gap-1 text-[11px] text-[#634F46] font-medium mt-0.5">
                        <span>📍 {item.origin}</span>
                      </div>
                    )}

                    <p className="text-xs text-[#634F46] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                        <span className="text-[10px] font-bold text-[#3B2922]/70">Notes:</span>
                        {item.tastingNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#FAF4EB] text-[#3B2922] border border-[#D9B98C]/60"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-3 pt-2.5 border-t border-[#E5D5C0]/60">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black text-[#231713]">
                        ₹{item.price}
                      </span>
                      {item.servingSize && (
                        <span className="text-[11px] text-[#634F46] hidden xs:inline">
                          ({item.servingSize})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.brewMethod && (
                        <span className="text-[10px] font-medium text-[#87927A] bg-[#87927A]/10 px-2 py-0.5 rounded-md hidden sm:inline">
                          {item.brewMethod}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#3B2922] text-[#F7F0E5] text-xs font-bold hover:bg-[#231713] transition-all shadow-xs flex items-center gap-1 group-hover:scale-105"
                      >
                        <span>Savor & Order</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── 7. COZY CAFE CONTENT & BOTANICAL RITUAL STRIP ─── */}
      <div className="rounded-3xl p-5 bg-[#FAF4EB] border border-[#D9B98C]/60 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B2922] flex items-center gap-1.5">
            <span>🌿</span>
            <span>The Velvet Bean Slow Coffee Philosophy</span>
          </h3>
          <span className="text-[10px] font-bold text-[#87927A] bg-[#87927A]/10 px-2 py-0.5 rounded-full">
            Single Estate Beans
          </span>
        </div>
        <p className="text-xs text-[#634F46] leading-relaxed">
          Every espresso shot is dialed to a golden 1:2 extraction ratio, milk is textured to 65°C microfoam, and loose-leaf teas are steeped with spring water.
        </p>
      </div>

      {/* ─── 8. 🎵 MUSIC FOR THIS MOMENT: FULL MUSIC PLAYER ─── */}
      <LoungeMusicPlayer />
    </div>
  );
};
