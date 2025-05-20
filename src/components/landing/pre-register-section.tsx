"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Smartphone, Play, Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const PreRegisterSection = () => {
  const [appFormData, setAppFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  })

  const [testerFormData, setTesterFormData] = useState({
    name: '',
    email: ''
  })

  const [isSubmittingApp, setIsSubmittingApp] = useState(false)
  const [isSubmittingTester, setIsSubmittingTester] = useState(false)

  const handleAppInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAppFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTesterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTesterFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [showPlayStoreCTA, setShowPlayStoreCTA] = useState(false)

  const handleAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!appFormData.name || !appFormData.email || !appFormData.phone) {
      toast({
        variant: "destructive",
        title: "Validasi Error",
        description: "Silakan lengkapi semua field yang diperlukan"
      })
      return
    }
    
    setIsSubmittingApp(true)
    try {
      // Call API endpoint
      const response = await fetch('/api/pre-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: appFormData.name,
          email: appFormData.email,
          phone: appFormData.phone,
          reason: appFormData.reason
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mendaftar')
      }
      
      toast({
        title: "Berhasil!",
        description: "Pendaftaran berhasil! Kami telah mengirimkan email dengan tautan APK."
      })
      
      // Show PlayStore tester CTA
      setShowPlayStoreCTA(true)
      
      // Reset form
      setAppFormData({
        name: '',
        email: '',
        phone: '',
        reason: ''
      })
    } catch (error) {
      // Removed console.error
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
      })
    } finally {
      setIsSubmittingApp(false)
    }
  }

  const handleTesterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!testerFormData.name || !testerFormData.email) {
      toast({
        variant: "destructive",
        title: "Validasi Error",
        description: "Silakan lengkapi semua field yang diperlukan"
      })
      return
    }
    
    setIsSubmittingTester(true)
    try {
      // Call API endpoint
      const response = await fetch('/api/playstore-testers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: testerFormData.name,
          email: testerFormData.email
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mendaftar')
      }
      
      toast({
        title: "Berhasil!",
        description: "Pendaftaran tester berhasil! Kami akan mengirim instruksi melalui email."
      })
      
      // Reset form
      setTesterFormData({
        name: '',
        email: ''
      })
    } catch (error) {
      // Removed console.error('Error submitting form:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
      })
    } finally {
      setIsSubmittingTester(false)
    }
  }

  return (
    <section id="pre-register" className="w-full bg-gradient-to-b from-[#FAF7F1] to-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            Pre-Register{' '}
            <span className="text-[#4AB8A1]">Pock</span>
            <span className="text-[#FF6B35]">eat</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Daftar sekarang untuk mendapatkan akses awal ke aplikasi kami dan bantu kami mengembangkannya!
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-3xl">
          <Tabs defaultValue="app" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 p-1 h-auto">
              <TabsTrigger value="app" className="flex items-center justify-center gap-2 py-3 px-4 data-[state=active]:bg-white">
                <Smartphone className="h-4 w-4" />
                <span>Pre-Register App</span>
              </TabsTrigger>
              <TabsTrigger id="playstore-tab" value="tester" className="flex items-center justify-center gap-2 py-3 px-4 data-[state=active]:bg-white">
                <Play className="h-4 w-4" />
                <span>Jadi Tester Play Store</span>
              </TabsTrigger>
            </TabsList>

            {/* Pre-Register App Tab */}
            <TabsContent value="app">
              <Card className="border-none bg-white/50 p-6 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-medium">Dapatkan Akses Awal</h3>
                    <p className="text-gray-600 mt-2">
                      Daftar untuk mendapatkan akses awal ke aplikasi PockEat dan jadilah yang pertama mencoba fitur-fitur terbaru kami.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleAppSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Nama Lengkap</label>
                        <Input 
                          name="name"
                          value={appFormData.name}
                          onChange={handleAppInputChange}
                          placeholder="Nama lengkap Anda" 
                          className="bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Email</label>
                        <Input 
                          name="email"
                          type="email"
                          value={appFormData.email}
                          onChange={handleAppInputChange}
                          placeholder="email@example.com" 
                          className="bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Nomor Telepon</label>
                        <Input 
                          name="phone"
                          value={appFormData.phone}
                          onChange={handleAppInputChange}
                          placeholder="08123456789" 
                          className="bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Alasan ingin mencoba PockEat (opsional)</label>
                        <Textarea 
                          name="reason"
                          value={appFormData.reason}
                          onChange={handleAppInputChange}
                          placeholder="Ceritakan kenapa kamu tertarik dengan PockEat" 
                          className="min-h-[100px] bg-white"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90"
                      disabled={isSubmittingApp}
                    >
                      {isSubmittingApp ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mendaftar...
                        </>
                      ) : 'Daftar'}
                    </Button>
                    
                    {showPlayStoreCTA && (
                      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg animate-fade-in">
                        <h4 className="font-medium text-amber-800 mb-2">Yuk, Jadi Tester PlayStore Juga!</h4>
                        <p className="text-amber-700 text-sm mb-3">
                          Dapatkan akses prioritas dan kompensasi finansial dengan mendaftar sebagai tester PlayStore kami.
                        </p>
                        <Button 
                          type="button" 
                          variant="outline"
                          className="w-full border-amber-400 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                          onClick={() => document.getElementById('playstore-tab')?.click()}
                        >
                          Daftar Sebagai Tester PlayStore
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tester Tab */}
            <TabsContent value="tester">
              <Card className="border-none bg-white/50 p-6 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-medium">Jadi Tester Play Store</h3>
                    <p className="text-gray-600 mt-2">
                      Bergabunglah dengan program tester kami di Play Store dan berikan feedback untuk membantu kami meningkatkan aplikasi.
                    </p>
                    <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
                      <p className="text-amber-800 font-medium">Benefit untuk Tester:</p>
                      <p className="text-amber-700 text-sm mt-1">Dapatkan kompensasi finansial untuk feedback berkualitas</p>
                    </div>
                  </div>

                  <form className="space-y-6" onSubmit={handleTesterSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Nama Lengkap</label>
                        <Input 
                          name="name"
                          value={testerFormData.name}
                          onChange={handleTesterInputChange}
                          placeholder="Nama lengkap Anda" 
                          className="bg-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Email</label>
                        <Input 
                          name="email"
                          type="email"
                          value={testerFormData.email}
                          onChange={handleTesterInputChange}
                          placeholder="email@example.com" 
                          className="bg-white"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90"
                      disabled={isSubmittingTester}
                    >
                      {isSubmittingTester ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mendaftar...
                        </>
                      ) : 'Daftar Sebagai Tester'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default PreRegisterSection
