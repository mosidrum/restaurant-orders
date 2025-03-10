import { Breakpoint, Table, Tag, Modal } from "antd";
import { Orders } from "@/types";
import { OrderStatus } from "./OrderStatus";
import { TableSkeleton } from "./TableSkeleton";
import { useState, useMemo } from "react";

interface OrderTableProps {
  ordersData: Orders[];
  pageSize: number;
  onUpdateStatus: (orderId: string) => void;
  onOrderDelete: (orderId: string) => void;
  loading: boolean;
}

export const OrderTable = ({
  ordersData,
  pageSize,
  onUpdateStatus,
  onOrderDelete,
  loading,
} :OrderTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSort, setSelectedSort] = useState<
    "totalPrice" | "timestamp" | ""
  >("");
  
  const showOrderDetails = (order: Orders) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const filteredOrders = useMemo(() => {
    return selectedStatus === "All"
      ? ordersData
      : ordersData.filter((order) => order.status === selectedStatus);
  }, [ordersData, selectedStatus]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      if (selectedSort === "totalPrice") {
        return (b.totalPrice || 0) - (a.totalPrice || 0);
      }
      if (selectedSort === "timestamp") {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
      return 0;
    });
  }, [filteredOrders, selectedSort]);

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
          {items.map((item, index) => (
            <Tag
              key={index}
              className="mb-1 text-red-500 border p-1 rounded-md"
            >
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
      render: (_: unknown, record: Orders) => (
        <OrderStatus order={record} onUpdateStatus={onUpdateStatus} />
      ),
    },
    {
      title: "Order Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      responsive: ["xl" as Breakpoint],
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Orders) => (
        <div className="flex gap-2">
          <button
            className="border border-green-500 rounded-sm py-[2px] px-2 text-[11px] text-green-500 hover:cursor-pointer"
            onClick={() => showOrderDetails(record)}
          >
            View Order
          </button>
          <button
            className="border border-red-500 rounded-sm py-[2px] px-2 text-[11px] text-red-500 hover:cursor-pointer"
            onClick={() => onOrderDelete(record.orderId)}
          >
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
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="border rounded px-3 py-1"
          value={selectedSort}
          onChange={(e) =>
            setSelectedSort(e.target.value as "totalPrice" | "timestamp" | "")
          }
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
      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                <p>{selectedOrder.orderId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer Name</h3>
                <p>{selectedOrder.customerName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p>{selectedOrder.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                <p>{new Date(selectedOrder.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
                <p>${selectedOrder.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Items</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedOrder.items.map((item, index) => (
                  <Tag key={index} className="text-red-500 border p-1 rounded-md">
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
            
          </div>
        )}
      </Modal>
    </div>
  );
};
