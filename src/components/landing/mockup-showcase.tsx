// components/landing/mockup-showcase.tsx
import React from 'react'
import Image from 'next/image'
import { Scan, Brain, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className = "" 
}: { 
  icon: any
  title: string
  description: string
  className?: string 
}) => (
  <div className={cn(
    "absolute hidden rounded-xl bg-white/60 backdrop-blur-sm p-4 shadow-lg transition-all duration-300 hover:scale-105 lg:block",
    className
  )}>
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#4AB8A1] to-[#4AB8A1]/80">
        {Icon && <Icon className="h-6 w-6 text-white" />}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
)

const mockupData = [
  {
    image: '/mockups/scanner.png',
    alt: 'AI Food Scanner',
    feature: {
      icon: Scan,
      title: 'AI Food Scanner',
      description: 'Scan makananmu untuk tracking kalori instan'
    }
  },
  {
    image: '/mockups/insights.png',
    alt: 'Progress Berat Badan',
    feature: {
      icon: Brain,
      title: 'Progress Berat Badan',
      description: 'Visualisasi progress berat badan sesuai goalmu'
    }
  },
  {
    image: '/mockups/pet.png',
    alt: 'Pet Companion',
    feature: {
      icon: Heart,
      title: 'Pet Companion',
      description: 'Teman virtual untuk jaga konsistensi'
    }
  }
]

const MobileShowcase = () => (
  <Carousel className="w-full max-w-[300px] mx-auto">
    <CarouselContent>
      {mockupData.map((item, index) => (
        <CarouselItem key={index}>
          <div className="p-1">
            <div className="relative aspect-[9/19]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-semibold text-gray-900">{item.feature.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.feature.description}</p>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)

const DesktopShowcase = () => (
  <div className="relative h-[600px]">
    <div className="absolute left-1/2 top-1/2 w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2">
      {/* Background mockups */}
      <div className="absolute -left-64 top-4 scale-95 blur-[1px] transition-all duration-500 hover:scale-100 hover:blur-0">
        <Image
          src="/mockups/insights.png"
          alt="Progress Berat Badan"
          width={300}
          height={650}
          className="object-contain"
        />
      </div>
      <div className="absolute -right-64 top-4 scale-95 blur-[1px] transition-all duration-500 hover:scale-100 hover:blur-0">
        <Image
          src="/mockups/pet.png"
          alt="Pet Companion"
          width={300}
          height={650}
          className="object-contain"
        />
      </div>

      {/* Main mockup */}
      <div className="relative transition-all duration-500 hover:scale-105">
        <Image
          src="/mockups/scanner.png"
          alt="AI Food Scanner"
          width={300}
          height={650}
          className="object-contain"
          priority
        />
      </div>

      {/* Feature cards */}
      <FeatureCard
        icon={Scan}
        title="AI Food Scanner"
        description="Scan makananmu untuk tracking kalori instan"
        className="-right-24 top-1/2"
      />
      
      <FeatureCard
        icon={Brain}
        title="Progress Berat Badan"
        description="Visualisasi progress berat badan sesuai goalmu"
        className="-left-32 top-40"
      />
      <FeatureCard
        icon={Heart}
        title="Pet Companion"
        description="Teman virtual untuk jaga konsistensi"
        className="-right-32 bottom-20"
      />
      
    </div>
  </div>
)

const MockupShowcase = () => {
  return (
    <>
      <div className="lg:hidden">
        <MobileShowcase />
      </div>
      <div className="hidden lg:block">
        <DesktopShowcase />
      </div>
    </>
  )
}

export default MockupShowcase