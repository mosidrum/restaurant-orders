/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebSocketServer, WebSocket } from "ws";
import fs from "fs";
import path from "path";

const wss = new WebSocketServer({ noServer: true });

interface Order {
  orderId: string;
  status: string;
}

const getOrders = (): Order[] => {
  const filePath = path.resolve("./public/mockOrders.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const getPaginatedOrders = (
  page: number = 1,
  pageSize: number = 10
): Order[] => {
  const allOrders = getOrders();
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return allOrders.slice(startIndex, endIndex);
};

wss.on("connection", (socket: WebSocket) => {
  console.log("Client connected");

  socket.on("message", (message: string) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.orderId && parsedMessage.status) {
        const { orderId, status } = parsedMessage;
        const orders = getOrders();
        const orderIndex = orders.findIndex((o) => o.orderId === orderId);

        if (orderIndex !== -1) {
          orders[orderIndex].status = status;
          fs.writeFileSync(
            path.resolve("./public/mockOrders.json"),
            JSON.stringify(orders, null, 2)
          );

          const updatedOrders = getPaginatedOrders(1, 10);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(updatedOrders));
            }
          });
        }
      } else if (parsedMessage.page !== undefined) {
        const { page, pageSize = 10 } = parsedMessage;
        const paginatedOrders = getPaginatedOrders(page, pageSize);
        socket.send(JSON.stringify(paginatedOrders));
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

export default wss;
