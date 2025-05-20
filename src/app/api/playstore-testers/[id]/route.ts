import { NextResponse } from 'next/server';
import { PlaystoreTesterService } from '@/services/playstore-tester-service';
import { UpdatePlaystoreTesterDto } from '@/models/playstore-tester';

const testerService = new PlaystoreTesterService();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const updateData: UpdatePlaystoreTesterDto = {
      status: body.status,
      notes: body.notes
    };

    const result = await testerService.updateTester(id, updateData);
    
    if ('error' in result) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Status tester berhasil diperbarui',
      data: result
    });
  } catch (error) {
    console.error(`Error in PATCH /api/playstore-testers/${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat memperbarui status tester' },
      { status: 500 }
    );
  }
}
