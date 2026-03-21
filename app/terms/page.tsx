import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen bg-[#0A0F0A] text-[#F1E8C7] selection:bg-[#9CA764]/30 selection:text-[#0A0F0A] flex flex-col pt-4 md:pt-8 lg:pt-12 px-2 md:px-8 lg:px-12">
      {/* Math Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.2] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #9CA764 1px, transparent 1px),
            linear-gradient(to bottom, #9CA764 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto bg-[#111A11] border border-[#9CA764]/20 rounded-t-[40px] md:rounded-t-[60px] shadow-[0_0_60px_rgba(0,0,0,0.5)] flex-1 flex flex-col overflow-hidden">
        
        {/* Navigation Pill */}
        <nav className="p-8 md:p-12 lg:p-16 pb-0">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-[10px] uppercase tracking-widest font-bold group w-fit"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </nav>

        <div className="p-8 md:p-12 lg:p-16 pt-8 md:pt-12">
          
          <div className="flex flex-col gap-6 mb-16 border-b border-[#9CA764]/20 pb-12">
            <h2 className="font-mono tracking-[0.3em] uppercase text-[#9CA764] text-xs md:text-sm drop-shadow-sm">OTU</h2>
            <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight lowercase text-[#F1E8C7]">
              Our Terms of Service
            </h1>
          </div>

          <div className="prose prose-invert max-w-none text-[#F1E8C7]/80 font-sans text-lg md:text-xl leading-relaxed space-y-8">
            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-4 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">I.</span> 
              <span>hi. read this before we get started.</span>
            </h3>
            <p>
              These are the terms that govern your use of Otu, including our website, our waitlist, and eventually, the app itself.
            </p>
            <p>
              By signing up for our waitlist or using any part of Otu, you are agreeing to these terms. If you do not agree, that is okay, but you will be missing out on a really good plant app.
            </p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">II.</span> 
              <span>what otu is</span>
            </h3>
            <p>
              Otu is a plant intelligence app designed to help you identify plants, build care routines, and generally become the plant parent your plants deserve. We use artificial intelligence to give you plant care guidance, identification results, and personalised recommendations.
            </p>
            <p>
              Right now, we are in our early stages. The waitlist is open, the app is being built, and you are here because you believe in what we are making. We appreciate that.
            </p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">III.</span> 
              <span>what otu is not</span>
            </h3>
            <p>Let us be clear about a few things:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Otu is not a substitute for professional botanical, agricultural, or horticultural advice.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Otu is not a medical resource. If a plant is toxic and someone ingests it, call a doctor, not us.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Otu is not 100% accurate 100% of the time. We are powered by AI, and AI can get things wrong. Always double check if something feels off, especially with toxicity information.</span>
              </li>
            </ul>
            <p>
              We do our best to provide reliable information, but we cannot guarantee that every identification or care recommendation will be perfect. Use your judgement. When in doubt, consult a professional.
            </p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">IV.</span> 
              <span>your account</span>
            </h3>
            <p>When the app launches, you may need to create an account to access certain features. If and when that happens:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You are responsible for keeping your login details safe.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You are responsible for everything that happens under your account.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You agree to provide accurate information when signing up.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You must be at least 13 years old to use Otu. If you are under 13, go water a plant instead.</span>
              </li>
            </ul>
            <p>If you suspect someone else is using your account, let us know immediately and we will help you sort it out.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">V.</span> 
              <span>how to use otu (and how not to)</span>
            </h3>
            <p>We built Otu for people who love plants. Please keep it that way. When using Otu, you agree not to:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Use the app for anything illegal or harmful.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Attempt to reverse engineer, decompile, or extract the source code of the app.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Scrape, copy, or redistribute our content, data, or plant information without permission.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Interfere with or disrupt the app, its servers, or its connected networks.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Impersonate another person or misrepresent your identity.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>Upload anything malicious, offensive, or that violates the rights of others.</span>
              </li>
            </ul>
            <p>Basically, do not be the reason we have to write more rules. Be kind, be curious, and be good to your plants.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">VI.</span> 
              <span>our stuff (intellectual property)</span>
            </h3>
            <p>Everything that makes Otu what it is belongs to us. That includes, but is not limited to:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>The Otu name, logo, and branding.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>The app design, interface, and user experience.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>Our plant database, care guides, and written content.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>The underlying code, algorithms, and AI models.</span>
              </li>
            </ul>
            <p>You are welcome to use Otu as intended, but you may not copy, modify, distribute, or create derivative works from any part of it without our written permission.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">VII.</span> 
              <span>your stuff (user content)</span>
            </h3>
            <p>When you submit content to Otu, like your waitlist response or, in the future, photos, notes, or plant names, you keep ownership of that content. It is still yours.</p>
            <p>However, by submitting it, you give us a non exclusive, royalty free licence to use it for the purpose of running and improving Otu. For example, if you submit a photo for plant identification, we need permission to process that image. We will not use your content for anything unrelated without asking you first.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">VIII.</span> 
              <span>the waitlist</span>
            </h3>
            <p>Signing up for the Otu waitlist does not guarantee anything specific. It means you will be among the first to know when we launch, and you may receive early bird credits or perks as a thank you.</p>
            <p>We reserve the right to change, delay, or modify the launch timeline, features, or any promotional offers associated with the waitlist. We will do our best to keep you informed, but building an app takes time and things can shift.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">IX.</span> 
              <span>the fine print (disclaimers)</span>
            </h3>
            <p>Otu is provided on an "as is" and "as available" basis. We make no warranties, express or implied, about the accuracy, reliability, or availability of the app or its content.</p>
            <p>Specifically:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>We do not guarantee uninterrupted or error free service.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>We do not guarantee the accuracy of any plant identification or care advice.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1">✗</span>
                <span>We do not guarantee that the app will meet every one of your specific needs.</span>
              </li>
            </ul>
            <p>We are building something we believe in, and we will always do our best. But perfection is not something we can promise. Plants are unpredictable. So is software.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">X.</span> 
              <span>limitation of liability</span>
            </h3>
            <p>To the fullest extent permitted by law, Otu and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the app.</p>
            <p>This includes, but is not limited to, damages resulting from incorrect plant identification, care advice that did not work out, loss of data, or service interruptions.</p>
            <p>In other words, if your cactus dies, we are sorry, but we cannot be held legally responsible. We are rooting for your plants, truly, but liability has limits.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XI.</span> 
              <span>ending things</span>
            </h3>
            <p>You can stop using Otu at any time. If you want to be removed from the waitlist or have your data deleted, just reach out to us.</p>
            <p>We also reserve the right to suspend or terminate your access if you violate these terms, misuse the platform, or do anything that could harm Otu or its users. We would rather not, but we will if we have to.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XII.</span> 
              <span>changes to these terms</span>
            </h3>
            <p>We may update these terms from time to time as the app evolves. If we make significant changes, we will let you know. We will not just quietly rewrite the rules and hope no one notices. That is not very Otu of us.</p>
            <p>Continued use of Otu after changes are posted means you accept the updated terms.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XIII.</span> 
              <span>governing law</span>
            </h3>
            <p>These terms are governed by and interpreted in accordance with applicable laws. Any disputes will be resolved through the appropriate legal channels in the jurisdiction where we operate.</p>
            <p>We hope it never comes to that. We would much rather talk it out over green tea.</p>

            <h3 className="text-2xl font-bold text-[#F1E8C7] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XIV.</span> 
              <span>talk to us</span>
            </h3>
            <p>If you have questions about these terms, need clarification on anything, or just want to say hello, you can reach us through our website at meetotu.com.</p>
            <p>We're real people who talk to their plants (and now build apps for them). Happy you're here.</p>

            <div className="pt-16 mt-16 pb-16 border-t border-[#9CA764]/20 flex flex-col gap-2">
              <span className="font-mono text-xs tracking-widest text-[#9CA764]">Last updated: March 2026</span>
              <span className="font-mono text-xs tracking-widest text-[#9CA764]">© Otu. All rights reserved.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
