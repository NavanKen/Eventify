import { environment } from "../config/env";
import { supabase } from "../supabase/client";

export const uploadFile = async (
  file: File,
  path: string,
  oldImage?: string
) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `images/${path}/${fileName}`;
  const bucket = environment.SUPABASE_BUCKET;

  if (oldImage) {
    const oldPath = oldImage.replace(
      `${environment.SUPABASE_URL}/storage/v1/object/public/${bucket}/`,
      ""
    );
    await supabase.storage.from(`${bucket}`).remove([oldPath]);
  }

  const { error } = await supabase.storage
    .from(`${bucket}`)
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(`${bucket}`).getPublicUrl(filePath);

  return publicUrl;
};
