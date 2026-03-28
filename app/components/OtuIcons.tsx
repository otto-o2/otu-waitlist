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
  return <OtuLeafLoader size={Number(props.width) || undefined} {...props} />;
}

export function SoulfulSubmitted(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 20 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="animate-in zoom-in duration-500"
      {...props}
    >
      <path 
        d="M 0.793 3.045 C 1.213 3.394 1.767 3.583 1.82 3.583 C 1.874 3.583 2.502 3.507 3.197 3.159 C 3.197 3.159 3.033 2.658 3.518 2.21 C 4.003 1.761 4.385 1.583 4.887 2.019 C 5.388 2.455 5.513 3.003 5.513 3.003 C 5.8 2.376 6.321 1.63 7.021 1.742 C 7.72 1.854 8.017 2.482 8.017 2.482 C 8.281 1.677 8.901 1.34 9.475 1.545 C 10.05 1.749 10.169 2.575 10.169 2.575 C 10.512 1.942 11.231 1.486 11.753 1.854 C 12.274 2.221 12.274 2.871 12.274 2.871" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M 0 2.862 C 0.292 2.971 1.926 4.168 5.827 6.251 C 6.22 6.46 7.618 6.945 8.799 6.845 C 10.147 6.73 12.181 5.485 13.921 4.545 C 14.881 4.026 18.056 2.062 18.674 1.545 C 19.469 0.88 19.34 -1.132 17.514 1.545 C 16.513 3.013 15.393 4.28 13.784 5.922 C 10.793 8.973 8.167 11.335 6.037 10.873 C 4 10.44 2.28 6.46 1.84 5.385 C 1.4 4.31 0.793 3.045 0.793 3.045" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      >
        <animate 
          attributeName="stroke-dasharray" 
          from="0 100" 
          to="100 0" 
          dur="1s" 
          fill="freeze" 
        />
      </path>
    </svg>
  );
}
