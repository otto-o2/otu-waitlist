"use client";

import FeaturePageLayout from "../components/FeaturePageLayout";
import WildViewfinder from "../components/WildViewfinder";
import { Map } from "lucide-react";

export default function WildPage() {
  return (
    <FeaturePageLayout
      title="Wild Mode"
      subtitle="Adventure is out there!"
      description="Spot the rare. Name the unknown. All off the grid."
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
  );
}
