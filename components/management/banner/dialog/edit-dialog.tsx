"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Pencil, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { IBanner } from "@/types/global";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IEditDialog {
  banner: IBanner;
  form: UseFormReturn<IBanner>;
  onSubmit: (data: IBanner) => Promise<void>;
  onImageChange: (file: File | null) => void;
  preview: string | null;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditDialog = ({
  banner,
  form,
  onSubmit,
  onImageChange,
  preview,
  isLoading,
  open,
  onOpenChange,
}: IEditDialog) => {
  const { register, handleSubmit, watch } = form;
  const status = watch("status");

  useEffect(() => {
    if (open) {
      form.reset({
        id: banner.id,
        title: banner.title,
        image_url: banner.image_url,
        status: banner.status,
      });
    }
  }, [open, banner, form]);

  const handleOpenEdit = () => {
    onOpenChange(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Pencil
          className="text-blue-500 w-5 h-5 cursor-pointer"
          onClick={handleOpenEdit}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Judul Banner <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("title")}
                  className="py-5"
                  id="title"
                  name="title"
                  placeholder="Masukkan Judul Banner"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={String(status ?? true)}
                  onValueChange={(val) =>
                    form.setValue("status", val === "true")
                  }
                >
                  <SelectTrigger className="w-full py-5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Aktif</SelectItem>
                    <SelectItem value="false">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Gambar Banner</Label>
                <div className="relative">
                  {preview ? (
                    <div className="relative w-full h-64 rounded-md border-2 border-dashed overflow-hidden">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => onImageChange(null)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-64 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload file here</span>
                        </p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
