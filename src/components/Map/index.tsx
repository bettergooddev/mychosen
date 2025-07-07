import React from 'react'

interface MapProps {
  src?: string
  width?: number | string
  height?: number | string
  className?: string
  allowFullScreen?: boolean
  loading?: 'lazy' | 'eager'
  referrerPolicy?:
    | 'no-referrer-when-downgrade'
    | 'no-referrer'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
}

const Map: React.FC<MapProps> = ({
  src = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED || '',
  width = 600,
  height = 450,
  className = '',
  allowFullScreen = false,
  loading = 'lazy',
  referrerPolicy = 'no-referrer-when-downgrade',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen={allowFullScreen}
        loading={loading}
        referrerPolicy={referrerPolicy}
        title="My-Chosen Café Location"
        className="w-full"
      />
    </div>
  )
}

export default Map
