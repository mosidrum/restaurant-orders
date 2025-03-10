import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Orders } from "@/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { orderId } = req.body;
      
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
      
      const filePath = path.join(process.cwd(), "public/mockOrders.json");
      const ordersData = fs.readFileSync(filePath, "utf8");
      const orders = JSON.parse(ordersData);
      
      const orderIndex = orders.findIndex((order: Orders) => order.orderId === orderId);
      
      if (orderIndex === -1) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      orders.splice(orderIndex, 1);
      
      fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
      
      return res.status(200).json({
        success: true,
        message: "Order deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete order"
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
