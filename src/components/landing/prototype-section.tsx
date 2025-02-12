"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Smartphone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PrototypeSection = () => {
  return (
    <section id="prototype" className="relative w-full bg-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#4AB8A1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03]" />
      
      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Lihat{' '}
            <span className="text-[#4AB8A1]">Pockeat</span>{' '}
            <span className="text-[#805E3B]">in</span>{' '}
            <span className="text-[#FF6B35]">Action</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Pilih cara yang kamu suka untuk melihat bagaimana Pockeat bekerja
          </p>
        </div>

        {/* Demo Options */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Video Demo Card */}
          <Card className="group h-full min-h-[320px] border-none bg-white/80 p-8 backdrop-blur-sm">
            <div className="flex h-full flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35]/80">
                <Play className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="mt-6 text-xl font-semibold">Video Demo</h3>
              <p className="mt-2 flex-grow text-gray-600">
                Tonton video singkat yang menunjukkan fitur-fitur utama dan cara kerja aplikasi Pockeat
              </p>
              
              <div className="mt-6 w-full">
                <Button 
                  className="h-10 w-full rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35] text-sm text-white hover:opacity-90"
                >
                  Tonton Video
                </Button>
              </div>
            </div>
          </Card>

          {/* Interactive Prototype Card */}
          <Card className="group h-full min-h-[320px] border-none bg-white/80 p-8 backdrop-blur-sm">
            <div className="flex h-full flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#4AB8A1] to-[#FF6B35]/80">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="mt-6 text-xl font-semibold">Interactive Prototype</h3>
              <p className="mt-2 flex-grow text-gray-600">
                Coba langsung prototype interaktif aplikasi Pockeat dan rasakan pengalaman menggunakannya
              </p>
              
              <div className="mt-6 w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="h-10 w-full rounded-full border border-[#4AB8A1] bg-transparent text-sm text-[#4AB8A1] hover:bg-[#4AB8A1] hover:text-white"
                    >
                      Coba Prototype
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-[412px]  p-0 bg-transparent border-none">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Prototype Preview</DialogTitle>
                    </DialogHeader>
                    
                    {/* iPhone Frame */}
                    <div className="relative rounded-[40px] origin-center scale-[0.85] bg-gray-900 p-3">
                      {/* Notch */}
                      <div className="absolute left-1/2 top-3 h-5 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />
                      
                      {/* Frame for Flutter app */}
                      <div className="relative aspect-[45/100] w-full overflow-hidden rounded-[32px] bg-white">
                        <iframe
                          src="https://pockeat-mockup-production.up.railway.app"
                          className="h-full w-full"
                          style={{ border: 'none' }}
                        />
                      </div>

                      {/* Bottom Bar */}
                      <div className="mt-3 flex justify-center">
                        <div className="h-1 w-24 rounded-full bg-gray-700" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PrototypeSection;