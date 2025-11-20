import { LayoutGrid, Wallet, List, Tag, Bookmark } from "lucide-react";

const SIDEBAR_EMPLOYE = [
  {
    key: "Dashboard",
    label: "Dashboard",
    href: "/member",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    key: "Event",
    label: "Event",
    href: "/admin/event",
    icon: <List className="w-5 h-5" />,
  },
  {
    key: "Banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <Bookmark className="w-5 h-5" />,
  },
];

const SIDEBAR_ADMIN = [
  {
    key: "Dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    key: "Event",
    label: "Event",
    href: "/admin/event",
    icon: <List className="w-5 h-5" />,
  },
  {
    key: "Category",
    label: "Category",
    href: "/admin/category",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    key: "Banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <Bookmark className="w-5 h-5" />,
  },
  {
    key: "Transaction",
    label: "Transaction",
    href: "/admin/transaction",
    icon: <Wallet className="w-5 h-5" />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_EMPLOYE };
