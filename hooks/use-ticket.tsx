"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createTicket,
  getTicketService,
  updateTicket,
  deleteTicket,
} from "@/service/ticket.service";
import { ITicket } from "@/types/global";
import { toast } from "sonner";

export const useTicket = (
  eventId: string,
  search?: string,
  limit?: number,
  page?: number
) => {
  const createForm = useForm<ITicket>();
  const editForm = useForm<ITicket>();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpenId, setEditOpenId] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchTickets = useCallback(async () => {
    const offset = (page! - 1) * limit!;
    const res = await getTicketService(eventId, { search, limit, offset });

    if (res.status && res.data) {
      setTickets(res.data);
      setTotal(res.count ?? 0);
    }
    setIsLoading(false);
  }, [eventId, search, limit, page]);

  useEffect(() => {
    const loadData = async () => {
      await fetchTickets();
    };
    loadData();
  }, [fetchTickets]);

  const handleOpenChange = (open: boolean) => {
    setCreateOpen(open);

    if (!open) {
      createForm.reset();
    }
  };

  const handleCreate = async (payload: ITicket) => {
    setIsCreate(true);

    const res = await createTicket({
      ...payload,
      event_id: eventId,
    });

    if (!res.status) {
      toast.error(res.message);
      setIsCreate(false);
      return;
    }
    toast.success(res.message);
    await fetchTickets();
    setIsCreate(false);
    handleOpenChange(false);
  };

  const handleEditOpenChange = (open: boolean, ticketId?: string) => {
    if (open && ticketId) {
      setEditOpenId(ticketId);
      const ticketToEdit = tickets.find((tkt) => tkt.id === ticketId);
      if (ticketToEdit) {
        editForm.reset({
          id: ticketToEdit.id,
          event_id: ticketToEdit.event_id,
          ticket_name: ticketToEdit.ticket_name,
          price: ticketToEdit.price,
          quota: ticketToEdit.quota,
          sold: ticketToEdit.sold,
          description: ticketToEdit.description,
        });
      }
    } else {
      setEditOpenId(null);
      editForm.reset();
    }
  };

  const handleEdit = async (payload: ITicket) => {
    setIsEdit(true);

    const res = await updateTicket(payload);

    if (!res.status) {
      toast.error(res.message);
      setIsEdit(false);
      return;
    }
    toast.success(res.message);
    await fetchTickets();
    setIsEdit(false);
    handleEditOpenChange(false);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteTicket(id);

    if (!res.status) {
      toast.error(res?.pesan || "Gagal menghapus data");
      return;
    }

    toast.success(res?.pesan);
    await fetchTickets();
  };

  return {
    tickets,
    total,
    isLoading,
    createOpen,
    setCreateOpen,
    createForm,
    isCreate,
    handleCreate,
    handleOpenChange,
    editOpenId,
    editForm,
    isEdit,
    handleEdit,
    handleEditOpenChange,
    fetchTickets,
    handleDelete,
  };
};
