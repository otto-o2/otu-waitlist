"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import FeaturePageLayout from "../components/FeaturePageLayout";
import WardScanner from "../components/WardScanner";
import WildViewfinder from "../components/WildViewfinder";
import Mixtape from "../components/Mixtape";
import MarketplaceVisual from "../components/MarketplaceVisual";
import GenesisEngine from "../components/GenesisEngine";
import CompendiumVisual from "../components/CompendiumVisual";

import { ShieldAlert, Map, Music, ShoppingBag, Dna, Library } from "lucide-react";

export default function FeaturesPage() {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    // Check if there is a hash in the URL and scroll to it
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <main className="bg-[#0A0F0A] min-h-screen relative font-sans text-[#F1E8C7]">
      <div className="absolute top-8 left-8 z-[100] hidden md:block">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm md:text-base uppercase tracking-widest font-black group w-fit text-[#F1E8C7] backdrop-blur-md"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>
      </div>
      <div className="absolute top-6 left-6 z-[100] md:hidden">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xs uppercase tracking-widest font-black group w-fit text-[#F1E8C7] backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </div>
      <FeaturePageLayout
        id="ward-mode"
        hideNav={true}
        title="Ward Mode"
        subtitle="Health Hub"
        description="Ward Mode is your home plant doctor. Scan any plant in your home and otu reads its condition. Overwatered, root-bound, pest-ridden, or just in the wrong light. It gives you a clear action plan. No guessing. No Googling. Just what's wrong and what to do."
        icon={ShieldAlert}
        color="#0A1A14"
        backdropColor="#34D399"
        visual={<WardScanner />}
        highlights={[
          "The Diagnostics — Our neural engine identifies pathogens, nutrient gaps, and atmospheric red flags to bridge prevention and cure.",
          "Call to Action — Receive comprehensive doctor reports and care cards for daily guidance. When your plant loses its balance, The Ward opens you up to the Farmer’s Market, a unique marketplace of tailor-made care packages and organic elixirsspecifically prescribed by the Ward.",
          "The Air and the Hour — Receive hour-by-hour care updates that adapt in real-time. By syncing your recovery plan with the local weather and the light in your home, the Ward ensures your collection stays in its flow state, always."
        ]}
      />

      <FeaturePageLayout
        id="wild-mode"
        hideNav={true}
        title="Wild Mode"
        subtitle="Adventure is out there!"
        description="Wild Mode turns your walk into a field study. Point your camera at any plant, flower, tree, or weed and otu identifies it on the spot. Species, family, toxicity, ecological role, and where it thrives. Built for curiosity, useful for foragers, hikers, parents, and anyone who's ever wondered what that thing growing on the wall actually is."
        icon={Map}
        color="#061A0C"
        backdropColor="#4ADE80"
        visual={<WildViewfinder />}
        highlights={[
          "Identify that “thing” on your hike — Our neural engine draws from a massive local database of over four thousand species, providing high-fidelity data even when you are off the grid.",
          "Go beyond the name — Access a deep library of botanical facts, rarity rankings, and the unique history of every plant you encounter.",
          "The Log — Record your finds and map your journey in real-time to build a living timeline of every signature encountered in the field."
        ]}
      />

      <FeaturePageLayout
        id="botanical-sonification"
        hideNav={true}
        title="The Chime"
        subtitle="Living Data Compositions"
        description="The Chime is otu's most unexpected feature, and the most intimate. Instead of yet another notification telling you to water your plant, The Chime converts your plant's live environment into sound. A thriving plant sounds different from a struggling one. It's a new sensory layer on plant care, for the people who want to feel connected to their plants, not just manage them."
        icon={Music}
        color="#13141C"
        visual={<Mixtape />}
        highlights={[
          "Gene Signatures — We translate the unique genome of your plant into a one-of-a-kind musical signature.",
          "Vital Signs — We render biological data and the pulse of your home into an audible stream.",
          "Playlist Gardens — You can now curate a private living library of sound."
        ]}
      />

      <FeaturePageLayout
        id="marketplace"
        hideNav={true}
        title="The Farmer’s Market"
        subtitle="Plants and Plant Stuff"
        description="The Farmer's Market is where otu's recommendations become real. When Ward Mode diagnoses your plant and prescribes a fix, The Market already has what you need. The right soil, the right fertiliser, the right tool, sourced from verified local nurseries and suppliers and delivered to your door. It lets you buy plants, plant stuff, and plant people. Your bucket list is tailor-made by otu, built around your personality, your patterns, and your prescriptions."
        icon={ShoppingBag}
        color="#1A1A1A"
        visual={<MarketplaceVisual />}
        highlights={[
          "A curated inventory of plants ranked by their ability to thrive in your current microclimate.",
          "Data to the Dirt – Utilizing the doctor’s reports from the Ward mode and your Wild Mode logs, the Farmer’s market suggests care packages and tool kits that match your patch.",
          "The Humans behind the Data — Connect with master gardeners for 1-on-1 consultations"
        ]}
      />

      <FeaturePageLayout
        id="genesis-engine"
        hideNav={true}
        title="The Greenhouse"
        subtitle="The Alive Archive"
        description="The Greenhouse is your plant memory. Every plant you scan with otu gets its own living profile. Species details, when you got it, how it's changed, what went wrong, what worked. Photo timelines show you the story of each plant over months and years. It's not a reminder list. It's a record of something alive, that you kept alive."
        icon={Dna}
        color="#1A0B2E"
        backdropColor="#E879F9"
        visual={<GenesisEngine />}
        highlights={[
          "Beyond the Scan — Our engine analyzes the biological makeup of your plant to create unique digital life forms.",
          "The Genetic Vault — Store \"Digital Twins\" of your plants in your pocket universe, carrying historical health records and growth curves. The more you care for the physical plant, the more its digital counterpart evolves within the Greenhouse.",
          "To the future — Use the Greenhouse to simulate years of growth in seconds. By going forward in time you can simulate how a heatwave in July or a low-light winter will impact your plant’s health signature, giving you the data to intervene before the clock even starts."
        ]}
      />

      <FeaturePageLayout
        id="compendium"
        hideNav={true}
        title="Sprout and About"
        subtitle="The Plant Encyclopedia"
        description="otu's reference library, written for real people. Search any plant by name, photo, or symptom and get the full picture. How to grow it, where it thrives, how to mess it up, and why it's worth having around in the first place. For the ones who already know what they are doing, and for the ones who just love to nerd out."
        icon={Library}
        color="#060B06"
        backdropColor="#D4AF37"
        visual={<CompendiumVisual />}
        highlights={[
          "A detailed repository for the nerds covering four thousand species",
          "The neural foundation of the otu ecosystem as an on-device intelligence framework designed to deliver scans, diagnostics, and recovery strategies.",
          "An encyclopedia to learn and understand biological blueprints, toxicity guides, histories, and clinical data"
        ]}
      />
    </main>
  );
}
