import { NextRequest, NextResponse } from "next/server";
import { validateCSRFToken } from "@/lib/csrf";
import { supabase } from "@/lib/supabase"; // pastikan file ini ada
import { randomUUID } from "crypto";

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

  // 1. CSRF validation
  if (!validateCSRFToken(token, cookieToken)) {
    return NextResponse.json(
      { success: false, message: "Invalid CSRF token" },
      { status: 403 }
    );
  }

  // 2. File presence check
  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 }
    );
  }

  // 3. File type validation
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      {
        success: false,
        message: "File type not allowed. Only PDF, DOC, and DOCX are allowed.",
      },
      { status: 400 }
    );
  }

  try {
    // 4. Generate file name
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${randomUUID()}.${ext}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // 5. Upload to Supabase bucket
    const { error: uploadError } = await supabase.storage
      .from("scholarship-letter") // ⬅️ ganti ke nama bucket kamu
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // 6. Dapatkan public URL
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
    console.error("❌ Supabase upload failed:", error);

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
