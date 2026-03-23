"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { BushGreenLogo } from "./OtuIcons";

interface SubmissionPreviewProps {
  type: "waitlist" | "contact";
  data: {
    name: string;
    email: string;
    intent?: string;
    message?: string;
  };
}

export function SubmissionPreview({ type, data }: SubmissionPreviewProps) {
  const [phase, setPhase] = useState<"splash" | "details">("splash");

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("details");
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  if (phase === "splash") {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-[40px] border border-[#9CA764]/20 bg-[#111A11] backdrop-blur-sm text-center max-w-2xl mx-auto w-full group relative overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9CA764]/5 to-transparent pointer-events-none" />
        <div className="animate-in zoom-in duration-700 fade-in flex flex-col items-center gap-6 relative z-10">
            <div className="w-32 h-32 bg-[#F1E8C7] rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(0,0,0,0.06),_0_4px_8px_rgba(0,0,0,0.04)]">
              <BushGreenLogo width={80} />
            </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl md:text-2xl font-sans font-bold text-[#1a1f1c] tracking-wider lowercase">
              <span className="text-[#F1E8C7]">otu plant intelligence</span>
            </h1>
            <div className="w-[120px] h-[3px] bg-[#9CA764]/20 rounded-full overflow-hidden relative mt-2">
              <div className="absolute top-0 bottom-0 bg-[#88CC48] rounded-full w-full animate-loader" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 rounded-[40px] border border-[#9CA764]/20 bg-[#111A11] backdrop-blur-sm text-center max-w-2xl mx-auto w-full group animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9CA764]/5 to-transparent pointer-events-none" />
      <div className="w-16 h-16 rounded-full border border-[#9CA764]/30 bg-[#9CA764]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10">
        <CheckCircle2 className="w-8 h-8 text-[#9CA764]" />
      </div>
      
      <h3 className="text-2xl md:text-3xl font-sans font-bold text-[#F1E8C7] mb-2 font-black tracking-widest lowercase relative z-10">
        {type === "waitlist" ? "you're in." : "we received it."}
      </h3>
      <p className="text-[#9CA764] text-sm md:text-base tracking-[0.2em] font-sans mb-8 relative z-10">
        {type === "waitlist" 
          ? <span dangerouslySetInnerHTML={{ __html: "we'll find you when it's time.<br/>until then, water something." }} />
          : <span dangerouslySetInnerHTML={{ __html: "thank you for reaching out.<br/>we'll get back to you soon." }} />
        }
      </p>

      {/* Preview Card */}
      {type !== "waitlist" && (
        <div className="w-full bg-[#1B261B] border border-white/5 rounded-3xl p-6 text-left relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
             <span className="w-2 h-2 rounded-full bg-[#88CC48]/50" />
             <span className="font-mono text-[10px] tracking-widest text-[#9CA764] uppercase opacity-80">
               transmission preview
             </span>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">name</span>
              <span className="font-sans text-sm md:text-base text-[#F1E8C7] lowercase tracking-wide">{data.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">email</span>
              <span className="font-sans text-sm md:text-base text-[#F1E8C7] lowercase tracking-wide truncate">{data.email}</span>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                {type === "waitlist" ? "master plan" : "message"}
              </span>
              <span className="font-sans text-sm md:text-base text-[#F1E8C7] lowercase tracking-wide leading-relaxed">
                {type === "waitlist" ? data.intent : data.message}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
