import {
  ArrowLeftRight,
  ChartPie,
  CircleDollarSign,
  HelpCircle,
  Home,
  ReceiptText,
} from "lucide-react";

export interface SidebarProps {
  title: string;
  url: string;
  icon: React.ElementType;
}

export const mains = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "transaction",
    icon: ArrowLeftRight,
  },
  {
    title: "Budgets",
    url: "budgets",
    icon: ChartPie,
  },
  {
    title: "Pots",
    url: "pots",
    icon: CircleDollarSign,
  },
  {
    title: "Recurring Bills",
    url: "recurring-bills",
    icon: ReceiptText,
  },
];
