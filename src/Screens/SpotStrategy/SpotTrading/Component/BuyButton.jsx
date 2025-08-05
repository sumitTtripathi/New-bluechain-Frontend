import { Button } from "antd";
import React from "react";
import { checkIfLogin } from "../../../../Common/Common";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../Constants/Routes";

const BuyButton = ({ isPlacingOrder, side, user }) => {
  const token = useSelector((state) => state.global.token);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {token && checkIfLogin() && (
        <Button
          style={{
            marginTop: 10,
            background: theme.colors.marketUp,
            border: "none",
            color: theme.colors.whiteOnly,
          }}
          type="primary"
          htmlType="submit"
          disabled={user?.user?.acc_freeze}
          loading={side === "buy" && isPlacingOrder}
        >
          Buy
        </Button>
      )}
      {(!token || !checkIfLogin()) && (
        <Button
          style={{
            marginTop: 10,
            background: theme.colors.marketUp,
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

export default BuyButton;
