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
        pageSize={10}
        showSizeChanger={false}
        onChange={onPageChange}
      />
    </div>
  );
};
