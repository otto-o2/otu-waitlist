"use client";

import React from "react";

export function FluffyTree(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 72 68"
      fill="none"
      {...props}
    >
      <rect x="33" y="38" width="6" height="22" rx="3" fill="#8B5E3C" />
      <ellipse cx="36" cy="30" rx="22" ry="20" fill="#4A7A28" />
      <ellipse cx="36" cy="27" rx="16" ry="14" fill="#5EA030" />
      <ellipse cx="28" cy="24" rx="8" ry="7" fill="#72B840" opacity="0.7" />
      <ellipse cx="44" cy="26" rx="7" ry="6" fill="#72B840" opacity="0.55" />
      <ellipse cx="36" cy="18" rx="6" ry="5" fill="#88CC48" opacity="0.6" />
    </svg>
  );
}

export function BushGreenLogo(props: React.SVGProps<SVGSVGElement>) {
  const size = props.width || props.height || 36;
  const primary = "#061A0C"; // Deep "bush" green, matching Wild Mode
  const ring = "#4A7A28"; // Lighter mid green
  const center = "#F1E8C7";

  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  const distances = [112, 148, 184];

  const Spark = ({ scale = 1 }: { scale?: number }) => (
    <g transform={`scale(${scale})`}>
      <rect x="-5" y="-14" width="10" height="28" fill={primary} />
      <rect x="-14" y="-5" width="28" height="10" fill={primary} />
    </g>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Otu Bush Green Logo"
      {...props}
    >
      <g transform="translate(256 256)">
        {rays.map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <g transform={`translate(${distances[0]} 0)`}>
              <Spark scale={1} />
            </g>
            <g transform={`translate(${distances[1]} 0)`}>
              <Spark scale={0.82} />
            </g>
            <g transform={`translate(${distances[2]} 0)`}>
              <Spark scale={0.66} />
            </g>
          </g>
        ))}
        <circle r="74" fill={ring} />
        <circle r="54" fill={primary} />
        <polygon
          points="0,-22 16,-16 22,0 16,16 0,22 -16,16 -22,0 -16,-16"
          fill={center}
        />
      </g>
    </svg>
  );
}
