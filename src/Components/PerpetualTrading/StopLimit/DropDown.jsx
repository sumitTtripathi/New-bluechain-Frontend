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
    },
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
