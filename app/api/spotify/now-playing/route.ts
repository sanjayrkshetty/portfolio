export const runtime = "edge";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";

async function getAccessToken() {
  const clientId     = process.env.SPOTIFY_CLIENT_ID     ?? "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  return res.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    if (!access_token) {
      return Response.json({ playing: false, error: "no_token" });
    }

    // Try currently playing first
    const npRes = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (npRes.status === 200) {
      const np = await npRes.json();
      if (np?.item) {
        return Response.json({
          playing:   true,
          title:     np.item.name,
          artist:    np.item.artists.map((a: { name: string }) => a.name).join(", "),
          album:     np.item.album.name,
          image:     np.item.album.images[0]?.url ?? null,
          url:       np.item.external_urls.spotify,
          progress:  np.progress_ms,
          duration:  np.item.duration_ms,
        });
      }
    }

    // Fall back to top track
    const topRes = await fetch(SPOTIFY_TOP_TRACKS_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (topRes.ok) {
      const top = await topRes.json();
      const t   = top.items?.[0];
      if (t) {
        return Response.json({
          playing: false,
          title:   t.name,
          artist:  t.artists.map((a: { name: string }) => a.name).join(", "),
          album:   t.album.name,
          image:   t.album.images[0]?.url ?? null,
          url:     t.external_urls.spotify,
          top:     top.items.slice(0, 5).map((tr: { name: string; artists: { name: string }[]; album: { images: { url: string }[] }; external_urls: { spotify: string } }) => ({
            title:  tr.name,
            artist: tr.artists.map((a: { name: string }) => a.name).join(", "),
            image:  tr.album.images[2]?.url ?? null,
            url:    tr.external_urls.spotify,
          })),
        });
      }
    }

    return Response.json({ playing: false });
  } catch {
    return Response.json({ playing: false, error: "failed" });
  }
}
