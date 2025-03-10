import { Tag } from "antd";
import { Orders } from "@/types";

interface OrderStatusProps {
  order: Orders;
  onUpdateStatus: (orderId: string) => void;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({
  order,
  onUpdateStatus,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Tag color={order.status === "Completed" ? "green" : "gold"}>
        {order.status}
      </Tag>
      {order.status === "Pending" && (
        <button
          className="border border-green-500 rounded-sm py-[2px] px-2 text-[11px] text-green-500 hover:bg-green-100"
          onClick={() => onUpdateStatus(order.orderId)}
        >
          Complete Order
        </button>
      )}
    </div>
  );
};
