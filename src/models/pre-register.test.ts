/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import { PreRegister, CreatePreRegisterDto } from './pre-register';

describe('PreRegister Model', () => {
  it('should create a valid PreRegister model', () => {
    const now = new Date();
    const preRegister: PreRegister = {
      id: '123',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '081234567890',
      reason: 'Ingin mencoba aplikasi',
      createdAt: now
    };

    expect(preRegister.id).toBe('123');
    expect(preRegister.name).toBe('Jane Doe');
    expect(preRegister.email).toBe('jane@example.com');
    expect(preRegister.phone).toBe('081234567890');
    expect(preRegister.reason).toBe('Ingin mencoba aplikasi');
    expect(preRegister.createdAt).toBe(now);
  });

  it('should create a valid PreRegister model with minimum fields', () => {
    const now = new Date();
    const preRegister: PreRegister = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '081234567891',
      createdAt: now
    };

    expect(preRegister.id).toBe('123');
    expect(preRegister.name).toBe('John Doe');
    expect(preRegister.email).toBe('john@example.com');
    expect(preRegister.phone).toBe('081234567891');
    expect(preRegister.reason).toBeUndefined();
    expect(preRegister.createdAt).toBe(now);
  });

  it('should create a valid CreatePreRegisterDto with all fields', () => {
    const dto: CreatePreRegisterDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '081234567890',
      reason: 'Ingin mencoba aplikasi'
    };

    expect(dto.name).toBe('Jane Doe');
    expect(dto.email).toBe('jane@example.com');
    expect(dto.phone).toBe('081234567890');
    expect(dto.reason).toBe('Ingin mencoba aplikasi');
  });

  it('should create a valid CreatePreRegisterDto with minimum required fields', () => {
    const dto: CreatePreRegisterDto = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '081234567891'
    };

    expect(dto.name).toBe('John Doe');
    expect(dto.email).toBe('john@example.com');
    expect(dto.phone).toBe('081234567891');
    expect(dto.reason).toBeUndefined();
  });
});
