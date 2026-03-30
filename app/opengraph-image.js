import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'سعر الذهب اليوم في السعودية - سعودي قولد';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0A0F 0%, #111118 50%, #1a1a24 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          direction: 'rtl',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold accent circle */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            fontSize: '28px',
          }}
        >
          <span>🪙</span>
          <span
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 800,
            }}
          >
            سعودي قولد
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.3,
            marginBottom: '16px',
            maxWidth: '900px',
          }}
        >
          سعر الذهب اليوم في السعودية
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#E0E0E8',
            textAlign: 'center',
            maxWidth: '700px',
            marginBottom: '30px',
          }}
        >
          أسعار محدثة لحظياً بالريال السعودي لجميع العيارات
        </div>

        {/* Price boxes */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          {[
            { karat: '24', label: 'عيار ٢٤' },
            { karat: '21', label: 'عيار ٢١' },
            { karat: '18', label: 'عيار ١٨' },
          ].map((item) => (
            <div
              key={item.karat}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: item.karat === '21' ? '2px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '16px 28px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#F59E0B', fontSize: '18px', fontWeight: 700 }}>
                {item.label}
              </span>
              <span style={{ color: '#B0B0B8', fontSize: '14px', marginTop: '4px' }}>
                ر.س / جرام
              </span>
            </div>
          ))}
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16,185,129,0.15)',
            border: '1px solid rgba(16,185,129,0.3)',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '16px',
            color: '#10B981',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#10B981',
              borderRadius: '50%',
            }}
          />
          أسعار محدثة من البورصة العالمية
        </div>
      </div>
    ),
    { ...size }
  );
}
