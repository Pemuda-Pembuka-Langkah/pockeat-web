import { storage } from '@/lib/firebase-admin';
import { Storage } from 'firebase-admin/storage';

/**
 * Service for handling Firebase Storage operations
 */
export class StorageService {
  private bucket: any; // Firebase Storage bucket

  constructor() {
    this.bucket = storage.bucket();
  }

  /**
   * Upload a file to Firebase Storage
   * 
   * @param buffer - The file buffer
   * @param path - Storage path where the file will be stored
   * @param contentType - MIME type of the file
   * @returns The public URL of the uploaded file
   */
  async uploadFile(buffer: Buffer, path: string, contentType: string): Promise<string> {
    try {
      // Create a reference to the file
      const file = this.bucket.file(path);

      // Upload the file
      await file.save(buffer, {
        metadata: {
          contentType,
        },
      });

      // Make the file publicly accessible
      await file.makePublic();

      // Get a long-lived URL for the file
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2100', // Far future expiration
      });

      return url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file to storage');
    }
  }

  /**
   * Delete a file from Firebase Storage
   * 
   * @param path - Storage path of the file to delete
   * @returns A boolean indicating whether the deletion was successful
   */
  async deleteFile(path: string): Promise<boolean> {
    try {
      // Create a reference to the file
      const file = this.bucket.file(path);

      // Check if the file exists
      const [exists] = await file.exists();
      if (!exists) {
        return false;
      }

      // Delete the file
      await file.delete();
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file from storage');
    }
  }

  /**
   * Get the download URL for a file in Firebase Storage
   * 
   * @param path - Storage path of the file
   * @returns The public URL of the file
   */
  async getFileUrl(path: string): Promise<string | null> {
    try {
      // Create a reference to the file
      const file = this.bucket.file(path);

      // Check if the file exists
      const [exists] = await file.exists();
      if (!exists) {
        return null;
      }

      // Get a signed URL for the file
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2100', // Far future expiration
      });

      return url;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw new Error('Failed to get file URL');
    }
  }
}
