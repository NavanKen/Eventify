"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUser,
  getUserService,
  updateUser,
  deleteUser,
} from "@/service/user.service";
import { IUserManagement } from "@/types/global";
import { toast } from "sonner";

export const useUser = (search?: string, limit?: number, page?: number) => {
  const createForm = useForm<IUserManagement>();
  const editForm = useForm<IUserManagement>();
  const [users, setUsers] = useState<IUserManagement[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpenId, setEditOpenId] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    const offset = (page! - 1) * limit!;
    const res = await getUserService({ search, limit, offset });

    if (res.status && res.data) {
      setUsers(res.data);
      setTotal(res.count ?? 0);
    }
    setIsLoading(false);
  }, [search, limit, page]);

  useEffect(() => {
    const loadData = async () => {
      await fetchUsers();
    };
    loadData();
  }, [fetchUsers]);

  const handleOpenChange = (open: boolean) => {
    setCreateOpen(open);

    if (!open) {
      createForm.reset();
      setPreview(null);
    }
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setPreview(null);
      return;
    }

    createForm.setValue("file", file, { shouldValidate: true });

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleCreate = async (payload: IUserManagement) => {
    const { name, email, password, phone, file, role } = payload;

    setIsCreate(true);

    const res = await createUser({ name, email, password, phone, file, role });

    if (!res.status) {
      toast.error(res.message);
      setIsCreate(false);
      return;
    }
    toast.success(res.message);
    await fetchUsers();
    setIsCreate(false);
    handleOpenChange(false);
  };

  const handleEditOpenChange = (open: boolean, userId?: string) => {
    if (open && userId) {
      setEditOpenId(userId);
      const userToEdit = users.find((user) => user.id === userId);
      if (userToEdit) {
        editForm.reset({
          id: userToEdit.id,
          name: userToEdit.name,
          email: userToEdit.email,
          phone: userToEdit.phone,
          avatar: userToEdit.avatar,
          role: userToEdit.role,
        });
        setEditPreview(userToEdit.avatar || null);
      }
    } else {
      setEditOpenId(null);
      editForm.reset();
      setEditPreview(null);
    }
  };

  const handleEditImageChange = (file: File | null) => {
    if (!file) {
      setEditPreview(null);
      return;
    }

    editForm.setValue("file", file, { shouldValidate: true });

    const url = URL.createObjectURL(file);
    setEditPreview(url);
  };

  const handleEdit = async (payload: IUserManagement) => {
    setIsEdit(true);

    let imageToUse = payload.avatar;
    if (payload.file) {
      imageToUse = undefined;
    }

    const res = await updateUser({
      id: payload.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      file: payload.file,
      avatar: imageToUse || payload.avatar,
      role: payload.role,
    });

    if (!res.status) {
      toast.error(res.message);
      setIsEdit(false);
      return;
    }
    toast.success(res.message);
    await fetchUsers();
    setIsEdit(false);
    handleEditOpenChange(false);
  };

  const handleDelete = async (id: string, avatarUrl?: string) => {
    const res = await deleteUser(id, avatarUrl);

    if (!res.status) {
      toast.error(res?.pesan || "Gagal menghapus data");
      return;
    }

    toast.success(res?.pesan);
    await fetchUsers();
  };

  return {
    users,
    total,
    isLoading,
    createOpen,
    setCreateOpen,
    createForm,
    isCreate,
    handleCreate,
    handleImageChange,
    handleOpenChange,
    preview,
    editOpenId,
    editForm,
    isEdit,
    handleEdit,
    handleEditImageChange,
    handleEditOpenChange,
    editPreview,
    fetchUsers,
    handleDelete,
  };
};
