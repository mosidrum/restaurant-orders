"use client";

import React from "react";
import { Table, Tag, Space } from "antd";

export const TableData = () => {
  const orders = [
    {
      orderId: "ORD-001",
      customerName: "John Doe",
      items: ["Laptop", "Mouse", "Keyboard"],
      totalPrice: 1299.99,
      status: "Completed",
      timestamp: "2025-03-06 14:30:22",
    },
    {
      orderId: "ORD-002",
      customerName: "Jane Smith",
      items: ["Monitor", "Headphones"],
      totalPrice: 549.95,
      status: "Pending",
      timestamp: "2025-03-07 09:15:43",
    },
    {
      orderId: "ORD-003",
      customerName: "Robert Johnson",
      items: ["Smartphone", "Phone Case", "Screen Protector"],
      totalPrice: 899.5,
      status: "Completed",
      timestamp: "2025-03-05 16:45:10",
    },
  ];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: string) => <a className="text-[10px]">{text}</a>,
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
      className: "hidden md:table-cell",
      render: (items: string[]) => (
        <div className="flex flex-row gap-1">
          {items.map((item) => (
            <button
              key={item}
              className="mb-1 text-red-500 border p-1 rounded-md"
            >
              {item}
            </button>
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
      render: (status: "Pending" | "Completed") => (
        <Tag color={status === "Completed" ? "green" : "gold"}>{status}</Tag>
      ),
    },
    {
      title: "Order Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      className: "hidden md:table-cell",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a className="text-green-500 hover:underline">View</a>
          <a className="text-red-500 hover:underline">Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-7xl">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="orderId"
          className="w-full"
        />
      </div>
    </div>
  );
};
