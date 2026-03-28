"use client";

import { BushGreenLogo, SoulfulSubmitted } from "./OtuIcons";

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
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center max-w-2xl mx-auto w-full group animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="w-56 h-28 flex items-center justify-center mb-6 relative z-10">
        <SoulfulSubmitted className="w-full h-full text-[#F1E8C7]" />
      </div>
      
      <h3 className="text-2xl md:text-3xl font-sans font-bold text-[#F1E8C7] mb-2 font-black tracking-widest lowercase relative z-10">
        {type === "waitlist" ? "you're in." : "loud and clear."}
      </h3>
      <div className="text-[#F1E8C7]/60 text-sm md:text-base tracking-[0.2em] font-sans mb-4 relative z-10 leading-loose">
        {type === "waitlist" 
          ? <div dangerouslySetInnerHTML={{ __html: "we'll find you when it's time.<br/>until then, water something." }} />
          : <div dangerouslySetInnerHTML={{ __html: "we're on it.<br/>talk soon." }} />
        }
      </div>
    </div>
  );
}
