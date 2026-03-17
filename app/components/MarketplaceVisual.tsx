"use client";

import React from "react";
import { Store, MapPin, Repeat, Package, Users } from "lucide-react";

const MarketplaceVisual = () => {
  return (
    <div className="relative w-full max-w-[320px] aspect-[0.7/1] flex items-center justify-center p-4 select-none">
      {/* Marketplace Terminal - Community Hub */}
      <div className="relative w-full h-full bg-[#FDFBF7] rounded-[40px] border-2 border-[#9CA764]/20 shadow-[0_50px_100px_-20px_rgba(156,167,100,0.3)] flex flex-col overflow-hidden">
        
        {/* Top Header - Neighborhood Focus */}
        <div className="p-6 flex justify-between items-center border-b border-[#9CA764]/10">
          <div className="flex flex-col">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-[#9CA764]">local market core</span>
            <span className="text-[8px] font-sans font-bold text-[#1B261B]/40">Active Listings: 128 Nearby</span>
          </div>
          <Users className="w-4 h-4 text-[#9CA764]" />
        </div>

        {/* Central Map / Discovery View */}
        <div className="flex-1 relative p-4">
           {/* Map Grid Background */}
           <div className="absolute inset-4 bg-[#EBE7DD]/50 rounded-3xl overflow-hidden border border-[#9CA764]/5">
              <div className="absolute inset-0 opacity-[0.2] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
              
              {/* Pulsing Map Pins */}
              <div className="absolute top-1/4 left-1/3 animate-bounce" style={{ animationDuration: '3s' }}>
                 <MapPin className="w-6 h-6 text-[#9CA764] fill-[#9CA764]/20" />
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-black/10 rounded-full blur-sm" />
              </div>

              <div className="absolute top-1/2 right-1/4 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                 <MapPin className="w-5 h-5 text-[#A14B3B] fill-[#A14B3B]/20" />
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-black/10 rounded-full blur-sm" />
              </div>

              {/* Floating Seed Packet (Artistic Asset) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-32 bg-[#F1E8C7] rounded-lg shadow-xl border border-[#9CA764]/20 flex flex-col p-3 rotate-12 animate-[float_6s_ease-in-out_infinite]">
                 <div className="w-full h-12 bg-[#9CA764]/20 rounded-md mb-2 flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#9CA764]" />
                 </div>
                 <div className="space-y-1">
                    <div className="w-full h-[2px] bg-[#1B261B]/10" />
                    <div className="w-2/3 h-[2px] bg-[#1B261B]/10" />
                    <div className="w-full h-[2px] bg-[#1B261B]/10" />
                 </div>
                 <div className="mt-auto flex justify-between items-end">
                    <span className="text-[6px] font-black uppercase text-[#1B261B]/40 tracking-widest">Rare Seed</span>
                    <span className="text-[8px] font-black text-[#9CA764]">$12</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer Interaction Plate */}
        <div className="p-6 bg-[#9CA764]/5 border-t border-[#9CA764]/10">
           <div className="flex justify-around items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                 <div className="w-10 h-10 rounded-full bg-[#FDFBF7] shadow-sm border border-[#9CA764]/10 flex items-center justify-center group active:scale-95 transition-transform cursor-pointer">
                    <Repeat className="w-4 h-4 text-[#9CA764] group-hover:rotate-180 transition-transform duration-500" />
                 </div>
                 <span className="text-[7px] font-sans font-black uppercase text-[#1B261B]/30 tracking-widest">Swap</span>
              </div>
              
              <div className="w-[1px] h-8 bg-[#9CA764]/10" />

              <div className="flex flex-col items-center gap-1">
                 <div className="w-10 h-10 rounded-full bg-[#1B261B] shadow-md flex items-center justify-center active:scale-95 transition-transform cursor-pointer">
                    <Store className="w-4 h-4 text-[#F1E8C7]" />
                 </div>
                 <span className="text-[7px] font-sans font-black uppercase text-[#1B261B]/30 tracking-widest">Visit</span>
              </div>
           </div>
        </div>

        {/* Glossy Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0) rotate(12deg); }
          50% { transform: translate(-50%, -20px) rotate(8deg); }
        }
      `}</style>
    </div>
  );
};

export default MarketplaceVisual;
