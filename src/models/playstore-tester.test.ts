/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import { PlaystoreTester, CreatePlaystoreTesterDto, UpdatePlaystoreTesterDto } from './playstore-tester';

describe('PlaystoreTester Model', () => {
  it('should create a valid PlaystoreTester model with all fields', () => {
    const now = new Date();
    const tester: PlaystoreTester = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: now,
      status: 'pending',
      notes: 'Test notes'
    };

    expect(tester.id).toBe('123');
    expect(tester.name).toBe('John Doe');
    expect(tester.email).toBe('john@example.com');
    expect(tester.createdAt).toBe(now);
    expect(tester.status).toBe('pending');
    expect(tester.notes).toBe('Test notes');
  });

  it('should create a valid PlaystoreTester model with only required fields', () => {
    const now = new Date();
    const tester: PlaystoreTester = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      createdAt: now
    };

    expect(tester.id).toBeUndefined();
    expect(tester.name).toBe('Jane Doe');
    expect(tester.email).toBe('jane@example.com');
    expect(tester.createdAt).toBe(now);
    expect(tester.status).toBeUndefined();
    expect(tester.notes).toBeUndefined();
  });

  it('should create a valid PlaystoreTester model with approved status', () => {
    const now = new Date();
    const tester: PlaystoreTester = {
      id: '456',
      name: 'Bob Smith',
      email: 'bob@example.com',
      createdAt: now,
      status: 'approved',
      notes: 'Great candidate'
    };

    expect(tester.id).toBe('456');
    expect(tester.name).toBe('Bob Smith');
    expect(tester.email).toBe('bob@example.com');
    expect(tester.createdAt).toBe(now);
    expect(tester.status).toBe('approved');
    expect(tester.notes).toBe('Great candidate');
  });

  it('should create a valid PlaystoreTester model with rejected status', () => {
    const now = new Date();
    const tester: PlaystoreTester = {
      id: '789',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      createdAt: now,
      status: 'rejected',
      notes: 'Not eligible'
    };

    expect(tester.id).toBe('789');
    expect(tester.name).toBe('Alice Johnson');
    expect(tester.email).toBe('alice@example.com');
    expect(tester.createdAt).toBe(now);
    expect(tester.status).toBe('rejected');
    expect(tester.notes).toBe('Not eligible');
  });

  it('should create a valid CreatePlaystoreTesterDto', () => {
    const dto: CreatePlaystoreTesterDto = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    expect(dto.name).toBe('John Doe');
    expect(dto.email).toBe('john@example.com');
  });

  it('should create a valid UpdatePlaystoreTesterDto with all fields', () => {
    const dto: UpdatePlaystoreTesterDto = {
      status: 'approved',
      notes: 'Approved for testing'
    };

    expect(dto.status).toBe('approved');
    expect(dto.notes).toBe('Approved for testing');
  });

  it('should create a valid UpdatePlaystoreTesterDto with only status', () => {
    const dto: UpdatePlaystoreTesterDto = {
      status: 'rejected'
    };

    expect(dto.status).toBe('rejected');
    expect(dto.notes).toBeUndefined();
  });

  it('should create a valid UpdatePlaystoreTesterDto with only notes', () => {
    const dto: UpdatePlaystoreTesterDto = {
      notes: 'Updated notes'
    };

    expect(dto.status).toBeUndefined();
    expect(dto.notes).toBe('Updated notes');
  });
});
