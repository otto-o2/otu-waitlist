"use client";

import FeaturePageLayout from "../components/FeaturePageLayout";
import MarketplaceVisual from "../components/MarketplaceVisual";
import { ShoppingBag } from "lucide-react";

export default function MarketPage() {
  return (
    <FeaturePageLayout
      title="The Farmer’s Market"
      subtitle="Plants and Plant Stuff"
      description="Bridging the gap between digital diagnosis and physical recovery."
      icon={ShoppingBag}
      color="#1A1A1A"
      visual={<MarketplaceVisual />}
      highlights={[
        "A curated inventory of plants ranked by their ability to thrive in your current microclimate.",
        "Data to the Dirt – Utilizing the doctor’s reports from the Ward mode and your Wild Mode logs, the Farmer’s market suggests care packages and tool kits that match your patch.",
        "The Humans behind the Data — Connect with master gardeners for 1-on-1 consultations"
      ]}
    />
  );
}
