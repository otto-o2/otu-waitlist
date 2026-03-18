"use client";

import FeaturePageLayout from "../components/FeaturePageLayout";
import WardScanner from "../components/WardScanner";
import { ShieldAlert } from "lucide-react";

export default function WardPage() {
  return (
    <FeaturePageLayout
      title="Ward Mode"
      subtitle="Health Hub"
      description="Stop the guessing game. The Ward is full-spectrum plant clinic that lives in your pocket, translating silent distress into actionable data, providing a clinical-grade roadmap from diagnosis to full recovery."
      icon={ShieldAlert}
      color="#0A1A14"
      visual={<WardScanner />}
      highlights={[
        "The Diagnostics — Our neural engine identifies pathogens, nutrient gaps, and atmospheric red flags to bridge prevention and cure.",
        "Call to Action — Receive comprehensive doctor reports and care cards for daily guidance. When your plant loses its balance, The Ward opens you up to the Farmer’s Market, a unique marketplace of tailor-made care packages and organic elixirsspecifically prescribed by the Ward.",
        "The Air and the Hour — Receive hour-by-hour care updates that adapt in real-time. By syncing your recovery plan with the local weather and the light in your home, the Ward ensures your collection stays in its flow state, always."
      ]}
    />
  );
}
