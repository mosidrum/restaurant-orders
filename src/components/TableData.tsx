"use client";

import React, { useState, useMemo } from "react";
import { OrderTable } from "./OrderTable";
import { PaginationControls } from "./Pagination";
import { useOrders } from "@/hooks/useOrders";

export const TableData = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { orders, loading, totalOrders } = useOrders(page, pageSize);

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
      ordersData: orders,
      pageSize,
      onUpdateStatus: handleUpdateStatus,
      loading,
    }),
    [orders, pageSize, loading]
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
