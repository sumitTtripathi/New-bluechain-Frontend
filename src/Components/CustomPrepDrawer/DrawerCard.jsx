import { Button, Divider } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled, { useTheme } from "styled-components";
import { deviceQuery } from "../../MediaSizes";
import { setParentDrawer } from "../../Services/Auth";
import {
  useAccountUpgradeMutation,
  useGetAccountLevelQuery,
} from "../../Services/Transaction";
import { checkIfLogin } from "../../Common/Common";
const StyledDrawerCard = styled.div`
  display: grid;

  background: rgb(247, 248, 250);
  grid-template-rows: 0.4fr 0.1fr 2fr 0.2fr;
  background: ${(props) => props.theme.colors.grey.semiLightDark};

  /* height: 100vh; */
  @media (${deviceQuery.laptopL}) {
    height: auto;
  }

  .drawer-head {
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 0 20px;
    padding-top: 10px;
    color: ${(props) => props.theme.colors.black};
    font-family: Helvetica;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    .sub-title {
      color: ${(props) => props.theme.colors.grey.semiDark};
      font-size: 16px;
      font-weight: 400;
      padding: 5px 0px;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 10px;
    padding-bottom: 40px;

    font-family: Helvetica;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: ${(props) => props.theme.colors.black};
    .head {
      font-size: 12px;
      color: ${(props) => props.theme.colors.grey.semiDark};
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  li {
    list-style-type: none;
  }
  .field-container {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .single-field {
      display: flex;
      gap: 5px;
    }
  }
  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }
`;
const StyledButton = styled(Button)`
  width: 80%;
  margin: auto;
  border-radius: 500px;
  background: ${(props) => props.theme.colors.blue.dark};
  color: white;
  &:hover {
    color: white;
    background: ${(props) =>
      props.theme.colors.grey
        .semiLightDark}; /* Change to the desired hover background color */
    /* You can also adjust other properties for the hover state */
  }
`;
function DrawerCard({ data, type }) {
  const [accountUpgrade] = useAccountUpgradeMutation();
  const token = useSelector((state) => state.global.token);
  const { data: getAccountLevel } = useGetAccountLevelQuery(
    {},
    {
      skip: !token,
    }
  );
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    try {
      if (checkIfLogin()) {
        const data = {
          acctLv: type,
        };
        const response = await accountUpgrade(data).unwrap();
        toast.success(!response?.data?.msg && "Account successfully changed");
        dispatch(setParentDrawer(false));
      } else {
        toast.error("Please Login first");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledDrawerCard>
      <div className="drawer-head">
        <img src={data.img} alt="" />
        <div>
          <p>{data.title}</p>
          <p className="sub-title">{data.subtitle}</p>
        </div>
      </div>
      <Divider style={{ margin: "10px auto", minWidth: "90%", width: "90%" }} />

      <div className="container">
        <div className="field-container">
          <p className="head">You can trade</p>
          <ul>
            <div className="single-field">
              <img src="/Perp/Tick.svg" alt="" />
              <li>Spot</li>
            </div>
            <div className="single-field">
              <img src="/Perp/Tick.svg" alt="" />
              {type == "1" ? <li>Options(Buy)</li> : <li>Margin</li>}
            </div>

            {type != "1" ? (
              <>
                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  <li>Futures</li>
                </div>
                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  <li>Perpetual</li>
                </div>

                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  <li>Options</li>
                </div>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        {type != "1" && (
          <>
            <div className="field-container">
              <p className="head">Free margin modes</p>
              <ul>
                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  <li>Isolated</li>
                </div>
                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  <li>Margin</li>
                </div>
                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  {type == "2" ? (
                    <li>Single-currency cross</li>
                  ) : (
                    <li>Multi-currency cross</li>
                  )}
                </div>
              </ul>
            </div>

            <div className="field-container">
              <p className="head">Risk management</p>
              <ul>
                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  <li>Pnl offset</li>
                </div>
                <div className="single-field">
                  <img src="/Perp/Tick.svg" alt="" />
                  <li>Risk offset</li>
                </div>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="btn-container">
        {!checkIfLogin() && type === 1 ? (
          <span style={{ color: theme.colors.grey.dark, textAlign: "center" }}>
            Current Account Mode
          </span>
        ) : type !== Number(getAccountLevel?.data) ? (
          <StyledButton onClick={handleConfirm}>Confirm</StyledButton>
        ) : (
          <span style={{ color: theme.colors.grey.dark, textAlign: "center" }}>
            Current Account Mode
          </span>
        )}
      </div>
    </StyledDrawerCard>
  );
}

export default DrawerCard;
