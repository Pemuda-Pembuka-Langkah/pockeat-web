import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Ambil parameter oobCode dari URL (satu-satunya parameter yang diperlukan)
  const oobCode = searchParams.get('oobCode');
  
  // Periksa apakah parameter oobCode ada
  if (oobCode) {
    // Buat URL dengan semua parameter yang ada di URL
    let customUrl = 'pockeat://verify?';
    
    // Tambahkan semua parameter dari URL asli
    for (const [key, value] of searchParams.entries()) {
      customUrl += `${key}=${value}&`;
    }
    
    // Hapus tanda & terakhir jika ada
    if (customUrl.endsWith('&')) {
      customUrl = customUrl.slice(0, -1);
    }
    
    // Redirect langsung ke custom URL scheme
    return NextResponse.redirect(customUrl);
  }
  
  // Jika parameter oobCode tidak ada, arahkan ke homepage
  return NextResponse.redirect(new URL('/', request.nextUrl.origin));
}