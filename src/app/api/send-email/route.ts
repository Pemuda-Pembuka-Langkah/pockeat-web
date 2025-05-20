// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { EmailService, EmailOptions } from '@/services/email-service';

export async function POST(request: Request) {
  try {
    const emailData: EmailOptions = await request.json();
    const emailService = new EmailService();
    
    // Kirim email menggunakan service
    await emailService.sendEmail(emailData);
    
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Error sending email', error: (error as Error).message },
      { status: 500 }
    );
  }
}