"use client"

import React from 'react'
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="w-full bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-[#4AB8A1]">Pock</span>
              <span className="text-[#FF6B35]">eat</span>
            </h3>
            <p className="text-gray-400">
              AI-Driven Smart Companion untuk Tracking Kalori & Kesehatan dengan Seamless
            </p>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-[#4AB8A1]/20">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-[#4AB8A1]/20">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-[#4AB8A1]/20">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-[#4AB8A1]/20">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('#overview')} 
                  className="hover:text-[#4AB8A1]"
                >
                  Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#benefits')} 
                  className="hover:text-[#4AB8A1]"
                >
                  Benefits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#how-it-works')} 
                  className="hover:text-[#4AB8A1]"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#features')} 
                  className="hover:text-[#4AB8A1]"
                >
                  Features
                </button>
              </li>
              
              
              <li>
                <button 
                  onClick={() => scrollToSection('#contact')} 
                  className="hover:text-[#4AB8A1]"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#4AB8A1]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#4AB8A1]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#4AB8A1]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#4AB8A1]">Press Kit</a></li>
              <li><a href="#" className="hover:text-[#4AB8A1]">About Team</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#4AB8A1]" />
                <span>Fakultas Ilmu Komputer Universitas Indonesia, Depok</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#4AB8A1]" />
                <a href="mailto:hello@pockeat.co.id" className="hover:text-[#4AB8A1]">
                  hello@pockeat.co.id
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#4AB8A1]" />
                <a href="tel:+6281234567890" className="hover:text-[#4AB8A1]">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-400 md:flex-row">
            <p>© {currentYear} Pockeat. All rights reserved. | PPL Fasilkom UI 2024</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#4AB8A1]">Terms</a>
              <a href="#" className="hover:text-[#4AB8A1]">Privacy</a>
              <a href="#" className="hover:text-[#4AB8A1]">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer