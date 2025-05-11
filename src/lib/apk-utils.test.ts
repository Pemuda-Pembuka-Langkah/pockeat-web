/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLatestApk, getAllApks } from './apk-utils';
import { ApkModel } from '@/models/ApkModel';

// Create mock data
const mockLatestApk: ApkModel = {
  id: '1',
  version: '1.0.0',
  versionCode: 100,
  fileSize: 15000000,
  fileUrl: 'https://example.com/app.apk',
  releaseDate: new Date().toISOString(),
  releaseNotes: 'Test release notes'
};

const mockApks: ApkModel[] = [
  mockLatestApk,
  {
    id: '2',
    version: '0.9.0',
    versionCode: 90,
    fileSize: 14000000,
    fileUrl: 'https://example.com/app-old.apk',
    releaseDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    releaseNotes: 'Previous version'
  }
];

// Mock repository methods
const mockGetLatestApk = vi.fn().mockResolvedValue(mockLatestApk);
const mockGetAllApks = vi.fn().mockResolvedValue(mockApks);

// Mock the ApkRepository class
vi.mock('@/repositories/ApkRepository', () => {
  return {
    ApkRepository: vi.fn().mockImplementation(() => {
      return {
        getLatestApk: mockGetLatestApk,
        getAllApks: mockGetAllApks
      };
    })
  };
});

describe('APK Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the latest APK', async () => {
    const apk = await getLatestApk();
    
    expect(apk).toBeDefined();
    expect(apk!.id).toBe('1');
    expect(apk!.version).toBe('1.0.0');
    expect(apk!.versionCode).toBe(100);
  });

  it('should return all APKs', async () => {
    const apks = await getAllApks();
    
    expect(apks).toBeInstanceOf(Array);
    expect(apks.length).toBe(2);
    expect(apks[0].version).toBe('1.0.0');
    expect(apks[1].version).toBe('0.9.0');
  });

  it('should handle errors gracefully', async () => {
    // Reset original mocks to make them throw errors just for this test
    mockGetLatestApk.mockRejectedValueOnce(new Error('Test error'));
    mockGetAllApks.mockRejectedValueOnce(new Error('Test error'));

    // The functions should handle errors and return fallback values
    const apk = await getLatestApk();
    const apks = await getAllApks();
    
    // Verify error handling works properly
    expect(apks).toBeInstanceOf(Array);
    expect(apks.length).toBe(0);
    expect(apk).toBeNull();
  });
});
