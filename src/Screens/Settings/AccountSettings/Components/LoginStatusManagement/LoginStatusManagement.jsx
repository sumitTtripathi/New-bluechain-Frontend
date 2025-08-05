import { Button } from "antd";
import { StyledLoginTable } from "../../../Settings.styles";
import { useTheme } from "styled-components";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "../../../../../Services/Auth";
import { useGetIpQuery } from "../../../../../Services/Ip";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const LoginStatusManagement = () => {
  const token = useSelector((state) => state.global.token);
  const { data: user } = useGetUserQuery(
    {},
    {
      skip: !token,
    }
  );

  const theme = useTheme();

  const [logout] = useLogoutMutation();
  const { data: currentIp } = useGetIpQuery();

  const columns = [
    { key: "time", dataIndex: "time", title: "Time" },
    {
      key: "device",
      render: (item, obj) => {
        return (
          <>
            <span style={{ color: theme.colors.black }}>{item}</span>
            {"  "}
            {currentIp?.query === obj?.ip && (
              <img src="/Logo/Icons/computer.svg" alt="computer" />
            )}
          </>
        );
      },
      dataIndex: "device",
      title: "Device",
    },
    { key: "ip", dataIndex: "ip", title: "IP" },
    { key: "location", dataIndex: "location", title: "Location" },
    {
      key: "operation",
      dataIndex: "operation",
      align: "center",
      title: "Operation",
      render: (_, obj) => {
        return currentIp?.query === obj?.ip ? (
          <span>-</span>
        ) : (
          <Button
            onClick={async () => {
              try {
                const response = await logout({
                  // ip: obj?.ip,
                  ip: "223.190.86.207",
                  // email: user?.user?.email,
                }).unwrap();
                toast.success(response?.message);
              } catch (error) {
                toast.error(error?.data?.message);
              }
            }}
          >
            Logout
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <p className="title">Login Status Management</p>
      <StyledLoginTable
        // scroll={{ x: "max-content" }}
        pagination={false}
        columns={columns}
        dataSource={user?.user?.active_logins}
      />
    </>
  );
};

export default LoginStatusManagement;
