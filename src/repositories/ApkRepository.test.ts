/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApkRepository } from './ApkRepository';
import { ApkModel } from '@/models/ApkModel';

// Mock Firebase Firestore
vi.mock('@/lib/firebase-admin', () => {
  const mockCollection = {
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    add: vi.fn(),
    get: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  };
  
  return {
    firestore: {
      collection: vi.fn().mockReturnValue(mockCollection)
    }
  };
});

describe('ApkRepository', () => {
  let repository: ApkRepository;
  let mockApk: ApkModel;
  
  beforeEach(() => {
    vi.clearAllMocks();
    repository = new ApkRepository();
    mockApk = {
      id: '1',
      version: '1.0.0',
      versionCode: 100,
      fileSize: 15000000,
      fileUrl: 'https://example.com/app.apk',
      releaseDate: new Date().toISOString(),
      releaseNotes: 'Test release notes'
    };
  });

  it('should be instantiable', () => {
    expect(repository).toBeInstanceOf(ApkRepository);
  });

  it('should have basic CRUD methods', () => {
    expect(typeof repository.getAllApks).toBe('function');
    expect(typeof repository.getApkById).toBe('function');
    expect(typeof repository.getLatestApk).toBe('function');
    expect(typeof repository.createApk).toBe('function');
    expect(typeof repository.updateApk).toBe('function');
    expect(typeof repository.deleteApk).toBe('function');
  });
});
