"use client"
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Scan, 
  Brain, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  Rocket,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react'

const mainFeatures = [
  {
    icon: Scan,
    title: 'Pengenalan Makanan dengan AI',
    description: 'Teknologi AI canggih yang dapat mendeteksi jenis makanan, porsi, dan kalori secara instan hanya dengan foto',
    color: 'text-[#4AB8A1]',
    gradient: 'from-[#4AB8A1]',
    benefits: [
      'Deteksi makanan otomatis',
      'Perhitungan kalori instan',
      'Scan label nutrisi',
      'Custom resep tracking'
    ]
  },
  {
    icon: Brain,
    title: 'Personalisasi Cerdas',
    description: 'Rekomendasi personal yang disesuaikan dengan preferensi, target, dan pola makanmu',
    color: 'text-[#FF6B35]',
    gradient: 'from-[#FF6B35]',
    benefits: [
      'Menu sesuai goal',
      'Rencana olahraga personal',
      'Adaptif dengan progress',
      'Diet preference setting'
    ]
  }
]

const supportingFeatures = [
  {
    icon: Target,
    title: 'Pelacakan Progress',
    description: 'Pantau perkembangan dengan insight dan analisis yang komprehensif',
    integrations: ['Google Fit', 'Apple Health']
  },
  {
    icon: Heart,
    title: 'Sistem Gamifikasi',
    description: 'Pet companion yang memotivasi konsistensi melalui sistem reward',
    integrations: ['Daily Rewards', 'Achievement Badges']
  }
]

const uniquePoints = [
  {
    icon: Rocket,
    title: 'Solusi Lengkap',
    description: 'Integrasi sempurna antara tracking makanan, olahraga, dan analisis kesehatan'
  },
  {
    icon: Zap,
    title: 'Update Real-time',
    description: 'Sync otomatis dengan fitness tracker dan pembaruan data instan'
  }
]

const BenefitList = ({ benefits }: { benefits: string[] }) => (
  <ul className="mt-6 space-y-3">
    {benefits.map((benefit, index) => (
      <li key={index} className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-[#4AB8A1]" />
        <span className="text-gray-600">{benefit}</span>
      </li>
    ))}
  </ul>
)

const WhyPockeatSection = () => {
  return (
    <section id="benefits" className="relative overflow-hidden bg-[#FAF7F1] py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#4AB8A1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03]" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Solusi{' '}
            <span className="text-[#4AB8A1]">Komprehensif</span>{' '}
            untuk{' '}
            <span className="text-[#FF6B35]">Journey Sehatmu</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Pockeat menghadirkan solusi end-to-end dengan teknologi AI terdepan untuk membantu mencapai target kesehatan dengan cara yang smart dan menyenangkan
          </p>
        </div>

        {/* Main Features */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {mainFeatures.map((feature, idx) => (
            <Card 
              key={idx}
              className="overflow-hidden border-none bg-white/80 backdrop-blur-sm"
            >
              <div className="relative h-full p-8">
                {/* Decorative gradient */}
                <div className={`absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl ${feature.gradient}/10 blur-2xl`} />
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} to-white/20`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <BenefitList benefits={feature.benefits} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Supporting Features */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {supportingFeatures.map((feature, idx) => (
            <div key={idx} className="relative rounded-2xl bg-white/50 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35]">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {feature.integrations.map((integration, i) => (
                      <span 
                        key={i}
                        className="rounded-full bg-[#4AB8A1]/10 px-3 py-1 text-xs font-medium text-[#4AB8A1]"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unique Value Proposition */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#4AB8A1]/5 to-[#FF6B35]/5 p-8 sm:p-12">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Keunggulan Pockeat</h3>
              <p className="mt-4 text-gray-600">
                Dibandingkan solusi lain, Pockeat menawarkan pengalaman yang lebih komprehensif dan personal:
              </p>
              <div className="mt-8 space-y-6">
                {uniquePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                      <point.icon className="h-5 w-5 text-[#4AB8A1]" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{point.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
              <h4 className="text-lg font-semibold">Mulai Journey Sehatmu</h4>
              <p className="mt-2 text-gray-600">
                Bergabung dengan pengguna lain yang telah merasakan manfaat tracking kalori yang lebih mudah
              </p>
              <Button 
                className="group mt-8 rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] px-8 text-white hover:opacity-90"
              >
                Download Sekarang
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyPockeatSection