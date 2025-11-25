"use client";

import TransactionDetailComponent from "@/components/management/transaction/detail";
import { useParams } from "next/navigation";

export default function CustomerTransactionDetailPage() {
  const params = useParams();
  const transactionId = params?.id as string;

  return <TransactionDetailComponent transactionId={transactionId} />;
}
