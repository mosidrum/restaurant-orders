import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const filePath = path.resolve("./public/mockOrders.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const orders = JSON.parse(data);
    return res.status(200).json(orders);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
