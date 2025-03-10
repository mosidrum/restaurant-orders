import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface Order {
  orderId: string;
  status: string;
}

const getOrders = (): Order[] => {
  const filePath = path.resolve("./public/mockOrders.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const getPaginatedOrders = (page: number, pageSize: number): Order[] => {
  const allOrders = getOrders();
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return allOrders.slice(startIndex, endIndex);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const page = parseInt((req.query.page as string) || "1", 10);
    const pageSize = parseInt((req.query.pageSize as string) || "10", 10);
    const allOrders = getOrders();
    const paginatedOrders = getPaginatedOrders(page, pageSize);

    return res.status(200).json({
      orders: paginatedOrders,
      total: allOrders.length,
    });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
