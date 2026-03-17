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
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-[2.5rem]",
      "bg-[#F1E8C7] border border-[#9CA764]/20", // Milky Honey background, Matcha border
      "transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]",
      className,
    )}
  >
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      {background}
    </div>
    
    <div className="z-10 flex flex-col gap-4 p-8 md:p-10 transition-all duration-300">
      <div className="bg-[#9CA764]/10 p-3 rounded-2xl w-fit">
        <Icon className="h-6 w-6 md:h-8 md:w-8 text-[#9CA764]" /> 
      </div>
      <div>
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-[#1B261B] tracking-tight mb-1">
          {name.split(":")[0]}
        </h3>
        {name.includes(":") && (
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#9CA764] mb-3">
            {name.split(":")[1].trim()}
          </p>
        )}
        <p className="max-w-md text-[#1B261B]/60 font-light leading-relaxed text-base md:text-lg">
          {description}
        </p>
      </div>
    </div>

    <div
      className={cn(
        "absolute bottom-0 flex w-full flex-row items-center p-8 opacity-100 transition-all duration-300",
      )}
    >
      <a 
        href={href}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#9CA764] hover:text-[#1B261B] transition-colors"
      >
        {cta}
        <ArrowRightIcon className="h-5 w-5" />
      </a>
    </div>
    
    {/* Subtle gloss effect */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[0.05]" />
  </div>
);

export { BentoCard, BentoGrid };
