"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmissionPreview } from "./SubmissionPreview";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c9fca685-5f69-46e5-8cd7-484ed7633655",
          from_name: name,
          email: email,
          message: message,
          subject: "New message from meetotu.com"
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email us directly at otu.intelligence@gmail.com.");
    }
  };

  if (status === "success") {
    return <SubmissionPreview type="contact" data={{ name, email, message }} />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 items-center">
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
            placeholder="what's wrong?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === "loading"}
            required
            rows={4}
            className="w-full bg-[#1B261B] border border-white/5 rounded-3xl text-[#F1E8C7] placeholder:text-[#F1E8C7]/40 px-8 py-5 font-sans text-base md:text-lg outline-none focus:border-[#9CA764]/50 focus:bg-[#0A0F0A] transition-colors lowercase tracking-wide disabled:opacity-50 resize-none relative z-10"
          />
          
          <button
            type="submit"
            disabled={status === "loading" || !email || !name || !message}
            className="mt-4 w-full bg-[#F1E8C7] hover:bg-white text-[#0A0F0A] rounded-3xl px-8 py-5 font-black text-xl md:text-2xl transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-not-allowed lowercase relative z-10"
          >
            {status === "loading" ? "sending..." : "send message"}
            {!status && <ArrowRight className="w-6 h-6 ml-1 group-hover/btn:translate-x-1 transition-transform" /> }
          </button>
        </div>
        {errorMessage && (
          <p className="text-center text-red-500/80 text-sm tracking-widest lowercase mt-2">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
