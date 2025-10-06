import '@testing-library/jest-dom';
import 'whatwg-fetch';

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

console.log('setupTests.ts loaded without MSW');
