import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-[#F1E8C7] text-[#0A0F0A] selection:bg-[#9CA764]/30 selection:text-[#0A0F0A] flex flex-col pt-4 md:pt-8 lg:pt-12 px-2 md:px-8 lg:px-12">
      {/* Math Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.08] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #0A0F0A 1px, transparent 1px),
            linear-gradient(to bottom, #0A0F0A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto bg-[#FAF8ED] border border-black/5 rounded-t-[40px] md:rounded-t-[60px] shadow-[0_0_60px_rgba(0,0,0,0.05)] flex-1 flex flex-col overflow-hidden">
        
        {/* Navigation Pill */}
        <nav className="p-8 md:p-12 lg:p-16 pb-0">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-black/10 hover:bg-black/5 transition-colors text-[10px] uppercase tracking-widest font-bold group w-fit"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </nav>

        <div className="p-8 md:p-12 lg:p-16 pt-8 md:pt-12">
          
          <div className="flex flex-col gap-6 mb-16 border-b border-black/10 pb-12">
            <h2 className="font-mono tracking-[0.3em] uppercase text-[#9CA764] text-xs md:text-sm mix-blend-multiply drop-shadow-sm">OTU</h2>
            <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight lowercase text-[#0A0F0A]">
              Our Privacy Policy
            </h1>
          </div>

          <div className="prose prose-stone max-w-none text-[#0A0F0A]/80 font-sans text-lg md:text-xl leading-relaxed space-y-8">
            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-4 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">I.</span> 
              <span>hey. before you go any further.</span>
            </h3>
            <p>
              We keep things simple around here, and that includes how we handle your data. This policy tells you exactly what we collect, why we have it, and what we do with it. No hidden clauses. No funny business. Just plants and good intentions.
            </p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">II.</span> 
              <span>who we are</span>
            </h3>
            <p>
              Otu is a plant intelligence app that helps you identify, care for, and actually keep your plants alive. Whether you are scanning a mystery leaf on a walk or building a full care routine for your collection at home, Otu is the one app that speaks plant.
            </p>
            <p>
              We are currently in our early stages, building something we think plant lovers will genuinely love. Right now, you are here because you signed up for our waitlist, and we appreciate that more than you know.
            </p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">III.</span> 
              <span>what we collect</span>
            </h3>
            <p>Right now, just three things:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>Your name, so we know who showed up early.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>Your email address, so we can find you on launch day.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>Your response to our "Why do you want a plant app?" question, so we can build something that actually works for you.</span>
              </li>
            </ul>
            <p>That’s it. Nothing sneaky. No location tracking, no device fingerprinting, no cookies chasing you around the internet. Not yet, and not ever without telling you first.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">IV.</span> 
              <span>why we collect it</span>
            </h3>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌱</span>
                <span>To add you to the Otu waitlist.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌱</span>
                <span>To send you your launch day credits when the app goes live.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌱</span>
                <span>To understand what our users actually need. This is used for product research only.</span>
              </li>
            </ul>
            <p>We collect this data based on your explicit consent, meaning you gave it to us willingly by filling in the form and checking the consent box. You can take it back at any time.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">V.</span> 
              <span>who sees your data</span>
            </h3>
            <p>Your data is only accessible to:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>Us. The Otu team. That’s a very small circle.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>Loops.so, our email platform and data processor. They handle waitlist emails on our behalf.</span>
              </li>
            </ul>
            <p>We do not share your data with partners, vendors, investors, or anyone else in a way that identifies you personally. If we ever need to share aggregated, anonymised insights (like "70% of our waitlist wants a watering reminder"), no one will ever know it was you.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">VI.</span> 
              <span>what we don’t do with it</span>
            </h3>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✗</span>
                <span>We do not sell your data. Ever. Not even for a really nice succulent.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✗</span>
                <span>We do not share it with third parties for marketing purposes.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✗</span>
                <span>We do not use your "Why" responses for anything beyond product research without telling you.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✗</span>
                <span>We do not add you to any marketing lists beyond waitlist updates without separate consent.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✗</span>
                <span>We do not send you spam. One launch email is not spam, we promise.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✗</span>
                <span>We do not store more than we need.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">VII.</span> 
              <span>how we store it</span>
            </h3>
            <p>Your data is stored securely via Loops.so with industry standard protections. Our waitlist form is served over HTTPS (thank you, Vercel), so your information is encrypted in transit.</p>
            <p>We take reasonable technical and organisational measures to keep your data safe and out of the wrong hands.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">VIII.</span> 
              <span>how long we keep it</span>
            </h3>
            <p>We will hold onto your data until:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>The app launches and your early bird credits have been delivered, or</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You unsubscribe or ask us to delete it, whichever comes first.</span>
              </li>
            </ul>
            <p>After that, we will only keep what you have given us explicit permission to keep. Anything else gets deleted.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">IX.</span> 
              <span>your rights</span>
            </h3>
            <p>You are in control. At any time, you can:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✓</span>
                <span>Access the data we hold on you.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✓</span>
                <span>Correct anything that is wrong.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✓</span>
                <span>Request deletion of your information entirely. Just ask and it is gone.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✓</span>
                <span>Withdraw your consent. No hard feelings, no questions asked.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✓</span>
                <span>Request restriction of processing.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] font-bold mt-1 mix-blend-multiply">✓</span>
                <span>Object to processing of your data.</span>
              </li>
            </ul>
            <p>To exercise any of these, just reach out to us and we will sort it within 30 days. If it involves removing you from Loops.so, we will handle that too.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">X.</span> 
              <span>a note on age</span>
            </h3>
            <p>Otu is not intended for anyone under the age of 13. If you are under 13, go water a plant instead of signing up. We do not knowingly collect personal data from children.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XI.</span> 
              <span>consent on the form</span>
            </h3>
            <p>Our waitlist form includes an unchecked consent checkbox. By checking it, you confirm that:</p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You have read and understood this privacy policy.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You consent to your data being collected and processed as described above.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#9CA764] mt-1">🌿</span>
                <span>You acknowledge that your data may be transferred to servers outside your region via Loops.so.</span>
              </li>
            </ul>
            <p>We will never pre check that box for you. Consent has to be yours.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XII.</span> 
              <span>changes to this policy</span>
            </h3>
            <p>If anything changes about how we handle your data, we will update this page and let you know. We will not just quietly swap things out and hope you do not notice. That is not very Otu of us.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XIII.</span> 
              <span>the legal bit we have to say</span>
            </h3>
            <p>This policy is compliant with applicable data protection laws. By submitting the waitlist form and checking the consent box, you confirm that you have read and understood this policy and consent to your data being processed as described above.</p>

            <h3 className="text-2xl font-bold text-[#0A0F0A] tracking-wide lowercase pt-8 flex gap-4">
              <span className="font-mono text-[#9CA764] tracking-widest">XIV.</span> 
              <span>talk to us</span>
            </h3>
            <p>We're real people who talk to their plants (and now build apps for them). Happy you're here.</p>
            <p>For anything data related, whether that is questions, access requests, deletion requests, or just to say hi, you can reach us through our website at meetotu.com.</p>

            <div className="pt-16 pb-16 mt-16 border-t border-black/10 flex flex-col gap-2">
              <span className="font-mono text-xs tracking-widest text-[#9CA764] mix-blend-multiply">Last updated: March 2026</span>
              <span className="font-mono text-xs tracking-widest text-[#0A0F0A]/50">© Otu. All rights reserved.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
