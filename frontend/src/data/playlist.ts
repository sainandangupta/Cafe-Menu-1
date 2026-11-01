export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  durationFormatted: string;
  audioUrl?: string; // High-quality 320kbps JioSaavn stream URL
  spotifyUrl: string;
  spotifyTrackId: string;
  albumArt: string;
  moodTag: 'Rainy' | 'Sunny' | 'Evening' | 'Night' | 'Cozy';
  ambientVibe: string;
  isEnabled?: boolean;
}

export const DEFAULT_PLAYLIST: Song[] = [
  {
    "id": "cafe_1",
    "title": "From The Start",
    "artist": "Laufey",
    "duration": 169,
    "durationFormatted": "2:49",
    "audioUrl": "https://aac.saavncdn.com/749/a44211e49262c17675a1432d0bbe8f0b_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/From%20The%20Start%20Laufey",
    "spotifyTrackId": "U9mU7soI",
    "albumArt": "https://c.saavncdn.com/749/Promise-English-2023-20230602111411-500x500.jpg",
    "moodTag": "Rainy",
    "ambientVibe": "Warm Bossa Nova & Rainy Cafe Windows",
    "isEnabled": true
  },
  {
    "id": "cafe_2",
    "title": "Come Away With Me",
    "artist": "Norah Jones",
    "duration": 197,
    "durationFormatted": "3:17",
    "audioUrl": "https://aac.saavncdn.com/183/13412c8cff034ac34c10083b7d59ec92_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Come%20Away%20With%20Me%20Norah%20Jones",
    "spotifyTrackId": "HlRFa-Fu",
    "albumArt": "https://c.saavncdn.com/183/Midnight-Jones-English-2020-20260614053825-500x500.jpg",
    "moodTag": "Cozy",
    "ambientVibe": "Acoustic Jazz Piano & Warm Cinnamon",
    "isEnabled": true
  },
  {
    "id": "cafe_3",
    "title": "Put Your Records On",
    "artist": "Corinne Bailey Rae",
    "duration": 215,
    "durationFormatted": "3:35",
    "audioUrl": "https://aac.saavncdn.com/451/fa0f4088c692ef98f3c2bfd11c4179fe_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Put%20Your%20Records%20On%20Corinne%20Bailey%20Rae",
    "spotifyTrackId": "Z6sZ97vs",
    "albumArt": "https://c.saavncdn.com/451/Put-Your-Records-On-English-2006-500x500.jpg",
    "moodTag": "Sunny",
    "ambientVibe": "Breezy Golden Hour & Honeyed Melodies",
    "isEnabled": true
  },
  {
    "id": "cafe_4",
    "title": "Nothing",
    "artist": "Bruno Major",
    "duration": 162,
    "durationFormatted": "2:42",
    "audioUrl": "https://aac.saavncdn.com/319/528604b4eb844cbe124e7354897d6579_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Nothing%20Bruno%20Major",
    "spotifyTrackId": "KfMjjT3T",
    "albumArt": "https://c.saavncdn.com/319/To-Let-A-Good-Thing-Die-English-2020-20221106163859-500x500.jpg",
    "moodTag": "Night",
    "ambientVibe": "Late Night Espresso & Soft Nostalgia",
    "isEnabled": true
  },
  {
    "id": "cafe_5",
    "title": "Texas Sun",
    "artist": "Khruangbin, Leon Bridges, Khruangbin & Leon Bridges",
    "duration": 253,
    "durationFormatted": "4:13",
    "audioUrl": "https://aac.saavncdn.com/465/7d01098659c6789dbeb9e8a867a0405f_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Texas%20Sun%20Khruangbin%2C%20Leon%20Bridges%2C%20Khruangbin%20%26amp%3B%20Leon%20Bridges",
    "spotifyTrackId": "wssp7J1A",
    "albumArt": "https://c.saavncdn.com/465/Texas-Sun-English-2020-20191209191004-500x500.jpg",
    "moodTag": "Evening",
    "ambientVibe": "Soulful Golden Afternoon Sunset",
    "isEnabled": true
  },
  {
    "id": "cafe_6",
    "title": "seasons",
    "artist": "wave to earth",
    "duration": 256,
    "durationFormatted": "4:16",
    "audioUrl": "https://aac.saavncdn.com/017/efbbc2fcbc43df12bfe39cf5c6a61951_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/seasons%20wave%20to%20earth",
    "spotifyTrackId": "JOiuXfZK",
    "albumArt": "https://c.saavncdn.com/017/summer-flows-0-02-Unknown-2020-20241126091012-500x500.jpg",
    "moodTag": "Cozy",
    "ambientVibe": "Indie Lo-fi Bloom & Mellow Guitar",
    "isEnabled": true
  },
  {
    "id": "cafe_7",
    "title": "Banana Pancakes",
    "artist": "Jack Johnson",
    "duration": 200,
    "durationFormatted": "3:20",
    "audioUrl": "https://aac.saavncdn.com/597/4536a0472feb1ab412b9b89fdb92edb8_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Banana%20Pancakes%20Jack%20Johnson",
    "spotifyTrackId": "AqDv0Uak",
    "albumArt": "https://c.saavncdn.com/597/Coffee-Music-2026-English-2026-20260825003517-500x500.jpg",
    "moodTag": "Sunny",
    "ambientVibe": "Lazy Sunday Morning Pancakes & Coffee",
    "isEnabled": true
  },
  {
    "id": "cafe_8",
    "title": "Just The Two Of Us",
    "artist": "Bill Withers, Grover Washington, Jr.",
    "duration": 238,
    "durationFormatted": "3:58",
    "audioUrl": "https://aac.saavncdn.com/104/22d335fc07e569f4ec8a3b0de1b289bc_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Just%20The%20Two%20Of%20Us%20Bill%20Withers%2C%20Grover%20Washington%2C%20Jr.",
    "spotifyTrackId": "qnz7fSCk",
    "albumArt": "https://c.saavncdn.com/104/PAUL-OST-2011-500x500.jpg",
    "moodTag": "Evening",
    "ambientVibe": "Classic 70s Soul & Warm Brass",
    "isEnabled": true
  },
  {
    "id": "cafe_9",
    "title": "Until I Found You",
    "artist": "Stephen Sanchez",
    "duration": 178,
    "durationFormatted": "2:58",
    "audioUrl": "https://aac.saavncdn.com/648/b4f0c2422d605de887bb72f684ddaa8e_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Until%20I%20Found%20You%20Stephen%20Sanchez",
    "spotifyTrackId": "gJgT-Dhm",
    "albumArt": "https://c.saavncdn.com/648/Until-I-Found-You-English-2022-20240426130801-500x500.jpg",
    "moodTag": "Night",
    "ambientVibe": "Vintage 50s Doo-Wop & Candlelight",
    "isEnabled": true
  },
  {
    "id": "cafe_10",
    "title": "Best Part (feat. H.E.R.)",
    "artist": "Daniel Caesar",
    "duration": 209,
    "durationFormatted": "3:29",
    "audioUrl": "https://aac.saavncdn.com/219/81a5065199f94eb1ca2bef77813e7fcf_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/Best%20Part%20(feat.%20H.E.R.)%20Daniel%20Caesar",
    "spotifyTrackId": "ptOpj5ii",
    "albumArt": "https://c.saavncdn.com/219/Freudian-English-2017-20250325164132-500x500.jpg",
    "moodTag": "Cozy",
    "ambientVibe": "Smooth Velvet R&B & Fresh Crema",
    "isEnabled": true
  },
  {
    "id": "cafe_11",
    "title": "death bed (coffee for your head)",
    "artist": "Powfu, beabadoobee",
    "duration": 173,
    "durationFormatted": "2:53",
    "audioUrl": "https://aac.saavncdn.com/180/77375fc68cbb672798c601d8047c46d1_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/death%20bed%20(coffee%20for%20your%20head)%20Powfu%2C%20beabadoobee",
    "spotifyTrackId": "gy17KLcd",
    "albumArt": "https://c.saavncdn.com/180/death-bed-English-2020-20200228133600-500x500.jpg",
    "moodTag": "Rainy",
    "ambientVibe": "Cozy Bedroom Lofi & Warm Mugs",
    "isEnabled": true
  },
  {
    "id": "cafe_12",
    "title": "My Kind of Woman",
    "artist": "Mac Demarco",
    "duration": 191,
    "durationFormatted": "3:11",
    "audioUrl": "https://aac.saavncdn.com/449/168865d2f65b5364f876012ec4bfd9e9_320.mp4",
    "spotifyUrl": "https://open.spotify.com/search/My%20Kind%20of%20Woman%20Mac%20Demarco",
    "spotifyTrackId": "auBKJCUG",
    "albumArt": "https://c.saavncdn.com/449/2-English-2012-20260711035242-500x500.jpg",
    "moodTag": "Evening",
    "ambientVibe": "Dreamy Jangle Pop & Sunset Glow",
    "isEnabled": true
  }
];

const STORAGE_KEY = 'velvet_bean_lounge_playlist_v2';

export function getStoredPlaylist(): Song[] {
  if (typeof window === 'undefined') return DEFAULT_PLAYLIST;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PLAYLIST;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PLAYLIST;
  } catch {
    return DEFAULT_PLAYLIST;
  }
}

export function saveStoredPlaylist(playlist: Song[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist));
  } catch (e) {
    console.error('Failed to save playlist to localStorage', e);
  }
}
