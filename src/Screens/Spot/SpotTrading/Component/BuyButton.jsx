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

  // const isDisabled = user?.user?.acc_freeze || !user?.user?.kyc_verified;
  const isDisabled = false;

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
          loading={side === "buy" && isPlacingOrder}
          disabled={isDisabled}
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
