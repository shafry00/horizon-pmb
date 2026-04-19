import { supabase } from "./supabase";

export async function supabaseUploadFile(
  file: File,
  bucketName = "scholarship-letter"
) {
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error("File size exceeds 5MB limit");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error("Upload failed: " + error.message);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}

export function getSupabaseFileUrl(
  filePath: string,
  bucketName = "scholarship-letter"
): string {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}
