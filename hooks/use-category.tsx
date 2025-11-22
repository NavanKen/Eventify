"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createCategory,
  getCategoryService,
  updateCategory,
  KategoriDelete,
} from "@/service/category.service";
import { ICategory } from "@/types/global";
import { toast } from "sonner";

export const useCategory = (search?: string, limit?: number, page?: number) => {
  const createForm = useForm<ICategory>();
  const editForm = useForm<ICategory>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpenId, setEditOpenId] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    const offset = (page! - 1) * limit!;
    const res = await getCategoryService({ search, limit, offset });

    if (res.status && res.data) {
      setCategories(res.data);
      setTotal(res.count ?? 0);
    }
    setIsLoading(false);
  }, [search, limit, page]);

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
    };
    loadData();
  }, [fetchCategories]);

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

  const handleCreate = async (payload: ICategory) => {
    const { name, description, file } = payload;

    setIsCreate(true);

    const res = await createCategory({ name, description, file });

    if (!res.status) {
      toast.error(res.message);
      setIsCreate(false);
      return;
    }
    toast.success(res.message);
    await fetchCategories();
    setIsCreate(false);
    handleOpenChange(false);
  };

  const handleEditOpenChange = (open: boolean, categoryId?: string) => {
    if (open && categoryId) {
      setEditOpenId(categoryId);
      const categoryToEdit = categories.find(cat => cat.id === categoryId);
      if (categoryToEdit) {
        editForm.reset({
          id: categoryToEdit.id,
          name: categoryToEdit.name,
          description: categoryToEdit.description,
          image: categoryToEdit.image,
        });
        setEditPreview(categoryToEdit.image || null);
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

  const handleEdit = async (payload: ICategory) => {
    setIsEdit(true);

    let imageToUse = payload.image;
    if (payload.file) {
      imageToUse = undefined;
    }

    const res = await updateCategory({
      id: payload.id,
      name: payload.name,
      description: payload.description,
      file: payload.file,
      image: imageToUse || payload.image,
    });

    if (!res.status) {
      toast.error(res.message);
      setIsEdit(false);
      return;
    }
    toast.success(res.message);
    await fetchCategories();
    setIsEdit(false);
    handleEditOpenChange(false);
  };

  const handleDelete = async (id: string, imageUrl?: string) => {
    const res = await KategoriDelete(id, imageUrl);

    if (!res.status) {
      toast.error(res?.pesan || "Gagal menghapus data");
      return;
    }

    toast.success(res?.pesan);
    await fetchCategories();
  };

  return {
    categories,
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
    fetchCategories,
    handleDelete,
  };
};
