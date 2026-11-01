import { NextRequest, NextResponse } from 'next/server';

const RENDER_BACKEND = 'https://cafe-menu-1-8h1a.onrender.com';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || !q.trim()) {
    return NextResponse.json({ success: true, data: [] });
  }

  const query = encodeURIComponent(q.trim());

  // Priority: 1) Local dev backend if available in dev mode 2) Render production URL
  const backendUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : (process.env.NEXT_PUBLIC_API_URL || RENDER_BACKEND);

  try {
    const res = await fetch(`${backendUrl}/api/music/search?q=${query}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 120 } // cache for 2 minutes
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    // If local dev or custom URL failed, fallback directly to Render
    if (backendUrl !== RENDER_BACKEND) {
      const fallbackRes = await fetch(`${RENDER_BACKEND}/api/music/search?q=${query}`, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 120 }
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        return NextResponse.json(fallbackData);
      }
    }

    return NextResponse.json(
      { success: false, message: `Music backend returned ${res.status}` },
      { status: res.status }
    );
  } catch (err: any) {
    // If backend connection errored, attempt direct Render fetch
    try {
      const fallbackRes = await fetch(`${RENDER_BACKEND}/api/music/search?q=${query}`, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 120 }
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        return NextResponse.json(fallbackData);
      }
    } catch {}

    return NextResponse.json(
      { success: false, message: err.message || 'Failed to connect to music service' },
      { status: 502 }
    );
  }
}
