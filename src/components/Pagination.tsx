import { Pagination } from "antd";

interface PaginationControlsProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({
  current,
  total,
  onPageChange,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-center mt-4">
      <Pagination
        current={current}
        total={total}
        pageSize={10} // Fixed at 10 per page
        showSizeChanger={false} // Prevents user from changing page size
        onChange={onPageChange}
      />
    </div>
  );
};
