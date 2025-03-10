import { Table, Tag } from "antd";
import { Orders } from "@/types";
import { OrderStatus } from "./OrderStatus";
import { TableSkeleton } from "./TableSkeleton";
import { useState } from "react";

interface OrderTableProps {
  ordersData: Orders[];
  loading: boolean;
  pageSize: number;
  onUpdateStatus: (orderId: string) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  ordersData,
  loading,
  pageSize,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSort, setSelectedSort] = useState("");

  // Handle status filtering
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  // Handle sorting
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  // Filter orders based on selected status
  const filteredOrders = ordersData.filter((order) => {
    if (selectedStatus === "All") return true;
    return order.status === selectedStatus;
  });

  // Sort orders based on selected criteria
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (selectedSort === "totalPrice") {
      return b.totalPrice - a.totalPrice;
    }
    if (selectedSort === "timestamp") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return 0;
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Items Ordered",
      dataIndex: "items",
      key: "items",
      render: (items: string[]) => (
        <div className="flex flex-row gap-1">
          {items.map((item) => (
            <Tag key={item} className="mb-1 text-red-500 border p-1 rounded-md">
              {item}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: Orders) => (
        <OrderStatus order={record} onUpdateStatus={onUpdateStatus} />
      ),
    },
    {
      title: "Order Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-2">
          <button className="border border-green-500 rounded-sm py-[2px] px-2 text-[11px] text-green-500 hover:cursor-pointer">
            View Order
          </button>
          <button className="border border-red-500 rounded-sm py-[2px] px-2 text-[11px] text-red-500 hover:cursor-pointer">
            Delete Order
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl">
      {/* Filter and Sort Controls */}
      <div className="flex justify-end gap-4 mb-4">
        {/* Status Filter */}
        <select
          className="border rounded px-3 py-1"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Sorting */}
        <select
          className="border rounded px-3 py-1"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="totalPrice">Total Price</option>
          <option value="timestamp">Order Date</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton columns={columns} pageSize={pageSize} />
      ) : (
        <Table
          columns={columns}
          dataSource={sortedOrders}
          rowKey={(record) => record.orderId}
          pagination={false}
        />
      )}
    </div>
  );
};
