/**
 * @vitest-environment node
 */

import { describe, it, expect, vi } from 'vitest';
import { StorageService } from './StorageService';

// Simple mock for firebase-admin
vi.mock('@/lib/firebase-admin', () => ({
  storage: {
    bucket: vi.fn().mockReturnValue({
      file: vi.fn().mockReturnValue({})
    })
  }
}));

describe('StorageService', () => {
  it('should create storage service instance', () => {
    // Act
    const service = new StorageService();
    
    // Assert
    expect(service).toBeDefined();
  });
  
  it('should have uploadFile method', () => {
    // Arrange
    const service = new StorageService();
    
    // Assert
    expect(typeof service.uploadFile).toBe('function');
  });
  
  it('should have deleteFile method', () => {
    // Arrange
    const service = new StorageService();
    
    // Assert
    expect(typeof service.deleteFile).toBe('function');
  });
  
  it('should have getFileUrl method', () => {
    // Arrange
    const service = new StorageService();
    
    // Assert
    expect(typeof service.getFileUrl).toBe('function');
  });
});
