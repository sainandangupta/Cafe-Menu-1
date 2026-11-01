'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem, ICE_CREAM_ADDONS, CAFE_SETTINGS } from '@/data/mockMenu';
import { X, Star, Clock, Utensils, AlertTriangle, Share2, Check, Package, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface ItemDetailSheetProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailSheet: React.FC<ItemDetailSheetProps> = ({ item, onClose }) => {
  const [selectedIceCream, setSelectedIceCream] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [ratingStats, setRatingStats] = useState({ average: 0, count: 0 });

  useEffect(() => {
    if (!item) return;

    setSelectedIceCream(null);
    setReviewText('');

    // Check if user already rated this item in localStorage
    const saved = localStorage.getItem(`rating_${item.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserRating(parsed.rating);
        setHasRated(true);
      } catch {
        setUserRating(0);
        setHasRated(false);
      }
    } else {
      setUserRating(0);
      setHasRated(false);
    }

    setRatingStats({ average: item.rating, count: item.ratingCount });
  }, [item]);

  if (!item) return null;

  // Calculate total price with selected add-on
  const iceCreamAddonObj = ICE_CREAM_ADDONS.find((addon) => addon.id === selectedIceCream);
  const addOnCost = iceCreamAddonObj ? iceCreamAddonObj.price : 0;
  const totalPrice = item.price + addOnCost;

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) {
      toast.error('Please select at least 1 star to rate');
      return;
    }

    // Save in localStorage to prevent spamming
    localStorage.setItem(
      `rating_${item.id}`,
      JSON.stringify({
        rating: userRating,
        review: reviewText,
        timestamp: Date.now()
      })
    );

    const newCount = ratingStats.count + 1;
    const newAverage = ((ratingStats.average * ratingStats.count) + userRating) / newCount;
    setRatingStats({ average: newAverage, count: newCount });
    setHasRated(true);
    toast.success('Thank you! Your rating has been submitted.');
  };

  const handleShare = async () => {
    const shareData = {
      title: `${item.name} at ${CAFE_SETTINGS.name}`,
      text: `Check out ${item.name} on the digital menu! Delicious ${item.description}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${item.name} - ₹${item.price}\n${window.location.href}`);
        toast.success('Dish details copied to clipboard!');
      } catch {
        toast.success('Dish link ready to share!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Content Card */}
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[var(--theme-surface)] shadow-2xl border border-[var(--theme-card-border)] flex flex-col no-scrollbar animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle for mobile swipe hint */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-12 h-1.5 rounded-full bg-black/20" />
        </div>

        {/* Large Image Header */}
        <div className="relative w-full h-56 sm:h-64 bg-black/10 overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="absolute top-3 right-13 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90"
            aria-label="Share dish"
            title="Share this dish"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Veg tag */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs shadow-sm flex items-center gap-1.5">
            <div
              className={`w-3.5 h-3.5 border flex items-center justify-center rounded-[2px] ${
                item.isVeg ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </div>
            <span className="text-xs font-bold text-zinc-800">
              {item.isVeg ? 'Vegetarian' : 'Non-Veg'}
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-xs">
            {item.category}
          </div>
        </div>

        {/* Details Body */}
        <div className="p-5 space-y-4">
          {/* Title & Price Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--theme-text)] leading-tight">
                {item.name}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--theme-text-secondary)] font-medium">
                {item.prepTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.prepTime}
                  </span>
                )}
                {item.servingSize && (
                  <span className="flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5" />
                    {item.servingSize}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-black text-[var(--theme-primary)]">
                ₹{totalPrice}
              </div>
              {addOnCost > 0 && (
                <div className="text-[11px] text-[var(--theme-text-secondary)]">
                  (Includes +₹{addOnCost} Addon)
                </div>
              )}
            </div>
          </div>

          {/* Rating Summary Bar */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-950">
            <div className="flex items-center gap-1 text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{ratingStats.average.toFixed(1)} / 5.0</span>
            </div>
            <span className="text-xs text-amber-800">
              Based on {ratingStats.count} customer ratings
            </span>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-secondary)] mb-1">
              Description
            </h4>
            <p className="text-sm text-[var(--theme-text)] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-secondary)] mb-1.5">
                Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[var(--theme-pill-bg)] text-[var(--theme-pill-text)] font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens Warning */}
          {item.allergens && item.allergens.length > 0 && item.allergens[0] !== 'None' && (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-900">
              <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Allergen Notice: </span>
                <span>Contains {item.allergens.join(', ')}.</span>
              </div>
            </div>
          )}

          {/* COFFEE & TEA LOUNGE SPECIFIC TASTING PROFILE */}
          {item.sectionId === 'coffee_tea' && (
            <div className="p-3.5 rounded-2xl bg-[#FAF4EB] border border-[#D9B98C]/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B2922] flex items-center gap-1.5">
                  <span>☕</span>
                  <span>Brew Profile & Tasting Notes</span>
                </span>
                {item.brewMethod && (
                  <span className="text-[10px] font-semibold text-[#87927A] bg-[#87927A]/15 px-2 py-0.5 rounded-full">
                    {item.brewMethod}
                  </span>
                )}
              </div>

              {/* Origin & Roast */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {item.origin && (
                  <div className="p-2 rounded-xl bg-white/80 border border-[#E5D5C0]">
                    <div className="text-[10px] text-[#634F46] font-medium">Single Estate Origin</div>
                    <div className="font-bold text-[#231713] truncate">{item.origin}</div>
                  </div>
                )}
                {item.roastLevel && (
                  <div className="p-2 rounded-xl bg-white/80 border border-[#E5D5C0]">
                    <div className="text-[10px] text-[#634F46] font-medium">Roast / Grade</div>
                    <div className="font-bold text-[#231713] truncate">{item.roastLevel}</div>
                  </div>
                )}
              </div>

              {/* Tasting Notes */}
              {item.tastingNotes && item.tastingNotes.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] font-bold text-[#3B2922]">Tasting Notes:</span>
                  {item.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white text-[#3B2922] border border-[#D9B98C]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ICE CREAM ADD-ON SECTION (Applicable for Waffles / Desserts) */}
          {item.hasIceCreamAddon && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🍦</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Add A Scoop of Ice Cream
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {ICE_CREAM_ADDONS.map((addon) => {
                  const isSelected = selectedIceCream === addon.id;
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() =>
                        setSelectedIceCream(isSelected ? null : addon.id)
                      }
                      className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                        isSelected
                          ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                          : 'bg-white border-amber-200 text-amber-950 hover:bg-amber-100/50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span>{addon.icon}</span>
                        <span className="truncate">{addon.name}</span>
                      </div>
                      <span className="font-bold text-[11px] flex-shrink-0 ml-1">
                        +₹{addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PACKING CHARGES NOTICE (Requirement 10) */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-100/80 border border-zinc-200 text-xs text-zinc-700">
            <Package className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div>
              <span className="font-bold">Packing Charges Extra: </span>
              <span>{CAFE_SETTINGS.packingChargeNotice}</span>
            </div>
          </div>

          {/* DISH RATING & REVIEW SYSTEM (Requirement 11) */}
          <div className="p-4 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text)]">
                Rate This Dish
              </h4>
              {hasRated && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Rating recorded
                </span>
              )}
            </div>

            <form onSubmit={handleRatingSubmit} className="space-y-3">
              {/* Star selector */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform active:scale-125 focus:outline-none"
                    title={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        (hoverRating || userRating) >= star
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-zinc-300'
                      }`}
                    />
                  </button>
                ))}
                {userRating > 0 && (
                  <span className="text-xs font-bold text-amber-800 ml-1">
                    {userRating} / 5 Stars
                  </span>
                )}
              </div>

              {/* Optional review input */}
              {!hasRated && (
                <>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write an optional review (e.g. delicious taste, crispy waffle)..."
                    rows={2}
                    maxLength={300}
                    className="w-full text-xs p-2.5 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] text-[var(--theme-text)] placeholder:text-zinc-400"
                  />

                  <button
                    type="submit"
                    disabled={userRating === 0}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[var(--theme-primary)] text-white disabled:opacity-40 hover:opacity-90 active:scale-98 transition-all shadow-xs"
                  >
                    Submit Dish Rating
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
