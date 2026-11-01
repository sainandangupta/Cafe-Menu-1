'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MENU_ITEMS, SECTIONS, MenuItem, CAFE_SETTINGS } from '@/data/mockMenu';
import { StickyNav } from '@/components/layout/StickyNav';
import { CategoryPills } from '@/components/menu/CategoryPills';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { CoffeeLoungeView } from '@/components/coffee-lounge/CoffeeLoungeView';
import { LandingCards } from '@/components/landing/LandingCards';
import { GlobalMiniPlayer } from '@/components/coffee-lounge/GlobalMiniPlayer';
import { Toaster } from 'react-hot-toast';
import { ChevronLeft, ChevronRight, MapPin, Clock, Phone, ArrowUp } from 'lucide-react';

// Code-split heavy modals dynamically to keep initial bundle ultra-light and fast
const ItemDetailSheet = dynamic(
  () => import('@/components/menu/ItemDetailSheet').then((m) => m.ItemDetailSheet),
  { ssr: false }
);
const PaymentQRModal = dynamic(
  () => import('@/components/modals/PaymentQRModal').then((m) => m.PaymentQRModal),
  { ssr: false }
);
const SearchModal = dynamic(
  () => import('@/components/modals/SearchModal').then((m) => m.SearchModal),
  { ssr: false }
);
const WifiQRModal = dynamic(
  () => import('@/components/modals/WifiQRModal').then((m) => m.WifiQRModal),
  { ssr: false }
);
const GlobalMusicModal = dynamic(
  () => import('@/components/coffee-lounge/GlobalMusicModal').then((m) => m.GlobalMusicModal),
  { ssr: false }
);

const PAGE_SIZE = 24;

