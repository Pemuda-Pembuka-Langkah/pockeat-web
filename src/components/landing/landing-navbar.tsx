"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: 'Overview', href: '#overview' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Features', href: '#features' },
  { name: 'Contact', href: '#contact' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-[#4AB8A1]">Pock</span>
              <span className="text-[#FF6B35]">eat</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-[#4AB8A1]"
              >
                {item.name}
              </button>
            ))}
            <Button 
              className="rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90"
            >
              Download App
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-lg font-medium text-gray-600 transition-colors hover:text-[#4AB8A1]"
                    >
                      {item.name}
                    </button>
                  ))}
                  <Button 
                    className="mt-4 w-full rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-white hover:opacity-90"
                  >
                    Download App
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar