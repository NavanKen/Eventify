"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { uploadFile } from "@/lib/helper/upload-file";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  avatar?: string;
  email?: string;
};

type UpdatePasswordPayload = {
  password: string;
};

type ActionResult = {
  status: boolean;
  message?: string;
};

interface ProfileSettingsProps {
  initialName?: string | null;
  initialEmail?: string | null;
  initialPhone?: string | null;
  initialAvatar?: string | null;
  onUpdateProfile: (payload: UpdateProfilePayload) => Promise<ActionResult>;
  onUpdatePassword: (payload: UpdatePasswordPayload) => Promise<ActionResult>;
  onDeleteAccount: () => Promise<ActionResult>;
}

const ProfileSettings = ({
  initialName,
  initialEmail,
  initialPhone,
  initialAvatar,
  onUpdateProfile,
  onUpdatePassword,
  onDeleteAccount,
}: ProfileSettingsProps) => {
  const [name, setName] = useState(initialName ?? "");
  const [email, setEmail] = useState(initialEmail ?? "");
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [avatar, setAvatar] = useState(initialAvatar ?? "");
  const [savedAvatar, setSavedAvatar] = useState(initialAvatar ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setAvatar(url);
    setAvatarFile(file);
  };

  const handleResetAvatar = () => {
    setAvatar(savedAvatar);
    setAvatarFile(null);
    const fileInput = document.getElementById("avatar-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSaveProfile = () => {
    startTransition(async () => {
      let avatarUrl = savedAvatar || "";

      if (avatarFile) {
        try {
          avatarUrl = await uploadFile(avatarFile, "avatar", savedAvatar || undefined);
        } catch (err) {
          toast.error(
            err instanceof Error
              ? err.message
              : "Gagal mengunggah avatar, coba lagi."
          );
          return;
        }
      } else if (avatar) {
        avatarUrl = avatar;
      }

      const res = await onUpdateProfile({ name, email, phone, avatar: avatarUrl });

      if (!res.status) {
        toast.error(res.message || "Gagal memperbarui profil");
        return;
      }

      toast.success("Profil berhasil diperbarui");

      setSavedAvatar(avatarUrl);
      setAvatar(avatarUrl);
      setAvatarFile(null);
    });
  };

  const handleChangePassword = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast.error("Password tidak sesuai");
      return;
    }

    startTransition(async () => {
      const res = await onUpdatePassword({ password: newPassword });

      if (!res.status) {
        toast.error(res.message || "Gagal mengubah password");
        return;
      }

      toast.success("Password berhasil diperbarui");
      setNewPassword("");
      setConfirmPassword("");
    });
  };

 const handleDeleteAccount = () => {
    startTransition(async () => {
      const res = await onDeleteAccount();

      if (!res.status) {
        toast.error(res.message || "Gagal menghapus akun");
        return;
      }

      toast.success("Akun berhasil dihapus");
      setShowDeleteDialog(false);
      window.location.href = "/";
    });
  };

  const hasAvatarChanged = avatarFile !== null;

  return (
    <>
    <div className="px-8 space-y-8">
      <section className="bg-white rounded-[var(--radius)] shadow-sm border border-border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-dark)]">
            Informasi Profil
          </h2>
          <p className="text-sm text-[var(--text-light)] mt-1">
            Perbarui detail pribadi dan gambar profil Anda.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary overflow-hidden ring-2 ring-border">
                {avatar ? (
                  <Image
                    src={avatar}
                    fill
                    alt={name || "Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (name?.charAt(0) || "U").toUpperCase()
                )}
              </div>
              <label
                htmlFor="avatar-input"
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-6 h-6 text-white" />
              </label>

              {hasAvatarChanged && (
                <button
                  onClick={handleResetAvatar}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
                  title="Batalkan perubahan avatar"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}

              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="text-center">
              <p className="text-xs text-[var(--text-light)]">
                Klik gambar untuk mengubah
              </p>
              <p className="text-[10px] text-[var(--text-light)] mt-0.5">
                PNG, JPG (Maks. 5MB)
              </p>
            </div>
          </div>

          <div className="flex-1 grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Nama</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full py-5"
              />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email akun"
                className="w-full py-5"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label>Nomor Telepon</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nomor telepon"
                className="w-full py-5"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveProfile} disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </section>

      <section className="bg-white rounded-[var(--radius)] shadow-sm border border-border p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-dark)]">
            Keamanan Akun
          </h2>
          <p className="text-sm text-[var(--text-light)] mt-1">
            Ubah password akun Anda secara berkala untuk keamanan yang lebih baik.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <Label>Password Baru</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full py-5"
            />
          </div>
          <div className="space-y-1">
            <Label>Konfirmasi Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru"
              className="w-full py-5"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleChangePassword} disabled={isPending}>
            {isPending ? "Mengubah..." : "Ubah Password"}
          </Button>
        </div>
      </section>

      <section className="bg-white rounded-[var(--radius)] shadow-sm border border-red-200 p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-red-600">Hapus Akun</h2>
          <p className="text-sm text-red-500 mt-1">
            Menghapus akun akan menghapus semua data profil Anda secara permanen.
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
          disabled={isPending}
        >
          Hapus Akun
        </Button>
      </section>
    </div>

     <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <AlertDialogTitle>Hapus Akun</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2 text-sm text-muted-foreground">
              Apakah Anda yakin ingin menghapus akun ini? Tindakan ini akan menghapus semua
              data profil Anda, menghapus riwayat transaksi, dan tindakan ini tidak dapat
              dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isPending ? "Menghapus..." : "Ya, Hapus Akun"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  );
};

export default ProfileSettings;