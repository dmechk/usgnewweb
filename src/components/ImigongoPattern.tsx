import React from 'react';

interface ImigongoRibbonProps {
  className?: string;
  height?: number;
  variant?: 'light' | 'dark' | 'emerald' | 'gold';
  bordered?: boolean;
}

/**
 * Authentic Rwandan Imigongo geometric pattern ribbon based on traditional art.
 * Matches the user-provided chevron zigzag relief with top and bottom geometric triangles.
 */
export const ImigongoRibbon: React.FC<ImigongoRibbonProps> = ({
  className = '',
  height = 20,
  variant = 'light',
  bordered = true,
}) => {
  // Color tokens matching the uploaded Imigongo image
  let bgFill = '#ffffff';
  let triangleFill = '#cbd5e1'; // Slate-300 / subtle grey as in image.png
  let strokeColor = '#94a3b8';

  if (variant === 'dark') {
    bgFill = '#0f172a'; // Deep slate-900
    triangleFill = '#1e293b'; // Slate-800
    strokeColor = '#334155';
  } else if (variant === 'emerald') {
    bgFill = '#064e3b'; // Emerald-900
    triangleFill = '#047857'; // Emerald-700
    strokeColor = '#059669';
  } else if (variant === 'gold') {
    bgFill = '#78350f';
    triangleFill = '#d97706';
    strokeColor = '#f59e0b';
  }

  const patternId = `imigongo-${variant}-${height}`;

  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
      >
        <defs>
          <pattern
            id={patternId}
            width="40"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* Background base */}
            <rect width="40" height={height} fill={bgFill} />

            {/* Top downward triangles */}
            <polygon
              points={`0,0 20,${height * 0.4} 40,0`}
              fill={triangleFill}
            />

            {/* Bottom upward triangles */}
            <polygon
              points={`0,${height} 20,${height * 0.6} 40,${height}`}
              fill={triangleFill}
            />

            {/* Optional subtle hairline boundary borders as in image.png */}
            {bordered && (
              <>
                <line
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="0"
                  stroke={strokeColor}
                  strokeWidth="0.8"
                />
                <line
                  x1="0"
                  y1={height}
                  x2="40"
                  y2={height}
                  stroke={strokeColor}
                  strokeWidth="0.8"
                />
              </>
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

/**
 * Vertical Imigongo pillar/edge border for framing the structural skeleton
 */
export const ImigongoPillar: React.FC<{
  className?: string;
  width?: number;
  variant?: 'light' | 'dark';
}> = ({ className = '', width = 16, variant = 'light' }) => {
  const bgFill = variant === 'dark' ? '#0f172a' : '#ffffff';
  const triangleFill = variant === 'dark' ? '#1e293b' : '#e2e8f0';
  const patternId = `imigongo-vert-${variant}-${width}`;

  return (
    <div
      className={`h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ width: `${width}px` }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-y"
      >
        <defs>
          <pattern
            id={patternId}
            width={width}
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect width={width} height="40" fill={bgFill} />
            <polygon points={`0,0 ${width * 0.4},20 0,40`} fill={triangleFill} />
            <polygon points={`${width},0 ${width * 0.6},20 ${width},40`} fill={triangleFill} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};
