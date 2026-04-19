import { NextRequest, NextResponse } from "next/server";
import { validateCSRFToken } from "@/lib/csrf";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const token = formData.get("csrf_token")?.toString() || "";
  const cookieToken = req.cookies.get("csrf_token")?.value || "";

  if (!validateCSRFToken(token, cookieToken)) {
    return NextResponse.json(
      { success: false, message: "Invalid CSRF token" },
      { status: 403 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 }
    );
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      {
        success: false,
        message: "File type not allowed. Only PDF, DOC, and DOCX are allowed.",
      },
      { status: 400 }
    );
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { success: false, message: "Upload service not configured" },
      { status: 503 }
    );
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("scholarship-letter")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("scholarship-letter")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      url: data.publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Supabase upload failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}