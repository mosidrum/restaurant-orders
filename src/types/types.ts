export interface Orders {
  orderId: string;
  customerName: string;
  items: string[];
  totalPrice: number;
  status: "Pending" | "Completed";
  timestamp: string;
}
