"use client"
import React from 'react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { AlertCircle, Brain, Cookie } from 'lucide-react'

const obesityData = [
  { year: '2007', value: 18.8 },
  { year: '2013', value: 26.6 },
  { year: '2018', value: 31.0 },
  { year: '2023', value: 36.8 },
]

const painPoints = [
  {
    icon: AlertCircle,
    title: 'Sulit Konsisten',
    value: '54%',
    description: 'Masyarakat kesulitan menjaga konsistensi dalam diet mereka'
  },
  {
    icon: Brain,
    title: 'Susah Hitung Kalori',
    value: '40%',
    description: 'Merasa kesusahan menghitung masukan kalori harian'
  },
  {
    icon: Cookie,
    title: 'Godaan Makanan',
    value: '46%',
    description: 'Sulit menahan godaan makanan-makanan tidak sehat'
  },
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

const ProblemSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Obesitas di Indonesia terus meningkat & jadi{' '}
            <span className="text-[#FF6B35]">masalah serius</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Prevalensi obesitas penduduk Indonesia di atas 15 tahun terus menunjukkan tren kenaikan yang mengkhawatirkan
          </p>
        </div>

        {/* Chart Section */}
        <div className="mt-16 h-[400px] w-full">
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

        {/* Pain Points Cards */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold sm:text-3xl">
            Tantangan dalam <span className="text-[#4AB8A1]">Menjaga Pola Hidup Sehat</span>
          </h3>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <Card key={index} className="flex flex-col items-center p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4AB8A1]/10">
                    <Icon className="h-8 w-8 text-[#4AB8A1]" />
                  </div>
                  <h4 className="mt-6 text-xl font-semibold">{point.title}</h4>
                  <p className="mt-2 text-4xl font-bold text-[#FF6B35]">{point.value}</p>
                  <p className="mt-4 text-gray-600">{point.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#4AB8A1]/10 to-[#FF6B35]/10 p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">
                Potensi Pasar yang Besar
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Berdasarkan survei terbaru, sudah ada kesadaran masyarakat akan pentingnya menjaga pola makan dan latihan, namun masih butuh solusi yang tepat.
              </p>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#4AB8A1]">57%</p>
                <p className="mt-2 text-gray-600">Sadar pentingnya tracking kalori</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#FF6B35]">43%</p>
                <p className="mt-2 text-gray-600">Belum memiliki kesadaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection