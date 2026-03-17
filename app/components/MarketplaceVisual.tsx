"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, ArrowRightLeft, Store, Tag, ReceiptText } from "lucide-react";

const MarketplaceVisual = () => {
  const [scanIndex, setScanIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanIndex(prev => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { name: "MONSTERA VAR.", weight: "500g", price: "45.00", category: "PROPAGULE" },
    { name: "CLAY POTTING", weight: "2.5kg", price: "12.50", category: "SUBSTRATE" },
    { name: "FERN SPORES", weight: "10g", price: "08.20", category: "SEEDLING" },
    { name: "XYLEM FEED", weight: "50ml", price: "32.00", category: "NUTRIENT" },
  ];

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2B2D3A 0%, #1C1E28 55%, #13141C 100%)",
          boxShadow: "0 60px 120px -20px rgba(5,5,15,0.75), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')" }} />

        {/* ─── POS SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-3"
          style={{
            aspectRatio: "1/1.1",
            background: "#080C08",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* Supermarket HUD header */}
          <div className="flex justify-between items-center mb-2 px-1">
             <span style={{ fontSize: 7, fontWeight: 900, color: "#9CA764", textTransform: "uppercase" }}>TER-MKT / POS-04</span>
             <ReceiptText className="w-3 h-3 text-[#9CA764]/40" />
          </div>

          {/* MAIN CHECKOUT AREA */}
          <div className="flex-1 bg-white/5 rounded-lg p-3 flex flex-col gap-2 relative border border-white/5">
             {/* Scan Overlay */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-[#9CA764] opacity-20 animate-[scan_4s_linear_infinite]" />
             
             {/* Current Item Label */}
             <div className="flex flex-col border-b border-white/10 pb-2">
                <span style={{ fontSize: 6, color: "rgba(156,167,100,0.6)", fontWeight: 900 }}>ITEM_DETECTED:</span>
                <span className="text-white font-black tracking-tighter" style={{ fontSize: 13 }}>{items[scanIndex].name}</span>
             </div>

             {/* Price & Specs */}
             <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="flex flex-col">
                   <span style={{ fontSize: 5, color: "rgba(255,255,255,0.2)", fontWeight: 900 }}>NET_WT.</span>
                   <span className="text-white font-bold" style={{ fontSize: 9 }}>{items[scanIndex].weight}</span>
                </div>
                <div className="flex flex-col items-end">
                   <span style={{ fontSize: 5, color: "rgba(255,255,255,0.2)", fontWeight: 900 }}>CAT_ID</span>
                   <span style={{ fontSize: 7, fontWeight: 900, color: "#9CA764" }}>{items[scanIndex].category}</span>
                </div>
             </div>

             {/* Total Price Display (Big) */}
             <div className="mt-auto bg-[#9CA764]/10 rounded-md p-2 flex justify-between items-center border border-[#9CA764]/20">
                <div className="flex flex-col leading-none">
                   <span style={{ fontSize: 5, fontWeight: 900, color: "white", opacity: 0.4 }}>UNIT_PRICE</span>
                   <span className="text-white font-black" style={{ fontSize: 16 }}>${items[scanIndex].price}</span>
                </div>
                <div className="h-6 w-10 flex flex-col gap-[2px] opacity-40">
                   {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-full h-[1px] bg-white" style={{ width: `${Math.random() * 100}%` }} />
                   ))}
                </div>
             </div>
          </div>

          <div className="flex justify-between items-center mt-3 px-1">
             <div className="flex gap-1">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(255,255,255,0.2)" }}>READY</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#9CA764] animate-pulse" />
             </div>
             <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>OTU-NET_SYNCED</span>
          </div>
        </div>

        {/* ─── INTERFACE ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Tag className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>List</span>
           </div>

           <div className="relative group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-1" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}>
                 <div className="w-full h-full rounded-full flex items-center justify-center" 
                   style={{ 
                     background: "linear-gradient(135deg, #22242E 0%, #13141C 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <ArrowRightLeft className="w-6 h-6 text-[#9CA764]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <ShoppingBag className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Checkout</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 text-center opacity-20">
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu marketplace exchange
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(180px); }
        }
      `}</style>
    </div>
  );
};

export default MarketplaceVisual;
