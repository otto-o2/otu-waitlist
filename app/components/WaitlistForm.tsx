"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmissionPreview } from "./SubmissionPreview";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const formBody = new URLSearchParams({
        email: email,
        firstName: name,
        plantWishes: intent,
        mailingLists: "cmn1op0s0w1190i208xb6aw3q"
      });

      const res = await fetch(
        "https://app.loops.so/api/newsletter-form/cmmpd0afm00hk0i13a2ymd3bq",
        {
          method: "POST",
          body: formBody.toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setName("");
        setIntent("");
      } else if (res.status === 429) {
        setStatus("error");
        setErrorMessage("Rate limited — please try again in a moment.");
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  if (status === "success") {
    return <SubmissionPreview type="waitlist" data={{ name, email, intent }} />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 items-center">
      {/* Credits Incentive */}
      <p className="text-center text-[#F1E8C7]/80 text-xl md:text-3xl max-w-3xl font-sans leading-relaxed tracking-wide">
        show up early. <span className="text-[#9CA764] font-bold">we'll remember you.</span>
      </p>

      {/* The Form */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto flex flex-col gap-4">

        <div className="flex flex-col gap-4 p-6 md:p-8 rounded-[40px] bg-[#111A11] border border-[#9CA764]/20 shadow-2xl relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#9CA764]/5 to-transparent pointer-events-none" />
          
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            required
            className="w-full bg-[#1B261B] border border-white/5 rounded-3xl text-[#F1E8C7] placeholder:text-[#F1E8C7]/30 px-8 py-5 font-sans text-lg md:text-xl outline-none focus:border-[#9CA764]/50 focus:bg-[#0A0F0A] transition-colors lowercase tracking-wide disabled:opacity-50 relative z-10"
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className="w-full bg-[#1B261B] border border-white/5 rounded-3xl text-[#F1E8C7] placeholder:text-[#F1E8C7]/30 px-8 py-5 font-sans text-lg md:text-xl outline-none focus:border-[#9CA764]/50 focus:bg-[#0A0F0A] transition-colors lowercase tracking-wide disabled:opacity-50 relative z-10"
          />
          <textarea
            placeholder="What's the one thing you wish a plant app actually did?"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            disabled={status === "loading"}
            required
            rows={3}
            className="w-full bg-[#1B261B] border border-white/5 rounded-3xl text-[#F1E8C7] placeholder:text-[#F1E8C7]/40 px-8 py-5 font-sans text-base md:text-lg outline-none focus:border-[#9CA764]/50 focus:bg-[#0A0F0A] transition-colors lowercase tracking-wide disabled:opacity-50 resize-none relative z-10"
          />
          
          {/* Custom Marker Tick Box */}
          <div 
            className="flex items-start gap-4 px-4 mt-2 relative z-10 group/checkbox cursor-pointer" 
            onClick={() => setAgreed(!agreed)}
          >
            <div className="w-6 h-6 shrink-0 relative flex items-center justify-center mt-0.5 transition-transform group-hover/checkbox:scale-105">
              <svg viewBox="0 0 24 24" className={cn("absolute inset-0 w-full h-full transition-colors", agreed ? "text-[#9CA764]" : "text-[#F1E8C7]/30 group-hover/checkbox:text-[#F1E8C7]/60")}>
                <path d="M3.5 4.5 C 10 3.5, 18 4, 20.5 4.5 C 21.5 10, 20.5 18, 20.5 20.5 C 14 21.5, 6 21, 3.5 20.5 C 2.5 15, 3 7, 3.5 4.5 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {agreed && (
                <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full text-[#9CA764] animate-in zoom-in duration-200" style={{ transform: "scale(1.2)" }}>
                  <path d="M5 13 C 7 14, 9 17, 10 19 C 13.5 11, 18 5, 24 0" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <p className="text-sm md:text-base font-sans text-[#F1E8C7]/60 lowercase tracking-wide select-none pt-0.5">
              i agree to the <a href="/terms" target="_blank" className="text-[#9CA764] hover:text-white transition-colors underline decoration-[#9CA764]/30 underline-offset-4" onClick={(e) => e.stopPropagation()}>terms</a> & <a href="/privacy" target="_blank" className="text-[#9CA764] hover:text-white transition-colors underline decoration-[#9CA764]/30 underline-offset-4" onClick={(e) => e.stopPropagation()}>privacy policy</a>
            </p>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || !email || !name || !intent || !agreed}
            className="mt-4 w-full bg-[#F1E8C7] hover:bg-white text-[#0A0F0A] rounded-3xl px-8 py-5 font-black text-xl md:text-2xl transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-not-allowed lowercase relative z-10"
          >
            {status === "loading" ? "submitting..." : "join the partyy"}
            {!status && <ArrowRight className="w-6 h-6 ml-1 group-hover/btn:translate-x-1 transition-transform" /> }
          </button>
        </div>
        {errorMessage && (
          <p className="text-center text-red-500/80 text-sm tracking-widest lowercase mt-2">
            {errorMessage}
          </p>
        )}
      </form>

      {/* Urgency Hook */}
      <div className="mt-8 flex flex-col items-center gap-8 w-full">
        {/* Centered Pill design for the 'first 500' line */}
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <div className="px-5 py-2.5 rounded-full border border-[#F1E8C7]/20 bg-[#F1E8C7]/5 text-xs md:text-sm tracking-[0.1em] text-[#F1E8C7] uppercase font-bold text-center">
            the first 500 sign-ups get a head start
          </div>
          <p className="text-center text-[#F1E8C7]/40 text-sm md:text-base font-sans tracking-wide">
            (app-credits, early access, bragging rights. the list goes on.)
          </p>
        </div>
      </div>
    </div>
  );
}
