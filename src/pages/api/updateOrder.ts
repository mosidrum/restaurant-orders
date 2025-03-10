import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface Order {
  orderId: string;
  status: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { orderId, status } = req.body;

    const filePath = path.resolve("./public/mockOrders.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const orders: Order[] = JSON.parse(data);

    const orderIndex = orders.findIndex((order) => order.orderId === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ message: "Order not found" });
    }

    orders[orderIndex].status = status;

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    return res.status(200).json({ message: "Order updated successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
