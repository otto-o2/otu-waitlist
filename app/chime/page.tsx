"use client";

import FeaturePageLayout from "../components/FeaturePageLayout";
import Mixtape from "../components/Mixtape";
import { Music } from "lucide-react";

export default function ChimePage() {
  return (
    <FeaturePageLayout
      title="The Chime"
      subtitle="Living Data Compositions"
      description="Transform bio-data into adaptive frequencies and finally understand what your plants are saying."
      icon={Music}
      color="#13141C"
      visual={<Mixtape />}
      highlights={[
        "Gene Signatures — We translate the unique genome of your plant into a one-of-a-kind musical signature.",
        "Vital Signs — We render biological data and the pulse of your home into an audible stream.",
        "Playlist Gardens — You can now curate a private living library of sound."
      ]}
    />
  );
}
