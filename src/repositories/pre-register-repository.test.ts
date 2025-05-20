/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PreRegisterRepository } from './pre-register-repository';
import { CreatePreRegisterDto, PreRegister } from '@/models/pre-register';

// Mock Firebase
vi.mock('@/lib/firebase-admin', () => {
  const mockAdd = vi.fn().mockResolvedValue({ id: 'mock-id' });
  const mockWhere = vi.fn().mockReturnThis();
  const mockOrderBy = vi.fn().mockReturnThis();
  const mockLimit = vi.fn().mockReturnThis();
  
  // Mock for findByEmail (empty case and found case)
  const mockFindByEmailGet = vi.fn().mockImplementation(() => ({
    empty: false,
    docs: [{
      id: 'mock-id',
      data: () => ({
        name: 'Test User',
        email: 'test@example.com',
        phone: '081234567890',
        reason: 'Test reason',
        createdAt: { toDate: () => new Date() }
      })
    }]
  }));
  
  // Mock for findAll
  const mockFindAllGet = vi.fn().mockImplementation(() => ({
    docs: [{
      id: 'mock-id-1',
      data: () => ({
        name: 'Test User 1',
        email: 'test1@example.com',
        phone: '081234567891',
        createdAt: { toDate: () => new Date() }
      })
    }, {
      id: 'mock-id-2',
      data: () => ({
        name: 'Test User 2',
        email: 'test2@example.com',
        phone: '081234567892',
        reason: 'Another test reason',
        createdAt: { toDate: () => new Date() }
      })
    }]
  }));
  
  const mockCollection = vi.fn(() => ({
    add: mockAdd,
    where: mockWhere,
    orderBy: mockOrderBy,
    limit: mockLimit,
    get: mockFindAllGet,
    doc: vi.fn().mockReturnValue({
      get: vi.fn()
    })
  }));

  return {
    firestore: {
      collection: mockCollection
    }
  };
});

describe('PreRegisterRepository', () => {
  let repository: PreRegisterRepository;
  let mockCreate: CreatePreRegisterDto;

  beforeEach(() => {
    repository = new PreRegisterRepository();
    mockCreate = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '081234567890'
    };
    
    // Reset mock data
    vi.clearAllMocks();
  });

  it('should create a new pre-register entry', async () => {
    const result = await repository.create(mockCreate);
    
    expect(result).toBeDefined();
    expect(result.id).toBe('mock-id');
    expect(result.name).toBe(mockCreate.name);
    expect(result.email).toBe(mockCreate.email);
    expect(result.phone).toBe(mockCreate.phone);
    expect(result.createdAt).toBeInstanceOf(Date);
  });
  
  it('should find a pre-register by email', async () => {
    const firestore = await import('@/lib/firebase-admin').then(m => m.firestore);
    const mockGet = vi.fn().mockResolvedValue({
      empty: false,
      docs: [{
        id: 'mock-id',
        data: () => ({
          name: 'Test User',
          email: 'test@example.com',
          phone: '081234567890',
          reason: 'Test reason',
          createdAt: { toDate: () => new Date() }
        })
      }]
    });
    
    // Override the mock for this specific test
    vi.mocked(firestore.collection).mockReturnValue({
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      get: mockGet,
    } as any);
    
    const result = await repository.findByEmail('test@example.com');
    
    expect(result).toBeDefined();
    expect(result?.id).toBe('mock-id');
    expect(result?.email).toBe('test@example.com');
    expect(result?.phone).toBe('081234567890');
    expect(result?.reason).toBe('Test reason');
  });
  
  it('should return null when email is not found', async () => {
    const firestore = await import('@/lib/firebase-admin').then(m => m.firestore);
    const mockGet = vi.fn().mockResolvedValue({
      empty: true,
      docs: []
    });
    
    // Override the mock for this specific test
    vi.mocked(firestore.collection).mockReturnValue({
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      get: mockGet,
    } as any);
    
    const result = await repository.findByEmail('nonexistent@example.com');
    
    expect(result).toBeNull();
  });
  
  it('should find all pre-registers', async () => {
    const firestore = await import('@/lib/firebase-admin').then(m => m.firestore);
    const mockGet = vi.fn().mockResolvedValue({
      docs: [{
        id: 'mock-id-1',
        data: () => ({
          name: 'Test User 1',
          email: 'test1@example.com',
          phone: '081234567891',
          createdAt: { toDate: () => new Date() }
        })
      }, {
        id: 'mock-id-2',
        data: () => ({
          name: 'Test User 2',
          email: 'test2@example.com',
          phone: '081234567892',
          reason: 'Another test reason',
          createdAt: { toDate: () => new Date() }
        })
      }]
    });
    
    // Override the mock for this specific test
    vi.mocked(firestore.collection).mockReturnValue({
      orderBy: vi.fn().mockReturnThis(),
      get: mockGet,
    } as any);
    
    const results = await repository.findAll();
    
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(2);
    expect(results[0].id).toBe('mock-id-1');
    expect(results[0].email).toBe('test1@example.com');
    expect(results[1].id).toBe('mock-id-2');
    expect(results[1].reason).toBe('Another test reason');
  });
});
