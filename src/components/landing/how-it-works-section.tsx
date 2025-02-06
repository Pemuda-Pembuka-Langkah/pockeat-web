"use client"
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Camera, 
  Brain, 
  ChartLine, 
  Heart,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

const steps = [
  {
    icon: Camera,
    title: 'Foto Makananmu',
    description: 'Cukup foto makanan atau scan label, AI akan langsung mendeteksi jenis dan kalorinya secara instan',
    benefits: [
      'Deteksi otomatis',
      'Tracking kalori instan',
      'Label scanning mudah'
    ]
  },
  {
    icon: Brain,
    title: 'Terima Rekomendasi',
    description: 'Dapatkan rekomendasi menu dan olahraga yang disesuaikan dengan target dan preferensimu',
    benefits: [
      'Menu sesuai goal',
      'Rencana olahraga personal',
      'Tips kesehatan harian'
    ]
  },
  {
    icon: ChartLine,
    title: 'Pantau Progress',
    description: 'Lihat perkembangan kesehatanmu dengan insight yang mudah dipahami dan terukur',
    benefits: [
      'Visualisasi progress',
      'Analisis pola makan',
      'Laporan mingguan'
    ]
  },
  {
    icon: Heart,
    title: 'Tetap Termotivasi',
    description: 'Pet companion yang lucu akan menemani dan memotivasimu mencapai target kesehatan',
    benefits: [
      'Daily rewards',
      'Achievement badges',
      'Weekly challenges'
    ]
  }
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative w-full bg-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#4AB8A1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03]" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Jaga Kesehatan Jadi{' '}
            <span className="bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] bg-clip-text text-transparent">
              Lebih Mudah
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            4 langkah simpel untuk memulai perjalanan sehat bersama Pockeat
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={idx} className="group relative">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="absolute right-0 top-16 hidden h-[2px] w-full lg:block">
                    <div className="absolute h-full w-full bg-[#4AB8A1]/10" />
                    <div 
                      className="h-full w-0 bg-[#4AB8A1] transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                )}
                
                {/* Step Card */}
                <Card className="h-full border-none bg-white/80 p-6 backdrop-blur-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35]/80 transition-transform group-hover:scale-110">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>

                    <ul className="mt-4 space-y-2">
                      {step.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-[#4AB8A1]" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Try Demo CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Ingin melihat langsung kemudahannya?
          </p>
          <Button 
            className="group mt-6 rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] px-8 text-white hover:opacity-90"
          >
            Coba Demo Interaktif
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection