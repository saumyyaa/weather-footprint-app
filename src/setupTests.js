import '@testing-library/jest-dom';

try {
  // Polyfill ReadableStream for Firebase (Node environments)
  if (typeof global.ReadableStream === 'undefined') {
    global.ReadableStream = require('web-streams-polyfill/ponyfill').ReadableStream;
  }

  // Polyfill for TextEncoder/TextDecoder if needed by Firebase/auth
  if (typeof global.TextEncoder === 'undefined' || typeof global.TextDecoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
  }
} catch (err) {
  console.warn('⚠️ Polyfill error in setupTests:', err);
}

// Mock window.matchMedia if not available (for React components relying on it)
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}
