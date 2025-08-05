import { Button } from "antd";
import React from "react";
import { checkIfLogin } from "../../../../Common/Common";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../Constants/Routes";

const SellButton = ({ isPlacingOrder, side, user }) => {
  const token = useSelector((state) => state.global.token);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {token && checkIfLogin() && (
        <Button
          style={{
            marginTop: 10,
            background: theme.colors.marketDown,
            border: "none",
            color: theme.colors.whiteOnly,
          }}
          type="primary"
          htmlType="submit"
          loading={side === "sell" && isPlacingOrder}
          disabled={!token || user?.user?.acc_freeze}
        >
          {token ? "Sell" : "Login"}
        </Button>
      )}
      {(!token || !checkIfLogin()) && (
        <Button
          style={{
            marginTop: 10,
            background: theme.colors.marketDown,
            border: "none",
            color: theme.colors.whiteOnly,
          }}
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default SellButton;
