import '@testing-library/jest-dom';

// ✅ Polyfill TextEncoder/TextDecoder (used by Firebase)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// ✅ Polyfill ReadableStream (used by Firebase in Node.js envs)
try {
  if (typeof global.ReadableStream === 'undefined') {
    global.ReadableStream = require('web-streams-polyfill').ReadableStream;
  }
} catch (err) {
  console.warn('⚠️ Could not polyfill ReadableStream:', err);
}

// ✅ Mock window.matchMedia (used by MUI/Chart.js in tests)
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
