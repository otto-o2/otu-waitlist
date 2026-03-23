"use client";

import FeaturePageLayout from "../components/FeaturePageLayout";
import WildViewfinder from "../components/WildViewfinder";
import { Map } from "lucide-react";

export default function WildPage() {
  return (
    <FeaturePageLayout
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
  );
}
