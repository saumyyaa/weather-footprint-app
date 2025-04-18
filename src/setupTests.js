import '@testing-library/jest-dom';

try {
  // ✅ Polyfill ReadableStream for Firebase (for Node environments like CI/CD)
  if (typeof global.ReadableStream === 'undefined') {
    const { ReadableStream } = require('web-streams-polyfill/ponyfill');
    global.ReadableStream = ReadableStream;
  }

  // ✅ Polyfill TextEncoder/TextDecoder for Firebase Auth and others
  if (typeof global.TextEncoder === 'undefined' || typeof global.TextDecoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
  }
} catch (err) {
  console.warn('⚠️ Polyfill error in setupTests.js:', err);
}

// ✅ Mock window.matchMedia for React components (Chart.js, MUI, etc.)
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
