"use client";

import { useState } from "react";
import { useTicket } from "@/hooks/use-ticket";
import DataTable from "../ticket/table";
import CreateDialog from "../ticket/dialog/create-dialog";

interface TicketTabProps {
  eventId: string;
}

export const TicketTab = ({ eventId }: TicketTabProps) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const search = "";
  const {
    tickets,
    total,
    isLoading,
    createOpen,
    createForm,
    isCreate,
    handleCreate,
    handleOpenChange,
    editOpenId,
    editForm,
    isEdit,
    handleEdit,
    handleEditOpenChange,
    handleDelete,
  } = useTicket(eventId, search, limit, page);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Event Ticket</h3>
          <p className="text-sm text-gray-500">Manage ticket of this event</p>
        </div>
        <CreateDialog
          open={createOpen}
          onOpenChange={handleOpenChange}
          form={createForm}
          onSubmit={handleCreate}
          isLoading={isCreate}
        />
      </div>

      <DataTable
        tickets={tickets}
        isLoading={isLoading}
        total={total}
        limit={limit}
        page={page}
        onPageChange={setPage}
        onLimitChange={(val: number) => {
          setLimit(val);
          setPage(1);
        }}
        onDelete={handleDelete}
        editOpenId={editOpenId}
        onEditOpenChange={handleEditOpenChange}
        editForm={editForm}
        onEditSubmit={handleEdit}
        isEdit={isEdit}
      />
    </div>
  );
};
