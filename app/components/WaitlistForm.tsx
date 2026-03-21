"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to join waitlist");
      }

      setStatus("success");
      setEmail("");
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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 items-center">
      {/* Credits Incentive */}
      <p className="text-center text-[#F1E8C7]/80 text-base md:text-xl max-w-2xl font-sans leading-relaxed tracking-wide">
        show up early. we'll remember you. <span className="text-[#9CA764] font-bold">no catch. just good plant karma.</span>
      </p>

      {/* The Form */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9CA764]/20 to-[#9CA764]/5 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative flex items-center p-2 rounded-full bg-[#050A05] border border-white/10 ring-1 ring-white/5 shadow-2xl overflow-hidden">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="w-full bg-transparent border-none text-[#F1E8C7] placeholder:text-[#F1E8C7]/30 px-8 py-5 font-sans text-base md:text-lg outline-none tracking-widest lowercase disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="flex-shrink-0 bg-[#F1E8C7] hover:bg-white text-[#0A0F0A] rounded-full px-8 py-5 font-black text-base md:text-lg transition-all flex items-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed lowercase"
          >
            {status === "loading" ? "submitting..." : "join"}
            {!status && <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" /> }
          </button>
        </div>
        {errorMessage && (
          <p className="absolute -bottom-8 left-0 w-full text-center text-red-500/80 text-xs tracking-widest lowercase">
            {errorMessage}
          </p>
        )}
      </form>

      {/* Urgency Hook */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="px-4 py-2 rounded-full border border-[#9CA764]/30 bg-[#9CA764]/10 text-xs md:text-sm tracking-[0.2em] text-[#9CA764] uppercase font-bold inline-block text-center shadow-sm">
          good things take time. so do good apps. we are worth the wait
        </div>
        <p className="text-center text-[#F1E8C7]/50 text-xs md:text-sm font-sans tracking-wide max-w-lg mb-2">
          <span className="text-[#F1E8C7]">the first 500 sign-ups get a head start</span> — app-credits, early access, bragging rights. the list goes on.
        </p>
      </div>
    </div>
  );
}
