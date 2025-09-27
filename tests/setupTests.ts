import '@testing-library/jest-dom';

// For React 18+ ensure act environment is enabled to avoid deprecated warnings
// See: https://react.dev/warnings/act-compat
(global as any).IS_REACT_ACT_ENVIRONMENT = true;

// Filter noisy deprecated-act warnings coming from react-dom test utils / act-compat.
// Check all args for substrings to avoid formatting variations.
const _origConsoleError = console.error.bind(console);
console.error = (...args: any[]) => {
	try {
		const joined = args
			.map((a) => {
				try {
					return typeof a === 'string' ? a : JSON.stringify(a);
				} catch (e) {
					return String(a);
				}
			})
			.join(' ');

		if (joined.includes('ReactDOMTestUtils.act is deprecated') || joined.includes('act-compat') || joined.includes('react-dom/test-utils')) {
			return;
		}
	} catch (e) {
		// fall through to original
	}
	_origConsoleError(...args);
};
