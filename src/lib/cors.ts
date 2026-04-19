export const allowedOrigins = [
  "http://localhost:3000",
  process.env.NEXT_PUBLIC_BASE_URL!,
].filter(Boolean);

export function withCorsHeaders(origin: string | null): Headers {
  const headers = new Headers();

  if (origin && allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
  }

  return headers;
}

export function corsPreflightHeaders(origin: string | null): Headers {
  const headers = withCorsHeaders(origin);
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Max-Age", "86400");
  return headers;
}
