import { Orders } from "@/types";
import { getRandomItems } from "./getRandomItems";

export const fetchOrders = async (
  page: number,
  pageSize: number
): Promise<Orders[]> => {
  const totalOrders = 100;
  const startIndex = page * pageSize;

  if (startIndex >= totalOrders) return Promise.resolve([]);

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        Array.from(
          { length: Math.min(pageSize, totalOrders - startIndex) },
          (_, i) => ({
            orderId: `ORD-${startIndex + i + 1}`,
            customerName: `Customer ${startIndex + i + 1}`,
            items: getRandomItems(),
            totalPrice: Math.floor(Math.random() * 1000) + 50,
            status: Math.random() > 0.5 ? "Pending" : "Completed",
            timestamp: new Date().toISOString(),
          })
        )
      );
    }, 2000)
  );
};
