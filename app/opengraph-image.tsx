import { ImageResponse } from 'next/og';

export const alt = 'DevsAgentic - AI engineering and modern web development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 55%, #eef2ff 100%)',
          color: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '80px',
          width: '100%',
        }}
      >
        <div style={{ color: '#2563eb', fontSize: 32, fontWeight: 700 }}>DevsAgentic</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>
          AI engineering and modern web development
        </div>
        <div style={{ color: '#475569', fontSize: 28, marginTop: 32 }}>
          Practical articles, workflows, and developer tools.
        </div>
      </div>
    ),
    { ...size }
  );
}
