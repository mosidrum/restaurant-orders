import { useEffect, useState } from "react";
import { Orders } from "@/types";

const API_URL = "/api/orders";
const WS_URL = "ws://localhost:3000/api/webSocketServer";

export const useOrders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchOrders();

    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      setOrders(JSON.parse(event.data));
    };

    return () => socket.close();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading };
};
