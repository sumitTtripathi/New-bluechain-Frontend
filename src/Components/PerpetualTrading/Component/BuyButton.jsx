import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../Constants/Routes";
import { checkIfLogin } from "../../../Common/Common";
import { useGetAccountLevelQuery } from "../../../Services/Transaction";
import { setParentDrawer } from "../../../Services/Auth";
import CustomPrepDrawer from "../../CustomPrepDrawer/CustomPrepDrawer";
const BuyButton = ({ isPlacingOrder, side, user }) => {
  const token = useSelector((state) => state.global.token);
  const theme = useTheme();
  const navigate = useNavigate();

  // const { data: getAccountLevel } = useGetAccountLevelQuery(
  //   {},
  //   {
  //     skip: !token,
  //   }
  // );
  const getAccountLevel = { data: "3" };
  const dispatch = useDispatch();
  return (
    <>
      {getAccountLevel?.data === "1" && (
        <Button
          style={{
            marginTop: 10,
            background: theme.colors.marketUp,
            border: "none",
            color: theme.colors.whiteOnly,
          }}
          disabled={user?.user?.acc_freeze}
          loading={side === "buy" && isPlacingOrder}
          onClick={() => dispatch(setParentDrawer(true))}
        >
          Upgrade
        </Button>
      )}
      {(getAccountLevel?.data === "2" || getAccountLevel?.data === "3") &&
        checkIfLogin() && (
          <Button
            style={{
              marginTop: 10,
              background: theme.colors.marketUp,
              border: "none",
              color: theme.colors.whiteOnly,
            }}
            type="primary"
            htmlType="submit"
            disabled={user?.user?.acc_freeze || isPlacingOrder}
            loading={side === "buy" && isPlacingOrder}
          >
            Buy (Long)
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
      <CustomPrepDrawer />
    </>
  );
};

export default BuyButton;
