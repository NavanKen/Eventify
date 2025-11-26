"use client";

import { IEvent } from "@/types/global";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/helper/upload-file";
import { toast } from "sonner";

interface CoverTabProps {
  event: IEvent;
  onUpdate: () => void;
}

export const CoverTab = ({ event, onUpdate }: CoverTabProps) => {
  const [preview, setPreview] = useState<string | null>(
    event.banner_image || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (file: File | null) => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSave = async () => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file && !preview) {
      toast.error("Pilih gambar terlebih dahulu");
      return;
    }

    setIsLoading(true);

    try {
      let banner_image = event.banner_image;

      if (file) {
        banner_image = await uploadFile(file, "events", event.banner_image);
      }

      const { error } = await supabase
        .from("event")
        .update({ banner_image, updated_at: new Date().toISOString() })
        .eq("id", event.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Cover berhasil diperbarui");
      onUpdate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Event Cover</h3>
        <p className="text-sm text-gray-500 mb-4">Manage cover of this event</p>

        <div className="mb-6">
          <h4 className="font-medium mb-3">Current Cover</h4>
          {preview ? (
            // <div className="relative w-full h-64 rounded-lg overflow-hidden border">
            <Image
              src={preview}
              alt="Cover"
              fill
              className="!relative rounded-2xl"
            />
          ) : (
            // </div>
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No cover image</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-3">Upload New Cover</h4>
          <label className="w-full h-48 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">
                  Drag and drop or click to upload file here
                </span>
              </p>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        </div>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
