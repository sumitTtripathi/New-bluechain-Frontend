import { StyledTable } from "./CryptoTable.styles";

const CryptoTable = ({
  dataSource,
  columns,
  scroll,
  pagination,
  onChange,
  onRow,
  loading,
}) => {
  return (
    <StyledTable
      pagination={pagination}
      scroll={scroll}
      loading={loading}
      onRow={onRow}
      onChange={onChange}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default CryptoTable;
