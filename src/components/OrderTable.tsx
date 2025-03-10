import { Breakpoint, Table, Tag } from "antd";
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

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  const filteredOrders = ordersData.filter((order) => {
    if (selectedStatus === "All") return true;
    return order.status === selectedStatus;
  });

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
      responsive: ["md" as Breakpoint],
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
      responsive: ["sm" as Breakpoint],
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["lg" as Breakpoint],
      render: (_: any, record: Orders) => (
        <OrderStatus order={record} onUpdateStatus={onUpdateStatus} />
      ),
    },
    {
      title: "Order Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      responsive: ["xl" as Breakpoint],
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
    <div className="flex flex-col w-full max-w-7xl">
      <div className="flex justify-end gap-4 mb-4">
        <select
          className="border rounded px-3 py-1"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

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
