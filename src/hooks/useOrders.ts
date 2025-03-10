import { Orders } from "@/types";
import { useEffect, useState } from "react";

const API_URL = "/api/orders";
const WS_URL = "ws://localhost:3000/api/webSocketServer";

export const useOrders = (page: number = 1, pageSize: number = 10) => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    fetchOrders(page, pageSize);

    const socket = new WebSocket(WS_URL);
    socket.onmessage = (event) => {
      setOrders(JSON.parse(event.data));
    };

    return () => socket.close();
  }, [page, pageSize]);

  const fetchOrders = async (page: number, pageSize: number) => {
    try {
      const response = await fetch(
        `${API_URL}?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();
      setOrders(data.orders);
      setTotalOrders(data.total);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return { orders, totalOrders, loading };
};
