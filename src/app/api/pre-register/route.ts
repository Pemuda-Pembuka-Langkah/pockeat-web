import { NextRequest, NextResponse } from 'next/server';
import { PreRegisterService } from '@/services/pre-register-service';
import { EmailService } from '@/services/email-service';
import { CreatePreRegisterDto } from '@/models/pre-register';

const preRegisterService = new PreRegisterService();
const emailService = new EmailService();

export async function POST(request: NextRequest) {
  try {
    const preRegisterData: CreatePreRegisterDto = await request.json();
    
    // Validasi dasar
    if (!preRegisterData.name || !preRegisterData.email || !preRegisterData.phone) {
      return NextResponse.json(
        { success: false, error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }
    
    // Proses pendaftaran
    const result = await preRegisterService.createPreRegister(preRegisterData);
    
    if ('error' in result) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    
    // Kirim email konfirmasi dengan link APK
    try {
      await emailService.sendPreRegisterConfirmationEmail(
        preRegisterData.name,
        preRegisterData.email
      );
    } catch (emailError) {
      console.error('Error sending pre-register confirmation email:', emailError);
      // Tetap lanjutkan meski email gagal terkirim
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pendaftaran berhasil! Kami telah mengirimkan email dengan tautan APK.',
      data: result
    });
  } catch (error) {
    console.error('Error in POST /api/pre-register:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat mendaftar' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const preRegisters = await preRegisterService.getAllPreRegisters();
    
    return NextResponse.json({ 
      success: true,
      data: preRegisters
    });
  } catch (error) {
    console.error('Error in GET /api/pre-register:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat mengambil data' },
      { status: 500 }
    );
  }
}
