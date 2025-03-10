/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton, Table } from "antd";

interface TableSkeletonProps {
  columns: any[];
  pageSize: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  pageSize,
}) => {
  const skeletonData = Array.from({ length: pageSize }).map((_, index) => ({
    key: `skeleton-${index}`,
  }));

  const skeletonColumns = columns.map((column) => ({
    ...column,
    render: () => <Skeleton.Input active size="small" />,
  }));

  return (
    <Table
      columns={skeletonColumns}
      dataSource={skeletonData}
      rowKey={(record) => record.key}
      pagination={false}
    />
  );
};
