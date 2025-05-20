/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PlaystoreTesterRepository } from './playstore-tester-repository';
import { CreatePlaystoreTesterDto, PlaystoreTester, UpdatePlaystoreTesterDto } from '@/models/playstore-tester';

// Mock Firebase
vi.mock('@/lib/firebase-admin', () => {
  const mockAdd = vi.fn().mockResolvedValue({ id: 'mock-id' });
  const mockUpdate = vi.fn().mockResolvedValue({});
  const mockWhere = vi.fn().mockReturnThis();
  const mockOrderBy = vi.fn().mockReturnThis();
  const mockLimit = vi.fn().mockReturnThis();
  
  // Mock for document get
  const mockDocGet = vi.fn().mockResolvedValue({
    exists: true,
    id: 'mock-id',
    data: () => ({
      name: 'Test User',
      email: 'test@example.com',
      status: 'pending',
      notes: 'Test notes',
      createdAt: { toDate: () => new Date() }
    })
  });
  
  // Mock for collection get
  const mockCollectionGet = vi.fn().mockResolvedValue({
    empty: false,
    docs: [{
      id: 'mock-id',
      data: () => ({
        name: 'Test User',
        email: 'test@example.com',
        status: 'pending',
        notes: 'Test notes',
        createdAt: { toDate: () => new Date() }
      })
    }]
  });
  
  // Mock for document reference
  const mockDoc = vi.fn().mockReturnValue({
    get: mockDocGet,
    update: mockUpdate
  });
  
  // Mock for collection reference
  const mockCollection = vi.fn(() => ({
    add: mockAdd,
    where: mockWhere,
    orderBy: mockOrderBy,
    limit: mockLimit,
    get: mockCollectionGet,
    doc: mockDoc
  }));

  return {
    firestore: {
      collection: mockCollection
    }
  };
});

describe('PlaystoreTesterRepository', () => {
  let repository: PlaystoreTesterRepository;
  let testCreateDto: CreatePlaystoreTesterDto;
  let testUpdateDto: UpdatePlaystoreTesterDto;

  beforeEach(() => {
    repository = new PlaystoreTesterRepository();
    testCreateDto = {
      name: 'Test User',
      email: 'test@example.com'
    };
    testUpdateDto = {
      status: 'approved',
      notes: 'Approved for testing'
    };
    
    // Reset mock data
    vi.clearAllMocks();
  });

  it('should create a new playstore tester', async () => {
    const result = await repository.create(testCreateDto);
    
    expect(result).toBeDefined();
    expect(result.id).toBe('mock-id');
    expect(result.name).toBe(testCreateDto.name);
    expect(result.email).toBe(testCreateDto.email);
    expect(result.status).toBe('pending');
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it('should find a tester by email', async () => {
    const result = await repository.findByEmail('test@example.com');
    
    expect(result).toBeDefined();
    expect(result?.id).toBe('mock-id');
    expect(result?.email).toBe('test@example.com');
  });

  it('should find all testers', async () => {
    const results = await repository.findAll();
    
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('mock-id');
  });

  it('should update a tester', async () => {
    const result = await repository.update('mock-id', testUpdateDto);
    
    expect(result).toBeDefined();
    expect(result?.id).toBe('mock-id');
  });
});
