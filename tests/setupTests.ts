import '@testing-library/jest-dom';
import 'whatwg-fetch';
import nock from 'nock';

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Настройка nock для перехвата HTTP-запросов
beforeAll(() => {
	nock.disableNetConnect();
	nock.enableNetConnect('127.0.0.1'); // Разрешить локальные подключения
});

afterEach(() => {
	nock.cleanAll();
});

afterAll(() => {
	nock.restore();
});

console.log('setupTests.ts loaded');
console.log('Matchers loaded:', typeof expect !== 'undefined' && typeof expect.extend !== 'undefined');
console.log('TextEncoder in setupTests:', typeof global.TextEncoder);
console.log('Global TextEncoder:', global.TextEncoder);
console.log('Global TextDecoder:', global.TextDecoder);
