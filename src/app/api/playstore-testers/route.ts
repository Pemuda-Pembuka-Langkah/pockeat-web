import { NextResponse } from 'next/server';
import { PlaystoreTesterService } from '@/services/playstore-tester-service';
import { CreatePlaystoreTesterDto } from '@/models/playstore-tester';

const testerService = new PlaystoreTesterService();

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
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pendaftaran berhasil! Kami akan menghubungi Anda segera.',
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
