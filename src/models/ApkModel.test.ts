/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import { ApkModel, ApkCreateInput, ApkUpdateInput } from './ApkModel';

describe('ApkModel', () => {
  it('should create a valid ApkModel', () => {
    const apk: ApkModel = {
      id: '1',
      version: '1.0.0',
      versionCode: 100,
      fileSize: 15000000,
      fileUrl: 'https://example.com/app.apk',
      releaseDate: new Date().toISOString(),
      releaseNotes: 'Test release notes'
    };

    expect(apk.id).toBe('1');
    expect(apk.version).toBe('1.0.0');
    expect(apk.versionCode).toBe(100);
    expect(apk.fileSize).toBe(15000000);
    expect(apk.releaseNotes).toBe('Test release notes');
  });

  it('should create a valid ApkCreateInput', () => {
    const input: ApkCreateInput = {
      version: '1.0.0',
      versionCode: 100,
      fileSize: 15000000,
      fileUrl: 'https://example.com/app.apk',
      releaseDate: new Date().toISOString(),
      releaseNotes: 'Test release notes'
    };

    expect(input.version).toBe('1.0.0');
    expect(input.versionCode).toBe(100);
    expect(input.fileSize).toBe(15000000);
    expect(input.releaseNotes).toBe('Test release notes');
    // Should not have an id field
    expect((input as any).id).toBeUndefined();
  });

  it('should create a valid ApkUpdateInput', () => {
    const input: ApkUpdateInput = {
      id: '1',
      version: '1.0.1'
    };

    expect(input.id).toBe('1');
    expect(input.version).toBe('1.0.1');
    // Other fields can be optional
    expect(input.versionCode).toBeUndefined();
  });
});
