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
      
      // Otomatis daftarkan juga sebagai PlayStore tester
      const testerRegistration = await registerAsPlayStoreTester(
        appFormData.name,
        appFormData.email
      );

      // Siapkan pesan sukses
      let successMessage = "Pendaftaran pre-register berhasil! Kami telah mengirimkan email dengan tautan APK.";
      
      // Tambahkan info tentang PlayStore tester jika berhasil
      if (testerRegistration.success) {
        successMessage += " Anda juga telah terdaftar sebagai tester PlayStore!";
        // Update tester form data untuk konsistensi
        setTesterFormData({
          name: appFormData.name,
          email: appFormData.email
        });
      } else {
        // Masih tampilkan CTA PlayStore jika pendaftaran tester gagal
        setShowPlayStoreCTA(true);
      }
      
      toast({
        title: "Berhasil!",
        description: successMessage
      })
      
      // Reset form
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
                    
                    {showPlayStoreCTA && (
                      <div className="mt-8 relative overflow-hidden rounded-xl shadow-md animate-fade-in">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4AB8A1]/90 to-[#FF6B35]/90 z-0"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-light.svg')] opacity-10 z-0"></div>
                        
                        <div className="relative z-10 p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-white rounded-full p-2 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m5 3 14 9-14 9V3z"></path>
                              </svg>
                            </div>
                            <h4 className="font-semibold text-white text-lg">Jadi Google Play Tester!</h4>
                          </div>
                          
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                            <p className="text-white text-sm">
                              ✓ Akses prioritas ke fitur terbaru
                              <br />✓ Kompensasi finansial untuk kontribusi
                              <br />✓ Pengaruh langsung ke pengembangan produk
                            </p>
                          </div>
                          
                          <Button 
                            type="button"
                            className="w-full bg-white hover:bg-white/90 text-[#4AB8A1] font-medium shadow-sm"
                            onClick={() => {
                              // Langsung isi form tester dengan data yang sudah ada
                              setTesterFormData({
                                name: appFormData.name,
                                email: appFormData.email
                              });
                              // Pindah ke tab tester
                              document.getElementById('playstore-tab')?.click();
                            }}
                          >
                            Daftar Sekarang
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                              <path d="M5 12h14"></path>
                              <path d="m12 5 7 7-7 7"></path>
                            </svg>
                          </Button>
                        </div>
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
