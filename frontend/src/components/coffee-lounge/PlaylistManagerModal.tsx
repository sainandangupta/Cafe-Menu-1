'use client';

import React, { useState } from 'react';
import { Song, DEFAULT_PLAYLIST, saveStoredPlaylist } from '@/data/playlist';
import { X, Plus, Trash2, RotateCcw, Check, Music, Link as LinkIcon, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface PlaylistManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Song[];
  onUpdatePlaylist: (newPlaylist: Song[]) => void;
  onSelectSong: (song: Song) => void;
}

export const PlaylistManagerModal: React.FC<PlaylistManagerModalProps> = ({
  isOpen,
  onClose,
  playlist,
  onUpdatePlaylist,
  onSelectSong
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newSpotifyUrl, setNewSpotifyUrl] = useState('');
  const [newDurationMin, setNewDurationMin] = useState('3');
  const [newDurationSec, setNewDurationSec] = useState('30');
  const [newMoodTag, setNewMoodTag] = useState<'Rainy' | 'Sunny' | 'Evening' | 'Night' | 'Cozy'>('Cozy');

  const handleSearchJioSaavn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiBase}/api/music/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setSearchResults(data.data);
        if (data.data.length === 0) {
          toast('No songs found on JioSaavn for this search', { icon: '🔍' });
        }
      } else {
        toast.error('Search returned no results');
      }
    } catch {
      toast.error('Could not connect to JioSaavn API');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddFromSearch = (song: any) => {
    const newSong: Song = {
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
      ambientVibe: `${song.album || 'Cafe Lounge'} • JioSaavn 320kbps`,
      isEnabled: true
    };
    const updated = [...playlist, newSong];
    onUpdatePlaylist(updated);
    saveStoredPlaylist(updated);
    toast.success(`Added "${song.title}" to Lounge Playlist!`);
  };

  if (!isOpen) return null;

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) {
      toast.error('Please enter song title and artist');
      return;
    }

    const totalSecs = (parseInt(newDurationMin) || 3) * 60 + (parseInt(newDurationSec) || 0);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const durationFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    // Extract Spotify track ID if given a full URL
    let spotifyTrackId = '1r9xUipOqo4mfAVJGXYic9';
    if (newSpotifyUrl.includes('track/')) {
      const match = newSpotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
      if (match && match[1]) spotifyTrackId = match[1];
    }

    const newSong: Song = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      artist: newArtist.trim(),
      duration: totalSecs,
      durationFormatted,
      spotifyUrl: newSpotifyUrl.trim() || `https://open.spotify.com/track/${spotifyTrackId}`,
      spotifyTrackId,
      albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      moodTag: newMoodTag,
      ambientVibe: `${newMoodTag} Coffee Vibe`,
      isEnabled: true
    };

    const updated = [...playlist, newSong];
    onUpdatePlaylist(updated);
    saveStoredPlaylist(updated);
    toast.success(`Added "${newTitle}" to Lounge Playlist!`);

    // Reset form
    setNewTitle('');
    setNewArtist('');
    setNewSpotifyUrl('');
    setShowAddForm(false);
  };

  const handleDeleteSong = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.length <= 1) {
      toast.error('Playlist must contain at least 1 song.');
      return;
    }
    const updated = playlist.filter((s) => s.id !== id);
    onUpdatePlaylist(updated);
    saveStoredPlaylist(updated);
    toast.success('Song removed from playlist');
  };

  const handleResetToDefault = () => {
    if (confirm('Reset lounge playlist to default 12 curated songs?')) {
      onUpdatePlaylist(DEFAULT_PLAYLIST);
      saveStoredPlaylist(DEFAULT_PLAYLIST);
      toast.success('Playlist reset to default');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-[#FAF4EB] border border-[#D9B98C] shadow-2xl p-5 sm:p-6 text-[#241B18] no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D9B98C]/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎵</span>
            <div>
              <h3 className="font-black text-base text-[#3B2922]">
                Lounge Music Library
              </h3>
              <p className="text-xs text-[#634F46]">
                Powered by JioSaavn API • 320kbps Streams
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-zinc-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* JioSaavn Live Music Search Bar */}
        <div className="my-3.5 p-3 rounded-2xl bg-white border border-[#D9B98C]/60 shadow-xs">
          <form onSubmit={handleSearchJioSaavn} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search any song or artist on JioSaavn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D9B98C]/80 text-xs bg-[#FAF4EB]/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#3B2922]"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="px-3.5 py-1.5 rounded-xl bg-[#87927A] hover:bg-[#6e7862] disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0"
            >
              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Search</span>
            </button>
          </form>

          {/* Search Results Preview */}
          {searchResults.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#D9B98C]/40 space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#634F46]">
                <span>JioSaavn Results ({searchResults.length})</span>
                <button
                  type="button"
                  onClick={() => setSearchResults([])}
                  className="text-xs text-zinc-500 hover:text-black underline"
                >
                  Clear
                </button>
              </div>
              {searchResults.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#FAF4EB] border border-[#D9B98C]/50 hover:border-[#3B2922] transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={song.albumArt}
                      alt={song.title}
                      className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-black/10"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#3B2922] truncate">{song.title}</p>
                      <p className="text-[10px] text-[#634F46] truncate">{song.artist}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddFromSearch(song)}
                    className="px-2.5 py-1 rounded-lg bg-[#3B2922] text-[#F7F0E5] text-[11px] font-bold hover:bg-[#241B18] flex items-center gap-1 flex-shrink-0 ml-2 shadow-xs transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 my-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 rounded-full bg-[#3B2922] text-[#F7F0E5] text-xs font-bold hover:bg-[#241B18] flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Cancel Form' : 'Add New Song'}</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="px-3 py-1.5 rounded-full bg-white border border-[#D9B98C] text-[#3B2922] text-xs font-semibold hover:bg-zinc-50 flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Add Song Form */}
        {showAddForm && (
          <form onSubmit={handleAddSong} className="p-4 rounded-2xl bg-white border border-[#D9B98C] space-y-3 mb-4 animate-slideDown">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B2922]">
              Add Track to Playlist
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[#634F46] block mb-1">Song Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. From the Start"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#D9B98C] text-xs bg-[#FAF4EB] focus:outline-none focus:ring-1 focus:ring-[#3B2922]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#634F46] block mb-1">Artist *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laufey"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#D9B98C] text-xs bg-[#FAF4EB] focus:outline-none focus:ring-1 focus:ring-[#3B2922]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#634F46] block mb-1">Spotify URL / Link</label>
              <input
                type="text"
                placeholder="https://open.spotify.com/track/..."
                value={newSpotifyUrl}
                onChange={(e) => setNewSpotifyUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-[#D9B98C] text-xs bg-[#FAF4EB] focus:outline-none focus:ring-1 focus:ring-[#3B2922]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-[#634F46] block mb-1">Duration (Min:Sec)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={newDurationMin}
                    onChange={(e) => setNewDurationMin(e.target.value)}
                    className="w-14 px-2 py-1.5 rounded-xl border border-[#D9B98C] text-xs text-center bg-[#FAF4EB]"
                  />
                  <span>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={newDurationSec}
                    onChange={(e) => setNewDurationSec(e.target.value)}
                    className="w-14 px-2 py-1.5 rounded-xl border border-[#D9B98C] text-xs text-center bg-[#FAF4EB]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#634F46] block mb-1">Mood Tag</label>
                <select
                  value={newMoodTag}
                  onChange={(e) => setNewMoodTag(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-xl border border-[#D9B98C] text-xs bg-[#FAF4EB]"
                >
                  <option value="Rainy">Rainy</option>
                  <option value="Sunny">Sunny</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                  <option value="Cozy">Cozy</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-[#3B2922] text-[#F7F0E5] text-xs font-bold hover:bg-[#241B18] transition-all shadow-xs"
            >
              Save Song
            </button>
          </form>
        )}

        {/* Current Songs List */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {playlist.map((song, idx) => (
            <div
              key={song.id}
              onClick={() => {
                onSelectSong(song);
                onClose();
              }}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-[#E5D5C0] hover:border-[#D9B98C] cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono font-bold text-[#634F46] w-5">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#3B2922] truncate group-hover:text-amber-900">
                    {song.title}
                  </div>
                  <div className="text-[10px] text-[#634F46] truncate">
                    {song.artist} • <span className="font-mono">{song.durationFormatted}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF4EB] text-[#3B2922] border border-[#D9B98C]">
                  {song.moodTag}
                </span>

                <button
                  onClick={(e) => handleDeleteSong(song.id, e)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove song"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
