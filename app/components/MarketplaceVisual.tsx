"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag, ArrowRightLeft, Tag, ReceiptText, Printer } from "lucide-react";
import DeviceChassis from "./DeviceChassis";

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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (scanIndex + 1) % catalog.length;
      setScanIndex(nextIdx);
      setReceipt(prev => {
        const next = [...prev, catalog[nextIdx]];
        return next.slice(-10);
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [scanIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [receipt]);

  return (
    <DeviceChassis
      chassisGradient="linear-gradient(160deg, #262626 0%, #171717 55%, #0A0A0A 100%)"
      chassisShadowColor="rgba(10,10,10,0.8)"
      screenBackground="linear-gradient(160deg, #121212 0%, #080808 100%)"
      screenOverlay={
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] z-10"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')", mixBlendMode: "screen" }}
        />
      }
      phosphorGlow="rgba(136,153,170,0.08)"
      buttons={{
        left: { icon: <Tag className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "List" },
        center: { icon: <ArrowRightLeft className="w-8 h-8 text-[#8899AA]" /> },
        right: { icon: <ShoppingBag className="w-5 h-5 text-[#D4DCE8] opacity-60" />, label: "Log Out" },
        sideGradient: "linear-gradient(145deg, #333333 0%, #171717 100%)",
        centerGradient: "linear-gradient(135deg, #262626 0%, #0A0A0A 100%)",
        labelColor: "rgba(200,200,200,0.3)",
      }}
      engravingText="otu marketplace exchange v.0.1"
      engravingColor="#8899AA"
    >
      {/* HUD Header */}
      <div className="flex justify-between items-center mb-2 px-1 relative z-20">
        <span style={{ fontSize: 10, fontWeight: 900, color: "rgba(180,200,210,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Outfit', sans-serif" }}>TERM-MKT_POS_04</span>
        <ReceiptText className="w-4 h-4 text-[#8899AA]/40" />
      </div>

      {/* CHECKOUT AREA */}
      <div className="flex-1 rounded-lg flex flex-col gap-2 relative overflow-hidden">
        {/* Current Item */}
        <div className="bg-white/5 p-3 rounded-lg border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#8899AA] opacity-40 animate-[pos_scan_3s_linear_infinite]" />
          <div className="flex flex-col">
            <span style={{ fontSize: 7, color: "rgba(136,153,170,0.6)", fontWeight: 900 }}>SCAN_MODE: ACTIVE</span>
            <span className="text-white font-black tracking-tighter" style={{ fontSize: 18 }}>{catalog[scanIndex].name}</span>
          </div>
          <div className="flex justify-between items-end mt-1">
            <span style={{ fontSize: 8, fontWeight: 900, color: "white", opacity: 0.3 }}>{catalog[scanIndex].category}</span>
            <span className="text-[#8899AA] font-black" style={{ fontSize: 17 }}>${catalog[scanIndex].price}</span>
          </div>
        </div>

        {/* Receipt List */}
        <div
          ref={scrollRef}
          className="flex-1 bg-white/[0.02] rounded-lg p-2 flex flex-col gap-1.5 overflow-y-auto scrollbar-hide border border-white/5"
        >
          {receipt.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center opacity-80 animate-[enter_0.4s_ease-out_forwards]"
              style={{ borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '3px' }}
            >
              <div className="flex flex-col leading-none">
                <span style={{ fontSize: 10, fontWeight: 900, color: "white" }}>{item.name}</span>
                <span style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", fontWeight: 900 }}>{item.weight}</span>
              </div>
              <span className="text-white font-bold" style={{ fontSize: 10 }}>${item.price}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-2 bg-[#8899AA]/10 rounded-md p-2.5 flex justify-between items-center border border-[#8899AA]/20">
          <div className="flex flex-col leading-none">
            <span style={{ fontSize: 8, fontWeight: 900, color: "white", opacity: 0.4 }}>BALANCE_DUE</span>
            <span className="text-white font-black" style={{ fontSize: 18 }}>
              ${receipt.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(2)}
            </span>
          </div>
          <Printer className="w-5 h-5 text-[#8899AA]" opacity={0.4} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 px-1">
        <div className="flex gap-1.5 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8899AA] animate-pulse" />
          <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(255,255,255,0.2)" }}>ENCRYPTION: AES-256</span>
        </div>
        <span style={{ fontSize: 8, fontWeight: 900, color: "rgba(255,255,255,0.2)" }}>OTU_SYNC_VERIFIED</span>
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
    </DeviceChassis>
  );
};

export default MarketplaceVisual;
