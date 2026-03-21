"use client";

import FeaturePageLayout from "../components/FeaturePageLayout";
import GenesisEngine from "../components/GenesisEngine";
import { Dna } from "lucide-react";

export default function GreenhousePage() {
  return (
    <FeaturePageLayout
      title="The Greenhouse"
      subtitle="The Alive Archive"
      description="Your Little Digital Universe"
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
  );
}
