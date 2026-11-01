'use client';

import React from 'react';
import { useMusic } from '@/context/MusicContext';
import { LoungeMusicPlayer } from './LoungeMusicPlayer';
import { PlaylistManagerModal } from './PlaylistManagerModal';

export const GlobalMusicModal: React.FC = () => {
  const {
    isPlayerModalOpen,
    closePlayerModal,
    isPlaylistModalOpen,
    closePlaylistModal,
    playlist,
    updatePlaylist,
    selectSong
  } = useMusic();

  if (!isPlayerModalOpen && !isPlaylistModalOpen) return null;

  return (
    <>
      {/* ─── FULL MUSIC PLAYER MODAL ─── */}
      {isPlayerModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
          onClick={closePlayerModal}
        >
          <div
            className="w-full max-w-xl my-auto animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <LoungeMusicPlayer onClose={closePlayerModal} />
          </div>
        </div>
      )}

      {/* ─── PLAYLIST MANAGER MODAL ─── */}
      {isPlaylistModalOpen && (
        <PlaylistManagerModal
          isOpen={isPlaylistModalOpen}
          onClose={closePlaylistModal}
          playlist={playlist}
          onUpdatePlaylist={updatePlaylist}
          onSelectSong={selectSong}
        />
      )}
    </>
  );
};

