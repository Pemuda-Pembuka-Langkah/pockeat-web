import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import MockupShowcase from './mockup-showcase'


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F1] to-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF6B35_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />
      
      <div className="container relative mx-auto px-4">
        <div className="grid min-h-[calc(100vh-80px)] items-center gap-8 py-12 lg:gap-16 lg:py-20 lg:grid-cols-2">
          {/* Left content */}
          <div className="relative z-10 flex flex-col gap-6 lg:gap-10">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-[#4AB8A1]">Every Meal </span>{' '}
                <span> Matters </span>{' '}<br></br>
                <span className="text-[#FF6B35]">Every Move </span><span>Counts</span><br></br>
              </h1>
              <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                AI-Driven Smart Companion untuk Tracking Kalori & Kesehatan dengan Seamless
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button 
                variant="outline"
                size="lg" 
                className="h-12 rounded-full border-2 border-[#4AB8A1] px-6 sm:px-8 text-base text-[#4AB8A1] transition-all hover:bg-[#4AB8A1] hover:text-white"
              >
                Tonton Demo
              </Button>
              <Button 
                size="lg"
                className="group h-12 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8355] px-6 sm:px-8 text-base shadow-lg transition-all hover:shadow-xl"
              >
                Coba Prototype
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Stats section bisa ditambahkan di sini jika diperlukan */}
          </div>

          {/* Right content - Mockups */}
          <MockupShowcase />
        </div>
      </div>
    </section>
  )
}

export default HeroSection