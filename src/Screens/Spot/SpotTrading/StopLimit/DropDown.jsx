import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import { Divider, Dropdown, Space, theme } from "antd";
import React from "react";
import { useTheme } from "styled-components";
const { useToken } = theme;

const DropDown = ({ advancedValue, setAdvancedValue }) => {
  const themes = useTheme();
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: themes.colors.white,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
    backgroundColor: themes.colors.white,
  };
  const items = [
    {
      key: "1",
      label: <div style={{ color: themes.colors.black }}>Effective time</div>,
      // disabled: true,
    },
    // {
    //   key: "2",
    //   label: (
    //     <div
    //       style={{ color: themes.colors.black }}
    //       onClick={() => setAdvancedValue("conditional")}
    //     >
    //       Conditional
    //       {advancedValue === "conditional" && (
    //         <CheckOutlined style={{ color: themes.colors.marketUp }} />
    //       )}
    //     </div>
    //   ),
    //   disabled: false,
    // },
    // {
    //   key: "3",
    //   label: (
    //     <div
    //       style={{ color: themes.colors.black }}
    //       onClick={() => setAdvancedValue("Trigger")}
    //     >
    //       Trigger
    //       {advancedValue === "trigger" && (
    //         <CheckOutlined style={{ color: themes.colors.marketUp }} />
    //       )}
    //     </div>
    //   ),
    //   disabled: false,
    // },
    {
      key: "4",
      label: (
        <div
          style={{ color: themes.colors.black }}
          onClick={() => setAdvancedValue("IOC")}
        >
          IOC
          {advancedValue === "IOC" && (
            <CheckOutlined style={{ color: themes.colors.marketUp }} />
          )}
        </div>
      ),
      disabled: false,
    },
    {
      key: "5",
      label: (
        <div
          style={{ color: themes.colors.black }}
          onClick={() => setAdvancedValue("Post Only")}
        >
          Post Only
          {advancedValue === "Post Only" && (
            <CheckOutlined style={{ color: themes.colors.marketUp }} />
          )}
        </div>
      ),
      disabled: false,
    },
    {
      key: "6",
      label: (
        <div
          style={{ color: themes.colors.black }}
          onClick={() => setAdvancedValue("FOK")}
        >
          FOK
          {advancedValue === "FOK" && (
            <CheckOutlined style={{ color: themes.colors.marketUp }} />
          )}
        </div>
      ),
      disabled: false,
    },
    {
  key: "7",
  label: (
    <div
      style={{ color: themes.colors.black }}
      onClick={() => setAdvancedValue("LIMIT")}
    >
      LIMIT
      {advancedValue === "LIMIT" && (
        <CheckOutlined style={{ color: themes.colors.marketUp }} />
      )}
    </div>
  ),
},
{
  key: "8",
  label: (
    <div
      style={{ color: themes.colors.black }}
      onClick={() => setAdvancedValue("MARKET")}
    >
      MARKET
      {advancedValue === "MARKET" && (
        <CheckOutlined style={{ color: themes.colors.marketUp }} />
      )}
    </div>
  ),
},
{
  key: "9",
  label: (
    <div
      style={{ color: themes.colors.black }}
      onClick={() => setAdvancedValue("STOP_LOSS")}
    >
      STOP_LOSS
      {advancedValue === "STOP_LOSS" && (
        <CheckOutlined style={{ color: themes.colors.marketUp }} />
      )}
    </div>
  ),
},
{
  key: "10",
  label: (
    <div
      style={{ color: themes.colors.black }}
      onClick={() => setAdvancedValue("STOP_LOSS_LIMIT")}
    >
      STOP_LOSS_LIMIT
      {advancedValue === "STOP_LOSS_LIMIT" && (
        <CheckOutlined style={{ color: themes.colors.marketUp }} />
      )}
    </div>
  ),
},
{
  key: "11",
  label: (
    <div
      style={{ color: themes.colors.black }}
      onClick={() => setAdvancedValue("TAKE_PROFIT")}
    >
      TAKE_PROFIT
      {advancedValue === "TAKE_PROFIT" && (
        <CheckOutlined style={{ color: themes.colors.marketUp }} />
      )}
    </div>
  ),
},
{
  key: "12",
  label: (
    <div
      style={{ color: themes.colors.black }}
      onClick={() => setAdvancedValue("TAKE_PROFIT_LIMIT")}
    >
      TAKE_PROFIT_LIMIT
      {advancedValue === "TAKE_PROFIT_LIMIT" && (
        <CheckOutlined style={{ color: themes.colors.marketUp }} />
      )}
    </div>
  ),
},
{
  key: "13",
  label: (
    <div
      style={{ color: themes.colors.black }}
      onClick={() => setAdvancedValue("LIMIT_MAKER")}
    >
      LIMIT_MAKER
      {advancedValue === "LIMIT_MAKER" && (
        <CheckOutlined style={{ color: themes.colors.marketUp }} />
      )}
    </div>
  ),
},
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
          <Divider
            style={{
              margin: 0,
            }}
          />
          <Space
            style={{
              padding: 8,
            }}
          ></Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {advancedValue}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;
