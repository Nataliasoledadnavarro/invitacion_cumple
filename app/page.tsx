"use client";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ActivitySection } from "@/components/activity-section";
import { RSVPSection } from "@/components/rsvp-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <ActivitySection />
        <RSVPSection />
        <Footer />
      </main>
    </>
  );
}
