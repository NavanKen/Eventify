"use client";

import { useCallback, useEffect, useState } from "react";
import { getEventDetail } from "@/service/event.service";
import { IEvent } from "@/types/global";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoverTab } from "./cover-tab";
import { InfoTab } from "./info-tab";
import { TicketTab } from "./ticket-tab";
import { Skeleton } from "@/components/ui/skeleton";

interface EventDetailComponentProps {
  eventId: string;
}

const EventDetailComponent = ({ eventId }: EventDetailComponentProps) => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvent = useCallback(async () => {
    const res = await getEventDetail(eventId);
    if (res.status && res.data) {
      setEvent(res.data);
    }
    setIsLoading(false);
  }, [eventId]);

  useEffect(() => {
    const loadData = async () => {
      await fetchEvent();
    };
    loadData();
  }, [fetchEvent]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-lg border p-6">
          <div className="space-y-6">
            <div className="flex gap-2 border-b">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
              <div className="space-y-3 mt-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Event tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center w-full">
        <div>
          <h1 className="text-3xl font-bold">Detail Event</h1>
          <p className="text-gray-500">Manage information for this event.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg border p-6">
        <Tabs defaultValue="cover" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="cover">Cover</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="ticket">Ticket</TabsTrigger>
          </TabsList>

          <TabsContent value="cover" className="mt-6">
            <CoverTab event={event} onUpdate={fetchEvent} />
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <InfoTab event={event} onUpdate={fetchEvent} />
          </TabsContent>

          <TabsContent value="ticket" className="mt-6">
            <TicketTab eventId={eventId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventDetailComponent;
