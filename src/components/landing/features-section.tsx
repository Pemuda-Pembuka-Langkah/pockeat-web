"use client"

import React from 'react'
import Image from 'next/image'
import { Scan, Dumbbell, LineChart, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    id: 'food-tracking',
    icon: Scan,
    title: 'Track Makanan dengan AI',
    description: 'Tracking kalori jadi lebih mudah',
    color: '#4AB8A1',
    features: [
      {
        id: 'scan',
        title: 'Foto Makanan dan Hitung Kalori',
        description: 'Cukup foto atau scan label makananmu, AI langsung mendeteksi jenis, porsi, dan kalorinya',
        mockup: '/mockups/scanner.png'
      },
      {
        id: 'nutrition',
        title: 'Rincian Nutrisi Lengkap',
        description: 'Lihat rincian nutrisi dari setiap makananmu, bisa sesuaikan hasil analisis AI dan konfirmasi',
        mockup: '/mockups/food-nutrition.png'
      },
      {
        id: 'recommendation',
        title: 'Rekomendasi Menu Pintar',
        description: 'Dapatkan saran menu sesuai target (diet, otot, diabetes) dan preferensi makanmu',
        mockup: '/mockups/food-recommendation.png'
      },
      {
        id: 'recipe',
        title: 'Buat Resep Sendiri',
        description: 'Catat dan hitung nilai gizi resep buatanmu agar sesuai target kalori',
        mockup: '/mockups/food-recipe.png'
      }
    ]
  },
  {
    id: 'exercise',
    icon: Dumbbell,
    title: 'Catat Latihan dengan Mudah',
    description: 'Tracking olahraga yang simpel',
    color: '#FF6B35',
    features: [
      {
        id: 'cardio',
        title: 'Catat Lari & Kardio',
        description: 'Input jarak, durasi, dan intensitas larimu, aplikasi akan menghitung kalori terbakar',
        mockup: '/mockups/exercise-cardio.png'
      },
      {
        id: 'smart-log',
        title: 'Smart Exercise Log',
        description: 'Ceritakan saja latihanmu, AI akan menganalisis jenis latihan dan kalori terbakar otomatis',
        mockup: '/mockups/exercise-smart.png'
      },
      {
        id: 'strength',
        title: 'Log Latihan Beban',
        description: 'Pilih area tubuh dan jenis latihan beban, atau tambah gerakan custom sesuai programmu',
        mockup: '/mockups/exercise-strength.png'
      }
    ]
  },
  {
    id: 'monitoring',
    icon: LineChart,
    title: 'Monitoring Progress',
    description: 'Pantau perkembanganmu',
    color: '#4AB8A1',
    features: [
      {
        id: 'sync',
        title: 'Sync dengan Fitness Tracker',
        description: 'Hubungkan dengan fitness tracker favoritmu, data aktivitas langsung tercatat otomatis',
        mockup: '/mockups/monitor-sync.png'
      },
      {
        id: 'progress',
        title: 'Pantau Progressmu',
        description: 'Lihat perkembangan berat badan, latihan, dan nutrisi untuk mencapai targetmu',
        mockup: '/mockups/monitor-progress.png'
      },
      {
        id: 'insight',
        title: 'Analisis & Insight',
        description: 'Dapatkan analisis tentang distribusi latihan, nutrisi, serta rekomendasi penyesuaian',
        mockup: '/mockups/monitor-insight.png'
      }
    ]
  },
  {
    id: 'goals',
    icon: Target,
    title: 'Goals & Rewards',
    description: 'Capai targetmu dengan fun',
    color: '#FF6B35',
    features: [
      {
        id: 'goal',
        title: 'Set & Track Goal',
        description: 'Tetapkan target berat badan, latihan, dan nutrisi dengan timeline yang jelas',
        mockup: '/mockups/goals-set.png'
      },
      {
        id: 'journal',
        title: 'Jurnal Progress',
        description: 'Catat energi, latihan, dan nutrisi harianmu. Lihat ringkasan progress setiap hari',
        mockup: '/mockups/goals-journal.png'
      },
      {
        id: 'achievement',
        title: 'Raih Achievements',
        description: 'Raih badges dan rewards dari pencapaian targetmu, dari streak harian hingga milestone',
        mockup: '/mockups/goals-achievement.png'
      }
    ]
  }
]

