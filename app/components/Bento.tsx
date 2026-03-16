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
}: {
  name: string;
  className: string;
  background?: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl",
      "bg-[#0D140D] border border-white/5",
      "transform-gpu transition-all duration-300 hover:border-white/20",
      "box-shadow-[0_-20px_80px_-20px_#ffffff0a_inset]",
      className,
    )}
  >
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
      {background}
    </div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-8 transition-all duration-300 group-hover:-translate-y-12">
      <Icon className="h-10 w-10 origin-left transform-gpu text-white/50 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-white/90" />
      <h3 className="text-2xl font-light text-white/90 font-serif tracking-tight">
        {name}
      </h3>
      <p className="max-w-lg text-white/40 font-light leading-relaxed">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <a 
        href={href}
        className="pointer-events-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
      >
        {cta}
        <ArrowRightIcon className="h-4 w-4" />
      </a>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[.02]" />
  </div>
);

export { BentoCard, BentoGrid };
