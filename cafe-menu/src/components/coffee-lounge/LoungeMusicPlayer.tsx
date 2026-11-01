'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Song, DEFAULT_PLAYLIST, getStoredPlaylist, saveStoredPlaylist } from '@/data/playlist';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  ExternalLink,
  Volume2,
  Sparkles,
  Disc,
  SlidersHorizontal,
  Plus,
  Trash2,
  Check,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

interface LoungeMusicPlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  onSelectSong: (song: Song) => void;
  isShuffle: boolean;
  onToggleShuffle: () => void;
  repeatMode: 'all' | 'one' | 'off';
  onCycleRepeat: () => void;
  playlist: Song[];
  onOpenPlaylistModal: () => void;
}

export const LoungeMusicPlayer: React.FC<LoungeMusicPlayerProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNextSong,
  onPrevSong,
  onSelectSong,
  isShuffle,
  onToggleShuffle,
  repeatMode,
  onCycleRepeat,
  playlist,
  onOpenPlaylistModal
}) => {
  const [progress, setProgress] = useState(0); // in seconds
  const [isPlaylistDrawerOpen, setIsPlaylistDrawerOpen] = useState(false);
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  // Reset progress on song change
  useEffect(() => {
    setProgress(0);
  }, [currentSong.id]);

  // Simulate progress when playing
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentSong.duration) {
            if (repeatMode === 'one') {
              return 0;
            } else {
              onNextSong();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, currentSong.duration, repeatMode, onNextSong]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setProgress(newTime);
  };

  const currentPercent = (progress / (currentSong.duration || 1)) * 100;

  return (
    <section id="lounge-music-player" className="w-full my-6 select-none scroll-mt-24">
      {/* ─── CARD CONTAINER ─── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#241B18] via-[#3B2922] to-[#1E1410] border border-[#D9B98C]/50 shadow-2xl p-5 sm:p-7 text-[#F7F0E5]">
        {/* Subtle Ambient Background Warmth */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9B98C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#87927A]/15 rounded-full blur-3xl pointer-events-none" />

        {/* ─── HEADER: "MUSIC FOR THIS MOMENT" ─── */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9B98C] animate-pulse" />
            <h2 className="text-xs sm:text-sm font-black tracking-widest uppercase text-[#D9B98C]">
              🎵 MUSIC FOR THIS MOMENT
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                showSpotifyEmbed
                  ? 'bg-[#1DB954] text-black border-[#1DB954]'
                  : 'bg-white/10 hover:bg-white/20 text-[#F7F0E5] border-white/15'
              }`}
              title="Toggle Official Spotify Player Embed"
            >
              {showSpotifyEmbed ? 'Hide Spotify' : '🟢 Spotify Mode'}
            </button>

            <button
              onClick={() => setIsPlaylistDrawerOpen(!isPlaylistDrawerOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F0E5] text-xs font-semibold border border-white/15 transition-all"
              aria-label="View Playlist"
            >
              <ListMusic className="w-3.5 h-3.5 text-[#D9B98C]" />
              <span>Playlist ({playlist.length})</span>
            </button>
          </div>
        </div>

        {/* ─── MAIN PLAYER BODY ─── */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Vinyl / Album Sleeve Artwork */}
          <div className="relative group w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 flex items-center justify-center">
            {/* Spinning Vinyl Record (Slides out slightly or rotates) */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-[#1E1410] bg-gradient-to-tr from-black via-zinc-900 to-zinc-800 shadow-xl flex items-center justify-center transition-transform duration-700 ${
                isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
              }`}
            >
              {/* Vinyl Grooves */}
              <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#D9B98C] border-2 border-[#3B2922] flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#241B18]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Album Sleeve Over Vinyl */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-2xl border border-white/20 z-10 transform group-hover:scale-105 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentSong.albumArt}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                <span className="text-[9px] font-bold text-[#D9B98C] bg-black/60 px-1.5 py-0.5 rounded">
                  {currentSong.moodTag}
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5">
                    <span className="w-1 h-3 bg-[#D9B98C] rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-[#87927A] rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-2 bg-[#D9B98C] rounded-full animate-pulse delay-150" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Song Metadata & Core Playback Controls */}
          <div className="flex-1 w-full text-center sm:text-left space-y-3">
            {/* Title & Artist */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#87927A] mb-1">
                <Sparkles className="w-3 h-3 text-[#D9B98C]" />
                <span>{currentSong.ambientVibe}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#F7F0E5] tracking-tight leading-tight line-clamp-1">
                {currentSong.title}
              </h3>
              <p className="text-sm font-semibold text-[#D9B98C] mt-0.5">
                {currentSong.artist}
              </p>
            </div>

            {/* Progress Bar (Scrubbable) */}
            <div className="space-y-1 pt-1">
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max={currentSong.duration || 100}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D9B98C] focus:outline-none"
                  aria-label="Track timeline"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#D9B98C]/90">
                <span>{formatTime(progress)}</span>
                <span>{currentSong.durationFormatted}</span>
              </div>
            </div>

            {/* Control Buttons (Shuffle, Prev, Play/Pause, Next, Repeat) */}
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
              {/* Shuffle Toggle */}
              <button
                onClick={onToggleShuffle}
                className={`p-2 rounded-full transition-all ${
                  isShuffle
                    ? 'text-[#D9B98C] bg-white/15 ring-1 ring-[#D9B98C]'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle Shuffle"
                title={isShuffle ? 'Shuffle: On' : 'Shuffle: Off'}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Previous Song */}
              <button
                onClick={onPrevSong}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F0E5] active:scale-90 transition-transform"
                aria-label="Previous Song"
                title="Previous Song (Loops to end)"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              {/* Central Play / Pause Button */}
              <button
                onClick={onTogglePlay}
                className="w-14 h-14 rounded-full bg-[#D9B98C] text-[#241B18] hover:bg-[#ebd0ab] active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-[#D9B98C]/20"
                aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                )}
              </button>

              {/* Next Song */}
              <button
                onClick={onNextSong}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F0E5] active:scale-90 transition-transform"
                aria-label="Next Song"
                title="Next Song (Loops to start)"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              {/* Repeat Toggle */}
              <button
                onClick={onCycleRepeat}
                className={`p-2 rounded-full transition-all ${
                  repeatMode !== 'off'
                    ? 'text-[#D9B98C] bg-white/15 ring-1 ring-[#D9B98C]'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Cycle Repeat Mode"
                title={`Repeat: ${repeatMode === 'one' ? 'Current Song' : repeatMode === 'all' ? 'All Playlist' : 'Off'}`}
              >
                {repeatMode === 'one' ? (
                  <Repeat1 className="w-4 h-4" />
                ) : (
                  <Repeat className="w-4 h-4" />
                )}
              </button>

              {/* Open in Spotify */}
              <a
                href={currentSong.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xs:flex items-center gap-1 text-[11px] font-semibold text-[#1DB954] hover:underline ml-2"
                title="Open track on Spotify"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* ─── OPTIONAL SPOTIFY OFFICIAL EMBED IF ENABLED ─── */}
        {showSpotifyEmbed && (
          <div className="mt-5 pt-4 border-t border-white/10 animate-fadeIn">
            <div className="text-[11px] font-bold text-[#D9B98C] mb-2 flex items-center justify-between">
              <span>Official Spotify Stream Player</span>
              <button
                onClick={() => setShowSpotifyEmbed(false)}
                className="text-white/60 hover:text-white text-[10px]"
              >
                Close Embed ✕
              </button>
            </div>
            <iframe
              src={`https://open.spotify.com/embed/track/${currentSong.spotifyTrackId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-2xl shadow-inner border border-white/10"
            />
          </div>
        )}

        {/* ─── PLAYLIST DRAWER (EXPANDABLE) ─── */}
        {isPlaylistDrawerOpen && (
          <div className="mt-6 pt-5 border-t border-white/10 animate-slideDown">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D9B98C] flex items-center gap-1.5">
                <span>☕ Lounge Playlist Queue</span>
                <span className="text-[10px] text-white/50">({playlist.length} Tracks)</span>
              </h4>

              <button
                onClick={onOpenPlaylistModal}
                className="text-[11px] font-semibold text-[#87927A] hover:text-[#D9B98C] flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Manage Library</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {playlist.map((song, idx) => {
                const isSelected = song.id === currentSong.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => onSelectSong(song)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#D9B98C] text-[#241B18] font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-[#F7F0E5]/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-xs font-mono w-5 ${isSelected ? 'text-[#241B18]' : 'text-white/40'}`}>
                        {isSelected ? '▶' : String(idx + 1).padStart(2, '0')}
                      </span>

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={song.albumArt}
                        alt={song.title}
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="text-xs truncate font-bold">
                          {song.title}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-[#3B2922]' : 'text-white/60'}`}>
                          {song.artist}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded text-[9px] ${
                        isSelected ? 'bg-[#3B2922] text-[#D9B98C]' : 'bg-white/10 text-white/70'
                      }`}>
                        {song.moodTag}
                      </span>
                      <span className="text-[11px] font-mono opacity-70">
                        {song.durationFormatted}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