const FeatureTabs = ({ 
    features, 
    activeTab, 
    onTabChange 
  }: { 
    features: any[]
    activeTab: string
    onTabChange: (id: string) => void
  }) => {
    return (
      <div className="w-full overflow-auto non-visible-scroll">
        <div className="flex min-w-max gap-3 p-1 md:justify-center">
          {features.map((feature) => {
            const Icon = feature.icon
            const isActive = activeTab === feature.id
            
            return (
              <button
                key={feature.id}
                onClick={() => onTabChange(feature.id)}
                className={cn(
                  "flex min-w-[200px] items-center gap-3 rounded-xl p-3 transition-all duration-300",
                  isActive 
                    ? "bg-[#4AB8A1] text-white" 
                    : "bg-white hover:bg-[#4AB8A1]/5"
                )}
              >
                <div 
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    isActive 
                      ? "bg-white/20" 
                      : "bg-[#4AB8A1]/10"
                  )}
                >
                  <Icon 
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : "text-[#4AB8A1]"
                    )} 
                  />
                </div>
                
                <div className="text-left">
                  <p className={cn(
                    "text-sm font-medium line-clamp-1",
                    isActive ? "text-white" : "text-gray-900"
                  )}>
                    {feature.title}
                  </p>
                  <p className={cn(
                    "text-xs line-clamp-1",
                    isActive ? "text-white/80" : "text-gray-500"
                  )}>
                    {feature.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

const FeatureCard = ({ 
  feature, 
  isActive, 
  onHover,
  onSelect,
  color
}: { 
  feature: any
  isActive: boolean
  onHover: () => void
  onSelect: () => void
  color: string
}) => (
  <div
    className={cn(
      "group cursor-pointer rounded-2xl bg-white p-6 transition-all duration-300",
      isActive 
        ? "scale-[1.02] shadow-lg ring-2" 
        : "hover:scale-[1.01] hover:shadow-md"
    )}
    style={{
      ringColor: isActive ? color : 'transparent'
    } as any}
    onMouseEnter={onHover}
    onClick={onSelect}
  >
    <h4 className="font-semibold">{feature.title}</h4>
    <p className="mt-2 text-sm text-gray-600">
      {feature.description}
    </p>
    
    {isActive && (
      <div 
        className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rotate-45 transform"
        style={{ backgroundColor: color }}
      />
    )}
  </div>
)
const FeatureContent = ({
    category,
    activeFeature,
    hoveredFeature,
    setHoveredFeature,
    setActiveFeature
  }: {
    category: any
    activeFeature: string
    hoveredFeature: string | null
    setHoveredFeature: (id: string | null) => void
    setActiveFeature: (id: string) => void
  }) => {
    const currentFeature = category.features.find(
      (f: any) => f.id === (hoveredFeature || activeFeature)
    )
  
    return (
      <div className="mt-8 md:mt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Feature List */}
          <div className="relative order-2 space-y-4 lg:order-1 lg:sticky lg:top-24">
            {category.features.map((feature: any) => (
              <div
                key={feature.id}
                className={cn(
                  "cursor-pointer rounded-2xl bg-white p-6 transition-all duration-300",
                  feature.id === (hoveredFeature || activeFeature)
                    ? "scale-[1.02] shadow-lg ring-2 ring-[#4AB8A1]" 
                    : "hover:scale-[1.01] hover:shadow-md"
                )}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onClick={() => {
                  setActiveFeature(feature.id)
                  setHoveredFeature(null)
                }}
              >
                <h4 className="font-semibold">{feature.title}</h4>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
  
          {/* Right: Mockup Display */}
          <div className="order-1 flex justify-center lg:order-2 lg:sticky lg:top-24">
            <div className="relative w-full max-w-[300px]">
              {/* Fixed aspect ratio container */}
              <div className="relative aspect-[9/19]">
                {currentFeature && (
                  <>
                    {/* Background layer */}
                    <div 
                      className="absolute inset-0 blur-xl opacity-0"
                      style={{
                        backgroundColor: 'transparent'
                      }}
                    />
                    
                    {/* Image */}
                    <Image
                      src={currentFeature.mockup}
                      alt={currentFeature.title}
                      fill
                      className="rounded-[2rem] object-contain transition-all duration-300"
                      priority
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const FeatureSection = () => {
    const [activeTab, setActiveTab] = React.useState(features[0].id)
    const [activeFeature, setActiveFeature] = React.useState(features[0].features[0].id)
    const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null)
  
    const currentCategory = features.find(f => f.id === activeTab)
  
    return (
      <section id="features" className="w-full bg-[#FAF7F1] py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Fitur Lengkap untuk{' '}
              <span className="text-[#4AB8A1]">Journey</span>{' '}
              <span className="text-[#FF6B35]">Sehatmu</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore fitur-fitur Pockeat yang akan membantu mencapai goals kesehatanmu
            </p>
          </div>
  
          {/* Tabs & Content */}
          <div className="mt-8 md:mt-16">
            <FeatureTabs 
              features={features}
              activeTab={activeTab}
              onTabChange={(id) => {
                setActiveTab(id)
                const newCategory = features.find(f => f.id === id)
                if (newCategory) {
                  setActiveFeature(newCategory.features[0].id)
                  setHoveredFeature(null)
                }
              }}
            />
  
            {currentCategory && (
              <FeatureContent
                category={currentCategory}
                activeFeature={activeFeature}
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                setActiveFeature={setActiveFeature}
              />
            )}
          </div>
        </div>
      </section>
    )
  }
  
  export default FeatureSection