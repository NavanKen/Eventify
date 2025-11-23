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
import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { ITransaction, IEventDropdown, ITicketDropdown } from "@/types/global";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ITransaction>;
  onSubmit: (data: ITransaction) => Promise<void>;
  isLoading: boolean;
}

const CreateDialog = ({
  open,
  onOpenChange,
  form,
  onSubmit,
  isLoading,
}: CreateDialogProps) => {
  const { register, handleSubmit, watch, setValue } = form;
  const [events, setEvents] = useState<IEventDropdown[]>([]);
  const [tickets, setTickets] = useState<ITicketDropdown[]>([]);
  const selectedEventId = watch("event_id");
  const selectedTicketId = watch("ticket_id");
  const quantity = watch("quantity");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("event").select("id, title");
      if (data) setEvents(data as IEventDropdown[]);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      if (selectedEventId) {
        const { data } = await supabase
          .from("ticket")
          .select("id, ticket_name, price")
          .eq("event_id", selectedEventId);
        if (data) setTickets(data as ITicketDropdown[]);
      }
    };
    fetchTickets();
  }, [selectedEventId]);

  const generateOrderCode = () => {
    return "ORD" + Date.now().toString().slice(-7);
  };

  useEffect(() => {
    if (open) {
      setValue("order_code", generateOrderCode());
    }
  }, [open, setValue]);

  useEffect(() => {
    if (selectedTicketId && quantity) {
      const selectedTicket = tickets.find((t) => t.id === selectedTicketId);
      if (selectedTicket) {
        const totalPrice = selectedTicket.price * quantity;
        setValue("total_price", totalPrice);
      }
    }
  }, [selectedTicketId, quantity, tickets, setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Transaksi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Tambah Transaksi Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="order_code">
                  Order Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("order_code")}
                  className="py-5"
                  id="order_code"
                  placeholder="Auto generated"
                  disabled
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="customer_name">Customer Name</Label>
                <Input
                  {...register("customer_name")}
                  className="py-5"
                  id="customer_name"
                  placeholder="Nama customer (opsional)"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event_id">
                  Event <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(val) => {
                    setValue("event_id", val);
                    setValue("ticket_id", "");
                  }}
                >
                  <SelectTrigger className="py-5 w-full">
                    <SelectValue placeholder="Pilih Event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((evt) => (
                      <SelectItem key={evt.id} value={evt.id}>
                        {evt.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ticket_id">
                  Ticket <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(val) => setValue("ticket_id", val)}
                  disabled={!selectedEventId}
                >
                  <SelectTrigger className="py-5 w-full">
                    <SelectValue placeholder="Pilih Ticket" />
                  </SelectTrigger>
                  <SelectContent>
                    {tickets.map((tkt) => (
                      <SelectItem key={tkt.id} value={tkt.id}>
                        {tkt.ticket_name} - Rp {tkt.price.toLocaleString("id-ID")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quantity">
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("quantity", { valueAsNumber: true })}
                  className="py-5"
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Jumlah tiket"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="total_price">
                  Total Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("total_price", { valueAsNumber: true })}
                  className="py-5"
                  id="total_price"
                  type="number"
                  placeholder="Auto calculated"
                  disabled
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="payment_status">Status Pembayaran</Label>
                <Select
                  defaultValue="pending"
                  onValueChange={(val) => setValue("payment_status", val)}
                >
                  <SelectTrigger className="py-5 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
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
