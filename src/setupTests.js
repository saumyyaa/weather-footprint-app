// src/setupTests.js
import '@testing-library/jest-dom';

// Mock browser APIs needed by Firebase
class MockReadableStream {
  constructor() {}
  getReader() { return { read: () => Promise.resolve({ done: true }) }; }
  pipeThrough() { return new MockReadableStream(); }
}

// Add TextEncoder/TextDecoder polyfills
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
}

// Add ReadableStream polyfill
if (typeof ReadableStream === 'undefined') {
  global.ReadableStream = MockReadableStream;
}

// Mock Firebase completely
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

jest.mock('../src/firebaseConfig', () => ({
  auth: {},
  app: {},
  db: {}
}));

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
