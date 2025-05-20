// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { EmailService } from '@/services/email-service';

interface ContactRequest {
  name: string;
  email: string;
  category: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, category, message }: ContactRequest = await request.json();
    
    // Validasi input
    if (!name || !email || !category || !message) {
      return NextResponse.json(
        { success: false, error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }
    
    // Validasi email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid' },
        { status: 400 }
      );
    }
    
    const emailService = new EmailService();
    
    try {
      // 1. Kirim email ke admin/organisasi
      await emailService.sendContactEmail(name, email, category, message);
      
      // 2. Kirim email konfirmasi ke pengiuna
      await emailService.sendConfirmationEmail(name, email);
      
      return NextResponse.json({
        success: true,
        message: 'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.'
      });
    } catch (emailError) {
      console.error('Failed to send one or more emails:', emailError);
      return NextResponse.json(
        { success: false, error: 'Gagal mengirim email. Silakan coba lagi nanti.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact request:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat memproses permintaan' },
      { status: 500 }
    );
  }
}
