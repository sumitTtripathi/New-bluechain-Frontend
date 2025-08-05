import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router";
import { ROUTES } from "../../Constants/Routes";
import { checkIfLogin } from "../../Common/Common";

const ActionButton = ({ isPlacingOrder, user, buttonLabel }) => {
  const token = useSelector((state) => state.global.token);
  const theme = useTheme();
  const navigate = useNavigate();
  const buttonStyle = {
    marginTop: 10,
    background: theme.colors.blue.dark,
    borderRadius: "20px",
    display: "flex",
    border: "none",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    color: theme.colors.whiteOnly,
  };
  return (
    <>
      {token && checkIfLogin() && (
        <Button
          style={buttonStyle}
          type="primary"
          htmlType="submit"
          disabled={user?.user?.acc_freeze}
          loading={isPlacingOrder}
        >
          {buttonLabel}
        </Button>
      )}
      {(!token || !checkIfLogin()) && (
        <Button
          style={buttonStyle}
          onClick={() => {
            navigate(ROUTES.LOGIN);
          }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default ActionButton;
