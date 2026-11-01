'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MENU_ITEMS, SECTIONS, MenuItem, CAFE_SETTINGS } from '@/data/mockMenu';
import { StickyNav } from '@/components/layout/StickyNav';
import { CategoryPills } from '@/components/menu/CategoryPills';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { CoffeeLoungeView } from '@/components/coffee-lounge/CoffeeLoungeView';
import { ItemDetailSheet } from '@/components/menu/ItemDetailSheet';
import { PaymentQRModal } from '@/components/modals/PaymentQRModal';
import { SearchModal } from '@/components/modals/SearchModal';
import { ExcelImportModal } from '@/components/modals/ExcelImportModal';
import { LandingCards } from '@/components/landing/LandingCards';
import { Toaster } from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Clock, Phone, ArrowUp } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState<'food' | 'drinks' | 'desserts' | 'coffee_tea'>('food');
  const [hasEnteredMenu, setHasEnteredMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);

  // Modals
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isPayQROpen, setIsPayQROpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Touch gesture handling for smooth horizontal section swipe without breaking vertical scroll
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update categories for active section
  const categoriesForSection = useMemo(() => {
    const sectionItems = menuItems.filter((i) => i.sectionId === activeSection);
    const cats = Array.from(new Set(sectionItems.map((i) => i.category)));
    return cats;
  }, [menuItems, activeSection]);

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

  // Touch handlers for natural mobile swipe between menu sections
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

    // Must be a decisive horizontal swipe:
    // 1. Min 60px horizontal distance
    // 2. Horizontal movement at least 1.8x greater than vertical movement
    // 3. Completed in under 500ms
    if (
      Math.abs(deltaX) > 60 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.8 &&
      duration < 500
    ) {
      if (deltaX < 0) {
        // Swiped left -> next section
        handleNextSection();
      } else {
        // Swiped right -> prev section
        handlePrevSection();
      }
    }
  };

  // Handle Excel import update
  const handleExcelImport = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
  };

  const currentSectionMeta = SECTIONS.find((s) => s.id === activeSection)!;

  // If user hasn't selected a section yet, show the Landing Options
  if (!hasEnteredMenu) {
    return (
      <main className="w-full min-h-screen">
        <LandingCards
          onSelectSection={handleSelectSection}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenPayQR={() => setIsPayQROpen(true)}
          onOpenImport={() => setIsImportOpen(true)}
        />

        {/* Global Modals */}
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

        <PaymentQRModal
          isOpen={isPayQROpen}
          onClose={() => setIsPayQROpen(false)}
        />

        <ExcelImportModal
          isOpen={isImportOpen}
          onClose={() => setIsImportOpen(false)}
          onImportSuccess={handleExcelImport}
        />

        <Toaster position="top-center" />
      </main>
    );
  }

  return (
    <div
      data-theme={activeSection}
      className="min-h-screen flex flex-col bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-500 select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 1. PERMANENT STICKY NAVIGATION */}
      <StickyNav
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPayQR={() => setIsPayQROpen(true)}
        onOpenImport={() => setIsImportOpen(true)}
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
          onToggleVegOnly={() => setVegOnly(!vegOnly)}
        />
      ) : (
        <>
          {/* 2. CATEGORY PILLS FILTER */}
          <CategoryPills
            categories={categoriesForSection}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            vegOnly={vegOnly}
            onToggleVegOnly={() => setVegOnly(!vegOnly)}
          />

          {/* 3. SECTION ATMOSPHERE BANNER */}
          <div className="max-w-2xl mx-auto w-full px-4 pt-4 pb-2">
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
          <div className="max-w-2xl mx-auto w-full px-4 pb-1">
            <div className="text-[11px] text-[var(--theme-text-secondary)] bg-black/[0.03] px-3 py-1.5 rounded-xl flex items-center justify-between border border-black/5">
              <span>📦 Packing charges extra (₹10 – ₹20 per container)</span>
              <span className="font-semibold underline cursor-pointer" onClick={() => setIsPayQROpen(true)}>
                Pay Counter QR
              </span>
            </div>
          </div>

          {/* 5. MENU ITEMS LIST (Vertical Scrolling) */}
          <main className="max-w-2xl mx-auto w-full px-4 py-3 flex-1 space-y-3">
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
              displayedItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))
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
            className="w-11 h-11 rounded-full bg-white text-zinc-800 shadow-lg border border-black/10 flex items-center justify-center active:scale-95 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setIsPayQROpen(true)}
          className="px-4 py-2.5 rounded-full bg-[var(--theme-primary)] text-white shadow-xl flex items-center gap-2 text-xs font-bold active:scale-95 hover:opacity-95 transition-all border border-white/20"
          aria-label="Open Payment QR"
        >
          <span>💳</span>
          <span>Pay QR</span>
        </button>
      </div>

      {/* 7. BOTTOM SHEET DISH DETAIL MODAL */}
      <ItemDetailSheet
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* 8. PAYMENT QR MODAL */}
      <PaymentQRModal
        isOpen={isPayQROpen}
        onClose={() => setIsPayQROpen(false)}
      />

      {/* 9. SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={menuItems}
        onSelectItem={(item) => {
          setActiveSection(item.sectionId);
          setSelectedItem(item);
        }}
      />

      {/* 10. EXCEL IMPORT MODAL */}
      <ExcelImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportSuccess={handleExcelImport}
      />

      {/* TOAST NOTIFICATIONS */}
      <Toaster position="top-center" />
    </div>
  );
}
