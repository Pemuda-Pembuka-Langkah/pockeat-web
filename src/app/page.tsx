// app/page.tsx

import ContactSection from "@/components/landing/contact-section"
import FeatureSection from "@/components/landing/features-section"
import HeroSection from "@/components/landing/hero-section"
import HowItWorksSection from "@/components/landing/how-it-works-section"
import Footer from "@/components/landing/landing-footer"
import Navbar from "@/components/landing/landing-navbar"
import OverviewSection from "@/components/landing/overview-section"
import PrototypeSection from "@/components/landing/prototype-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F1] font-[family-name:var(--font-geist-sans)]">
      {/* Main content */}
      <Navbar/>
      <main>
        <HeroSection />
        <OverviewSection/>
        <HowItWorksSection/>
        <FeatureSection/>
        {/* <WhyPockeatSection/> */}
        <PrototypeSection/>
        <ContactSection/>
      </main>
      <Footer/>
    </div>
  )
}