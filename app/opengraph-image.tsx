import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "You K*ll Plants. otu fixes that."
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f5f0e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#3b2a1a',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-2px',
          }}
        >
          You K*ll Plants.
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#4a7c2f',
            textAlign: 'center',
          }}
        >
          otu fixes that.
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#7a6a5a',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          for plants, plant stuff, and plant people
        </div>
      </div>
    ),
    { ...size }
  )
}
