import React from 'react'
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
import { Mail, MessageSquare, Users, Building2 } from 'lucide-react'

const contactCards = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Hubungi kami melalui email untuk informasi',
    info: 'hello@pockeat.co.id',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Dapatkan respon cepat via WhatsApp',
    info: '+62 812-3456-7890',
  },
  {
    icon: Users,
    title: 'Kerjasama',
    description: 'Jelajahi peluang kolaborasi bersama',
    info: 'partnership@pockeat.co.id',
  },
  {
    icon: Building2,
    title: 'Kantor',
    description: 'Kunjungi kami di Fasilkom UI',
    info: 'Fakultas Ilmu Komputer UI, Depok',
  },
]

const ContactSection = () => {
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
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card, index) => (
                <Card key={index} className="border-none bg-white/50 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35]">
                        <card.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{card.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{card.description}</p>
                        <p className="mt-1 text-sm font-medium text-[#4AB8A1]">{card.info}</p>
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
                  <span>Pengguna yang terus berkembang</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="border-none bg-white/50 p-6 shadow-lg">
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Nama</label>
                      <Input 
                        placeholder="Nama lengkap" 
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Email</label>
                      <Input 
                        type="email" 
                        placeholder="nama@email.com" 
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Kategori</label>
                    <Select>
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
                      placeholder="Tulis pesan Anda" 
                      className="min-h-[120px] bg-white"
                    />
                  </div>

                  <Button 
                    className="w-full rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90"
                  >
                    Kirim Pesan
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