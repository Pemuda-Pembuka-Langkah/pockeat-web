/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PreRegisterService } from './pre-register-service';

// Mock repository
vi.mock('@/repositories/pre-register-repository', () => ({
  PreRegisterRepository: vi.fn().mockImplementation(() => ({
    create: vi.fn().mockResolvedValue({
      id: 'test-id',
      name: 'Test User',
      email: 'test@example.com',
      phone: '081234567890',
      createdAt: new Date()
    }),
    findByEmail: vi.fn().mockResolvedValue(null),
    findAll: vi.fn().mockResolvedValue([])
  }))
}));

// Mock EmailService
vi.mock('./email-service', () => ({
  EmailService: vi.fn().mockImplementation(() => ({
    sendPreRegisterConfirmationEmail: vi.fn().mockResolvedValue({ success: true, message: 'Email sent' }),
    sendPreRegisterNotificationToAdmin: vi.fn().mockResolvedValue({ success: true, message: 'Email sent' })
  }))
}));

describe('PreRegisterService', () => {
  let service: PreRegisterService;
  
  beforeEach(() => {
    service = new PreRegisterService();
  });
  
  it('should create service instance', () => {
    // Assert
    expect(service).toBeDefined();
  });
  
  it('should have createPreRegister method', () => {
    // Assert
    expect(typeof service.createPreRegister).toBe('function');
  });
  
  it('should have email validation method', () => {
    // Test private method using any type cast
    const isValidEmail = (service as any).isValidEmail;
    
    // Assert - just check if method exists
    expect(typeof isValidEmail).toBe('function');
  });
  
  it('should have phone validation method', () => {
    // Test private method using any type cast
    const isValidPhone = (service as any).isValidPhone;
    
    // Assert - just check if method exists
    expect(typeof isValidPhone).toBe('function');
  });
  
  it('should have getAllPreRegisters method', () => {
    // Assert
    expect(typeof service.getAllPreRegisters).toBe('function');
  });
});
