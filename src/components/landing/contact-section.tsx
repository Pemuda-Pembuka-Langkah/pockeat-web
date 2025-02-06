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
    title: 'Email Inquiry',
    description: 'Reach out via email for any questions',
    info: 'hello@pockeat.co.id',
  },
  {
    icon: MessageSquare,
    title: 'Quick Chat',
    description: 'Get fast response via WhatsApp',
    info: '+62 812-3456-7890',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Explore collaboration opportunities',
    info: 'partnership@pockeat.co.id',
  },
  {
    icon: Building2,
    title: 'Office',
    description: 'Visit us at Fasilkom UI',
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
            Get in Touch with{' '}
            <span className="text-[#4AB8A1]">Pock</span>
            <span className="text-[#FF6B35]">eat</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Left Column - Join Us Content */}
          <div className="space-y-8">
            <div>
              {/* <h3 className="text-2xl font-bold">Join Us in Transforming</h3>
              <h3 className="text-2xl font-bold">
                <span className="text-[#4AB8A1]">Indonesian</span>{' '}
                <span className="text-[#FF6B35]">Fitness</span>
              </h3> */}
              <p className="mt-4 text-gray-600">
                We're on a mission to make health tracking seamless and enjoyable for everyone. 
                Partner with us to create a healthier Indonesia.
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
              <h4 className="font-semibold">Why Partner With Us?</h4>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4AB8A1]" />
                  <span>Access to cutting-edge AI technology</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4AB8A1]" />
                  <span>Backed by Fasilkom UI expertise</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4AB8A1]" />
                  <span>Growing health-conscious user base</span>
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
                      <label className="text-sm font-medium text-gray-900">Name</label>
                      <Input 
                        placeholder="Your name" 
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Email</label>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Category</label>
                    <Select>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="investor">Investor Inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Product Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Message</label>
                    <Textarea 
                      placeholder="Your message" 
                      className="min-h-[120px] bg-white"
                    />
                  </div>

                  <Button 
                    className="w-full rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90"
                  >
                    Send Message
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