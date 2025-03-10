"use client";

import React, { useState, useMemo } from "react";
import { OrderTable } from "./OrderTable";
import { PaginationControls } from "./Pagination";
import { useOrders } from "@/hooks/useOrders";

export const TableData = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { orders, loading, totalOrders, updateOrderStatus, deleteOrder } = useOrders(
    page,
    pageSize
  );

  const memoizedProps = useMemo(() => {
    const handleUpdateStatus = (orderId: string) => {
      updateOrderStatus(orderId);
    };
    const handleDeleteOrder = (orderId: string) => {
      deleteOrder(orderId);
    };

    return {
      ordersData: orders,
      pageSize,
      onUpdateStatus: handleUpdateStatus,
      onOrderDelete: handleDeleteOrder,
      loading,
    };
  }, [orders, loading, updateOrderStatus, deleteOrder]);

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
