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
import { ImageIcon, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { IUserManagement } from "@/types/global";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<IUserManagement>;
  onSubmit: (data: IUserManagement) => Promise<void>;
  onImageChange: (file: File | null) => void;
  preview: string | null;
  isLoading: boolean;
}

const CreateDialog = ({
  open,
  onOpenChange,
  form,
  onSubmit,
  onImageChange,
  preview,
  isLoading,
}: CreateDialogProps) => {
  const { register, handleSubmit } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          Tambah User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah User Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Nama <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("name")}
                  className="py-5"
                  id="name"
                  name="name"
                  placeholder="Masukkan Nama"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("email")}
                  className="py-5"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Masukkan Email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  {...register("phone")}
                  className="py-5"
                  id="phone"
                  name="phone"
                  placeholder="Masukkan Nomor Telepon"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("password")}
                  className="py-5"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan Password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  defaultValue="customer"
                  onValueChange={(val) => form.setValue("role", val)}
                >
                  <SelectTrigger className="w-full py-5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  {...register("bio")}
                  id="bio"
                  name="bio"
                  placeholder="Bio"
                  className="resize-none"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center rounded-md border border-dashed">
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

export default CreateDialog;
