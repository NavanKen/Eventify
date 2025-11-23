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
import { ImageIcon, Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { IUserManagement } from "@/types/global";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IEditDialog {
  user: IUserManagement;
  form: UseFormReturn<IUserManagement>;
  onSubmit: (data: IUserManagement) => Promise<void>;
  onImageChange: (file: File | null) => void;
  preview: string | null;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditDialog = ({
  user,
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
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
      });
    }
  }, [open, user, form]);

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
          <DialogTitle>Edit User</DialogTitle>
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
                <Label htmlFor="role">Role</Label>
                <Select
                  value={user.role || "customer"}
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

export default EditDialog;
