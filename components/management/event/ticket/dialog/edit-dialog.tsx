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
import { Loader2, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { ITicket } from "@/types/global";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface IEditDialog {
  ticket: ITicket;
  form: UseFormReturn<ITicket>;
  onSubmit: (data: ITicket) => Promise<void>;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditDialog = ({
  ticket,
  form,
  onSubmit,
  isLoading,
  open,
  onOpenChange,
}: IEditDialog) => {
  const { register, handleSubmit } = form;

  useEffect(() => {
    if (open) {
      form.reset({
        id: ticket.id,
        event_id: ticket.event_id,
        ticket_name: ticket.ticket_name,
        price: ticket.price,
        quota: ticket.quota,
        sold: ticket.sold,
        description: ticket.description,
      });
    }
  }, [open, ticket, form]);

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
          <DialogTitle>Edit Tiket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ticket_name">
                  Nama Tiket <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("ticket_name")}
                  className="py-5"
                  id="ticket_name"
                  placeholder="Masukkan Nama Tiket"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">
                  Harga <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  className="py-5"
                  id="price"
                  type="number"
                  placeholder="Masukkan Harga"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quota">
                  Kuota <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("quota", { valueAsNumber: true })}
                  className="py-5"
                  id="quota"
                  type="number"
                  placeholder="Masukkan Kuota"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder="Deskripsi Tiket"
                  className="resize-none"
                  rows={3}
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
