import { PreRegisterRepository } from '@/repositories/pre-register-repository';
import { PreRegister, CreatePreRegisterDto } from '@/models/pre-register';

export class PreRegisterService {
  private repository: PreRegisterRepository;

  constructor() {
    this.repository = new PreRegisterRepository();
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
