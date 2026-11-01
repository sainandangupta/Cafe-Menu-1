const forge = require('node-forge');

/**
 * JioSaavn API Engine based on open-source jiosaavn-api (sumitkolhe / GitHub topic jiosaavn-api)
 * Features DES-ECB decryption of high-fidelity 320kbps & 160kbps audio streams.
 */

const DES_KEY = '38346591';
const DES_IV = '00000000';

function decryptMediaUrl(encryptedMediaUrl) {
  if (!encryptedMediaUrl) return null;
  try {
    const encrypted = forge.util.decode64(encryptedMediaUrl);
    const decipher = forge.cipher.createDecipher('DES-ECB', forge.util.createBuffer(DES_KEY));
    decipher.start({ iv: forge.util.createBuffer(DES_IV) });
    decipher.update(forge.util.createBuffer(encrypted));
    decipher.finish();
    const decrypted = decipher.output.getBytes();
    return {
      stream_320: decrypted.replace('_96', '_320'),
      stream_160: decrypted.replace('_96', '_160'),
      stream_96: decrypted
    };
  } catch (err) {
    console.error('Error decrypting JioSaavn media URL:', err.message);
    return null;
  }
}

function formatSongPayload(raw) {
  if (!raw) return null;
  const links = decryptMediaUrl(raw.more_info?.encrypted_media_url);
  const image = raw.image
    ? raw.image.replace('150x150', '500x500').replace('50x50', '500x500').replace('http://', 'https://')
    : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80';

  const artists = raw.more_info?.artistMap?.primary_artists?.map((a) => a.name).join(', ')
    || raw.primary_artists
    || raw.music
    || 'Various Artists';

  const durationSec = raw.more_info?.duration ? Number(raw.more_info.duration) : 180;
  const mins = Math.floor(durationSec / 60);
  const secs = Math.floor(durationSec % 60);
  const durationFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return {
    id: raw.id,
    title: raw.title || raw.song,
    artist: artists,
    album: raw.more_info?.album || raw.album || '',
    year: raw.year || '',
    duration: durationSec,
    durationFormatted,
    audioUrl: links?.stream_320 || links?.stream_160 || links?.stream_96 || '',
    downloadUrl: links?.stream_320 || '',
    albumArt: image,
    permaUrl: raw.perma_url || '',
    has320: Boolean(links?.stream_320)
  };
}

async function searchSongs(query, limit = 10) {
  if (!query || !query.trim()) return [];
  try {
    const url =
      'https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&q=' +
      encodeURIComponent(query.trim()) +
      '&n=' +
      limit;

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*'
      }
    });

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    return data.results
      .map(formatSongPayload)
      .filter((s) => s && s.audioUrl);
  } catch (err) {
    console.error('JioSaavn search error:', err.message);
    return [];
  }
}

async function getSongDetails(id) {
  if (!id) return null;
  try {
    const url =
      'https://www.jiosaavn.com/api.php?__call=song.getDetails&_format=json&_marker=0&api_version=4&ctx=web6dot0&pids=' +
      encodeURIComponent(id);

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*'
      }
    });

    const data = await res.json();
    const songObj = data[id] || (data.songs && data.songs[0]);
    return formatSongPayload(songObj);
  } catch (err) {
    console.error('JioSaavn song details error:', err.message);
    return null;
  }
}

module.exports = {
  searchSongs,
  getSongDetails,
  decryptMediaUrl
};

