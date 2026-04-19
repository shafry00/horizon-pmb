export interface UploadedFile {
  originalName: string;
  mimeType: string;
  size: number;
  filename: string;
  path: string;
  url?: string;
}

export const handleFileUpload = (
  file: File,
  baseUrl?: string
): UploadedFile => {
  const filename = `${Date.now()}-${file.name}`;
  const relativePath = `/uploads/${filename}`;

  return {
    originalName: file.name,
    mimeType: file.type,
    size: file.size,
    filename,
    path: relativePath,
    ...(baseUrl && { url: `${baseUrl}${relativePath}` }),
  };
};

export const deleteUploadedFile = (filename: string): Promise<boolean> => {
  return Promise.resolve(true);
};