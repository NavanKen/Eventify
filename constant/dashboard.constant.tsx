import {
  LayoutGrid,
  Wallet,
  List,
  Tag,
  Bookmark,
  User,
  Settings,
} from "lucide-react";

const SIDEBAR_CUSTOMER = [
  {
    key: "Dashboard",
    label: "Dashboard",
    href: "/customer/member",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    key: "Transaction",
    label: "Transaction",
    href: "/customer/transaction",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    key: "Settings",
    label: "Settings",
    href: "/customer/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const SIDEBAR_STAFF = [
  {
    key: "Dashboard",
    label: "Dashboard",
    href: "/staff",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    key: "Event",
    label: "Event",
    href: "/staff/event",
    icon: <List className="w-5 h-5" />,
  },
  {
    key: "Transaction",
    label: "Transaction",
    href: "/staff/transaction",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    key: "Settings",
    label: "Settings",
    href: "/staff/settings",
    icon: <Settings className="w-5 h-5" />,
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
  {
    key: "Users",
    label: "Users",
    href: "/admin/users",
    icon: <User className="w-5 h-5" />,
  },
  {
    key: "Settings",
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_STAFF, SIDEBAR_CUSTOMER };
