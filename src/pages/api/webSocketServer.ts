/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebSocketServer } from "ws";
import fs from "fs";
import path from "path";

const wss = new WebSocketServer({ noServer: true });

const getOrders = () => {
  const filePath = path.resolve("./public/mockOrders.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(JSON.stringify(getOrders()));

  ws.on("message", (message) => {
    const { orderId, status } = JSON.parse(message.toString());

    const orders = getOrders();

    const orderIndex = orders.findIndex((o: any) => o.orderId === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;

      fs.writeFileSync(
        path.resolve("./public/mockOrders.json"),
        JSON.stringify(orders, null, 2)
      );

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(orders));
        }
      });
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

export default function handler(req: any, res: any) {
  if (!res.socket?.server?.wss) {
    res.socket.server.wss = wss;
    res.socket.server.on("upgrade", (request: any, socket: any, head: any) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    });
  }

  res.end();
}
