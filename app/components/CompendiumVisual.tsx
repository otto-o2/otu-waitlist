"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Bookmark, Share2, HelpCircle } from "lucide-react";
import { FluffyTree } from "@/app/components/OtuIcons";
import DeviceChassis from "./DeviceChassis";

const CompendiumVisual = () => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <DeviceChassis
      chassisGradient="linear-gradient(160deg, #2D2A1B 0%, #1E1C12 55%, #13120A 100%)"
      chassisShadowColor="rgba(19,18,10,0.8)"
      screenBackground="linear-gradient(160deg, #13120A 0%, #0A0906 100%)"
      screenOverlay={
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] z-10"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/handmade-paper.png')", mixBlendMode: "screen" }}
        />
      }
      phosphorGlow="rgba(82,183,136,0.08)"
      buttons={{
        left: { icon: <ChevronLeft className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "Prev" },
        center: { icon: <BookOpen className="w-8 h-8 text-[#52B788]" /> },
        right: { icon: <ChevronRight className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "Next" },
        sideGradient: "linear-gradient(145deg, #423E28 0%, #2D2A1B 100%)",
        centerGradient: "linear-gradient(135deg, #2D2A1B 0%, #13120A 100%)",
        labelColor: "rgba(200,190,160,0.25)",
      }}
      engravingText="otu plant encyclopedia v1.0"
      engravingColor="#40916C"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1.5 relative z-20">
        <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(180,200,210,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Outfit', sans-serif" }}>ARCHIVE / Ficus benghalensis</span>
        <div className="flex gap-2 items-center">
          <Bookmark className="w-3.5 h-3.5 text-[#95D5B1]/40" />
          <span style={{ fontSize: 8, fontWeight: 900, color: "#95D5B1", opacity: 0.8 }}>PG. 421</span>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 flex flex-col gap-1 font-serif text-[#D8F3DC] overflow-hidden scrollbar-hide">
        <div className="flex justify-between items-start">
          <h3 className="font-bold leading-none text-[#95D5B1]" style={{ fontSize: 18, letterSpacing: "-0.02em" }}>The Banyan Tree</h3>
          <span className="transform -translate-y-1"><FluffyTree className="w-[22px] h-[22px]" /></span>
        </div>

        <div className="space-y-2 overflow-y-auto pr-1 pb-4" style={{ fontSize: '10px', lineHeight: '1.3' }}>
          <p className="opacity-90">
            Known as the <span className="italic font-bold text-[#52B788]">{'"Vat-vriksha"'}</span> in ancient texts, the Great Banyan is a marvel of biological architecture. Its defining feature—aerial prop roots—eventually become indistinguishable from the primary trunk.
          </p>

          <div className="border-y border-white/5 py-1.5 my-1 grid grid-cols-2 gap-x-2 gap-y-1 font-sans font-bold uppercase text-[#40916C]" style={{ fontSize: '8px' }}>
            <div>Classification: <span className="text-[#95D5B1] italic">Moraceae</span></div>
            <div>Toxicity: <span className="text-[#95D5B1] italic">Mild (Sap)</span></div>
            <div>Sunlight: <span className="text-[#95D5B1] italic">Full / Part</span></div>
            <div>Growth: <span className="text-[#95D5B1] italic">Evergreen</span></div>
          </div>

          <p className="opacity-70 text-[#D8F3DC]">
            A single tree in <span className="font-bold text-[#52B788]">Kolkata</span> currently covers over 14,000 square meters, forming a literal forest from one genetic source. It is estimated to be over 250 years old.
          </p>

          <p className="opacity-70 text-[#D8F3DC]">
            In the <span className="italic">otu vault</span>, we categorize this species as a <span className="font-bold text-[#52B788]">Tier 4 Keystone</span>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-2 border-t border-white/5 flex justify-between items-center z-10">
        <div className="flex gap-3">
          <span style={{ fontSize: 7, fontWeight: 900, color: "#95D5B1", opacity: 0.4 }}>42% READ</span>
          <span className="flex items-center gap-1" style={{ fontSize: 7, fontWeight: 800, color: "#95D5B1" }}>
            <Share2 className="w-3 h-3" /> SHARE DATA
          </span>
        </div>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-3 h-3 opacity-20 text-[#95D5B1]" />
          <div className={`w-1.5 h-1.5 rounded-full bg-[#52B788] transition-opacity duration-300 ${blink ? 'opacity-100' : 'opacity-20'}`} />
        </div>
      </div>
    </DeviceChassis>
  );
};

export default CompendiumVisual;
