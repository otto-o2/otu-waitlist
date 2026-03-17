"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, TrendingUp, Users, ArrowRightLeft, Store } from "lucide-react";

const MarketplaceVisual = () => {
  const [tickerOffset, setTickerOffset] = useState(0);
  const [activeTrade, setActiveTrade] = useState(0);

  // Animate the trade ticker and ticker logs
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset(prev => (prev + 1) % 100);
      setActiveTrade(prev => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const trades = [
    { item: "Pothos cutting", price: "20.4 otu", status: "PENDING", trend: "+2.4%" },
    { item: "Monstera seed", price: "128 otu", status: "SOLD", trend: "-1.8%" },
    { item: "Organic Fertilizer", price: "12 otu", status: "ACTIVE", trend: "+0.5%" },
    { item: "Calathea Prop", price: "45 otu", status: "PENDING", trend: "+5.1%" },
    { item: "Potting Mix (L)", price: "15 otu", status: "SOLD", trend: "0.0%" },
  ];

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS (Slate Indigo) ─── */}
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

        {/* ─── TERMINAL SCREEN ─── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden flex flex-col p-4"
          style={{
            aspectRatio: "1/1.1",
            background: "linear-gradient(160deg, #0D1A20 0%, #091318 100%)",
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* HUD Status Header */}
          <div className="relative flex justify-between items-start mb-4 z-20">
            <div className="flex flex-col gap-0.5">
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9CA764] animate-pulse" />
                  <span style={{ fontSize: 7, fontWeight: 900, color: "rgba(215,230,240,0.8)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    Trade Terminal
                  </span>
               </div>
               <span style={{ fontSize: 6, color: "rgba(180,200,210,0.3)", fontWeight: 700, fontFamily: "monospace" }}>
                 LIT_MKT: ACTIVE_SYNC
               </span>
            </div>
            <TrendingUp className="w-3 h-3 text-[#9CA764]/40" />
          </div>

          {/* TRADE MONITOR: LIVE TICKER */}
          <div className="flex-1 space-y-2 overflow-hidden relative">
             {trades.map((trade, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-700 ${i === activeTrade ? 'bg-[#9CA764]/10 border-[#9CA764]/30' : 'bg-white/5 border-white/5 opacity-40'}`}
                >
                  <div className="flex flex-col">
                    <span style={{ fontSize: 8, fontWeight: 900, color: "white" }}>{trade.item}</span>
                    <span style={{ fontSize: 6, color: i === activeTrade ? '#9CA764' : 'rgba(215,230,240,0.4)', fontWeight: 700 }}>{trade.status}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span style={{ fontSize: 8, fontWeight: 900, color: i === activeTrade ? '#9CA764' : 'white' }}>{trade.price}</span>
                    <span style={{ fontSize: 6, color: trade.trend.includes('-') ? '#FF5555' : '#9CA764', fontWeight: 900 }}>{trade.trend}</span>
                  </div>
                </div>
             ))}
             {/* Gradient fade to hide scroll */}
             <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#091318] to-transparent pointer-events-none" />
          </div>

          {/* Bottom Statistics Group */}
          <div className="flex justify-between items-end mt-4 pt-2 border-t border-white/5">
             <div className="flex flex-col gap-0.5">
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(180,200,210,0.4)", textTransform: "uppercase" }}>24H VOLUME</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: "white", opacity: 0.7, fontFamily: "monospace" }}>
                   1,284.22 OTU
                </span>
             </div>
             <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 opacity-40 scale-75">
                   <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20" />
                   <div className="w-4 h-4 rounded-full bg-white/10 border border-white/20" />
                </div>
                <Users className="w-3 h-3 text-[#9CA764]/30" />
             </div>
          </div>
        </div>

        {/* ─── PHYSICAL TERMINAL BUTTONS ─── */}
        <div className="flex items-center justify-between px-2 pb-2">
           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <Store className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>LIST</span>
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
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>ORDERS</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 flex items-center justify-center gap-2 opacity-20 text-center">
          <p style={{ fontSize: 6, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu marketplace exchange
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceVisual;
