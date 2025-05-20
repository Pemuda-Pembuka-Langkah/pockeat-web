/**
 * @vitest-environment node
 */

import { describe, it, expect, vi } from 'vitest';
import { PreRegisterService } from './pre-register-service';

// Mock repository
vi.mock('@/repositories/pre-register-repository', () => ({
  PreRegisterRepository: vi.fn().mockImplementation(() => ({
    create: vi.fn(),
    findByEmail: vi.fn(),
    findAll: vi.fn()
  }))
}));

describe('PreRegisterService', () => {
  it('should create service instance', () => {
    // Act
    const service = new PreRegisterService();
    
    // Assert
    expect(service).toBeDefined();
  });
  
  it('should have createPreRegister method', () => {
    // Arrange
    const service = new PreRegisterService();
    
    // Assert
    expect(typeof service.createPreRegister).toBe('function');
  });
  
  it('should have email validation method', () => {
    // Arrange
    const service = new PreRegisterService();
    
    // Test private method using any type cast
    const isValidEmail = (service as any).isValidEmail;
    
    // Assert - just check if method exists
    expect(typeof isValidEmail).toBe('function');
  });
});
