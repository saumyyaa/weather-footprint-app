// src/setupTests.js
import '@testing-library/jest-dom';
// src/setupTests.js
import 'jest-environment-jsdom';

global.ReadableStream = require('web-streams-polyfill/ponyfill').ReadableStream;


// Mock TextEncoder/TextDecoder for Firebase
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
