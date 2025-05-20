import { PlaystoreTester, CreatePlaystoreTesterDto, UpdatePlaystoreTesterDto } from '@/models/playstore-tester';
import { PlaystoreTesterRepository } from '@/repositories/playstore-tester-repository';

export class PlaystoreTesterService {
  private repository: PlaystoreTesterRepository;

  constructor() {
    this.repository = new PlaystoreTesterRepository();
  }

  async createTester(data: CreatePlaystoreTesterDto): Promise<PlaystoreTester | { error: string }> {
    try {
      // Validasi email
      if (!data.email || !this.isValidEmail(data.email)) {
        return { error: 'Email tidak valid' };
      }

      // Validasi nama
      if (!data.name || data.name.trim().length < 2) {
        return { error: 'Nama harus diisi dengan minimal 2 karakter' };
      }

      // Periksa apakah email sudah terdaftar
      const existingTester = await this.repository.findByEmail(data.email);
      if (existingTester) {
        return { error: 'Email sudah terdaftar sebagai tester' };
      }

      // Buat tester baru
      return await this.repository.create(data);
    } catch (error) {
      console.error('Error creating tester:', error);
      return { error: 'Terjadi kesalahan saat mendaftarkan tester' };
    }
  }

  async getAllTesters(): Promise<PlaystoreTester[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Error getting testers:', error);
      return [];
    }
  }

  async updateTester(id: string, data: UpdatePlaystoreTesterDto): Promise<PlaystoreTester | { error: string }> {
    try {
      const result = await this.repository.update(id, data);
      if (!result) {
        return { error: 'Tester tidak ditemukan' };
      }
      return result;
    } catch (error) {
      console.error('Error updating tester:', error);
      return { error: 'Terjadi kesalahan saat memperbarui tester' };
    }
  }

  async deleteTester(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const success = await this.repository.delete(id);
      if (!success) {
        return { success: false, message: 'Tester tidak ditemukan' };
      }
      return { success: true };
    } catch (error) {
      console.error('Error deleting tester:', error);
      return { success: false, message: 'Terjadi kesalahan saat menghapus tester' };
    }
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
