/**
 * @vitest-environment node
 */

import { describe, it, expect, vi } from 'vitest';
import { PlaystoreTesterService } from './playstore-tester-service';

// Mock repository
vi.mock('@/repositories/playstore-tester-repository', () => ({
  PlaystoreTesterRepository: vi.fn().mockImplementation(() => ({
    create: vi.fn(),
    findByEmail: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }))
}));

describe('PlaystoreTesterService', () => {
  it('should create service instance', () => {
    // Act
    const service = new PlaystoreTesterService();
    
    // Assert
    expect(service).toBeDefined();
  });
  
  it('should have createTester method', () => {
    // Arrange
    const service = new PlaystoreTesterService();
    
    // Assert
    expect(typeof service.createTester).toBe('function');
  });
  
  it('should have getAllTesters method', () => {
    // Arrange
    const service = new PlaystoreTesterService();
    
    // Assert
    expect(typeof service.getAllTesters).toBe('function');
  });
  
  it('should have updateTester method', () => {
    // Arrange
    const service = new PlaystoreTesterService();
    
    // Assert
    expect(typeof service.updateTester).toBe('function');
  });
  
  it('should have deleteTester method', () => {
    // Arrange
    const service = new PlaystoreTesterService();
    
    // Assert
    expect(typeof service.deleteTester).toBe('function');
  });
  
  it('should have email validation method', () => {
    // Arrange
    const service = new PlaystoreTesterService();
    
    // Test private method using any type cast
    const isValidEmail = (service as any).isValidEmail;
    
    // Assert - just check if method exists
    expect(typeof isValidEmail).toBe('function');
  });
});
