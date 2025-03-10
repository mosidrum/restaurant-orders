"use client";

import React, { useState } from "react";
import { Table, Tag, Space, Select, Button } from "antd";
import { Orders } from "@/types";
import { DropDown } from "@/components/DropDown";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

export const TableData = () => {
  const initialOrders: Orders[] = [
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

  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    filterAndSortOrders(value, sortField, sortDirection);
  };

  const handleSort = (field: string) => {
    const newDirection =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    filterAndSortOrders(statusFilter, field, newDirection);
  };

  const filterAndSortOrders = (
    status: string | null,
    field: string | null,
    direction: "asc" | "desc"
  ) => {
    let filteredOrders = [...initialOrders];

    if (status && status !== "All") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status
      );
    }

    if (field) {
      filteredOrders.sort((a, b) => {
        let comparison = 0;

        if (field === "timestamp") {
          comparison =
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        } else if (field === "totalPrice") {
          comparison = a.totalPrice - b.totalPrice;
        }

        return direction === "asc" ? comparison : -comparison;
      });
    }

    setOrders(filteredOrders);
  };

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
      title: (
        <div className="flex items-center justify-between">
          <span>Total Price</span>
          <Button
            type="text"
            onClick={() => handleSort("totalPrice")}
            icon={
              sortField === "totalPrice" && sortDirection === "asc" ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            size="small"
          />
        </div>
      ),
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
      title: (
        <div className="flex items-center justify-between">
          <span>Order Timestamp</span>
          <Button
            type="text"
            onClick={() => handleSort("timestamp")}
            icon={
              sortField === "timestamp" && sortDirection === "asc" ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            size="small"
          />
        </div>
      ),
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
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-7xl flex justify-between mb-4">
        <div>
          <Select
            placeholder="Filter by Status"
            style={{ width: 150 }}
            onChange={handleStatusFilter}
            options={[
              { value: "All", label: "All" },
              { value: "Pending", label: "Pending" },
              { value: "Completed", label: "Completed" },
            ]}
          />
        </div>
        <DropDown />
      </div>

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
