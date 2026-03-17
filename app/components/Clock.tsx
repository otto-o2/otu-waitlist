"use client";

import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-6 font-sans font-black text-[#1B261B] leading-[0.85] tracking-tighter select-none">
      <div className="flex flex-col items-center">
        <span style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>{hours}</span>
        <span style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>{minutes}</span>
      </div>
      <div className="flex flex-col self-end pb-3 opacity-30 font-sans font-medium" style={{ fontSize: "clamp(0.8rem, 2.5vw, 1.4rem)", letterSpacing: "0.2em", transform: "rotate(-90deg) translate(50%, 0)", transformOrigin: "bottom right" }}>
          <span>{seconds}S</span>
          <span className="mt-1">GMT+4</span>
      </div>
    </div>
  );
};

export default Clock;
