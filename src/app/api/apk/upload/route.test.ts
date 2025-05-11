/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { NextRequest, NextResponse } from 'next/server';

// Mock the ApkRepository
vi.mock('@/repositories/ApkRepository', () => {
  return {
    ApkRepository: vi.fn().mockImplementation(() => {
      return {
        createApk: vi.fn().mockResolvedValue({
          id: '1',
          version: '1.0.0',
          versionCode: 100,
          fileSize: 15000000,
          fileUrl: 'https://example.com/app.apk',
          releaseDate: new Date().toISOString(),
          releaseNotes: 'Test release notes'
        })
      };
    })
  };
});

describe('APK Upload API Route', () => {
  let mockRequest: NextRequest;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create a mock request with valid JSON data
    mockRequest = new NextRequest('https://example.com/api/apk/upload', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        version: '1.0.0',
        versionCode: 100,
        fileUrl: 'https://example.com/app.apk',
        fileSize: 15000000,
        releaseNotes: 'Test release notes'
      })
    });
  });

  it('should return 400 if content type is not application/json', async () => {
    const invalidRequest = new NextRequest('https://example.com/api/apk/upload', {
      method: 'POST',
      headers: {
        'content-type': 'text/plain'
      }
    });
    
    const response = await POST(invalidRequest);
    expect(response.status).toBe(400);
    
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  it('should return 201 with valid data', async () => {
    const response = await POST(mockRequest);
    expect(response.status).toBe(201);
    
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
  });
});
