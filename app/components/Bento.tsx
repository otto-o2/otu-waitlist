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
  color,
  ...props
}: {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  color?: string;
  [key: string]: any;
}) => {
  const isLight = color === "#9CA764"; // Matcha specifically is medium-light
  const textColor = isLight ? "#1B261B" : "#F1E8C7";
  const subTextColor = isLight ? "rgba(27, 38, 27, 0.6)" : "rgba(253, 251, 247, 0.6)";

  return (
    <a
      key={name}
      href={href}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-[2.5rem]",
        "transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] hover:translate-y-[-8px]",
        "border border-white/5",
        className,
      )}
      style={{ 
        backgroundColor: color || '#2B2D3A',
        boxShadow: `0 20px 40px -15px ${color}40, inset 0 1px 1px rgba(255,255,255,0.05)`
      }}
    >
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
        {background}
      </div>

      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent z-0" />
      
      <div className="z-10 flex flex-col gap-5 p-10 md:p-12 transition-all duration-300">
        <div 
          className="p-4 rounded-2xl w-fit backdrop-blur-md border border-white/10"
          style={{ 
            background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)' 
          }}
        >
          <Icon 
            className="h-8 w-8 md:h-10 md:w-10" 
            style={{ color: textColor }} 
          /> 
        </div>
        
        <div className="space-y-4">
          {name.includes(":") && (
            <p 
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black opacity-60 mb-1"
              style={{ color: textColor }}
            >
              {name.split(":")[1].trim()}
            </p>
          )}
          <h3 className="text-3xl md:text-4xl font-sans font-bold tracking-tighter leading-tight drop-shadow-sm" style={{ color: textColor }}>
            {name.split(":")[0]}
          </h3>
          <p className="max-w-md font-medium leading-relaxed text-base md:text-lg opacity-80" style={{ color: subTextColor }}>
            {description}
          </p>

          {/* Substance / Highlights List */}
          {props.highlights && props.highlights.length > 0 && (
            <ul className="mt-8 space-y-3 relative z-10 max-w-xl">
              {props.highlights.map((highlight: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: subTextColor }}>
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9CA764]/40" />
                  <span className="opacity-70">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        className={cn(
          "z-10 flex w-full flex-row items-center p-10 md:p-12 transition-all duration-300 mt-auto",
        )}
      >
        <div 
          className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform"
          style={{ color: textColor }}
        >
          {cta}
          <ArrowRightIcon className="h-6 w-6" style={{ color: isLight ? "#1B261B" : "#9CA764" }} />
        </div>
      </div>
      
      {/* Premium Gloss Overlays */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-700 group-hover:bg-white/[0.03]" />
      <div className="pointer-events-none absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </a>
  );
};

export { BentoCard, BentoGrid };
