"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createEvent,
  getEventService,
  updateEvent,
  deleteEvent,
} from "@/service/event.service";
import { IEvent } from "@/types/global";
import { toast } from "sonner";

export const useEvent = (search?: string, limit?: number, page?: number) => {
  const createForm = useForm<IEvent>();
  const editForm = useForm<IEvent>();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpenId, setEditOpenId] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    const offset = (page! - 1) * limit!;
    const res = await getEventService({ search, limit, offset });

    if (res.status && res.data) {
      setEvents(res.data);
      setTotal(res.count ?? 0);
    }
    setIsLoading(false);
  }, [search, limit, page]);

  useEffect(() => {
    const loadData = async () => {
      await fetchEvents();
    };
    loadData();
  }, [fetchEvents]);

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

  const handleCreate = async (payload: IEvent) => {
    setIsCreate(true);

    const res = await createEvent(payload);

    if (!res.status) {
      toast.error(res.message);
      setIsCreate(false);
      return;
    }
    toast.success(res.message);
    await fetchEvents();
    setIsCreate(false);
    handleOpenChange(false);
  };

  const handleEditOpenChange = (open: boolean, eventId?: string) => {
    if (open && eventId) {
      setEditOpenId(eventId);
      const eventToEdit = events.find((evt) => evt.id === eventId);
      if (eventToEdit) {
        editForm.reset({
          id: eventToEdit.id,
          title: eventToEdit.title,
          description: eventToEdit.description,
          category_id: eventToEdit.category_id,
          location: eventToEdit.location,
          start_date: eventToEdit.start_date,
          end_date: eventToEdit.end_date,
          banner_image: eventToEdit.banner_image,
          status: eventToEdit.status,
        });
        setEditPreview(eventToEdit.banner_image || null);
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

  const handleEdit = async (payload: IEvent) => {
    setIsEdit(true);

    let imageToUse = payload.banner_image;
    if (payload.file) {
      imageToUse = undefined;
    }

    const res = await updateEvent({
      id: payload.id,
      title: payload.title,
      description: payload.description,
      category_id: payload.category_id,
      location: payload.location,
      start_date: payload.start_date,
      end_date: payload.end_date,
      file: payload.file,
      banner_image: imageToUse || payload.banner_image,
      status: payload.status,
    });

    if (!res.status) {
      toast.error(res.message);
      setIsEdit(false);
      return;
    }
    toast.success(res.message);
    await fetchEvents();
    setIsEdit(false);
    handleEditOpenChange(false);
  };

  const handleDelete = async (id: string, bannerImage?: string) => {
    const res = await deleteEvent(id, bannerImage);

    if (!res.status) {
      toast.error(res?.pesan || "Gagal menghapus data");
      return;
    }

    toast.success(res?.pesan);
    await fetchEvents();
  };

  return {
    events,
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
    fetchEvents,
    handleDelete,
  };
};
