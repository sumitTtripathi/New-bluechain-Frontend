import { Divider, Switch } from "antd";
import { RightOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { StyledInnerAccountDrawer } from "./InnerAccountDrawer.styles";
import CoolingModal from "../CoolingModal/CoolingModal";
import { useGetAccountLevelQuery } from "../../../../Services/Transaction";
import {
  setChildrenDrawer,
  setParentDrawer,
  setThemeValue,
} from "../../../../Services/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { ThemeContext } from "../../../../App";

function InnerAccountDrawer() {
  const [coolingModal, setCoolingModal] = useState(false);
  const themeContext = useContext(ThemeContext);
  const token = useSelector((state) => state.global.token);
  const { data: getAccountLevel } = useGetAccountLevelQuery(
    {},
    {
      skip: !token,
    }
  );
  const childrenDrawer = useSelector((state) => state.global.childrenDrawer);
  const dispatch = useDispatch();
  const theme = useTheme();

  const onChildrenDrawerClose = () => {
    dispatch(setChildrenDrawer(false));
  };

  const onChange = () => {
    if (themeContext?.currentTheme === "light") {
      themeContext?.setCurrentTheme("dark");
      localStorage.setItem("theme", "dark");
      dispatch(setThemeValue("dark"));
    } else {
      themeContext?.setCurrentTheme("light");
      localStorage.setItem("theme", "light");
      dispatch(setThemeValue("light"));
    }
  };
  return (
    <StyledInnerAccountDrawer
      title="Select Position"
      className="inner-drawer"
      width={320}
      onClose={onChildrenDrawerClose}
      open={childrenDrawer}
      style={{ color: theme.colors.black }}
    >
      <div className="account-details">
        <div className="field-container">
          <p>Account Mode</p>
          <p
            onClick={() => {
              dispatch(setParentDrawer(true));
              dispatch(setChildrenDrawer(false));
            }}
            style={{ cursor: "pointer", borderBottom: "1px dotted" }}
          >
            {getAccountLevel?.data === "2"
              ? "Single-currency margin"
              : getAccountLevel?.data === "3"
              ? "Multi-currency margin"
              : "Basic"}{" "}
          </p>
        </div>
        <Divider />
        <div className="field-container">
          <p>Theme</p>
          <Switch
            onChange={onChange}
            checked={themeContext?.currentTheme === "light"}
          />
        </div>
        {/* <div className="field-container">
          <p>Keyboard Shortcuts</p>
          <p>
            On{" "}
            <RightOutlined style={{ fontSize: "10px", textAlign: "center" }} />
          </p>
        </div> */}
        <div className="field-container">
          <p className="small-font">24h Change & Chart Time</p>
          <p>00:00:00UTC</p>
        </div>
        {/* <div className="field-container">
          <p>Order Confirmation</p>
          <Switch onChange={onChange} />
        </div> */}
        {/* <div className="field-container">
          <p>“Close All” Confirmation</p>
          <Switch onChange={onChange} />
        </div> */}
        {/* <div className="field-container">
          <p>Reverse Position Confirmation</p>
          <Switch onChange={onChange} />
        </div> */}
        {/* <div className="field-container" onClick={() => setCoolingModal(true)}>
          <p>Cooling-off Period</p>
          <p>
            Off{" "}
            <RightOutlined style={{ fontSize: "10px", textAlign: "center" }} />
          </p>
        </div> */}
        {/* <div className="field-container">
          <p className="small-font">Liquidation alert</p>
          <p>
            Margin level 300%{" "}
            <RightOutlined style={{ fontSize: "10px", textAlign: "center" }} />
          </p>
        </div> */}
        {/* <div className="field-container">
          <p>Click Depth to Input Amount</p>
        </div> */}
      </div>
      {/* <CoolingModal
        coolingModal={coolingModal}
        setCoolingModal={setCoolingModal}
      /> */}
      {/* <CustomPrepDrawer open={open} setOpen={setOpen}/> */}
    </StyledInnerAccountDrawer>
  );
}

export default InnerAccountDrawer;
