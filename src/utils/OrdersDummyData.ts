import { Orders } from "@/types";

export const orders: Orders[] = [
  {
    orderId: "ORD-001",
    customerName: "John Doe",
    items: ["Laptop", "Mouse", "Keyboard"],
    totalPrice: 1299.99,
    status: "Completed",
    timestamp: "2025-03-06 14:30:22",
  },
  {
    orderId: "ORD-002",
    customerName: "Jane Smith",
    items: ["Monitor", "Headphones"],
    totalPrice: 549.95,
    status: "Pending",
    timestamp: "2025-03-07 09:15:43",
  },
  {
    orderId: "ORD-003",
    customerName: "Robert Johnson",
    items: ["Smartphone", "Phone Case", "Screen Protector"],
    totalPrice: 899.5,
    status: "Completed",
    timestamp: "2025-03-05 16:45:10",
  },
];
