"use client";

import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[25rem] grid-cols-3 gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  [key: string]: any;
}) => (
  <a
    key={name}
    href={href}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-[2.5rem]",
      "bg-[#0D0F12] border border-white/5", // Deep charcoal background, subtle border
      "transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:translate-y-[-4px] hover:border-white/10",
      className,
    )}
  >
    <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none transition-opacity group-hover:opacity-25">
      {background}
    </div>
    
    <div className="z-10 flex flex-col gap-4 p-8 md:p-10 transition-all duration-300">
      <div className="bg-white/5 p-3 rounded-2xl w-fit border border-white/5 transition-colors group-hover:bg-white/10">
        <Icon className="h-6 w-6 md:h-8 md:w-8 text-[#D4DCE8] opacity-70 group-hover:opacity-100 transition-opacity" /> 
      </div>
      <div>
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight mb-1 group-hover:translate-x-1 transition-transform">
          {name.split(":")[0]}
        </h3>
        {name.includes(":") && (
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-white/30 mb-3">
            {name.split(":")[1].trim()}
          </p>
        )}
        <p className="max-w-md text-[#D4DCE8]/40 font-normal leading-relaxed text-base md:text-lg group-hover:text-[#D4DCE8]/60 transition-colors">
          {description}
        </p>
      </div>
    </div>

    <div
      className={cn(
        "absolute bottom-0 flex w-full flex-row items-center p-8 opacity-100 transition-all duration-300",
      )}
    >
      <div 
        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white/60 transition-all group-hover:gap-4 font-sans"
      >
        {cta}
        <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
    
    {/* Subtle gloss effect */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[0.02]" />
  </a>
);

export { BentoCard, BentoGrid };
