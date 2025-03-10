"use client";

import React, { useState, useEffect, useMemo } from "react";
import { fetchOrders } from "@/utils/fetchOrders";
import { Orders } from "@/types";
import { OrderTable } from "./OrderTable";
import { PaginationControls } from "./Pagination";

export const TableData = () => {
  const [ordersData, setOrdersData] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalOrders] = useState(100);

  useEffect(() => {
    setLoading(true);
    fetchOrders(page, pageSize)
      .then((newOrders) => setOrdersData(newOrders))
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  const handleUpdateStatus = (orderId: string) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId && order.status === "Pending"
          ? { ...order, status: "Completed" }
          : order
      )
    );
  };

  const memoizedProps = useMemo(
    () => ({
      ordersData,
      loading,
      pageSize,
      onUpdateStatus: handleUpdateStatus,
    }),
    [ordersData, loading, pageSize]
  );

  return (
    <div className="flex flex-col items-center p-4">
      <OrderTable {...memoizedProps} />
      <PaginationControls
        current={page}
        total={totalOrders}
        onPageChange={setPage}
      />
    </div>
  );
};
