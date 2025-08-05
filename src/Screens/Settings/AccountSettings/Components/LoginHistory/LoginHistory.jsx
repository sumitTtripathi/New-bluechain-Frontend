import { useGetLoginHistoryQuery } from "../../../../../Services/User";
import { StyledLoginTable } from "../../../Settings.styles";

const columns = [
  { key: "time", dataIndex: "time", title: "Time" },
  { key: "device", dataIndex: "device", title: "Device" },
  { key: "ip", dataIndex: "ip", title: "IP" },
  { key: "location", dataIndex: "location", title: "Location" },
];

const LoginHistory = () => {
  const { data } = useGetLoginHistoryQuery();
  return (
    <>
      <p className="title">Login History</p>
      <StyledLoginTable
        pagination={false}
        columns={columns}
        scroll={{ y: 200 }}
        dataSource={data?.loginHistory}
      />
    </>
  );
};

export default LoginHistory;
