"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEventDetail } from "@/service/event.service";
import { supabase } from "@/lib/supabase/client";

interface IEvent {
  id: string;
  title: string;
  description?: string;
  banner_image?: string;
  location: string;
  start_date: string;
  end_date: string;
  category?: { name: string };
}

interface ITicket {
  id: string;
  ticket_name: string;
  price: number;
  quota: number;
  sold?: number;
  description?: string;
}

export const useEventDetail = () => {
  const params = useParams();
  const eventId = params.id as string;
  const [event, setEvent] = useState<IEvent | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const eventRes = await getEventDetail(eventId);
      if (eventRes.status && eventRes.data) {
        setEvent(eventRes.data);
      }

      const ticketRes = await supabase
        .from("ticket")
        .select("*")
        .eq("event_id", eventId);

      if (ticketRes.data) {
        setTickets(ticketRes.data);
        if (ticketRes.data.length > 0) {
          const firstAvailable = ticketRes.data.find(
            (t) => (t.quota || 0) - (t.sold || 0) > 0
          );
          if (firstAvailable) {
            setSelectedTicket(firstAvailable.id);
            setQuantity(1);
          } else {
            setSelectedTicket("");
            setQuantity(0);
          }
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, [eventId]);

  const selectedTicketData = tickets.find((t) => t.id === selectedTicket);
  const totalPrice = selectedTicketData
    ? selectedTicketData.price * quantity
    : 0;

  return {
    event,
    tickets,
    isLoading,
    selectedTicket,
    setSelectedTicket,
    quantity,
    setQuantity,
    selectedTicketData,
    totalPrice,
  };
};
