"use client"
import React from 'react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUp, AlertCircle, Activity, Siren } from 'lucide-react'

const obesityData = [
  { year: '2007', value: 18.8 },
  { year: '2013', value: 15.4 },
  { year: '2018', value: 21.8 },
  { year: '2023', value: 36.8 },
]

const impactCards = [
  {
    icon: TrendingUp,
    title: 'Peningkatan Signifikan',
    stat: '2.4x',
    description: 'Kenaikan prevalensi obesitas dalam 10 tahun terakhir'
  },
  {
    icon: AlertCircle,
    title: 'Risiko Diabetes',
    stat: '2x',
    description: 'Peningkatan risiko terkena diabetes melitus'
  },
  {
    icon: Activity,
    title: 'Faktor Kematian',
    stat: '#5',
    description: 'Penyebab kematian tertinggi di Indonesia'
  },
  {
    icon: Siren,
    title: 'Komorbiditas',
    stat: '4x',
    description: 'Risiko komorbid diabetes dengan hipertensi'
  }
]

const challengeStats = [
  {
    percentage: '54%',
    label: 'Sulit menjaga konsistensi diet',
    color: 'from-[#4AB8A1]'
  },
  {
    percentage: '40%',
    label: 'Kesulitan menghitung kalori',
    color: 'from-[#FF6B35]'
  },
  {
    percentage: '46%',
    label: 'Sulit menahan godaan makanan',
    color: 'from-[#4AB8A1]'
  }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <p className="text-sm text-gray-500">Tahun {payload[0].payload.year}</p>
        <p className="text-lg font-semibold text-[#FF6B35]">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

const OverviewSection = () => {
  return (
    <section id="overview" className="relative overflow-hidden bg-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#4AB8A1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03]" />
      
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Krisis Obesitas di Indonesia: 
            <br />
            <span className="bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] bg-clip-text text-transparent">
              Saatnya Bertindak
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Berdasarkan Survei Kesehatan Indonesia (SKI) 2023, obesitas tidak hanya menjadi masalah kesehatan individu, 
            tetapi telah berkembang menjadi krisis kesehatan nasional yang membutuhkan solusi inovatif.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactCards.map((card, index) => (
            <Card key={index} className="overflow-hidden border-none bg-gradient-to-br from-white to-gray-50/50 p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35]">
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-600">{card.title}</p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">{card.stat}</p>
                  <p className="mt-1 text-sm text-gray-500">{card.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Chart & Challenges */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          {/* Chart */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Tren Obesitas yang Mengkhawatirkan</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={obesityData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FF6B35"
                    strokeWidth={3}
                    dot={{ fill: '#FF6B35', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Tantangan Utama</h3>
            <div className="space-y-6">
              {challengeStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                    <span className="text-sm font-bold text-gray-900">{stat.percentage}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color} to-transparent transition-all duration-500`}
                      style={{ width: stat.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mt-20">
          <Card className="overflow-hidden border-none bg-gradient-to-r from-[#4AB8A1]/5 to-[#FF6B35]/5 p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="text-2xl font-bold sm:text-3xl">
                  Momen Tepat untuk Perubahan
                </h3>
                <p className="mt-4 text-lg text-gray-600">
                  57% masyarakat sudah mulai sadar akan pentingnya tracking kalori, 
                  namun masih membutuhkan solusi yang tepat dan mudah digunakan.
                </p>
              </div>
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#4AB8A1]">57%</div>
                  <p className="mt-2 text-gray-600">Sadar tracking kalori</p>
                </div>
                <div className="relative text-center">
                  <div className="absolute -inset-4 z-0 rounded-xl bg-gradient-to-br from-[#FF6B35]/10 to-transparent blur-lg" />
                  <div className="relative z-10">
                    <div className="text-5xl font-bold text-[#FF6B35]">43%</div>
                    <p className="mt-2 text-gray-600">Potential users</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default OverviewSection