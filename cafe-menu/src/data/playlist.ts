export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  durationFormatted: string;
  spotifyUrl: string;
  spotifyTrackId: string;
  albumArt: string;
  moodTag: 'Rainy' | 'Sunny' | 'Evening' | 'Night' | 'Cozy';
  ambientVibe: string;
  isEnabled?: boolean;
}

export const DEFAULT_PLAYLIST: Song[] = [
  {
    id: 's1',
    title: 'From the Start',
    artist: 'Laufey',
    duration: 169, // 2:49
    durationFormatted: '2:49',
    spotifyUrl: 'https://open.spotify.com/track/1r9xUipOqo4mfAVJGXYic9',
    spotifyTrackId: '1r9xUipOqo4mfAVJGXYic9',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Rainy',
    ambientVibe: 'Warm Bossa Nova & Rainy Cafe Windows',
    isEnabled: true
  },
  {
    id: 's2',
    title: 'Goddess',
    artist: 'Laufey',
    duration: 268, // 4:28
    durationFormatted: '4:28',
    spotifyUrl: 'https://open.spotify.com/track/6XUB2rP9pXk0GzV3y8mF9K',
    spotifyTrackId: '6XUB2rP9pXk0GzV3y8mF9K',
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Evening',
    ambientVibe: 'Cinematic Orchestral Jazz & Espresso Nights',
    isEnabled: true
  },
  {
    id: 's3',
    title: 'Stargazing',
    artist: 'Myles Smith',
    duration: 172, // 2:52
    durationFormatted: '2:52',
    spotifyUrl: 'https://open.spotify.com/track/6X6hC99N4W5z7O6uG5v5oJ',
    spotifyTrackId: '6X6hC99N4W5z7O6uG5v5oJ',
    albumArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Sunny',
    ambientVibe: 'Golden Hour Folk & Light Roast Pour-Over',
    isEnabled: true
  },
  {
    id: 's4',
    title: 'Sofia',
    artist: 'Clairo',
    duration: 188, // 3:08
    durationFormatted: '3:08',
    spotifyUrl: 'https://open.spotify.com/track/7B3z0ySL9ne0T8ikDzExkW',
    spotifyTrackId: '7B3z0ySL9ne0T8ikDzExkW',
    albumArt: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Sunny',
    ambientVibe: 'Dreamy Bedroom Pop & Vanilla Oat Latte',
    isEnabled: true
  },
  {
    id: 's5',
    title: 'Pretty Girl',
    artist: 'Clairo',
    duration: 179, // 2:59
    durationFormatted: '2:59',
    spotifyUrl: 'https://open.spotify.com/track/0KyAGiNGUytGhhuWe3NoRM',
    spotifyTrackId: '0KyAGiNGUytGhhuWe3NoRM',
    albumArt: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Cozy',
    ambientVibe: 'Gentle Lo-Fi & Warm Matcha Whisks',
    isEnabled: true
  },
  {
    id: 's6',
    title: 'Salad Days',
    artist: 'Mac DeMarco',
    duration: 145, // 2:25
    durationFormatted: '2:25',
    spotifyUrl: 'https://open.spotify.com/track/3yK2A0gYV2y2UaN3v2X5x6',
    spotifyTrackId: '3yK2A0gYV2y2UaN3v2X5x6',
    albumArt: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Evening',
    ambientVibe: 'Breezy Jangle Pop & French Press Coffee',
    isEnabled: true
  },
  {
    id: 's7',
    title: 'My Old Man',
    artist: 'Mac DeMarco',
    duration: 226, // 3:46
    durationFormatted: '3:46',
    spotifyUrl: 'https://open.spotify.com/track/4jV6g37S5x5V9n0u7V8r7Y',
    spotifyTrackId: '4jV6g37S5x5V9n0u7V8r7Y',
    albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Cozy',
    ambientVibe: 'Acoustic Guitar & Warm Biscuits',
    isEnabled: true
  },
  {
    id: 's8',
    title: 'Coffee',
    artist: 'Sylvan Esso',
    duration: 269, // 4:29
    durationFormatted: '4:29',
    spotifyUrl: 'https://open.spotify.com/track/3f6e80b2d6a5c1a7e2e3f4',
    spotifyTrackId: '3f6e80b2d6a5c1a7e2e3f4',
    albumArt: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Rainy',
    ambientVibe: 'Slow Pulse Synth & Dark Roast Aroma',
    isEnabled: true
  },
  {
    id: 's9',
    title: 'Cinnamon Girl',
    artist: 'Lana Del Rey',
    duration: 300, // 5:00
    durationFormatted: '5:00',
    spotifyUrl: 'https://open.spotify.com/track/2nMeu6UenVvyCL3q0aVR3K',
    spotifyTrackId: '2nMeu6UenVvyCL3q0aVR3K',
    albumArt: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Night',
    ambientVibe: 'Velvet Melancholy & Spiced Cinnamon Chai',
    isEnabled: true
  },
  {
    id: 's10',
    title: 'Brooklyn Baby',
    artist: 'Lana Del Rey',
    duration: 351, // 5:51
    durationFormatted: '5:51',
    spotifyUrl: 'https://open.spotify.com/track/1NZs6n4upqnU3v6qaZ95uO',
    spotifyTrackId: '1NZs6n4upqnU3v6qaZ95uO',
    albumArt: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Night',
    ambientVibe: 'Dreamy Slowcore & Vintage Vinyl Warmth',
    isEnabled: true
  },
  {
    id: 's11',
    title: 'It Runs Through Me',
    artist: 'Tom Misch ft. De La Soul',
    duration: 261, // 4:21
    durationFormatted: '4:21',
    spotifyUrl: 'https://open.spotify.com/track/02vVsD0qK73x6mO8wz2B9p',
    spotifyTrackId: '02vVsD0qK73x6mO8wz2B9p',
    albumArt: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Evening',
    ambientVibe: 'Smooth Neo-Soul Chords & Cortado Sip',
    isEnabled: true
  },
  {
    id: 's12',
    title: 'Space Song',
    artist: 'Beach House',
    duration: 320, // 5:20
    durationFormatted: '5:20',
    spotifyUrl: 'https://open.spotify.com/track/7H0ya83CMmgFcOhw0UB6vx',
    spotifyTrackId: '7H0ya83CMmgFcOhw0UB6vx',
    albumArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    moodTag: 'Night',
    ambientVibe: 'Ethereal Dream Pop & Midnight Herbal Infusion',
    isEnabled: true
  }
];

export const getStoredPlaylist = (): Song[] => {
  if (typeof window === 'undefined') return DEFAULT_PLAYLIST;
  try {
    const saved = localStorage.getItem('cafe_lounge_playlist');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return DEFAULT_PLAYLIST;
};

export const saveStoredPlaylist = (playlist: Song[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cafe_lounge_playlist', JSON.stringify(playlist));
  } catch {
    // ignore
  }
};
