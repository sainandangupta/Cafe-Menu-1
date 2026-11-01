import { NextRequest, NextResponse } from 'next/server';

const RENDER_BACKEND = 'https://cafe-menu-1-8h1a.onrender.com';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || !q.trim()) {
    return NextResponse.json({ success: true, data: [] });
  }

  // Priority: 1) Local dev backend if available 2) NEXT_PUBLIC_API_URL 3) Render production URL
  const backendUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : (process.env.NEXT_PUBLIC_API_URL || RENDER_BACKEND);

  try {
    const res = await fetch(`${backendUrl}/api/music/search?q=${encodeURIComponent(q.trim())}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 } // cache for 60 seconds
    });

    if (!res.ok) {
      // If local failed, fallback to Render
      if (backendUrl !== RENDER_BACKEND) {
        const fallbackRes = await fetch(`${RENDER_BACKEND}/api/music/search?q=${encodeURIComponent(q.trim())}`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          return NextResponse.json(fallbackData);
        }
      }
      return NextResponse.json({ success: false, message: `Backend responded with ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    // If backend connection failed, try Render fallback
    try {
      const fallbackRes = await fetch(`${RENDER_BACKEND}/api/music/search?q=${encodeURIComponent(q.trim())}`);
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        return NextResponse.json(fallbackData);
      }
    } catch {}

    return NextResponse.json({ success: false, error: err.message || 'Search service unavailable' }, { status: 502 });
  }
}
