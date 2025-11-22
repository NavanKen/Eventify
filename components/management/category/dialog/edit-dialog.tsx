"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { ICategory } from "@/types/global";
import { useEffect } from "react";

interface IEditDialog {
  category: ICategory;
  form: UseFormReturn<ICategory>;
  onSubmit: (data: ICategory) => Promise<void>;
  onImageChange: (file: File | null) => void;
  preview: string | null;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditDilog = ({
  category,
  form,
  onSubmit,
  onImageChange,
  preview,
  isLoading,
  open,
  onOpenChange,
}: IEditDialog) => {
  const { register, handleSubmit } = form;

  useEffect(() => {
    if (open) {
      form.reset({
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
      });
    }
  }, [open, category, form]);

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
          <DialogTitle>Edit Kategori</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Nama Kategori <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("name")}
                  className="py-5"
                  id="name"
                  name="name"
                  placeholder="Masukkan Nama Kategori"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Keterangan</Label>
                <Textarea
                  {...register("description")}
                  id="description"
                  name="description"
                  placeholder="Keterangan"
                  className="resize-none"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={96}
                    height={60}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-24 h-[60px] flex items-center justify-center rounded-md border border-dashed">
                    <ImageIcon />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
                />
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

export default EditDilog;
