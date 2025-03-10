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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const data = await response.json();
      setOrders(data.orders);
      setTotalOrders(data.total);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string) => {
    try {
      const response = await fetch(`/api/updateOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: "Completed" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(
          `Failed to update order status: ${response.statusText}`
        );
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId && order.status === "Pending"
            ? { ...order, status: "Completed" }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch("/api/deleteOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`Failed to delete order: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", responseData);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );

      setTotalOrders((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  return { orders, totalOrders, loading, updateOrderStatus, deleteOrder };
};
