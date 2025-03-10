"use client";

import React, { useState } from "react";
import { Table, Tag, Space, Select } from "antd";
import { Orders } from "@/types";
import { orders } from "@/utils";

export const TableData = () => {
  const [ordersData, setOrdersData] = useState<Orders[]>(orders);

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleUpdateStatus = (orderId: string) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId && order.status === "Pending"
          ? { ...order, status: "Completed" }
          : order
      )
    );
  };

  const filteredData =
    statusFilter && statusFilter !== "All"
      ? ordersData.filter((order) => order.status === statusFilter)
      : ordersData;

  const sortedData = [...filteredData];
  if (sortOption === "date_asc") {
    sortedData.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  } else if (sortOption === "date_desc") {
    sortedData.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } else if (sortOption === "price_asc") {
    sortedData.sort((a, b) => a.totalPrice - b.totalPrice);
  } else if (sortOption === "price_desc") {
    sortedData.sort((a, b) => b.totalPrice - a.totalPrice);
  }

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
      render: (status: "Pending" | "Completed", record: Orders) => (
        <Space>
          <Tag color={status === "Completed" ? "green" : "gold"}>{status}</Tag>
          {status === "Pending" && (
            <button
              className="border border-green-500 rounded-sm py-[2px] px-2 text-[11px] text-green-500 hover:bg-green-100"
              onClick={() => handleUpdateStatus(record.orderId)}
            >
              Complete Order
            </button>
          )}
        </Space>
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
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-7xl flex justify-between mb-4">
        <Select
          placeholder="Filter by Status"
          style={{ width: 150 }}
          onChange={handleStatusChange}
          options={[
            { value: "All", label: "All" },
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
          ]}
        />

        <Select
          placeholder="Sort by"
          style={{ width: 150 }}
          onChange={handleSortChange}
          options={[
            { value: "date_asc", label: "Date (Oldest first)" },
            { value: "date_desc", label: "Date (Newest first)" },
            { value: "price_asc", label: "Price (Low to High)" },
            { value: "price_desc", label: "Price (High to Low)" },
          ]}
        />
      </div>

      <div className="w-full max-w-7xl">
        <Table
          columns={columns}
          dataSource={sortedData}
          rowKey="orderId"
          className="w-full"
        />
      </div>
    </div>
  );
};
