import { NextResponse } from 'next/server';
import { PlaystoreTesterService } from '@/services/playstore-tester-service';
import { CreatePlaystoreTesterDto } from '@/models/playstore-tester';
import { EmailService } from '@/services/email-service';

const testerService = new PlaystoreTesterService();
const emailService = new EmailService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testerData: CreatePlaystoreTesterDto = {
      name: body.name,
      email: body.email
    };

    const result = await testerService.createTester(testerData);
    
    if ('error' in result) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    
    // Kirim email konfirmasi ke tester tanpa menunggu respons
    emailService.sendPlayStoreTesterConfirmationEmail(
      testerData.email,
      testerData.name
    ).catch(err => {
      console.error('Error sending tester confirmation email:', err);
      // Gagal kirim email tidak mengganggu response API
    });
    
    // Kirim notifikasi ke admin tanpa menunggu respons
    emailService.sendPlayStoreTesterNotificationToAdmin({
      name: testerData.name,
      email: testerData.email
    }).catch(err => {
      console.error('Error sending admin notification email about tester:', err);
      // Gagal kirim email tidak mengganggu response API
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pendaftaran berhasil! Kami telah mengirimkan email dengan instruksi selanjutnya. Mohon periksa folder inbox atau spam email Anda.',
      data: result
    });
  } catch (error) {
    console.error('Error in POST /api/playstore-testers:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat mendaftar' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Mendapatkan semua tester
    const testers = await testerService.getAllTesters();
    return NextResponse.json({ success: true, data: testers });
  } catch (error) {
    console.error('Error in GET /api/playstore-testers:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat mengambil data tester' },
      { status: 500 }
    );
  }
}
