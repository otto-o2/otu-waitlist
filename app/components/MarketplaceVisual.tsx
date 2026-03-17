"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag, ArrowRightLeft, Tag, ReceiptText, Printer } from "lucide-react";

interface ScannedItem {
  id: number;
  name: string;
  weight: string;
  price: string;
  category: string;
}

const MarketplaceVisual = () => {
  const [scanIndex, setScanIndex] = useState(0);
  const [receipt, setReceipt] = useState<ScannedItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const catalog: ScannedItem[] = [
    { id: 1, name: "MONSTERA VAR.", weight: "500g", price: "45.00", category: "PROPAGULE" },
    { id: 2, name: "CLAY POTTING", weight: "2.5kg", price: "12.50", category: "SUBSTRATE" },
    { id: 3, name: "FERN SPORES", weight: "10g", price: "08.20", category: "SEEDLING" },
    { id: 4, name: "XYLEM FEED", weight: "50ml", price: "32.00", category: "NUTRIENT" },
    { id: 5, name: "COCO HUSK", weight: "1.2kg", price: "18.90", category: "SUBSTRATE" },
    { id: 6, name: "ALOCASIA BR.", weight: "300g", price: "55.00", category: "PROPAGULE" },
  ];

  // Logic: Scan new item, adding it to the receipt list
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (scanIndex + 1) % catalog.length;
      setScanIndex(nextIdx);
      
      // Every scan adds to the receipt
      setReceipt(prev => {
        const next = [...prev, catalog[nextIdx]];
        // Keep receipt to a reasonable length for the visual
        return next.slice(-10);
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [scanIndex]);

  // Auto-scroll the receipt to the latest addition
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [receipt]);

  return (
    <div className="relative w-full max-w-[300px] select-none" style={{ aspectRatio: "0.65/1" }}>
      {/* ─── HARDWARE CHASSIS (Dark Hematite) ─── */}
      <div
        className="relative w-full h-full rounded-[42px] p-5 flex flex-col gap-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #262A2E 0%, #181B1E 55%, #0F1113 100%)",
          boxShadow: "0 60px 120px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.5)",
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
            background: "#080C08", // Deep terminal black
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "inset 0 2px 15px rgba(0,0,0,0.9)"
          }}
        >
          {/* Supermarket HUD header */}
          <div className="flex justify-between items-center mb-2 px-1">
             <span style={{ fontSize: 7, fontWeight: 900, color: "#FFB347", textTransform: "uppercase" }}>TERM-MKT_POS_04</span>
             <ReceiptText className="w-3 h-3 text-[#FFB347]/40" />
          </div>

          {/* MAIN CHECKOUT AREA */}
          <div className="flex-1 rounded-lg flex flex-col gap-2 relative overflow-hidden">
             
             {/* CURRENT ITEM DETECTION (Above the list) */}
             <div className="bg-white/5 p-3 rounded-lg border border-white/5 relative overflow-hidden group">
                {/* Horizontal Scan Beam */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FFB347] opacity-40 animate-[pos_scan_3s_linear_infinite]" />
                
                <div className="flex flex-col">
                   <span style={{ fontSize: 5, color: "rgba(255,179,71,0.6)", fontWeight: 900 }}>SCAN_MODE: ACTIVE</span>
                   <span className="text-white font-black tracking-tighter" style={{ fontSize: 13 }}>{catalog[scanIndex].name}</span>
                </div>
                <div className="flex justify-between items-end mt-1">
                   <span style={{ fontSize: 6, fontWeight: 900, color: "white", opacity: 0.3 }}>{catalog[scanIndex].category}</span>
                   <span className="text-[#FFB347] font-black" style={{ fontSize: 12 }}>${catalog[scanIndex].price}</span>
                </div>
             </div>

             {/* GROWING RECEIPT LIST (Supermarket style) */}
             <div 
                ref={scrollRef}
                className="flex-1 bg-white/[0.02] rounded-lg p-2 flex flex-col gap-1.5 overflow-y-auto scrollbar-hide border border-white/5"
             >
                {receipt.map((item, i) => (
                   <div 
                    key={i} 
                    className="flex justify-between items-center opacity-80 animate-[enter_0.4s_ease-out_forwards]"
                    style={{ borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '2px' }}
                   >
                      <div className="flex flex-col leading-none">
                         <span style={{ fontSize: 7, fontWeight: 900, color: "white" }}>{item.name}</span>
                         <span style={{ fontSize: 5, color: "rgba(255,255,255,0.2)", fontWeight: 900 }}>{item.weight}</span>
                      </div>
                      <span className="text-white font-bold" style={{ fontSize: 7 }}>${item.price}</span>
                   </div>
                ))}
             </div>

             {/* TOTAL SUMMARY */}
             <div className="mt-2 bg-[#FFB347]/10 rounded-md p-2.5 flex justify-between items-center border border-[#FFB347]/20">
                <div className="flex flex-col leading-none">
                   <span style={{ fontSize: 6, fontWeight: 900, color: "white", opacity: 0.4 }}>BALANCE_DUE</span>
                   <span className="text-white font-black" style={{ fontSize: 13 }}>
                      ${receipt.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(2)}
                   </span>
                </div>
                <Printer className="w-4 h-4 text-[#FFB347]" opacity={0.4} />
             </div>
          </div>

          <div className="flex justify-between items-center mt-3 px-1">
             <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB347] animate-pulse" />
                <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(255,255,255,0.2)" }}>ENCRYPTION: AES-256</span>
             </div>
             <span style={{ fontSize: 6, fontWeight: 900, color: "rgba(255,255,255,0.2)" }}>OTU_SYNC_VERIFIED</span>
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
                     background: "linear-gradient(135deg, #1E2228 0%, #0F1113 100%)",
                     boxShadow: "0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
                   }}>
                    <ArrowRightLeft className="w-6 h-6 text-[#FFB347]" />
                 </div>
              </div>
           </div>

           <div className="group flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/11 active:scale-95"
                style={{ background: "linear-gradient(145deg, #2A2C38 0%, #181A22 100%)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                 <ShoppingBag className="w-4 h-4 text-[#D4DCE8] opacity-60" />
              </div>
              <span style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(215,230,240,0.2)" }}>Log Out</span>
           </div>
        </div>

        {/* ─── LABEL ─── */}
        <div className="mt-2 text-center opacity-10">
          <p style={{ fontSize: 5, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: "#D4DCE8" }}>
            otu marketplace exchange v.0.1
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pos_scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          20%, 80% { opacity: 0.6; }
          50% { transform: translateY(60px); }
        }
        @keyframes enter {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default MarketplaceVisual;
