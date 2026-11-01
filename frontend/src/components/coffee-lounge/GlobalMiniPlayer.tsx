'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMusic } from '@/context/MusicContext';
import { Play, Pause, SkipForward, SkipBack, Music, Minimize2, ChevronLeft, Disc } from 'lucide-react';

export const GlobalMiniPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    openPlayerModal,
    isPlayerModalOpen
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  // Setup initial position on mount (bottom-left away from bottom-right Pay QR)
  useEffect(() => {
    if (typeof window !== 'undefined' && position === null) {
      const defaultX = 20;
      const defaultY = window.innerHeight - 80;
      setPosition({ x: defaultX, y: defaultY });
    }
  }, [position]);

  // Keep within window boundaries on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!position || !widgetRef.current) return;
      const rect = widgetRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width - 12;
      const maxY = window.innerHeight - rect.height - 12;
      setPosition((prev) => {
        if (!prev) return null;
        return {
          x: Math.max(12, Math.min(prev.x, maxX)),
          y: Math.max(60, Math.min(prev.y, maxY))
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  // Drag handlers
  const handlePointerDown = (clientX: number, clientY: number) => {
    if (!widgetRef.current) return;
    const rect = widgetRef.current.getBoundingClientRect();
    dragStartRef.current = { clientX, clientY };
    startPosRef.current = { x: rect.left, y: rect.top };
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!dragStartRef.current || !startPosRef.current || !widgetRef.current) return;
    const dx = clientX - dragStartRef.current.clientX;
    const dy = clientY - dragStartRef.current.clientY;

    if (Math.hypot(dx, dy) > 5) {
      hasDraggedRef.current = true;
    }

    if (hasDraggedRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width - 12;
      const maxY = window.innerHeight - rect.height - 12;

      const newX = Math.max(12, Math.min(startPosRef.current.x + dx, maxX));
      const newY = Math.max(60, Math.min(startPosRef.current.y + dy, maxY));

      setPosition({ x: newX, y: newY });
    }
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
    startPosRef.current = null;
    setIsDragging(false);
  };

  // Mouse drag listeners
  const onMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click and ignore click on control buttons
    if (e.button !== 0) return;
    handlePointerDown(e.clientX, e.clientY);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handlePointerMove(moveEvent.clientX, moveEvent.clientY);
    };

    const onMouseUp = () => {
      handlePointerUp();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Touch drag listeners
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    handlePointerDown(touch.clientX, touch.clientY);

    const onTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      if (moveTouch) {
        handlePointerMove(moveTouch.clientX, moveTouch.clientY);
      }
    };

    const onTouchEnd = () => {
      handlePointerUp();
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  };

  // If full modal is open, keep mini player hidden
  if (isPlayerModalOpen) return null;

  // Custom inline style for absolute dragging position
  const containerStyle: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 45
      }
    : {
        position: 'fixed',
        left: '20px',
        bottom: '24px',
        zIndex: 45
      };

  return (
    <div
      ref={widgetRef}
      style={containerStyle}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={`select-none transition-shadow ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {!isExpanded ? (
        /* ─── 1. COLLAPSED: ROTATING VINYL DISC ONLY ─── */
        <div
          onClick={(e) => {
            if (!hasDraggedRef.current) {
              setIsExpanded(true);
            }
          }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-[#1E1410] border-2 border-[#D9B98C] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform group"
          title="Click to expand music player • Drag anywhere to move"
        >
          {/* Rotating Album Art Vinyl Record */}
          <div
            className={`w-full h-full rounded-full overflow-hidden relative shadow-inner ${
              isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSong.albumArt}
              alt={currentSong.title}
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Vinyl Groove Rings Overlay */}
            <div className="absolute inset-0 rounded-full border border-black/40 pointer-events-none" />
            <div className="absolute inset-2.5 rounded-full border border-black/30 pointer-events-none" />

            {/* Center Spindle Hole */}
            <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-[#1E1410] border-2 border-[#D9B98C] shadow-md flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          {/* Live Soundwaves / Status Indicator Badge */}
          {isPlaying ? (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#1E1410] items-center justify-center text-[8px] text-white font-black shadow-xs">
                ♪
              </span>
            </span>
          ) : (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 rounded-full bg-amber-500 border-2 border-[#1E1410] items-center justify-center text-[7px] text-white font-bold shadow-xs">
              ⏸
            </span>
          )}
        </div>
      ) : (
        /* ─── 2. EXPANDED: INTERACTIVE MINI PLAYER BAR ─── */
        <div className="flex items-center gap-2 p-2 sm:p-2.5 pl-2.5 pr-3 rounded-2xl bg-[#241B18]/95 backdrop-blur-xl border border-[#D9B98C]/70 shadow-2xl text-[#F7F0E5] hover:border-[#D9B98C] transition-all max-w-[90vw] sm:max-w-md animate-scaleUp">
          {/* Left: Spinning Vinyl Disc (Clicking it collapses back to disc) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-black/40 border-2 border-[#D9B98C] shadow-md group cursor-pointer"
            title="Click to collapse into spinning disc"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSong.albumArt}
              alt={currentSong.title}
              className={`w-full h-full object-cover pointer-events-none ${
                isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
              }`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Minimize2 className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[#1E1410] border border-[#D9B98C]" />
          </button>

          {/* Song Info (Clicking opens full player modal with JioSaavn search) */}
          <div
            onClick={(e) => {
              if (!hasDraggedRef.current) {
                openPlayerModal();
              }
            }}
            className="min-w-0 flex-1 cursor-pointer pr-1"
            title="Click to open full player & search library"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-[#D9B98C] font-black uppercase tracking-wider">
                Cafe Lounge
              </span>
            </div>
            <div className="text-xs font-bold truncate text-[#F7F0E5] hover:text-[#D9B98C] transition-colors">
              {currentSong.title}
            </div>
            <div className="text-[10px] text-[#D9B98C]/80 truncate">
              {currentSong.artist}
            </div>
          </div>

          {/* Controls */}
          <div
            className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 ml-1"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevSong}
              className="p-1.5 text-white/70 hover:text-white active:scale-90 transition-transform cursor-pointer"
              title="Previous Song"
              aria-label="Previous Song"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-[#D9B98C] text-[#241B18] active:scale-95 transition-all flex items-center justify-center shadow-md hover:scale-105 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              onClick={nextSong}
              className="p-1.5 text-white/70 hover:text-white active:scale-90 transition-transform cursor-pointer"
              title="Next Song"
              aria-label="Next Song"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Collapse Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1.5 text-white/50 hover:text-white active:scale-90 transition-transform cursor-pointer ml-0.5"
              title="Collapse into disc"
              aria-label="Collapse into disc"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
