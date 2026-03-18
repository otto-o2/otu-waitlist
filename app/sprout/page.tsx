"use client";

import FeaturePageLayout from "../components/FeaturePageLayout";
import CompendiumVisual from "../components/CompendiumVisual";
import { Library } from "lucide-react";

export default function SproutPage() {
  return (
    <FeaturePageLayout
      title="Sprout and About"
      subtitle="The Plant Encyclopedia"
      description="Thousands of species and Infinite Curiosities"
      icon={Library}
      color="#0A0906"
      visual={<CompendiumVisual />}
      highlights={[
        "A detailed repository for the nerds covering four thousand species",
        "The neural foundation of the otu ecosystem as an on-device intelligence framework designed to deliver scans, diagnostics, and recovery strategies.",
        "An encyclopedia to learn and understand biological blueprints, toxicity guides, histories, and clinical data"
      ]}
    />
  );
}
