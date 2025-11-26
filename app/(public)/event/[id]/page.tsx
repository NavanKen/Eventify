"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useEventDetail } from "@/hooks/use-event-detail";
import { createOnlineTransaction } from "@/service/transaction.service";
import { useAuthContext } from "@/hooks/auth-context";

export default function EventDetailPage() {
  const {
    event,
    tickets,
    isLoading,
    selectedTicket,
    setSelectedTicket,
    quantity,
    setQuantity,
    selectedTicketData,
    totalPrice,
  } = useEventDetail();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { user } = useAuthContext();
  const isLoggedIn = !!user?.id;

  const handleCheckout = async () => {
    if (!selectedTicket) {
      toast.error("Silakan pilih tiket terlebih dahulu");
      return;
    }

    if (!quantity || quantity < 1) {
      toast.error("Jumlah tiket harus minimal 1");
      return;
    }

    if (!event?.id) {
      toast.error("Event tidak ditemukan");
      return;
    }

    const available =
      (selectedTicketData?.quota || 0) - (selectedTicketData?.sold || 0);
    if (quantity > available) {
      toast.error(`Tiket hanya tersedia ${available} buah`);
      return;
    }

    setIsCheckingOut(true);

    try {
      const orderCode = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      const res = await createOnlineTransaction({
        order_code: orderCode,
        event_id: event.id,
        ticket_id: selectedTicket,
        quantity,
        total_price: totalPrice,
      });

      if (!res.status) {
        toast.error(res.message || "Gagal membuat transaksi");
        setIsCheckingOut(false);
        return;
      }

      toast.success("Pembelian tiket berhasil!");

      setTimeout(() => {
        window.location.href = `/checkout/success?order=${res.data?.order_code}`;
      }, 1500);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat checkout"
      );
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 md:px-20 py-24">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-72 sm:h-80 md:h-96 w-full rounded-lg mb-6" />
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="px-4 md:px-20 py-24 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Event not found</p>
          <Link href="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 py-24">
      <Link href="/explore" className="mb-6 inline-block">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="relative h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={event.banner_image || "/image/placeholder.png"}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {event.category?.name || "Uncategorized"}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            <div className="space-y-3 mb-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(event.start_date).toLocaleDateString("id-ID")} -{" "}
                  {new Date(event.end_date).toLocaleDateString("id-ID")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description || "No description available"}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Available Tickets</h2>
            <div className="space-y-4">
              {tickets.map((ticket) => {
                const available = (ticket.quota || 0) - (ticket.sold || 0);
                const isAvailable = available > 0;
                const isActive = ticket.id === selectedTicket;
                return (
                  <motion.div
                    key={ticket.id}
                    role="button"
                    tabIndex={isAvailable ? 0 : -1}
                    aria-disabled={!isAvailable}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedTicket(ticket.id);
                        setQuantity(1);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (!isAvailable) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedTicket(ticket.id);
                        setQuantity(1);
                      }
                    }}
                    className={`border rounded-lg p-4 transition-colors ${
                      isActive
                        ? "border-primary ring-2 ring-primary/40 bg-primary/5"
                        : "hover:border-primary"
                    } ${
                      isAvailable
                        ? "cursor-pointer"
                        : "opacity-60 cursor-not-allowed pointer-events-none"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">
                          {ticket.ticket_name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {ticket.description}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isAvailable ? `${available} Available` : "Sold Out"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      Rp {ticket.price.toLocaleString("id-ID")}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24 z-20">
            <h3 className="text-xl font-bold mb-4">Cart</h3>

            {tickets.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Selected Ticket
                      </p>
                      <p className="font-semibold">
                        {selectedTicketData
                          ? selectedTicketData.ticket_name
                          : "Pilih tiket dari daftar"}
                      </p>
                    </div>
                    <div className="font-semibold text-primary">
                      {selectedTicketData
                        ? `Rp ${selectedTicketData.price.toLocaleString(
                            "id-ID"
                          )}`
                        : "-"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const availableQty = Math.max(
                          0,
                          (selectedTicketData?.quota || 0) -
                            (selectedTicketData?.sold || 0)
                        );
                        const canInteract =
                          !!selectedTicket && availableQty > 0;
                        return (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                if (!canInteract) return;
                                setQuantity(Math.max(1, quantity - 1));
                              }}
                              disabled={!canInteract || quantity <= 1}
                              className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                              aria-label="Kurangi jumlah"
                            >
                              -
                            </button>
                            <div className="min-w-[2rem] text-center font-semibold">
                              {quantity}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (!canInteract) return;
                                setQuantity(
                                  Math.min(availableQty, quantity + 1)
                                );
                              }}
                              disabled={
                                !canInteract || quantity >= availableQty
                              }
                              className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                              aria-label="Tambah jumlah"
                            >
                              +
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="font-medium">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {isLoggedIn ? (
                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || !selectedTicket || quantity < 1}
                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Checkout"
                    )}
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 gap-2"
                  >
                    <Link
                      href={`/auth/login?callbackUrl=${encodeURIComponent(
                        `/event/${event.id}`
                      )}`}
                    >
                      Login untuk booking tiket
                    </Link>
                  </Button>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No tickets available
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
