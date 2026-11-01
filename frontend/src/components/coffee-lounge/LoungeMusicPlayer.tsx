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
  X,
  Search,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useMusic } from '@/context/MusicContext';

export interface LoungeMusicPlayerProps {
  currentSong?: Song;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onNextSong?: () => void;
  onPrevSong?: () => void;
  onSelectSong?: (song: Song) => void;
  isShuffle?: boolean;
  onToggleShuffle?: () => void;
  repeatMode?: 'all' | 'one' | 'off';
  onCycleRepeat?: () => void;
  playlist?: Song[];
  onOpenPlaylistModal?: () => void;
  onClose?: () => void;
}

export const LoungeMusicPlayer: React.FC<LoungeMusicPlayerProps> = (props) => {
  const music = useMusic();

  const currentSong = props.currentSong || music.currentSong;
  const isPlaying = props.isPlaying !== undefined ? props.isPlaying : music.isPlaying;
  const onTogglePlay = props.onTogglePlay || music.togglePlay;
  const onNextSong = props.onNextSong || music.nextSong;
  const onPrevSong = props.onPrevSong || music.prevSong;
  const onSelectSong = props.onSelectSong || music.selectSong;
  const isShuffle = props.isShuffle !== undefined ? props.isShuffle : music.isShuffle;
  const onToggleShuffle = props.onToggleShuffle || music.toggleShuffle;
  const repeatMode = props.repeatMode || music.repeatMode;
  const onCycleRepeat = props.onCycleRepeat || music.cycleRepeat;
  const playlist = props.playlist || music.playlist;
  const onOpenPlaylistModal = props.onOpenPlaylistModal || music.openPlaylistModal;
  const onClose = props.onClose;

  const progress = music.progress;
  const duration = music.duration || currentSong.duration || 1;

  const [isPlaylistDrawerOpen, setIsPlaylistDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(`http://localhost:5000/api/music/search?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setSearchResults(data.data);
      } else {
        toast('No songs found on JioSaavn for this search', { icon: '🔍' });
      }
    } catch {
      toast.error('Could not connect to JioSaavn search service');
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlaySearchedSong = (song: any) => {
    const formattedSong: Song = {
      id: `jiosaavn_${song.id}_${Date.now()}`,
      title: song.title,
      artist: song.artist,
      duration: song.duration,
      durationFormatted: song.durationFormatted,
      audioUrl: song.audioUrl,
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`,
      spotifyTrackId: song.id,
      albumArt: song.albumArt,
      moodTag: 'Cozy',
      ambientVibe: `${song.album || 'Cafe Vibe'} • JioSaavn 320kbps`,
      isEnabled: true
    };
    onSelectSong(formattedSong);
    setSearchResults([]);
    setSearchQuery('');
    toast.success(`Now playing "${formattedSong.title}"!`);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    music.seek(newTime);
  };

  const currentPercent = (progress / (duration || currentSong.duration || 1)) * 100;

  return (
    <section id="lounge-music-player" className="w-full my-6 select-none scroll-mt-24">
      {/* ─── CARD CONTAINER ─── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#241B18] via-[#3B2922] to-[#1E1410] border border-[#D9B98C]/50 shadow-2xl p-5 sm:p-7 text-[#F7F0E5]">
        {/* Subtle Ambient Background Warmth */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9B98C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#87927A]/15 rounded-full blur-3xl pointer-events-none" />

        {/* ─── HEADER: "MUSIC FOR THIS MOMENT" ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9B98C] animate-pulse" />
            <h2 className="text-xs sm:text-sm font-black tracking-widest uppercase text-[#D9B98C]">
              🎵 MUSIC FOR THIS MOMENT
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentSong.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all bg-white/10 hover:bg-[#1DB954] hover:text-black hover:border-[#1DB954] text-[#F7F0E5] border-white/15 flex items-center gap-1"
              title="Open Track on Spotify"
            >
              <span>🟢 Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setIsPlaylistDrawerOpen(!isPlaylistDrawerOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F0E5] text-xs font-semibold border border-white/15 transition-all"
              aria-label="View Playlist"
            >
              <ListMusic className="w-3.5 h-3.5 text-[#D9B98C]" />
              <span>Playlist ({playlist.length})</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all ml-1 cursor-pointer"
                title="Close Player"
                aria-label="Close Music Player"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ─── LIVE SONG SEARCH & STREAM (JIOSAAVN API) ─── */}
        <div className="relative mt-4 z-30">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-[#D9B98C]/80 pointer-events-none" />
            <input
              type="text"
              placeholder="Search & stream any song or artist (e.g. Taylor Swift, Diljit, Arijit, Coldplay)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-black/40 border border-white/15 hover:border-[#D9B98C]/50 focus:border-[#D9B98C] focus:bg-black/60 focus:outline-none text-xs sm:text-sm text-[#F7F0E5] placeholder:text-white/40 transition-all shadow-inner"
            />
            <div className="absolute right-1.5 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  className="p-1 rounded-full text-white/50 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="px-3 py-1.5 rounded-xl bg-[#D9B98C] hover:bg-white disabled:opacity-50 text-[#241B18] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Instant Search Results Dropdown overlay */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#1E1410]/95 backdrop-blur-xl border border-[#D9B98C]/50 rounded-2xl shadow-2xl p-3 z-40 max-h-72 overflow-y-auto space-y-2 no-scrollbar animate-slideDown">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#D9B98C] px-1 pb-1.5 border-b border-white/10">
                <span>🎵 Found {searchResults.length} songs • Click to play instantly</span>
                <button
                  type="button"
                  onClick={() => setSearchResults([])}
                  className="text-white/60 hover:text-white text-xs underline"
                >
                  Close
                </button>
              </div>

              {searchResults.map((song) => (
                <div
                  key={song.id}
                  onClick={() => handlePlaySearchedSong(song)}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-[#D9B98C]/60 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={song.albumArt}
                        alt={song.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-[#F7F0E5] truncate group-hover:text-[#D9B98C] transition-colors">
                        {song.title}
                      </p>
                      <p className="text-[11px] text-white/60 truncate">
                        {song.artist} • {song.durationFormatted}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="hidden sm:inline-block text-[10px] font-bold bg-[#D9B98C]/20 text-[#D9B98C] border border-[#D9B98C]/30 px-2 py-0.5 rounded-full">
                      320kbps
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaySearchedSong(song);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#D9B98C] text-[#241B18] text-xs font-bold hover:bg-white flex items-center gap-1 shadow-sm transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-[#D9B98C]/20 text-[#D9B98C] border border-[#D9B98C]/40 px-2 py-0.5 rounded-full">
                  ⚡ 320kbps JioSaavn Stream
                </span>
              </div>
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

              {/* Live Audio Stream Indicator */}
              <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>320kbps Stream</span>
              </div>
            </div>
          </div>
        </div>

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
