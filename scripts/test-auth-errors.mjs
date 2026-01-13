import { getAuthErrorMessage } from '../src/utils/authErrors.js';

const tests = [
  { input: { code: 'auth/email-already-in-use' }, expected: 'This email is already registered. Please sign in or reset your password.' },
  { input: { code: 'auth/invalid-email' }, expected: 'Please enter a valid email address.' },
  { input: { code: 'auth/weak-password' }, expected: 'Password is too weak. Use at least 6 characters.' },
  { input: { code: 'some/other' }, expected: 'An error occurred. Please try again.' },
];

let allOk = true;
for (const t of tests) {
  const got = getAuthErrorMessage(t.input);
  const ok = got === t.expected;
  console.log(`${ok ? 'OK' : 'FAIL'} - code=${t.input.code} -> ${got}`);
  if (!ok) allOk = false;
}
process.exit(allOk ? 0 : 1);
