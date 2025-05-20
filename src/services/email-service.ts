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
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || process.env.NEXT_PUBLIC_SMTP_HOST,
      port: Number(process.env.SMTP_PORT || process.env.NEXT_PUBLIC_SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.SMTP_PASSWORD || process.env.NEXT_PUBLIC_SMTP_PASSWORD,
      },
    });
  }
  
  /**
   * Mengirim email dengan opsi yang diberikan
   * @param options - Opsi email
   * @returns Promise yang resolve ketika email berhasil dikirim
   */
  async sendEmail(options: EmailOptions): Promise<nodemailer.SentMessageInfo> {
    try {
      const { to, subject, html, cc, bcc, attachments } = options;
      
      const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL || process.env.NEXT_PUBLIC_SMTP_FROM_EMAIL,
        to,
        subject,
        html,
        ...(cc ? { cc } : {}),
        ...(bcc ? { bcc } : {}),
        ...(attachments ? { attachments } : {})
      };
      
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  
  /**
   * Mengirim email kontak dari pengguna ke admin
   * @param name Nama pengirim
   * @param email Email pengirim
   * @param category Kategori pesan
   * @param message Isi pesan
   * @returns Promise yang resolve ketika email berhasil dikirim
   */
  async sendContactEmail(name: string, email: string, category: string, message: string): Promise<nodemailer.SentMessageInfo> {
    const adminEmail = process.env.SMTP_USER || process.env.NEXT_PUBLIC_SMTP_USER;
    
    const html = this.generateAdminEmailContent({
      name,
      email,
      category,
      message
    });
    
    return this.sendEmail({
      to: adminEmail as string,
      subject: `Contact Message From ${name} [${email}]`,
      html
    });
  }
  
  /**
   * Mengirim email konfirmasi ke pengguna setelah mengirim pesan kontak
   * @param name Nama pengguna
   * @param email Email pengguna
   * @returns Promise yang resolve ketika email berhasil dikirim
   */
  async sendConfirmationEmail(name: string, email: string): Promise<nodemailer.SentMessageInfo> {
    const html = this.generateUserConfirmationContent(name);
    
    return this.sendEmail({
      to: email,
      subject: 'Terima Kasih Telah Menghubungi PockEat',
      html
    });
  }
  
  /**
   * Mengirim email konfirmasi ke pengguna setelah pre-register dengan link APK
   * @param name Nama pengguna
   * @param email Email pengguna
   * @returns Promise yang resolve ketika email berhasil dikirim
   */
  async sendPreRegisterConfirmationEmail(name: string, email: string): Promise<nodemailer.SentMessageInfo> {
    const apkLink = process.env.APK_LINK;
    const html = this.generatePreRegisterConfirmationContent(name, apkLink || '#');
    
    return this.sendEmail({
      to: email,
      subject: 'Terima Kasih Telah Mendaftar di PockEat',
      html
    });
  }
  
  /**
   * Membuat konten HTML untuk email yang dikirim ke admin
   */
  private generateAdminEmailContent(data: { name: string; email: string; category: string; message: string }): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AB8A1;">Pesan Kontak Baru dari Website PockEat</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Nama:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Kategori:</strong> ${data.category}</p>
          <p><strong>Pesan:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #FF6B35; margin-top: 10px;">
            ${data.message.replace(/\\n/g, '<br/>')}
          </div>
        </div>
        <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
          Email ini dikirim secara otomatis dari website PockEat. 
          Silakan balas langsung ke alamat email pengirim.
        </p>
      </div>
    `;
  }
  
  /**
   * Membuat konten HTML untuk email konfirmasi ke pengguna
   */
  private generateUserConfirmationContent(name: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4AB8A1;">Terima Kasih, ${name}!</h2>
        <p>Kami telah menerima pesan Anda dan akan meresponnya segera.</p>
        <p>Tim kami sedang meninjau pesan Anda dan akan menghubungi Anda kembali
           dalam 1-2 hari kerja.</p>
        <div style="margin: 30px 0; padding: 20px; background-color: #f7f9fc; border-radius: 8px;">
          <h3 style="color: #FF6B35; margin-top: 0;">Selagi Menunggu</h3>
          <p>Anda dapat mengunjungi resource berikut:</p>
          <ul style="padding-left: 20px;">
            <li>Pelajari lebih lanjut tentang <a href="https://pockeat.vercel.app" style="color: #4AB8A1; text-decoration: none;">PockEat</a></li>
            <li>Daftar pre-register untuk mendapatkan info terbaru</li>
            <li>Ikuti kami di sosial media untuk update terbaru</li>
          </ul>
        </div>
        <p style="margin-top: 30px;">Salam hangat,</p>
        <p style="margin: 0;"><strong>Tim PockEat</strong></p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">
          <p>Email ini dikirim secara otomatis, mohon tidak membalas.</p>
        </div>
      </div>
    `;
  }
  
  /**
   * Membuat konten HTML untuk email konfirmasi pre-register dengan link APK
   */
  private generatePreRegisterConfirmationContent(name: string, apkLink: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px; padding: 20px;">
          <h1 style="margin: 0; color: #4AB8A1;">Pock<span style="color: #FF6B35;">eat</span></h1>
          <p style="color: #666;">AI-Driven Smart Companion untuk Tracking Kalori & Kesehatan</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px;">
          <h2 style="color: #4AB8A1; margin-top: 0;">Terima Kasih, ${name}!</h2>
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
}
