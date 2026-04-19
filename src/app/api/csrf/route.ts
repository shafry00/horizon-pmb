import { corsPreflightHeaders, withCorsHeaders } from "@/lib/cors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const cookieStore = await cookies();
  const token = cookieStore.get("csrf_token")?.value || "";

  const headers = withCorsHeaders(origin);

  return new NextResponse(JSON.stringify({ token }), {
    status: 200,
    headers,
  });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const headers = corsPreflightHeaders(origin);

  return new Response(null, {
    status: 204,
    headers,
  });
}
