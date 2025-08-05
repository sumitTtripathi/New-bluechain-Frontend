import { Button, Collapse } from "antd";
import { SettingsContainer } from "./Asset.styles";
import { BsStack } from "react-icons/bs";
import { Outlet, useLocation, useNavigate } from "react-router";

const AssetSpot = () => {
  const location = useLocation();
  const { Panel } = Collapse;
  const navigate = useNavigate();
  return (
    <SettingsContainer>
      <div className="settings-change-container">
        <Collapse defaultActiveKey={["1"]} className="custom-collapse">
          <Panel
            header={
              <Button
                size="large"
                icon={<BsStack />}
                className={`spot-btn settings-btn ${
                  location.pathname.split("/").includes("spot") && "active"
                }`}
              >
                Spot
              </Button>
            }
            className="custom-panel"
            key="1"
          >
            <div className="w-full">
              <Button
                onClick={() => navigate(`/asset`)}
                size="large"
                className={`settings-btn ${
                  location.pathname
                    .split("/")
                    [location.pathname.split("/").length - 1].includes("asset")
                    ? "active"
                    : ""
                }`}
              >
                Assets
              </Button>
            </div>
            <div className="w-full">
              <Button
                onClick={() => navigate(`/asset/deposit`)}
                size="large"
                className={`settings-btn ${
                  location.pathname
                    .split("/")
                    [location.pathname.split("/").length - 1].includes(
                      "deposit"
                    ) &&
                  location.pathname.split("/")[
                    location.pathname.split("/").length - 1
                  ].length === 7
                    ? "active"
                    : ""
                }`}
              >
                Deposit
              </Button>
            </div>
            <div className="w-full">
              <Button
                onClick={() => navigate(`/asset/withdraw`)}
                size="large"
                className={`settings-btn ${
                  location.pathname
                    .split("/")
                    [location.pathname.split("/").length - 1].includes(
                      "withdraw"
                    ) &&
                  location.pathname.split("/")[
                    location.pathname.split("/").length - 1
                  ].length === 8
                    ? "active"
                    : ""
                }`}
              >
                Withdraw
              </Button>
            </div>
            <div className="w-full">
              <Button
                onClick={() => navigate(`/asset/deposit-records`)}
                size="large"
                className={`settings-btn ${
                  location.pathname
                    .split("/")
                    [location.pathname.split("/").length - 1].includes(
                      "deposit-records"
                    )
                    ? "active"
                    : ""
                }`}
              >
                Deposit Record
              </Button>
            </div>
            <div className="w-full">
              <Button
                onClick={() => navigate(`/asset/withdraw-records`)}
                size="large"
                className={`settings-btn ${
                  location.pathname
                    .split("/")
                    [location.pathname.split("/").length - 1].includes(
                      "withdraw-records"
                    ) && "active"
                }`}
              >
                Withdrawal Records
              </Button>
            </div>
          </Panel>
        </Collapse>
      </div>
      <div className="outlet-container">
        <Outlet navigate={navigate} />
      </div>
    </SettingsContainer>
  );
};

export default AssetSpot;
