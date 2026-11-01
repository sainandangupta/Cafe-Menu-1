'use client';

import React from 'react';
import { Song } from '@/data/playlist';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';

interface MobileMiniPlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  onExpand: () => void;
}

export const MobileMiniPlayer: React.FC<MobileMiniPlayerProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNextSong,
  onPrevSong,
  onExpand
}) => {
  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 sm:hidden animate-slideUp">
      <div
        onClick={onExpand}
        className="flex items-center justify-between p-2.5 px-3 rounded-2xl bg-[#241B18]/95 backdrop-blur-md border border-[#D9B98C]/60 shadow-xl text-[#F7F0E5] cursor-pointer active:scale-[0.99] transition-transform"
      >
        {/* Left: Thumbnail & Song Info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-black/40 border border-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentSong.albumArt}
              alt={currentSong.title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Music className="w-4 h-4 text-[#D9B98C] animate-pulse" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#D9B98C] font-bold uppercase tracking-wider">
                Now Playing
              </span>
            </div>
            <div className="text-xs font-bold truncate text-[#F7F0E5]">
              {currentSong.title}
            </div>
            <div className="text-[10px] text-[#D9B98C]/80 truncate">
              {currentSong.artist}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div
          className="flex items-center gap-1 flex-shrink-0 ml-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onPrevSong}
            className="p-2 text-white/80 hover:text-white active:scale-90 transition-transform"
            aria-label="Previous Song"
          >
            <SkipBack className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-[#D9B98C] text-[#241B18] active:scale-95 transition-all flex items-center justify-center shadow-md"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={onNextSong}
            className="p-2 text-white/80 hover:text-white active:scale-90 transition-transform"
            aria-label="Next Song"
          >
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
