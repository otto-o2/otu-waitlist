"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("");
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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, intent }),
      });

      if (!res.ok) {
        throw new Error("Failed to join waitlist");
      }

      setStatus("success");
      setEmail("");
      setName("");
      setIntent("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-[#9CA764]/20 bg-[#9CA764]/5 backdrop-blur-sm text-center max-w-md mx-auto w-full group transition-all duration-500 hover:border-[#9CA764]/40 hover:bg-[#9CA764]/10">
        <div className="w-12 h-12 rounded-full border border-[#9CA764]/30 bg-[#9CA764]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <CheckCircle2 className="w-6 h-6 text-[#9CA764]" />
        </div>
        <h3 className="text-xl md:text-2xl font-sans font-bold text-[#F1E8C7] mb-2 font-black tracking-widest lowercase">
          you're in.
        </h3>
        <p className="text-[#9CA764] text-sm md:text-base tracking-[0.2em] font-sans">
          we'll find you when it's time.<br/>until then, water something.
        </p>
      </div>
    );
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
            placeholder="what's your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            required
            className="w-full bg-[#1B261B] border border-white/5 rounded-3xl text-[#F1E8C7] placeholder:text-[#F1E8C7]/30 px-8 py-5 font-sans text-lg md:text-xl outline-none focus:border-[#9CA764]/50 focus:bg-[#0A0F0A] transition-colors lowercase tracking-wide disabled:opacity-50 relative z-10"
          />
          <input
            type="email"
            placeholder="your best email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className="w-full bg-[#1B261B] border border-white/5 rounded-3xl text-[#F1E8C7] placeholder:text-[#F1E8C7]/30 px-8 py-5 font-sans text-lg md:text-xl outline-none focus:border-[#9CA764]/50 focus:bg-[#0A0F0A] transition-colors lowercase tracking-wide disabled:opacity-50 relative z-10"
          />
          <textarea
            placeholder="what are your big plant plans? (e.g. stop killing my bonsai, build a jungle...)"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            disabled={status === "loading"}
            required
            rows={3}
            className="w-full bg-[#1B261B] border border-white/5 rounded-3xl text-[#F1E8C7] placeholder:text-[#F1E8C7]/40 px-8 py-5 font-sans text-base md:text-lg outline-none focus:border-[#9CA764]/50 focus:bg-[#0A0F0A] transition-colors lowercase tracking-wide disabled:opacity-50 resize-none relative z-10"
          />
          
          <button
            type="submit"
            disabled={status === "loading" || !email || !name || !intent}
            className="mt-4 w-full bg-[#F1E8C7] hover:bg-white text-[#0A0F0A] rounded-3xl px-8 py-5 font-black text-xl md:text-2xl transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-not-allowed lowercase relative z-10"
          >
            {status === "loading" ? "submitting..." : "join the waitlist"}
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
      <div className="mt-16 flex flex-col items-center gap-8 w-full">
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
