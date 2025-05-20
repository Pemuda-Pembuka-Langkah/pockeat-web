"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Mail, MessageSquare, Users, Building2, Loader2 } from 'lucide-react'
import { toast } from 'sonner' 

const contactCards = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Dapatkan respon cepat via WhatsApp',
    info: '+62 812-3456-7890',
  },
  {
    icon: Users,
    title: 'Email',
    description: 'Hubungi kami untuk informasi terkini terhadap PockEat',
    info: 'pockeat.service@gmail.com',
  },
  {
    icon: Building2,
    title: 'Kantor',
    description: 'Kunjungi kami di Fasilkom UI',
    info: 'Fakultas Ilmu Komputer UI, Depok',
  },
]

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast.error('Silakan lengkapi semua field yang diperlukan');
      return;
    }
  
    setIsSubmitting(true);
    try {
      // Menggunakan API contact baru yang menangani kedua email sekaligus
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengirim pesan. Silakan coba lagi.');
      }
      
      toast.success('Pesan Anda telah terkirim!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        category: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(`Terjadi kesalahan saat mengirim pesan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  }
  


  // Generate HTML content for the organization email
  const generateOrganizationEmailContent = (data: typeof formData) => {
    return `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Category:</strong> ${data.category}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p>This message was sent from the PockEat contact form.</p>
    `
  }

  // Generate HTML content for the user confirmation email
  const generateUserEmailContent = (name: string) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4AB8A1;">Pock<span style="color: #FF6B35;">eat</span></h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4AB8A1;">Terima Kasih, ${name}!</h2>
          <p>Kami telah menerima pesan Anda dan akan segera merespons.</p>
          <p>Tim PockEat berkomitmen untuk memberikan pengalaman terbaik dalam menjalani gaya hidup sehat yang menyenangkan.</p>
          <p>Kami akan menghubungi Anda kembali dalam waktu 1-2 hari kerja.</p>
        </div>
        <div style="margin-top: 20px; font-size: 14px; color: #666; text-align: center;">
          <p>&copy; 2025 PockEat. All rights reserved.</p>
          <p>Fakultas Ilmu Komputer UI, Depok</p>
        </div>
      </div>
    `
  }

  return (
    <section id='contact' className="w-full bg-gradient-to-b from-white to-[#FAF7F1] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Hubungi{' '}
            <span className="text-[#4AB8A1]">Pock</span>
            <span className="text-[#FF6B35]">eat</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Punya pertanyaan atau ingin berkolaborasi? Kami senang mendengar dari Anda!
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Left Column - Join Us Content */}
          <div className="space-y-8">
            <div>
              <p className="mt-4 text-gray-600">
                Kami memiliki misi untuk membuat tracking kesehatan menjadi lebih mudah dan menyenangkan. 
                Mari berkolaborasi untuk Indonesia yang lebih sehat.
              </p>
            </div>

            {/* Contact Cards Grid */}
    {/* Contact Cards Grid */}
<div className="grid gap-4 sm:grid-cols-2">
  {contactCards.map((card, index) => (
    <Card key={index} className="border-none bg-white/50 shadow-md h-full"> {/* Added h-full */}
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35]">
            <card.icon className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-lg font-medium">{card.title}</h4>
            <p className="mt-2 text-sm text-gray-600">{card.description}</p>
            <p className="mt-2 text-sm font-medium text-[#4AB8A1] break-all"> {/* Added break-all */}
              {card.info}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

            {/* Additional Info */}
            <div className="rounded-xl bg-gradient-to-r from-[#4AB8A1]/10 to-[#FF6B35]/10 p-6">
              <h4 className="font-semibold">Mengapa Berkolaborasi dengan Kami?</h4>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4AB8A1]" />
                  <span>Teknologi AI terdepan</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4AB8A1]" />
                  <span>Didukung oleh Fasilkom UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4AB8A1]" />
                  <span>Fitur yang terus berkembang</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="border-none bg-white/50 p-6 shadow-lg">
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Nama</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nama lengkap" 
                        className="bg-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Email</label>
                      <Input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email" 
                        placeholder="nama@email.com" 
                        className="bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Kategori</label>
                    <Select 
                      value={formData.category} 
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="partnership">Kemitraan</SelectItem>
                        <SelectItem value="feedback">Feedback Produk</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Pesan</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tulis pesan Anda" 
                      className="min-h-[120px] bg-white"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : 'Kirim Pesan'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection