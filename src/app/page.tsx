import type { Metadata } from "next";
import Hero from "@/components/sections/home/Hero";

export const metadata: Metadata = {
  title: "Sapira — Operational intelligence for European enterprises",
  description:
    "Pharo captures how your business actually operates and turns it into infrastructure. For European companies that have outgrown what any software was built to handle.",
};

export default function Home() {
  return <Hero />;
}
