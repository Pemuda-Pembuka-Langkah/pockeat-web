/**
 * @vitest-environment node
 */

import { describe, it, expect, vi } from 'vitest';
import { EmailService } from './email-service';

// Mock nodemailer
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: vi.fn().mockResolvedValue({
        accepted: ['test@example.com']
      })
    })
  }
}));

describe('EmailService', () => {
  it('should create email service instance', () => {
    // Act
    const service = new EmailService();
    
    // Assert
    expect(service).toBeDefined();
  });
  
  it('should have a sendEmail method', () => {
    // Arrange
    const service = new EmailService();
    
    // Assert
    expect(typeof service.sendEmail).toBe('function');
  });
});
