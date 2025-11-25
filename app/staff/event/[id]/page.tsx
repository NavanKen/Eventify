"use client";

import EventDetailComponent from "@/components/management/event/detail";
import { useParams } from "next/navigation";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string;

  return <EventDetailComponent eventId={eventId} />;
}
