"use client";

import { Search } from "lucide-react";
import DataTable from "./table";
import { Input } from "@/components/ui/input";
import CreateDialog from "./dialog/create-dialog";
import { useState } from "react";
import { useEvent } from "@/hooks/use-event";

const EventComponent = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {
    events,
    total,
    isLoading,
    createOpen,
    createForm,
    isCreate,
    handleCreate,
    handleImageChange,
    handleOpenChange,
    preview,
    handleDelete,
  } = useEvent(search, limit, page);

  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center gap-3 justify-between">
        <h1 className="text-3xl font-bold">Manajamen Event</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <Input
              type="text"
              placeholder="Search"
              className="py-5 px-9"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>
          <CreateDialog
            open={createOpen}
            onOpenChange={handleOpenChange}
            form={createForm}
            onSubmit={handleCreate}
            onImageChange={handleImageChange}
            preview={preview}
            isLoading={isCreate}
          />
        </div>
      </div>
      <div className="mt-7">
        <DataTable
          events={events}
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
        />
      </div>
    </>
  );
};
export default EventComponent;
