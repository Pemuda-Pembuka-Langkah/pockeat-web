import { PreRegisterRepository } from '@/repositories/pre-register-repository';
import { PreRegister, CreatePreRegisterDto } from '@/models/pre-register';
import { EmailService } from './email-service';

export class PreRegisterService {
  private repository: PreRegisterRepository;
  private emailService: EmailService;

  constructor() {
    this.repository = new PreRegisterRepository();
    this.emailService = new EmailService();
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    // Basic validation for Indonesian phone number
    const regex = /^((\+62)|0)[0-9]{8,15}$/;
    return regex.test(phone);
  }

  async createPreRegister(data: CreatePreRegisterDto): Promise<{ error: string } | PreRegister> {
    // Validasi data
    if (!data.name || data.name.trim().length < 3) {
      return { error: 'Nama harus diisi minimal 3 karakter' };
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      return { error: 'Email tidak valid' };
    }

    if (!data.phone || !this.isValidPhone(data.phone)) {
      return { error: 'Nomor telepon tidak valid' };
    }

    // Periksa apakah email sudah terdaftar
    const existingUser = await this.repository.findByEmail(data.email);
    if (existingUser) {
      return { error: 'Email sudah terdaftar' };
    }

    // Simpan data ke database
    try {
      const preRegister = await this.repository.create(data);
      
      // Kirim email konfirmasi pendaftaran
      const apkLink = process.env.APK_LINK || 'https://github.com/Pemuda-Pembuka-Langkah/pockeat-mobile/actions/runs/15113018029/artifacts/3151649368';
      
      // Coba kirim email tapi jangan biarkan error menghentikan flow - hanya log error
      try {
        // Tidak perlu await karena kita tidak butuh hasilnya untuk melanjutkan
        this.emailService.sendPreRegisterConfirmationEmail(data.email, data.name, apkLink)
          .catch(err => console.error('Error sending confirmation email:', err));
      } catch (emailError) {
        console.error('Error initiating pre-register confirmation email:', emailError);
      }
      
      // Kirim email notifikasi ke admin (juga tanpa menunggu/await)
      try {
        this.emailService.sendPreRegisterNotificationToAdmin({
          name: data.name,
          email: data.email,
          phone: data.phone,
          reason: data.reason
        }).catch(err => console.error('Error sending admin notification:', err));
      } catch (emailError) {
        console.error('Error initiating admin notification email:', emailError);
      }
      
      return preRegister;
    } catch (error) {
      console.error('Error creating pre-register:', error);
      return { error: 'Terjadi kesalahan saat mendaftar' };
    }
  }

  async getAllPreRegisters(): Promise<PreRegister[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Error fetching pre-registers:', error);
      return [];
    }
  }
}