export default function Home() {
  const [activeSection, setActiveSection] = useState<'food' | 'drinks' | 'desserts' | 'coffee_tea'>('food');
  const [hasEnteredMenu, setHasEnteredMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [menuItems] = useState<MenuItem[]>(MENU_ITEMS);

  // Progressive loading batch count for high performance across 180+ items
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Modals state
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isPayQROpen, setIsPayQROpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWifiQROpen, setIsWifiQROpen] = useState(false);

  // Touch gesture handling
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Restore preferences from localStorage safely
  useEffect(() => {
    try {
      const storedVeg = localStorage.getItem('cafe_veg_only');
      if (storedVeg !== null) setVegOnly(storedVeg === 'true');
    } catch {}
  }, []);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset pagination whenever section, category, or filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeSection, activeCategory, vegOnly]);

  // Update categories for active section
  const categoriesForSection = useMemo(() => {
    const sectionItems = menuItems.filter((i) => i.sectionId === activeSection);
    return Array.from(new Set(sectionItems.map((i) => i.category)));
  }, [menuItems, activeSection]);

  const handleToggleVegOnly = () => {
    setVegOnly((prev) => {
      const next = !prev;
      try { localStorage.setItem('cafe_veg_only', String(next)); } catch {}
      return next;
    });
  };

  // Reset category to 'All' when section changes
  const handleSelectSection = (sec: 'food' | 'drinks' | 'desserts' | 'coffee_tea') => {
    setActiveSection(sec);
    setActiveCategory('All');
    setHasEnteredMenu(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to next/prev section (for 4 sections swipe)
  const sectionOrder: ('food' | 'drinks' | 'desserts' | 'coffee_tea')[] = ['food', 'drinks', 'desserts', 'coffee_tea'];
  const handleNextSection = () => {
    const currIdx = sectionOrder.indexOf(activeSection);
    if (currIdx < sectionOrder.length - 1) {
      handleSelectSection(sectionOrder[currIdx + 1]);
    }
  };
  const handlePrevSection = () => {
    const currIdx = sectionOrder.indexOf(activeSection);
    if (currIdx > 0) {
      handleSelectSection(sectionOrder[currIdx - 1]);
    }
  };

  // Filter items for current section + category + vegOnly
  const displayedItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.sectionId !== activeSection) return false;
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (vegOnly && !item.isVeg) return false;
      return true;
    });
  }, [menuItems, activeSection, activeCategory, vegOnly]);

  // Paged items for lightweight rendering
  const pagedItems = useMemo(() => {
    return displayedItems.slice(0, visibleCount);
  }, [displayedItems, visibleCount]);

  // Touch handlers for mobile swipe between menu sections
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;

    touchStartRef.current = null;

    if (
      Math.abs(deltaX) > 60 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.8 &&
      duration < 500
    ) {
      if (deltaX < 0) {
        handleNextSection();
      } else {
        handlePrevSection();
      }
    }
  };

  const currentSectionMeta = SECTIONS.find((s) => s.id === activeSection)!;

  // If user hasn't selected a section yet, show the Landing Options
  if (!hasEnteredMenu) {
    return (
      <main data-theme="food" className="w-full min-h-screen">
        <LandingCards
          onSelectSection={handleSelectSection}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenPayQR={() => setIsPayQROpen(true)}
          onOpenWifiQR={() => setIsWifiQROpen(true)}
        />

        {/* Global Modals (Loaded on-demand) */}
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            items={menuItems}
            onSelectItem={(item) => {
              setActiveSection(item.sectionId);
              setSelectedItem(item);
              setHasEnteredMenu(true);
            }}
          />
        )}

        {isPayQROpen && (
          <PaymentQRModal
            isOpen={isPayQROpen}
            onClose={() => setIsPayQROpen(false)}
          />
        )}

        {isWifiQROpen && (
          <WifiQRModal
            isOpen={isWifiQROpen}
            onClose={() => setIsWifiQROpen(false)}
          />
        )}

        {/* Global Persistent Lounge Music Controls & Modals */}
        <GlobalMiniPlayer />
        <GlobalMusicModal />

        <Toaster position="top-center" />
      </main>
    );
  }

  return (
    <div
      data-theme={activeSection}
      className="min-h-screen flex flex-col bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-500 overflow-x-clip"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 1. PERMANENT STICKY NAVIGATION */}
      <StickyNav
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPayQR={() => setIsPayQROpen(true)}
        onOpenWifiQR={() => setIsWifiQROpen(true)}
        onGoHome={() => setHasEnteredMenu(false)}
      />

      {/* RENDER DEDICATED BESPOKE COFFEE & TEA LOUNGE VIEW OR STANDARD MENU */}
      {activeSection === 'coffee_tea' ? (
        <CoffeeLoungeView
          items={menuItems}
          categories={categoriesForSection}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectItem={setSelectedItem}
          sectionMeta={currentSectionMeta}
          vegOnly={vegOnly}
          onToggleVegOnly={handleToggleVegOnly}
        />
      ) : (
        <>
          {/* 2. CATEGORY PILLS FILTER */}
          <CategoryPills
            categories={categoriesForSection}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            vegOnly={vegOnly}
            onToggleVegOnly={handleToggleVegOnly}
          />

          {/* 3. SECTION ATMOSPHERE BANNER */}
          <div className="max-w-5xl mx-auto w-full px-4 pt-4 pb-2">
            <div className="relative rounded-2xl overflow-hidden p-4 shadow-sm border border-[var(--theme-card-border)] bg-[var(--theme-card)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentSectionMeta.icon}</span>
                    <h2 className="text-lg sm:text-xl font-black text-[var(--theme-text)] leading-tight">
                      {currentSectionMeta.name}
                    </h2>
                  </div>
                  <p className="text-xs text-[var(--theme-text-secondary)] mt-0.5">
                    {currentSectionMeta.tagline}
                  </p>
                </div>

                {/* Swipe hint */}
                <div className="hidden xs:flex items-center gap-1 text-[11px] text-[var(--theme-text-secondary)] opacity-70 font-medium bg-black/5 px-2.5 py-1 rounded-full">
                  <ChevronLeft className="w-3 h-3" />
                  <span>Swipe</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. PACKING CHARGES REMINDER BANNER */}
          <div className="max-w-5xl mx-auto w-full px-4 pb-1">
            <div className="text-[11px] text-[var(--theme-text-secondary)] bg-black/[0.03] px-3 py-1.5 rounded-xl flex items-center justify-between border border-black/5">
              <span>📦 Packing charges extra (₹10 – ₹20 per container)</span>
              <span className="font-semibold underline cursor-pointer" onClick={() => setIsPayQROpen(true)}>
                Pay Counter QR
              </span>
            </div>
          </div>

          {/* 5. RESPONSIVE MENU ITEMS GRID (Mobile 1-col, Tablet 2-col, Desktop 3-col) */}
          <main className="max-w-5xl mx-auto w-full px-4 py-3 flex-1">
            {displayedItems.length === 0 ? (
              <div className="text-center py-16 rounded-3xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] p-6 my-4">
                <span className="text-3xl mb-2 block">🍽️</span>
                <h3 className="font-bold text-sm text-[var(--theme-text)]">
                  No dishes found in this category
                </h3>
                <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                  Try choosing &ldquo;All Items&rdquo; or turning off the Veg Only filter.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setVegOnly(false);
                  }}
                  className="mt-3 px-4 py-1.5 rounded-full bg-[var(--theme-primary)] text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {pagedItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}

                {/* Progressive Batch Loading */}
                {visibleCount < displayedItems.length && (
                  <div className="col-span-full pt-4 pb-6 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--theme-card)] border border-[var(--theme-card-border)] hover:border-[var(--theme-primary)] text-xs font-bold text-[var(--theme-text)] shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
                    >
                      <span>Showing {pagedItems.length} of {displayedItems.length} dishes</span>
                      <span>•</span>
                      <span className="text-[var(--theme-primary)] font-extrabold">Load More Dishes ↓</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </>
      )}

      {/* 6. CAFE FOOTER INFO */}
      <footer className="w-full mt-10 border-t border-black/5 bg-black/[0.02] py-8 text-center text-xs text-[var(--theme-text-secondary)]">
        <div className="max-w-md mx-auto px-4 space-y-2">
          <div className="font-bold text-sm text-[var(--theme-text)]">
            ☕ {CAFE_SETTINGS.name}
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px]">
            <MapPin className="w-3.5 h-3.5" />
            <span>{CAFE_SETTINGS.address}</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-[11px] pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {CAFE_SETTINGS.timing}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> {CAFE_SETTINGS.phone}
            </span>
          </div>
          <p className="text-[10px] opacity-60 pt-3">
            Digital QR Menu • Instant Browsing & Payment
          </p>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS (Scroll to Top & Pay QR) */}
      <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-2">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-white text-zinc-800 shadow-lg border border-black/10 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setIsPayQROpen(true)}
          className="px-4 py-2.5 rounded-full bg-[var(--theme-primary)] text-white shadow-xl flex items-center gap-2 text-xs font-bold active:scale-95 hover:opacity-95 transition-all border border-white/20 cursor-pointer"
          aria-label="Open Payment QR"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Pay QR</span>
        </button>
      </div>

      {/* MODALS LOADED ON DEMAND */}
      {selectedItem && (
        <ItemDetailSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {isPayQROpen && (
        <PaymentQRModal
          isOpen={isPayQROpen}
          onClose={() => setIsPayQROpen(false)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          items={menuItems}
          onSelectItem={(item) => {
            setActiveSection(item.sectionId);
            setSelectedItem(item);
            setHasEnteredMenu(true);
          }}
        />
      )}

      {isWifiQROpen && (
        <WifiQRModal
          isOpen={isWifiQROpen}
          onClose={() => setIsWifiQROpen(false)}
        />
      )}

      {/* Global Persistent Lounge Music Controls & Modals */}
      <GlobalMiniPlayer />
      <GlobalMusicModal />

      <Toaster position="top-center" />
    </div>
  );
}
