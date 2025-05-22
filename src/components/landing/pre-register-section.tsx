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
import { Smartphone, Play, Loader2, Check, AlertCircle } from 'lucide-react'
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
  const [showPlayStoreConfirmation, setShowPlayStoreConfirmation] = useState(false)
  const [preRegisteredData, setPreRegisteredData] = useState<{name: string, email: string} | null>(null)

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

  // Fungsi untuk mendaftar sebagai PlayStore tester
  const registerAsPlayStoreTester = async (name: string, email: string) => {
    try {
      const response = await fetch('/api/playstore-testers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mendaftar sebagai tester');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error registering as PlayStore tester:', error);
      return { success: false, error };
    }
  }

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
      // Call API endpoint untuk pre-register
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
        description: "Pendaftaran pre-register berhasil! Kami telah mengirimkan email dengan tautan APK. Mohon periksa folder inbox atau spam email Anda."
      })
      
      // Tampilkan konfirmasi untuk PlayStore tester
      setPreRegisteredData({
        name: appFormData.name,
        email: appFormData.email
      });
      setShowPlayStoreConfirmation(true)
      
      // Reset form pre-register
      setAppFormData({
        name: '',
        email: '',
        phone: '',
        reason: ''
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
      })
    } finally {
      setIsSubmittingApp(false)
    }
  }

  const handlePlayStoreRegistration = async () => {
    if (!preRegisteredData) return;
    
    setIsSubmittingTester(true);
    try {
      const result = await registerAsPlayStoreTester(
        preRegisteredData.name,
        preRegisteredData.email
      );
      
      if (result.success) {
        toast({
          title: "Berhasil!",
          description: "Anda telah terdaftar sebagai tester PlayStore! Kami akan mengirimkan informasi selanjutnya melalui email."
        });
        setShowPlayStoreConfirmation(false);
      } else {
        throw new Error('Gagal mendaftar sebagai tester PlayStore');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar sebagai tester.'
      });
    } finally {
      setIsSubmittingTester(false);
    }
  };

  const handleCancelPlayStoreRegistration = () => {
    setShowPlayStoreConfirmation(false);
  };

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
            <TabsList className="grid w-full grid-cols-2 mb-8 p-1 h-auto bg-gray-100 rounded-lg">
              <TabsTrigger 
                value="app" 
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-md
                  data-[state=active]:bg-[#4AB8A1] data-[state=active]:text-white
                  transition-all duration-200"
              >
                <Smartphone className="h-4 w-4" />
                <span>Pre-Register App</span>
              </TabsTrigger>
              <TabsTrigger 
                id="playstore-tab" 
                value="tester" 
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-md
                  data-[state=active]:bg-[#4AB8A1] data-[state=active]:text-white
                  transition-all duration-200"
              >
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
                  </form>

                  {/* Konfirmasi PlayStore Tester setelah pre-register berhasil */}
                  {showPlayStoreConfirmation && (
                    <div className="mt-8 p-3 sm:p-4 border border-[#4AB8A1] rounded-lg bg-[#F0FBF9]">
                      <div className="flex items-start gap-2 sm:gap-3 mb-3">
                        <div className="bg-[#4AB8A1] rounded-full p-1.5 text-white mt-0.5 flex-shrink-0">
                          <Check size={16} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#4AB8A1] text-sm sm:text-base">Pendaftaran Berhasil!</h4>
                          <p className="text-xs sm:text-sm text-gray-600">Kami telah mengirimkan instruksi ke email Anda.</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 sm:p-4 rounded-md mb-4 border border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="bg-[#FF6B35]/10 rounded-full p-1.5 sm:p-2 flex-shrink-0">
                            <Play className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF6B35]" />
                          </div>
                          <h4 className="font-medium text-sm sm:text-base">Ingin menjadi PlayStore Tester?</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                          Jadilah tester PockEat di Google PlayStore dan dapatkan akses ke versi terbaru aplikasi:
                        </p>
                        <ul className="text-xs sm:text-sm text-gray-600 space-y-1 mb-3 sm:mb-4 ml-1">
                          <li className="flex items-start gap-2">
                            <span className="text-[#4AB8A1] text-base sm:text-lg leading-5 flex-shrink-0">•</span>
                            <span>Akses prioritas ke fitur terbaru</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#4AB8A1] text-base sm:text-lg leading-5 flex-shrink-0">•</span>
                            <span>Kompensasi finansial untuk kontribusi</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#4AB8A1] text-base sm:text-lg leading-5 flex-shrink-0">•</span>
                            <span>Pengaruh langsung pada pengembangan produk</span>
                          </li>
                        </ul>
                        
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <Button
                            onClick={handlePlayStoreRegistration}
                            className="w-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90 text-xs sm:text-sm py-2 h-auto"
                            disabled={isSubmittingTester}
                          >
                            {isSubmittingTester ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                <span className="whitespace-nowrap">Mendaftar...</span>
                              </>
                            ) : (
                              <span className="whitespace-nowrap">Ya, Daftar Sebagai Tester</span>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCancelPlayStoreRegistration}
                            className="w-full text-xs sm:text-sm py-2 h-auto"
                            disabled={isSubmittingTester}
                          >
                            <span className="whitespace-nowrap">Tidak, Terima Kasih</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* PlayStore Tester Tab */}
            <TabsContent value="tester">
              <Card className="border-none bg-white/50 p-6 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-medium">Daftar sebagai PlayStore Tester</h3>
                    <p className="text-gray-600 mt-2">
                      Beri kami masukan langsung dan bantu membentuk fitur terbaru PockEat sambil mendapatkan kompensasi.
                    </p>
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

                    <div className="bg-[#F9F5FF] border border-[#E9D7FE] rounded-lg p-4 my-4">
                      <h4 className="font-medium text-[#6941C6] flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4" />
                        Manfaat Tester
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1 ml-1">
                        <li className="flex items-start gap-2">
                          <span className="text-[#4AB8A1] text-lg leading-5">•</span>
                          <span>Akses prioritas ke fitur terbaru</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4AB8A1] text-lg leading-5">•</span>
                          <span>Kompensasi finansial untuk kontribusi</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4AB8A1] text-lg leading-5">•</span>
                          <span>Pengaruh langsung pada pengembangan produk</span>
                        </li>
                      </ul>
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