'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Song, DEFAULT_PLAYLIST, getStoredPlaylist, saveStoredPlaylist } from '@/data/playlist';
import toast from 'react-hot-toast';

interface MusicContextType {
  playlist: Song[];
  currentSongIndex: number;
  currentSong: Song;
  isPlaying: boolean;
  progress: number;
  duration: number;
  isShuffle: boolean;
  repeatMode: 'all' | 'one' | 'off';
  isPlayerModalOpen: boolean;
  isPlaylistModalOpen: boolean;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  selectSong: (song: Song) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  seek: (seconds: number) => void;
  openPlayerModal: () => void;
  closePlayerModal: () => void;
  openPlaylistModal: () => void;
  closePlaylistModal: () => void;
  updatePlaylist: (newPlaylist: Song[]) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Song[]>(DEFAULT_PLAYLIST);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'all' | 'one' | 'off'>('all');
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load stored playlist on mount
  useEffect(() => {
    try {
      const stored = getStoredPlaylist();
      if (stored && stored.length > 0) {
        setPlaylist(stored);
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const currentSong = playlist[currentSongIndex] || DEFAULT_PLAYLIST[0];

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  // Next song
  const nextSong = useCallback(() => {
    if (playlist.length === 0) return;
    let nextIdx: number;
    if (isShuffle && playlist.length > 1) {
      do {
        nextIdx = Math.floor(Math.random() * playlist.length);
      } while (nextIdx === currentSongIndex);
    } else {
      nextIdx = (currentSongIndex + 1) % playlist.length;
    }
    setCurrentSongIndex(nextIdx);
    setIsPlaying(true);
  }, [playlist.length, isShuffle, currentSongIndex]);

  // Prev song
  const prevSong = useCallback(() => {
    if (playlist.length === 0) return;
    const prevIdx = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIdx);
    setIsPlaying(true);
  }, [playlist.length, currentSongIndex]);

  // Select a specific song
  const selectSong = useCallback((song: Song) => {
    const existingIdx = playlist.findIndex((s) => s.id === song.id || (s.title === song.title && s.artist === song.artist));
    if (existingIdx !== -1) {
      setCurrentSongIndex(existingIdx);
    } else {
      // Prepend to queue
      const updated = [song, ...playlist];
      setPlaylist(updated);
      saveStoredPlaylist(updated);
      setCurrentSongIndex(0);
    }
    setIsPlaying(true);
  }, [playlist]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  // Cycle repeat
  const cycleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'all') return 'one';
      if (prev === 'one') return 'off';
      return 'all';
    });
  }, []);

  // Seek
  const seek = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  }, []);

  // Modal controls
  const openPlayerModal = useCallback(() => setIsPlayerModalOpen(true), []);
  const closePlayerModal = useCallback(() => setIsPlayerModalOpen(false), []);
  const openPlaylistModal = useCallback(() => setIsPlaylistModalOpen(true), []);
  const closePlaylistModal = useCallback(() => setIsPlaylistModalOpen(false), []);

  const updatePlaylist = useCallback((newPlaylist: Song[]) => {
    setPlaylist(newPlaylist);
    saveStoredPlaylist(newPlaylist);
  }, []);

  // HTML5 Audio sync
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy restriction
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong.id, currentSong.audioUrl]);

  // Time & progress update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || currentSong.duration || 0);
    }
  };

  const handleEnded = () => {
    if (repeatMode === 'one' && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } else if (repeatMode === 'off' && currentSongIndex === playlist.length - 1) {
      setIsPlaying(false);
      setProgress(0);
    } else {
      nextSong();
    }
  };

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentSongIndex,
        currentSong,
        isPlaying,
        progress,
        duration: duration || currentSong.duration || 0,
        isShuffle,
        repeatMode,
        isPlayerModalOpen,
        isPlaylistModalOpen,
        togglePlay,
        nextSong,
        prevSong,
        selectSong,
        toggleShuffle,
        cycleRepeat,
        seek,
        openPlayerModal,
        closePlayerModal,
        openPlaylistModal,
        closePlaylistModal,
        updatePlaylist
      }}
    >
      {/* ─── GLOBAL PERSISTENT AUDIO ELEMENT ─── */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

