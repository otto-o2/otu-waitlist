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

import { OtuLeafLoader } from "./OtuLeafLoader";

export function BushGreenLogo(props: React.SVGProps<SVGSVGElement>) {
  return <OtuLeafLoader {...props} />;
}
