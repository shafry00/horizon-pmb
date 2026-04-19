export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  globalThis.crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function validateCSRFToken(
  token: string | null,
  expected: string | null
): boolean {
  if (!token || !expected) return false;
  if (token.length !== expected.length) return false;

  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}
