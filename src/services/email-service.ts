import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  
  constructor() {
    // Setup SMTP transporter dengan konfigurasi dari .env
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: true, // true untuk port 465, false untuk yang lain
      auth: {
        user: process.env.SMTP_USER || 'pockeat.service@gmail.com',
        pass: process.env.SMTP_PASSWORD || ''
      }
    });
    
    this.fromEmail = process.env.SMTP_FROM_EMAIL || 'pockeat.service@gmail.com';
  }
  
  /**
   * Send an email
   * @param options Email options
   * @returns Object with status and message
   */
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; message: string }> {
    try {
      const { to, subject, html, cc, bcc, attachments } = options;
      
      // Kirim email menggunakan nodemailer
      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to,
        subject,
        html,
        cc,
        bcc,
        attachments
      });
      
      return { 
        success: true, 
        message: `Email sent successfully: ${info.messageId}` 
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Send confirmation email for pre-register
   * @param email Recipient email
   * @param name Recipient name
   * @param apkLink Link to APK
   * @returns Response from sendEmail
   */
  async sendPreRegisterConfirmationEmail(email: string, name: string, apkLink: string) {
    const html = this.generatePreRegisterConfirmationContent(name, apkLink);
    return this.sendEmail({
      to: email,
      subject: 'Terima Kasih Telah Mendaftar di PockEat',
      html
    });
  }

  /**
   * Send notification email to admin about new pre-register
   * @param userData User data
   * @returns Response from sendEmail
   */
  async sendPreRegisterNotificationToAdmin(userData: { name: string; email: string; phone: string; reason?: string }) {
    const html = this.generateAdminNotificationContent(userData);
    return this.sendEmail({
      to: 'pockeat.service@gmail.com',
      subject: 'Pendaftaran Baru di PockEat',
      html
    });
  }

  /**
   * Generate HTML content for pre-register confirmation email
   * @param name User name
   * @param apkLink Link to APK
   * @returns HTML content
   */
  private generatePreRegisterConfirmationContent(name: string, apkLink: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4AB8A1;">Pock<span style="color: #FF6B35;">eat</span></h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4AB8A1;">Terima Kasih, ${name}!</h2>
          <p>Terima kasih telah mendaftar di PockEat! Kami sangat senang bahwa Anda tertarik untuk bergabung dengan komunitas kami.</p>
          <p>Kami telah memproses pendaftaran Anda dan akan memberi tahu Anda segera setelah aplikasi kami siap untuk digunakan secara penuh.</p>
          
          <div style="margin: 25px 0; padding: 20px; background-color: #FFEFD5; border-left: 4px solid #FF6B35; border-radius: 4px;">
            <h3 style="color: #FF6B35; margin-top: 0;">Download APK Beta</h3>
            <p>Sebagai peserta pre-register, Anda mendapatkan akses eksklusif untuk mencoba versi beta aplikasi kami:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${apkLink}" style="display: inline-block; background: linear-gradient(135deg, #4AB8A1, #FF6B35); color: white; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-weight: bold;">Download APK</a>
            </div>
            <p style="font-size: 0.9em;">Catatan: Ini adalah versi beta dan mungkin masih mengandung beberapa bug.</p>
          </div>
        </div>
        
        <div style="margin-top: 30px;">
          <h3 style="color: #4AB8A1;">Apa Selanjutnya?</h3>
          <ul style="padding-left: 20px;">
            <li>Install APK beta di perangkat Android Anda</li>
            <li>Berikan feedback untuk membantu kami meningkatkan aplikasi</li>
            <li>Ikuti kami di media sosial untuk mendapatkan update terbaru</li>
          </ul>
        </div>
        
        <p style="margin-top: 30px;">Salam hangat,</p>
        <p style="margin: 0;"><strong>Tim PockEat</strong></p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #666; text-align: center;">
          <p>© 2025 PockEat. Semua hak dilindungi.</p>
          <p>Email ini dikirim secara otomatis, mohon tidak membalas.</p>
        </div>
      </div>
    `;
  }

  /**
   * Generate HTML content for admin notification email
   * @param userData User data
   * @returns HTML content
   */
  private generateAdminNotificationContent(userData: { name: string; email: string; phone: string; reason?: string }): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4AB8A1;">Pock<span style="color: #FF6B35;">eat</span> Admin</h1>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4AB8A1;">Pendaftaran Pre-Register Baru</h2>
          <p>Seseorang baru saja mendaftar untuk program pre-register PockEat:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Nama</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${userData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${userData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Telepon</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${userData.phone}</td>
            </tr>
            ${userData.reason ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Alasan</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${userData.reason}</td>
            </tr>
            ` : ''}
          </table>
          
          <p>Anda dapat meninjau pendaftaran ini di dashboard admin.</p>
        </div>
        <div style="margin-top: 20px; font-size: 14px; color: #666; text-align: center;">
          <p>© 2025 PockEat. All rights reserved.</p>
        </div>
      </div>
    `;
  }
}
